module.exports = {
    chainWebpack: config => {
        // production
        config.when(process.env.NODE_ENV === 'production', config => {
            console.log("生产环境")
            config.entry('app').clear().add('./src/main-prod.js')
            config.set('externals', {
                vue: 'Vue',
                'vue-router': 'VueRouter',
                axios: 'axios',
                nprogress: 'NProgress',
                'showdown': 'showdown'
            })
            config.plugin('html').tap(args => {
              args[0].isProd = false
              return args
            })
        })
        // development
        config.when(process.env.NODE_ENV === 'development', config => {
            console.log("开发环境")
            config.entry('app').clear().add('./src/main-dev.js')
        })
        config.plugin('html').tap(args => {
            // 这个地方有bug
            args[0].isProd = false
            return args
          })
    }
}