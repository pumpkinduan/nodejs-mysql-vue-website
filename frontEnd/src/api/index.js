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
    }
}