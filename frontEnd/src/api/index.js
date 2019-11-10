import axios from 'axios';
import obj from '@/axios'

export default {
    getHitokoto() {
        // return axios.get('/api/quotation/exact');
        //使用第三方一言公开的api
        return axios.get('https://v1.hitokoto.cn/?c=d')
    },
    getArticleList(params) {
        return axios.get('/api/article/list', {
            params: {
                page: params
            }
        });
    },
    getArticleDetail(id) {
        return axios.get('/api/article/detail/' + id);
    },
    getAboutMe() {
        return axios.get('/api/me/exact');
    },
    getQuotationList(params) {
        return axios.get('/api/quotation/list', { params });
    },
    getArticleComments(article_id, page) {
        return axios.get('/api/comment/all', {
            params: {
                article_id,
                page
            }
        });
    },
    createComment(data) {
        return axios.post('/api/comment/create', data);
    },
    deleteComment(id) {
        return axios.delete("/api/comment/delete/" + id);
    },
    updateBrowse(id, data) {
        return obj.instance.put("/api/browse/update/" + id, data);
    }
}