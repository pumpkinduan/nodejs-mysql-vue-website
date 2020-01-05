
import { axiosInstance } from '@/axios';
export default {
    deleteReply(id) {
        return axiosInstance.delete("/api/reply/delete/" + id);
    },
    getReplyAll(params) {
        return axiosInstance.get("/api/reply/all", {
            params
        });
    }
}