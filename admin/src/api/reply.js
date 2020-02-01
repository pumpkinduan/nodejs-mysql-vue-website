
import { axiosInstance } from '@/axios';
export default {
    deleteReply(id) {
        return axiosInstance.delete("/api/reply/delete/" + id);
    },
    getReplyAll(params) {
        return axiosInstance.get("/api/reply/all", {
            params
        });
    },
    createReply(data) {
        return axiosInstance.post("/api/reply/create", data);
    }
}