import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../components/login/login.vue'
import Home from '../views/Home.vue'
import Welcome from '../components/Welcome.vue'
import Users from '../components/user/Users.vue'
import UploadBlog from '../views/UploadBlog.vue'
import Content from '../views/Content.vue'
import Index from '../views/Blog.vue'
import BlogHeader from '../components/layout/BlogHeader.vue'
import IndexPage from '../views/Index.vue'

Vue.use(VueRouter)
const routes = [
  { path: '/login', component: Login },
  {
    path: '/home',
    component: Home,
    children: [
      { path: '/welcome', component: Welcome },
      { path: '/users', component: Users },
      { path: '/uploadBlog', component: UploadBlog }
    ],
    redirect: '/welcome'
  },
  { path: '/', redirect: '/blog' },
  { path: '/uploadBlog', component: UploadBlog },
  { path: '/content', component: Content },
  {
    path: '/index',
    component: Index,
    children: []
  },
  { path: '/header', component: BlogHeader },
  { path: '/blog', component: IndexPage },
  {
    path: '/content',
    name: 'Content',
    component: Content
  },
  {
    path: '/content/:aid',
    component: Content
  }
]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  console.log(to.path)
  if (to.path === '/blog') {
    next()
  } else {
    if (to.path.indexOf('content/') !== -1) {
      next()
    } else {
      if (to.path !== '/login') {
        if (window.sessionStorage.getItem('token')) { // 判断是否登录
          next()
        } else { // 没登录则跳转到登录界面
          next({
            path: '/login'
          })
        }
      } else {
        next()
      }
    }
  }
})
export default router