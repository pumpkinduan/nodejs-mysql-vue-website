const requireDirectory = require('require-directory');
const { Router } = require('express')
class initEntrance {//初始化入口，将一些代码从主程序文件中尽可能抽离出来
    constructor(app) {
        this.app = app;
        this.initCore();
    }
    initCore() {
        this.initRouters();
        this.initHttpException();
    }
    initRouters() {
        const routes = requireDirectory( module,`${process.cwd()}/router`);
        for ( var path in routes ) {
            //加载路由
            this.app.use(`/api/${path}`,routes[path]);
        }
    }
    initHttpException() {
        //将错误对象添加至全局的global，以便直接调用
        const errors = require('./httpException');
        global.errs = errors;
    }
}
module.exports = initEntrance;
