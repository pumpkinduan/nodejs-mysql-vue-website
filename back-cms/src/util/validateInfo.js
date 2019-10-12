export default {
    validateUser(user) {//登录信息验证
        const rule = /[^\d][\w]/ig;
        const length = user && user.length;
        if ( rule.test(user) && ( length >= 3 && length < 9 )) {//pumpkin
            return true;
        }
    },
    validatePwd(pwd) {
        const length = pwd && pwd.length;
        if ( length >= 3 && length <= 18 ) {
            return true;
        }
    }
}
