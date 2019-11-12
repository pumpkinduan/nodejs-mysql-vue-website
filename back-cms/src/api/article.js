import axios from 'axios';
export default {
    publishArticle(data) {
        return axios.post("/api/article/create", data);
    },
    updateArticle(data, id) {
        return axios.put("/api/article/update/" + id, data);
    },
    getAllLists(params) {
        return axios.get("/api/article/list", {params});
    },
    getArticleDetail(id) {
        return axios.get('/api/article/detail/' + id);
    },
    deleteArticle(id) {
        return axios.delete("/api/article/delete/" + id);
    }
}