// 项目发布阶段用到的插件
const prodPlugins = [];
if (process.env.NODE_ENV === 'production') {
  prodPlugins.push('transform-remove-console');
} 
module.exports = {
  presets: [
    ["@vue/app", {
      "modules": false
    }]
  ],
  plugins: [
    ...prodPlugins,
    //路由的懒加载所依赖的babel插件
    "@babel/plugin-syntax-dynamic-import"
  ]
}