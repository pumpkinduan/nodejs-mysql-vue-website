import {axiosInstance} from '@/axios'
export default {
    getCommentAll(params) {
        return axiosInstance.get("/api/comment/all", {params});
    },
    deleteComment(id) {
        return axiosInstance.delete("/api/comment/delete/" + id);
    }
}