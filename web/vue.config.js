module.exports = {
    publicPath: '/',
    devServer: {
        open: true,//server启动后自动打开浏览器
        host: 'localhost',
        https: false,
        hotOnly: false,
        disableHostCheck: true //允许外网访问本机
    }
}