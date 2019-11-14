import {axiosInstance, instance} from '@/axios'

export default {
    getHitokoto() {
        // return axiosInstance.get('/api/quotation/exact');
        //使用第三方一言公开的api
        return instance.get('https://v1.hitokoto.cn/?c=d')
    },
    getArticleList(params) {
        return axiosInstance.get('/api/article/', {
            params: {
                page: params
            }
        });
    },
    getBlogList(params) {
        return axiosInstance.get('/api/article/blog', {
            params: {
                page: params
            }
        });
    },
    getArticleDetail(id) {
        return axiosInstance.get('/api/article/detail/' + id);
    },
    getAboutMe() {
        return axiosInstance.get('/api/me/exact');
    },
    getQuotationList(params) {
        return instance.get('/api/quotation/list', { params });
    },
    getArticleComments(article_id, page) {
        return axiosInstance.get('/api/comment/all', {
            params: {
                article_id,
                page
            }
        });
    },
    createComment(data) {
        return axiosInstance.post('/api/comment/create', data);
    },
    deleteComment(id) {
        return axiosInstance.delete("/api/comment/delete/" + id);
    },
    updateBrowse(id, data) {
        return instance.put("/api/browse/update/" + id, data);
    },
    publishQuotation(data) {
        return instance.post("/api/quotation/create", data);
    },
}