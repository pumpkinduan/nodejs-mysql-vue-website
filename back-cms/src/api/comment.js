import axios from 'axios';
export default {
    getLists(params) {
        return axios.get("/api/comment/list", {params});
    },
    deleteComment(id) {
        return axios.delete("/api/comment/delete/" + id);
    }
}