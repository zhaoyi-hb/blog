<template>
  <div>
    <BlogHeader></BlogHeader>
    <el-row>
      <el-col :span="14" :offset="2">
        <div>
          <div style="font-size:25px;margin-top:15px"><i class="el-icon-notebook-2"></i>博客</div>
        </div>
        <el-divider></el-divider>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="14" :offset="2">
        <div class="box-card">
          <div v-for="article in articles" :key="article.id" class="text item">
            <el-card>
              <div id="titleBox">
                <el-row>
                  <!-- <el-col :span="1">
                    <el-tag>标题</el-tag>
                  </el-col> -->
                  <el-col :span="20" :offset="0">
                      <i class="el-icon-document" style="color:red"></i>
                      <span>   {{article.title}}</span>
                  </el-col>
                </el-row>
                </div>
              <div class="bodyBox">
                <el-row>
                  <el-tag type="success" effect="plain">Java</el-tag>
                </el-row>
                <el-row> {{article.description}}...
                <el-link @click="goByid(article.id)" type="warning">
                  查看更多
                  <i class="el-icon-caret-right"></i>
                </el-link></el-row>
                <el-row>
                  <el-col>
                    <i class="el-icon-time"></i>
                    <span>  {{article.createTime | dateFilter}}</span>
                  </el-col>
                </el-row>
              </div>
              <!-- <el-button @click='goByid(article.id)'>点击查看详情</el-button> -->
            </el-card>
          </div>
        </div>
      </el-col>
      <el-col :span="5" :offset="1">
        <el-card :body-style="{ padding: '0px' }">
          <img
            src="https://empor.oss-cn-beijing.aliyuncs.com/20200404145502.png"
            class="image"
          />
          <div style="padding: 14px;">
            <div class="skills_title">技能值</div>
              <el-row>
                <el-col :span="2">
                  <div>
                    Spark
                  </div>
                </el-col>
                <el-col :span="18" :offset="3">
                  <el-progress :text-inside="false" :stroke-width="18" :percentage="70" color="#FF0000" :show-text="false"></el-progress>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="2">
                  <div>
                    ML
                  </div>
                </el-col>
                <el-col :span="18" :offset="3">
                 <el-progress
                :text-inside="false"
                :show-text="false"
                :stroke-width="18"
                :percentage="100"
                color="#0066FF"
              ></el-progress>
                </el-col>
              </el-row>

              <el-row>
                <el-col :span="2">
                  <div>
                    Spring
                  </div>
                </el-col>
                <el-col :span="18" :offset="3">
                  <el-progress :text-inside="false" :stroke-width="18" :percentage="80" color="#33CC00" :show-text="false"></el-progress>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="2">
                  <div>
                    Vue
                  </div>
                </el-col>
                <el-col :span="18" :offset="3">
                  <el-progress
                :text-inside="false"
                :show-text="false"
                :stroke-width="18"
                :percentage="50"
                color="#FF9900"
              ></el-progress>
                </el-col>
              </el-row>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import BlogHeader from '../components/layout/BlogHeader'
export default {
  data() {
    return {
      articles: []
    }
  },
  components: {
    BlogHeader
  },
  created() {
    this.getArticleList()
  },
  methods: {
    async getArticleList () {
      const { data: res } = await this.$http.post('article/getR')
      //  const { data: res } = await this.$http.get('user/getAll', { params: this.queryInfo })
      console.log(res)
      // const res1 = this.$converter.makeHtml(res)
      this.articles = res
    },
    goByid (aid) {
      // return '/article/' + id
      this.$router.push('/content/' + aid)
      // this.$router.push({ name: '/content', query: { id: aid } })
      // this.$router.push({ name: 'Content', params: { id: aid } })
    }
  },
  watch: {
    articles: function (value) {
      // alert('改变')
      console.log('改变')
      this.$nextTick(() => {
        window.MathJax.Hub.Queue(['Typeset', window.MathJax.Hub], () => console.log('done'))
      })
    }
  },
  filters: {
    dateFilter: function(value1) {
      console.log(value1)
      const value = new Date(value1)
      let format = 'yyyy-MM-dd '
      const o = {
        'y+': value.getFullYear(),
        'M+': value.getMonth() + 1,
        'd+': value.getDate(),
        'h+': value.getHours(),
        'm+': value.getMinutes(),
        's+': value.getSeconds()
      }
      if (/(y+)/.test(format)) {
        format = format.replace(RegExp.$1, (value.getFullYear() + '').substr(4 - RegExp.$1.length))
        for (const k in o) {
          if (new RegExp(`(${k})`).test(format)) {
            format = format.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)))
          }
        }
        return format
      }
    }
  }
}
</script>

<style lang='less' scoped>
.text {
    font-size: 14px;
  }

  .item {
    margin-bottom: 18px;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: '';
  }
  .clearfix:after {
    clear: both
  }

  .box-card {
    margin-top: 20px;
    // width: 980px;
  }
  #titleBox{
    // padding-top: -10px;
    font-size: 15px;
  }
  .time {
    font-size: 13px;
    color: #999;
  }
  .bottom {
    margin-top: 13px;
    line-height: 12px;
  }
  .button {
    padding: 0;
    float: right;
  }
  .image {
    width: 100%;
    display: block;
  }
  .clearfix:before,
  .clearfix:after {
      display: table;
      content: "";
  }
  .clearfix:after {
      clear: both
  }
  .el-progress{
    margin-bottom: 10px;
  }
  .skills_title{
    text-align: center;
    margin-bottom: 10px;
  }
  .bodyBox{
    color: #909399;
    .el-row{
      margin-top: 10px;
    }
  }
</style>