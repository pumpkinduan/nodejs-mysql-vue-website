import {axiosInstance} from '@/axios'
export default {
    login(data) {
        return axiosInstance.post("/api/user/login", data);
    },
    register(data) {
        return axiosInstance.post("/api/user/register", data);
    }
}