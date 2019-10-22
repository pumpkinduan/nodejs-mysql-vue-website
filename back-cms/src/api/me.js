import axios from 'axios';
export default {
    publishMe(data) {
        return axios.post("/api/me/create", data);
    },
    getLists(params) {
        return axios.get("/api/me/list", {params});
    },
    updateMe(id, data) {
        return axios.put("/api/me/update/" + id, data);
    },
    deleteMe(id) {
        return axios.delete("/api/me/delete/" + id);
    }
}