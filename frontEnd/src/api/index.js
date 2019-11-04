import axios from 'axios';
export default {
    getLatestQuotation() {
        return axios.get('/api/quotation/exact');
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
    getCommentList(params) {
        return axios.get('/api/comment/list', {
            params: {
                page: params
            }
        });
    },
    sendComment(data) {
        return axios.post('/api/comment/create', data);
    },
    deleteComment(id) {
        return axios.delete("/api/comment/delete/" + id);
    }
}