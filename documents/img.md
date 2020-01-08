# 接口前缀
 http://localhost:8088/api
## 图片接口
--------------
### 获取图片
	GET   /upload/imgs
### 请求参数
| 参数 | 类型 | 说明 | 是否必填 |
| :----: | :----: | :----: |:----:|
| type | 整数0或1 | 图片类型 | 否，默认为 1 |
| page | 整数 | 页码 | 否，默认为第一页 |

	type为1，获取的是相册墙的图片（展示图片）
	type为0，获取的是文章内容里的图片

    ### 成功返回
	{
	    "msg": "获取成功",
	    "success": true,
	    "imgs": {
	        "count": 24,
	        "rows": [
	            {
	                "path": "pictures/2020-1-1/510042_3.jpg",
	                "originalname": "3.jpg"
	            },
	            {
	                "path": "pictures/2020-1-1/092277_1.jpg",
	                "originalname": "1.jpg"
	            },
	            {
	                "path": "pictures/2020-1-1/713355_2.jpg",
	                "originalname": "2.jpg"
	            },
	            {
	                "path": "pictures/2020-1-1/719077_4.jpg",
	                "originalname": "4.jpg"
	            },
	            {
	                "path": "pictures/2020-1-1/094156_7.jpg",
	                "originalname": "7.jpg"
	            },
	            {
	                "path": "pictures/2020-1-1/099662_6.jpg",
	                "originalname": "6.jpg"
	            }
	        ]
	    }
	}
### 失败返回
	{
	    "msg": "数据为空",
	    "errCode": 40004,
	    "code": 404,
	    "success": false
	}

## 删除图片接口
--------------
### 删除图片
	GET   /upload/delete
### 请求参数
| 参数 | 类型 | 说明 | 是否必填 |
| :----: | :----: | :----: |:----:|
| path | 字符串 | 图片地址 | 是 |

	在请求该接口时，参数path代表的路径中的/必须转换为\
	例如:在前端中的图片路径为pitures/2019-12-31/297017_2.jpg
	转为：path=pictures\2019-12-31\297017_2.jpg

### 成功返回
	{
      "msg": "删除成功",
      "success": true
	}
### 失败返回
	{
	    "msg": "数据为空",
	    "errCode": 40004,
	    "code": 404,
	    "success": false
	}

## 上传图片接口
--------------
### 上传图片
	POST   /upload
### 请求参数
| 参数 | 类型 | 说明 | 是否必填 |
| :----: | :----: | :----: |:----:|
| type | 整数 | 0或1，0表示相册墙图片，1表示文章内的图片 | 否，默认为0 |
| picture | file或blob类型 | 文件二进制数据 | 是 |

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