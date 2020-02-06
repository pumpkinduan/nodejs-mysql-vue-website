const jwt = require('jsonwebtoken');
function generateToken(u_id, u_account) { //生成token
    return jwt.sign({
        id: u_id,
        account: u_account
    }, 'secret', { expiresIn: '14 days' });
}
module.exports = {
    generateToken
}