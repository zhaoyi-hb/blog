<template>
  <!-- <vue-mathjax :formula="content"></vue-mathjax> -->
  <div>
    <BlogHeader></BlogHeader>
    <el-row :gutter="20">
      <el-col :span="6">
        <!-- <div class="grid-content bg-purple">
          这里是目录树
        </div> -->
        <div></div>
      </el-col>
      <el-col :span="16" :offset="6">
        <div class="grid-content">
          <div class="title" v-text="title" style="font-size: 20px">
          </div>
           <div class="title" v-text="author" style="font-size: 10px">
          </div>
          <el-divider></el-divider>
          <div id="con" @change="change" v-html="content" class="markdown-body" >
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import BlogHeader from '../components/layout/BlogHeader.vue'
import 'github-markdown-css'
export default {
  name: 'contentCom',
  data() {
    return {
      content: '',
      content1: '',
      rawHtml: '',
      heightString: 'height: 500px;',
      questionToOptions: this.content,
      answer: '',
      imgIndex: 0,
      title: '',
      author: ''
    }
  },
  components: {
    BlogHeader
  },
  created() {
    this.getContent()
    window.MathJax.Hub.Queue(['Typeset', window.MathJax.Hub], () => console.log('done'))
  },
  methods: {
    async getContent() {
      const contentdata = await this.$http.post('/article/' + this.$route.params.aid)
      this.content = contentdata.data.content
      this.title = contentdata.data.title
      this.author = contentdata.data.author
      this.content = this.$converter.makeHtml(this.content)
      // this.content = contentdata.data.content
      console.log(this.title)
    },
    change() {
      console.log('改变了')
    }
  },
  props: {
    value: {}
  },
  watch: {
    content: function (value) {
      // alert('改变')
      console.log('改变')
      this.$nextTick(() => {
        window.MathJax.Hub.Queue(['Typeset', window.MathJax.Hub], () => console.log('done'))
      })
    }
  }
  // watch: {
  //   question: function (value) {
  //     this.$nextTick(() => {
  //       window.MathJax.Hub.Queue(['Typeset', this.$mathjax.Hub])
  //     })
  //   }
  // }

}
</script>

<style lang="less" scoped>
.el-row {
    margin-bottom: 20px;
    &:last-child {
      margin-bottom: 0;
    }
  }
  .el-col {
    border-radius: 4px;
  }
  .bg-purple-dark {
    background: #99a9bf;
  }
  .bg-purple {
    background: #d3dce6;
  }
  .bg-purple-light {
    background: #e5e9f2;
  }
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }
  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }
</style>