module.exports = {
  css: {
    extract: false
  },

  publicPath: './', // 基本路径
  outputDir: 'dist', // 输出文件目录
  assetsDir: "static", //放置生成的静态文件目录（js css img）
  productionSourceMap: false, // 生产环境是否生成 sourceMap 文件
  devServer: {
    port: 3000,
    proxy: {//解决跨域问题
      '/api': {
        // 此处的写法，目的是为了 将 /api 替换成 https://netease-cloud-music-api-three-lyart.vercel.app/
        target: 'https://autumnfish.cn/',
        // 允许跨域
        changeOrigin: true,
        ws: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  }
}
