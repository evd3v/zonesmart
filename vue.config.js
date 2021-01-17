module.exports = {
    devServer: {
        port: process.env.VUE_APP_PORT || 8080,
        https: Boolean(process.env.VUE_APP_HTTPS)
    },
    chainWebpack: (config) => {
        const svgRule = config.module.rule('svg')
        svgRule.uses.clear()
        svgRule
            .oneOf('inline')
            .resourceQuery(/inline/)
            .use('babel-loader')
            .loader('babel-loader')
            .end()
            .use('vue-svg-loader')
            .loader('vue-svg-loader')
            .end()
            .end()
            .oneOf('external')
            .use('file-loader')
            .loader('file-loader')
            .options({
                name: 'assets/[name].[hash:8].[ext]',
                svgo: {
                    plugins: [
                        { removeDimensions: true },
                        { removeViewBox: false }
                    ]
                }
            })
    }
}
