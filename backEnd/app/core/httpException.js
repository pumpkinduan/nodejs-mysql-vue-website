// Error.prototype.message － 错误信息
// Error.prototype.name － 错误名
class HttpException extends Error {
    constructor(msg='服务器异常', errCode=50000, code=500) {
        super();
        this.msg = msg;
        this.errCode = errCode;
        this.code = code;
        this.success = false;
    }
}
class ParaException extends HttpException {
    constructor(msg, code) {
        super();
        this.msg = msg || '请求参数错误';
        this.code = code || 400;
        this.errCode = 40000;
        this.success = false;
    }
}
class NotFound extends HttpException {
    constructor(msg, code) {
        super();
        this.msg = msg || '请求资源未找到';
        this.code = code || 404;
        this.errCode = 40004;
        this.success = false;
    }
}
class AuthFailed extends HttpException {
    constructor(msg, code) {
        super();
        this.msg = msg || '未授权';
        this.code = code || 401;
        this.errCode = 40001;
        this.success = false;
    }
}
class Existed extends HttpException {
    constructor(msg, code) {
        super();
        this.msg = msg || '资源已存在';
        this.code = code || 412;
        this.errCode = 40012;
        this.success = false;
    }
}
class Forbbiten extends HttpException {
    constructor(msg, code) {
        super();
        this.msg = msg || '拒绝访问';
        this.code = code || 403;
        this.errCode = 40003;
        this.success = false;
    }
}
module.exports = {
    HttpException,
    ParaException,
    Forbbiten,
    Existed,
    AuthFailed,
    NotFound
};