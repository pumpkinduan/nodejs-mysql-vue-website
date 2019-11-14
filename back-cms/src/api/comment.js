import {axiosInstance} from '@/axios'
export default {
    getLists(params) {
        return axiosInstance.get("/api/comment/list", {params});
    },
    deleteComment(id) {
        return axiosInstance.delete("/api/comment/delete/" + id);
    }
}