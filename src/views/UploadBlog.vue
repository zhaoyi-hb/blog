<template>
  <div>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>
        <a href="/">博客管理</a>
      </el-breadcrumb-item>
      <el-breadcrumb-item>博客上传</el-breadcrumb-item>
    </el-breadcrumb>
    <el-row class="row_title">
      <el-col :span="1">
        <div class="title">标题：</div>
      </el-col>
      <el-col :span="23">
        <el-input v-model="form.title" placeholder="请输入标题"></el-input>
      </el-col>
    </el-row>
    <mavon-editor ref="editor" v-model="form.content" :ishljs="true"></mavon-editor>
    <el-button type="primary" @click="dialogFormVisible = true">上传文章</el-button>
    <el-dialog title="上传博客" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="博客描述" :label-width="formLabelWidth">
          <el-input v-model="form.description" autocomplete="off" type="textarea" autosize></el-input>
        </el-form-item>
        <el-form-item label="博客标签-未开通" :label-width="formLabelWidth">
          <el-checkbox-group v-model="form.checkList">
    <el-checkbox label="标签 A"></el-checkbox>
    <el-checkbox label="标签 B"></el-checkbox>
    <el-checkbox label="标签 C"></el-checkbox>
  </el-checkbox-group>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="uploadBlog">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { mavonEditor } from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
export default {
  name: 'Create',
  components: {
    mavonEditor
  },
  data() {
    return {
      dialogFormVisible: false,
      form: {
        content: '',
        title: '',
        author: '',
        description: '',
        checkList: []
      },
      formLabelWidth: '120px'
    }
  },
  methods: {
    async uploadBlog() {
      // this.form.content = this.$refs.editor.d_render
      // this.form.content = this.doc
      const res = await this.$http.post('/article/insertBlog', this.form)
      this.$message.info(res)
    }
  }
}
</script>
<style lang="less" scoped>
.el-button{
  margin-top: 10px;
}
.title{
  padding-top: 10px;
}
.row_title{
  margin-bottom: 10px;
}
</style>