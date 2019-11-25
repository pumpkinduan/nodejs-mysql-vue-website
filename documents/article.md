# 接口前缀
	http://localhost:8088/api
## 文章接口
--------------
### 创建文章
	POST   /article/create
### 请求参数
| 参数 | 类型 | 说明 | 是否必填 |
| :----: | :----: | :----: |:----:|
| type | 整数 | 0或1，0表示普通文章，1表示博客文章 | 否，默认为0 |
| title | 字符串 | 标题 | 是 |
| author | 字符串 | 作者 | 是 |
| tag | 字符串 | 标签 | 是 |
| description | 字符串 | 描述 | 是 |
| content | 字符串 | 内容 | 是 |
| cover | 字符串 | 封面 | 是 |

### 成功返回
	{
      "msg": "添加成功",
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
### 获取文章列表
	GET   /article/list
### 请求参数
| 参数 | 类型 | 说明 | 是否必填 |
| :----: | :----: | :----: |:----:|
| page | 整数 | 页码 | 否，默认为第一页 |

### 成功返回
	{
	    "data": [
	        {
	            "created_at": "2019-11-14",
	            "type": 0,
	            "title": "qqq",
	            "author": null,
	            "tag": "qqq",
	            "cover": "pictures/2019-11-19/1574153153894_bd_logo1.png",
	            "description": "qqqq",
	            "browse": 9,
	            "total_char": 5,
	            "article_id": 99970366
	        },
	        {
	            "created_at": "2019-11-13",
	            "type": 0,
	            "title": "sgaga",
	            "author": null,
	            "tag": "fwagw",
	            "cover": "pictures/2019-11-19/1574165764461_ad.jpg",
	            "description": "sagae",
	            "browse": 16,
	            "total_char": 24,
	            "article_id": 56537094
	        },
	        {
	            "created_at": "2019-11-13",
	            "type": 0,
	            "title": "wsegweaga",
	            "author": null,
	            "tag": "sgeawgweag",
	            "cover": "pictures/2019-11-19/1574165777365_lk_logo_big.png",
	            "description": "ewageahgae",
	            "browse": 4,
	            "total_char": 12,
	            "article_id": 54065405
	        },
	        {
	            "created_at": "2019-11-13",
	            "type": 1,
	            "title": "sgaw",
	            "author": null,
	            "tag": "asfasG",
	            "cover": "pictures/2019-11-20/1574237528016_slide_03_2000x410.jpg",
	            "description": "swgawegh",
	            "browse": 7,
	            "total_char": 12,
	            "article_id": 54042754
	        },
	        {
	            "created_at": "2019-11-13",
	            "type": 1,
	            "title": "awega",
	            "author": null,
	            "tag": "wag",
	            "cover": "pictures/2019-11-20/1574237538272_i_r6_c6.png",
	            "description": "watawtyatya",
	            "browse": 3,
	            "total_char": 9,
	            "article_id": 44344880
	        }
	    ],
	    "meta": {
	        "count": 21,
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
--------------
### 获取单篇文章详情
	GET   /article/detail/:id
### 请求参数
| 参数 | 类型 | 说明 | 是否必填 |
| ---- | ---- | --- |----|
| :id | 整数 | 文章id | 是 |

### 成功返回
	{
	    "data": {
	        "created_at": "2019-10-19",
	        "updated_at": "2019-10-19",
	        "id": 1,
	        "title": "2h",
	        "author": "pum",
	        "tag": "r2",
	        "content": "<p>2222我f</p>",
	        "cover": "sfss",
	        "browse": 588,
	        "total_char": 52,
	        "article_id": 1
	    },
	    "success": true
	}	
### 失败返回
	{
	    "msg": "数据为空",
	    "errCode": 40004,
	    "code": 404,
	    "success": false
	}
--------------
### 删除单篇文章
	DELETE  /article/delete/:id
### 请求参数
| 参数 | 类型 | 说明 | 是否必填 |
| :----: | :----: | :----: |:----:|
| :id | 整数 | 文章id | 是 |


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
### 更新单篇文章
	PUT  /article/update/:id
### 请求参数
| 参数 | 类型 | 说明 | 是否必填 |
| :----: | :----: | :----: |:----:|
| :id | 整数 | 文章id | 是 |

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

## 博客文章接口
--------------
### 博客文章列表
	GET   /article/blog
### 请求参数
| 参数 | 类型 | 说明 | 是否必填 |
| :----: | :----: | :----: |:----:|
| page | 整数 | 页码 | 否，默认为第一页 |

### 成功返回
	{
	    "data": [
	        {
	            "created_at": "2019-11-14",
	            "type": 0,
	            "title": "qqq",
	            "author": null,
	            "tag": "qqq",
	            "cover": "pictures/2019-11-19/1574153153894_bd_logo1.png",
	            "description": "qqqq",
	            "browse": 9,
	            "total_char": 5,
	            "article_id": 99970366
	        },
	        {
	            "created_at": "2019-11-13",
	            "type": 0,
	            "title": "sgaga",
	            "author": null,
	            "tag": "fwagw",
	            "cover": "pictures/2019-11-19/1574165764461_ad.jpg",
	            "description": "sagae",
	            "browse": 16,
	            "total_char": 24,
	            "article_id": 56537094
	        },
	        {
	            "created_at": "2019-11-13",
	            "type": 0,
	            "title": "wsegweaga",
	            "author": null,
	            "tag": "sgeawgweag",
	            "cover": "pictures/2019-11-19/1574165777365_lk_logo_big.png",
	            "description": "ewageahgae",
	            "browse": 4,
	            "total_char": 12,
	            "article_id": 54065405
	        },
	        {
	            "created_at": "2019-11-13",
	            "type": 1,
	            "title": "sgaw",
	            "author": null,
	            "tag": "asfasG",
	            "cover": "pictures/2019-11-20/1574237528016_slide_03_2000x410.jpg",
	            "description": "swgawegh",
	            "browse": 7,
	            "total_char": 12,
	            "article_id": 54042754
	        },
	        {
	            "created_at": "2019-11-13",
	            "type": 1,
	            "title": "awega",
	            "author": null,
	            "tag": "wag",
	            "cover": "pictures/2019-11-20/1574237538272_i_r6_c6.png",
	            "description": "watawtyatya",
	            "browse": 3,
	            "total_char": 9,
	            "article_id": 44344880
	        }
	    ],
	    "meta": {
	        "count": 21,
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