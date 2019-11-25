# 接口前缀
	http://localhost:8088/api
### 回复接口
--------------
### 创建一条回复
	POST   /replyt/create
### 请求参数
| 参数 | 类型 | 说明 | 是否必填 |
| :----: | :----: | :----: |:----:|
| content | 字符串 | 回复内容 | 是 |
| name | 字符串 | 回复人的昵称 | 是 |
| email| 字符串 | 回复人的邮箱 | 否 |
| comment_id | 整数 | 回复所属的留言id | 是 |


### 成功返回
	{
      "msg": "创建成功",
      "success": true
	}	
### 失败返回
	{
      "msg": "请求参数错误",
      "errCode": 40000,
      "code": 400,
      "success": false
	}
--------------
### 获取所有回复
	GET   /reply/all
### 请求参数
| 参数 | 类型 | 说明 | 是否必填 |
| :----: | :----: | :----: |:----:|
| page | 整数 | 页码 | 否，默认为第一页 |

### 成功返回
	{
	    "data": [
	        {
	            "created_at": "2019-11-18 15:45",
	            "id": 46,
	            "content": "qr",
	            "name": "qqr",
	            "email": null,
	            "updated_at": "2019-11-18T07:45:32.000Z",
	            "commentId": 37,
	            "comment_id": 37
	        },
	        {
	            "created_at": "2019-11-18 15:45",
	            "id": 47,
	            "content": "qrqr",
	            "name": "qrq",
	            "email": null,
	            "updated_at": "2019-11-18T07:45:36.000Z",
	            "commentId": 37,
	            "comment_id": 37
	        },
	        {
	            "created_at": "2019-11-18 15:51",
	            "id": 48,
	            "content": "sf",
	            "name": "sf",
	            "email": null,
	            "updated_at": "2019-11-18T07:51:14.000Z",
	            "commentId": 37,
	            "comment_id": 37
	        },
	        {
	            "created_at": "2019-11-18 16:07",
	            "id": 49,
	            "content": "afG",
	            "name": "AF",
	            "email": null,
	            "updated_at": "2019-11-18T08:07:29.000Z",
	            "commentId": 37,
	            "comment_id": 37
	        },
	        {
	            "created_at": "2019-11-18 16:07",
	            "id": 50,
	            "content": "wea",
	            "name": "ay",
	            "email": null,
	            "updated_at": "2019-11-18T08:07:49.000Z",
	            "commentId": 38,
	            "comment_id": 38
	        }
	    ],
	    "meta": {
	        "count": 14,
	        "pageSize": 5,
	        "success": true
	    }
	}


### 失败返回
	{
      "msg": "数据为空",
      "errCode": 40004,
      "code": 404,
      "success": false
	}