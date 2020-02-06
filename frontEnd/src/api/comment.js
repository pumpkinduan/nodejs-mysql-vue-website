import { axiosInstance } from '@/axios'
export default {
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
    }
}