import {axiosInstance} from '@/axios'
export default {
    publishArticle(data) {
        return axiosInstance.post("/api/article/create", data);
    },
    updateArticle(data, id) {
        return axiosInstance.put("/api/article/update/" + id, data);
    },
    getAllLists(params) {
        return axiosInstance.get("/api/article/list", {params});
    },
    getArticleDetail(id) {
        return axiosInstance.get('/api/article/detail/' + id);
    },
    deleteArticle(id) {
        return axiosInstance.delete("/api/article/delete/" + id);
    }
}