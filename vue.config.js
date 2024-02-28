const webpack = require('webpack')
    // const ThreeExamples = require('import-three-examples')
module.exports = {
    chainWebpack: (config) => {
        //引入ProvidePlugin
        config.plugin('provide').use(webpack.ProvidePlugin, [{
            $: 'jquery',
            jquery: 'jquery',
            jQuery: 'jquery',
            'window.jQuery': 'jquery',
        }, ])
    },
    /* module: {
        rules: [{
                test: /\.js$/,
                loader: 'babel-loader'
            },
            ...ThreeExamples
        ]
    }, */
    lintOnSave: false,
    devServer: {
        // 自动打开浏览器
        headers: {
            'Access-Control-Allow-Origin': '*',
        },
        open: true,
        port: 8080,
        proxy: {
            '/api': {
                target: `http://localhost:88/`,
                changeOrigin: true, //开启代理
                pathRewrite: {
                    '^/api': '',
                },
            },
        },
    },
    productionSourceMap: false,
}