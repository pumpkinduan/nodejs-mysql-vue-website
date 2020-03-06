const isProduction = process.env.NODE_ENV === 'production';
const CompressionWebpackPlugin = require('compression-webpack-plugin');
module.exports = {
    productionSourceMap: false,
    configureWebpack: config => {
        if (!isProduction) return;
        config.plugins.push(
            new CompressionWebpackPlugin({
                filename: '[path].gz[query]', //目标文件名
                algorithm: 'gzip', //开启gzip压缩
                test: new RegExp('\\.(html|js|css)$'), //压缩js,html和css
                threshold: 10240, //资源文件大于10kb时会被压缩
                minRatio: 0.8 //最小压缩比达到0.8时才会被压缩
            })
        )
    },

    chainWebpack: config => {
        // 生产模式
        config.when(isProduction, config => {
            // 采用CND加载下面用到的资源
            config.set('externals', {
                vue: 'Vue',
                'vue-router': 'VueRouter',
                axios: 'axios',
                nprogress: 'NProgress'
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

        //压缩图片
        config.module
            .rule('images')
            .use('image-webpack-loader')
            .loader('image-webpack-loader')
            .options({
                bypassOnDebug: true
            })
    }
}