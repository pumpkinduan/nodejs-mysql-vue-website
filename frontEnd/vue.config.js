module.exports = {
    publicPath: './',
    devServer: {
        open: true,//server启动后自动打开浏览器
        host: 'localhost',
        port: 8081,
        https: false,
        hotOnly: false,
        proxy: {//配置跨域
            '/api': {
                target: 'http://localhost:8021', 
                ws: true,
                changeOrigin: true,
                pathWrite: {//路径改写
                    '^/api': '/api'  
                }
            }
        }
    }
}