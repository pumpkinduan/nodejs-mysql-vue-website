import {axiosInstance} from '@/axios'

export default {
    createReply(data) {
        return axiosInstance.post("/api/reply/create", data);
    },
}