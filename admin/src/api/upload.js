import { axiosInstance } from '@/axios'
export default {
    uploadImg(data, config = {}) {
        return axiosInstance.post("/api/upload", data, config);
    },
    getAllImgs(page) {
        return axiosInstance.get("/api/upload/imgs", {
            params: {
                page
            }
        });
    },
    deleteOneImg(path) {
        return axiosInstance.delete("/api/upload/delete", {
            params: {path}
        });
    }
}