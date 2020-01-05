import {axiosInstance} from '@/axios'
export default {
    publishArticle(data) {
        return axiosInstance.post("/api/article/create", data);
    },
    updateArticle(data, id) {
        return axiosInstance.put("/api/article/update/" + id, data);
    },
    getArticleLists(params) {
        return axiosInstance.get("/api/article/lists", {params});
    },
    getArticleDetail(id) {
        return axiosInstance.get('/api/article/detail/' + id);
    },
    deleteArticle(id) {
        return axiosInstance.delete("/api/article/delete/" + id);
    },
    getTimeline() {
        return axiosInstance.get('/api/article/timeline');
    }
}