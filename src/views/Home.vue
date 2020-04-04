<template>
  <div class="home">
    <el-container class="home_container">
      <el-header>
        <div>
          <img src="../assets/logo.png" alt />
          <span>blog后台管理系统</span>
        </div>
        <el-button type="info" @click="logout">退出</el-button>
      </el-header>
      <el-container>
        <el-aside :width="isCollapse ? '64px' : '200px'">
          <div class="toggle-button" @click="toggleCollapse">
            |||
          </div>
          <el-menu
            background-color="#333744"
            text-color="#fff"
            active-text-color="#409eff  "
            :collapse="isCollapse"
            :collapse-transition="false"
            :router="true"
            default-active="/users"
          >
            <el-submenu index="1">
              <template slot="title">
                <i class="el-icon-menu"></i>
                <span>用户管理</span>
              </template>
              <el-menu-item-group>
                <el-menu-item index="/users">
                   <i class="el-icon-location"></i>
                   <span>用户列表</span>
                </el-menu-item>
                <el-menu-item index="1-2">
                  <i class="el-icon-location"></i>
                  <span>选项二</span>
                </el-menu-item>
              </el-menu-item-group>
            </el-submenu>
            <el-submenu index="1">
              <template slot="title">
                <i class="el-icon-menu"></i>
                <span>博客管理</span>
              </template>
              <el-menu-item-group>
                <el-menu-item index="/blog">
                   <i class="el-icon-location"></i>
                   <span>博客查看</span>
                </el-menu-item>
                <el-menu-item index="/uploadBlog">
                  <i class="el-icon-location"></i>
                  <span>博客上传</span>
                </el-menu-item>
              </el-menu-item-group>
            </el-submenu>
          </el-menu>
        </el-aside>
        <el-container>
          <el-main>
            <router-view>
            </router-view>
          </el-main>
          <!-- <el-footer>Footer</el-footer> -->
        </el-container>
      </el-container>
    </el-container>
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'

export default {
  data () {
    return {
      isCollapse: false,
      defaultActive: ''
    }
  },
  methods: {
    logout () {
      window.sessionStorage.clear()
      this.$router.push('/login')
    },
    toggleCollapse () {
      console.log(this.isCollapse)
      this.isCollapse = !this.isCollapse
    }
  }
}
</script>
<style lang="less" scoped>
.el-header {
  background-color: #373d41;
  display: flex;
  justify-content: space-between;
  padding-left: 20px;
  align-items: center;
  color: #fff;
  div {
    display: flex;
    align-items: center;
    margin-right: 15px;
  }
  img {
    height: 30px;
  }
}
.el-aside {
  background-color: #333744;
  .el-menu{
    border-right: none;
  }
}
.el-main {
  background-color: #eaedf1;
}
.el-footer {
  background-color: #feedf1;
}
.home {
  height: 100%;
}
.home_container {
  height: 100%;
}
.toggle-button{
      background-color: #4A5064;
      font-size: 10px;
      line-height: 24px;
      color: #fff;
      text-align: center;
      letter-spacing: 0.2em;
      cursor: pointer;
    }
</style>
