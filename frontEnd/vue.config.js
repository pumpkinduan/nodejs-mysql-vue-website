module.exports = {
    publicPath: './',
    devServer: {
        open: true,//server启动后自动打开浏览器
        host: 'localhost',
        https: false,
        hotOnly: false,
        //后台接口地址: 'http://localhost:8021'
        proxy: {//配置跨域
            '/api': {
                target: 'http://localhost:8021', 
                ws: true,
                changeOrigin: true,
                pathRewrite: {
                    '^/api': ''
                }
            }
        }
    }
}