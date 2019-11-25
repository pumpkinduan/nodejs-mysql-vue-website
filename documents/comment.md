## 留言接口
### 接口前缀
	http://localhost:8088/api
--------------
### 创建一条留言
	POST   /comment/create
### 请求参数
| 参数 | 类型 | 说明 | 是否必填 |
| :----: | :----: | :----: |:----:|
| content | 字符串 | 留言内容 | 是 |
| name | 字符串 | 留言人的昵称 | 是 |
| email| 字符串 | 留言人的邮箱 | 否 |
| article_id | 整数 | 留言所属的文章id | 是 |

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
### 删除单条留言
	DELETE  /comment/delete/:id
### 请求参数
| 参数 | 类型 | 说明 | 是否必填 |
| :----: | :----: | :----: |:----:|
| :id | 整数 | 留言id | 是 |


### 成功返回
	{
      "msg": "删除成功",
      "success": true
	}	
### 失败返回
	{
      "msg": "数据为空",
      "errCode": 40000,
      "code": 400,
      "success": false
	}

--------------
### 获取所有留言
	GET   /comment/all
### 请求参数
| 参数 | 类型 | 说明 | 是否必填 |
| :----: | :----: | :----: |:----:|
| page | 整数 | 页码 | 否，默认为第一页 |

### 成功返回
	{
	    "data": [
	        {
	            "created_at": "2019-11-18 15:45",
	            "id": 37,
	            "content": null,
	            "name": "qqq",
	            "email": null,
	            "article_id": 5793281,
	            "updated_at": "2019-11-18T07:45:26.000Z"
	        },
	        {
	            "created_at": "2019-11-18 15:51",
	            "id": 38,
	            "content": null,
	            "name": "fdx",
	            "email": null,
	            "article_id": 5793281,
	            "updated_at": "2019-11-18T07:51:07.000Z"
	        },
	        {
	            "created_at": "2019-11-18 16:08",
	            "id": 39,
	            "content": null,
	            "name": "wa",
	            "email": null,
	            "article_id": 5793281,
	            "updated_at": "2019-11-18T08:08:11.000Z"
	        },
	        {
	            "created_at": "2019-11-18 16:24",
	            "id": 40,
	            "content": null,
	            "name": "娃儿也",
	            "email": null,
	            "article_id": 5793281,
	            "updated_at": "2019-11-18T08:24:39.000Z"
	        },
	        {
	            "created_at": "2019-11-18 16:24",
	            "id": 41,
	            "content": null,
	            "name": "埃尔压抑",
	            "email": null,
	            "article_id": 5793281,
	            "updated_at": "2019-11-18T08:24:42.000Z"
	        }
	    ],
	    "meta": {
	        "count": 20,
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
-------------
### 获取对应文章下的所有留言
	GET   /comment/list
### 请求参数
| 参数 | 类型 | 说明 | 是否必填 |
| :----: | :----: | :----: |:----:|
| page | 整数 | 页码 | 否，默认为第一页 |
| article_id | 整数 | 文章ID | 是 |

### 成功返回
	{
	    "data": [
	        {
	            "created_at": "2019-11-25 10:42",
	            "id": 57,
	            "content": null,
	            "name": "ssg",
	            "article_id": 58863249,
	            "replies": []
	        }
	    ],
	    "meta": {
	        "totalComments": 1,
	        "totalReplies": 0,
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
