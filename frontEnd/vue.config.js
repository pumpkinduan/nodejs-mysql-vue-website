module.exports = {
    productionSourceMap: false,
    chainWebpack: (config) => {
        const imagesRule = config.module.rule("images");
        imagesRule
            .use('url-loader')
            .loader('url-loader')
            .tap(options => Object.assign(options, { limit: 8192 }))
    }
}