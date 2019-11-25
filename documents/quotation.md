## 每日一句接口
## PS 以下为自己设计的接口，方便自己写内容，而本项目采用了第三方的接口，增加灵活性
### 第三方的一言接口
	 GET https://v1.hitokoto.cn/?c=d

-------------------------
### 接口前缀
	http://localhost:8088/api
--------------
### 创建一条
	POST   /quotation/create
### 请求参数
| 参数 | 类型 | 说明 | 是否必填 |
| :----: | :----: | :----: |:----:|
| content | 字符串 | 内容 | 是 |
| author | 字符串 | 作者 | 是 |

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
### 删除单条每日一句
	DELETE  /quotation/delete/:id
### 请求参数
| 参数 | 类型 | 说明 | 是否必填 |
| :----: | :----: | :----: |:----:|
| :id | 整数 | 每日一句id | 是 |


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
### 更新单条每日一句
	PUT  /quotation/put/:id
### 请求参数
| 参数 | 类型 | 说明 | 是否必填 |
| :----: | :----: | :----: |:----:|
| :id | 整数 | 每日一句id | 是 |


### 成功返回
	{
      "msg": "更新成功",
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
### 获取每日一句
	GET   /quotation/list
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
	            "content": 'seaeyeyy',
	            "author": "qqq",
	            "updated_at": "2019-11-18T07:45:26.000Z"
	        }
	    ],
	    "meta": {
	        "count": 1
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
### 获取最近添加的一条
	GET   /quotation/exact
### 请求参数
| 参数 | 类型 | 说明 | 是否必填 |
| :----: | :----: | :----: |:----:|
| page | 整数 | 页码 | 否，默认为第一页 |
| article_id | 整数 | 文章ID | 是 |

### 成功返回
	{
	          "created_at": "2019-11-18 15:45",
	          "id": 37,
	          "content": 'seaeyeyy',
	          "author": "qqq",
	          "updated_at": "2019-11-18T07:45:26.000Z"
	}
	    
### 失败返回
	{
      "msg": "数据为空",
      "errCode": 40004,
      "code": 404,
      "success": false
	}
