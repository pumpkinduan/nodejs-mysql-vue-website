import axios from 'axios';
export default {
    publishArticle(params) {
        return axios.post("/api/article/create", params);
    },
    updateArticle(params, id) {
        return axios.put("/api/article/update/" + id, params);
    },
    getLists() {
        return axios.get("/api/article/list");
    },
    deleteArticle(id) {
        return axios.delete("/api/article/delete/" + id);
    },
    getDetail(id) {
        return axios.get("/api/article/detail/" + id);
    }
}