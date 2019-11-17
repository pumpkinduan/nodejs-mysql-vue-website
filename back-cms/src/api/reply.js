
import { axiosInstance } from '@/axios';
export default {
    // createReply(data) {
    //     return instance.post("/api/reply/create", data);
    // },
    deleteReply(id) {
        return axiosInstance.delete("/api/reply/delete/" + id);
    },
    getReplyAll(params) {
        return axiosInstance.get("/api/reply/all", {
            params
        });
    }
}