const isProduction = process.env.NODE_ENV === 'production';
module.exports = {
    productionSourceMap: false,
    chainWebpack: config => {
        // 生产模式
        config.when(isProduction, config => {
            // 采用CND加载下面用到的资源
            config.set('externals', {
                vue: 'Vue',
                'vue-router': 'VueRouter',
                axios: 'axios',
                vuex: 'Vuex',
                ElementUI: 'element-ui'
            })
            config.plugin('html').tap(args => {
                args[0].isProd = true;
                return args;
            })           
        })

        //开发模式
        config.when(!isProduction, config => {
            config.plugin('html').tap(args => {
                args[0].isProd = false;
                return args;
            })
        })
    }
}