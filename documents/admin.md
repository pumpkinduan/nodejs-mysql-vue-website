## 管理员接口

## 接口前缀 
	http:localhost:8088/api

### 登录接口地址
	/user/login
### 参数列表
|参数|类型|是否必填|
|:----|:----|:----|
|account|字符串|是|
|password|字符串|是|

### 成功返回
	{
	    "msg": "登录成功",
	    "success": true,
	    "token": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiYWNjb3VudCI6ImFkbWluIiwiaWF0IjoxNTc0NjUzMjU4LCJleHAiOjE1NzU1MTcyNTh9.Z4UnFuVKrpLHC9gbaxjAgmeDlaijcfw6Tm1wfvr4Kuw"
	}
### 失败返回1
	{
	    "msg": "账号不存在，请先注册",
	    "errCode": 40000
	    "code": 400,
	    "success": false
	}
### 失败返回2
	{
	    "msg": "密码或账号错误，请重新输入",
	    "errCode": 40000,
	    "code": 400,
	    "success": false
	}

------------------

### 注册接口地址
	/user/register
### 若要部署上线，则不要暴露该接口
### 参数列表
|参数|类型|是否必填|
|----|----|----|
|account|字符串|是|
|password|字符串|是|

### 成功返回
	{
      "msg": "注册成功",
      "success": true
	}

### 失败返回1
	{
      "msg": "账号已存在，请重新注册",
      "errCode": 40012,
      "code": 412,
      "success": false
	}
### 失败返回2
	{
	    "msg": "服务器异常",
	    "errCode": 50000,
	    "code": 500,
	    "success": false
	}
---------
### 管理员验证接口地址
	/user/auth
### 参数列表
  null

### 特别说明
验证前必须在http header中将token发送给后台
具体实现如下代码所示：
	function _encode() {
	    const token = localStorage.getItem("token")
	    return token
	}
	axios({
	  url: 'http://localhost:8088/api/user/auth',
	  method: 'GET',
	  success: res => {
	    console.log(res.data)
	  },
	  header: {
	    Authorization: _encode()
	  }
	})
	
### 成功返回
	{
	    "msg": "success",
	    "errorCode": 0,
	    "data": {
	        "account": "admin",
	        "id": 2
	    }
	}
### 失败返回
	Unauthorized