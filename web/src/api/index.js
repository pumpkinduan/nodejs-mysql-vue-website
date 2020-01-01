import {axiosInstance} from '@/axios'

export default {
    getHitokoto() {
        // return axiosInstance.get('/api/quotation/exact');
        //使用第三方一言公开的api
        return axiosInstance.get('https://v1.hitokoto.cn/?c=d')
    },
    getArticleList(params) {
        return axiosInstance.get('/api/article/lists', {
            params: {
                page: params
            }
        });
    },
    getArchives() {
        return axiosInstance.get('/api/article/archives');
    },
    getArticleDetail(id) {
        return axiosInstance.get('/api/article/detail/' + id);
    },
    getAboutMe() {
        return axiosInstance.get('/api/me/exact');
    },
    getArticleComments(article_id, page) {
        return axiosInstance.get('/api/comment/list', {
            params: {
                article_id,
                page
            }
        });
    },
    createComment(data) {
        return axiosInstance.post('/api/comment/create', data);
    },
    updateBrowse(id, data) {
        return axiosInstance.put("/api/browse/update/" + id, data);
    },
    publishQuotation(data) {
        return axiosInstance.post("/api/quotation/create", data);
    },
    createReply(data) {
        return axiosInstance.post("/api/reply/create", data);
    },
    getAllImgs(page) {
        return axiosInstance.get("/api/upload/getAllImgs", {
            params: {
                page
            }
        });
    },
}