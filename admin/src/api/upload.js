import { axiosInstance } from '@/axios'
export default {
    uploadImg(data, config={}) {
        return axiosInstance.post("/api/upload", data, config);
    }
}