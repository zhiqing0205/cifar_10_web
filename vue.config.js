
module.exports = {
  lintOnSave: false,
    devServer: {
        open: true,
        port: 8080,
        proxy: {
            '/api': {
                target: 'http://127.0.0.1:8000',
                changeOrigin: true,
                ws: false,
                pathRewrite: {
                    '^/api': ''
                }
            }
        }
    },
}