import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element.js'
import './assets/css/global.css'
import axios from 'axios'
// import './assets/js/math.js'
import VueMathjax from 'vue-mathjax'
import showdown from 'showdown'
// import VueHighlightJS from 'vue-highlightjs'
// import 'highlight.js/styles/atom-one-dark.css'
import NProgress from 'nprogress'
// import 'nprogress/nprogress.css' 放到cdn中了
// import showdownTable from 'showdown-table'
// import globalVariable from './assets/js/globalVariable.js'

// Vue.prototype.commonsVariable = globalVariable
// Vue.use(VueHighlightJS)
Vue.use(VueMathjax)
Vue.prototype.$mathjax = VueMathjax
var converter = new showdown.Converter()
converter.setOption('tables', true)
converter.setOption('simpleLineBreaks', true)
converter.setOption('requireSpaceBeforeHeadingText', false)
Vue.prototype.$converter = converter

// converter.setFlavor('github')ter

axios.defaults.baseURL = 'http://127.0.0.1:8090/'
// 拦截器
axios.interceptors.request.use(config => {
  // config.headers.Access-Control-Allow-Origin=
  NProgress.start()
  config.headers.token = window.sessionStorage.getItem('token')
  console.log(config.headers.token)
  return config
})
axios.interceptors.response.use(config => {
  NProgress.done()
  return config
})
Vue.prototype.$http = axios

Vue.config.productionTip = false
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
