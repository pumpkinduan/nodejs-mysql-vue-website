module.exports = {
    plugins: {
      'postcss-pxtorem': {
        rootValue: 10,
        propList: ["*", "!font-size"]
        // 对font-size不转化为rem
      }
    }
  }