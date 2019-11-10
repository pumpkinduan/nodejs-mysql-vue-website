import axios from 'axios';
export default {
    publishArticle(data) {
        return axios.post("/api/article/create", data);
    },
    updateArticle(data, id) {
        return axios.put("/api/article/update/" + id, data);
    },
    getLists(params) {
        return axios.get("/api/article/list", {params});
    },
    deleteArticle(id) {
        return axios.delete("/api/article/delete/" + id);
    },
    getDetail(id) {
        return axios.get("/api/article/detail/" + id);
    }
}