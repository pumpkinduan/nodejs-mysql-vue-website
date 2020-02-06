import {axiosInstance} from '@/axios'
export default {
    getAllImgs(page) {
        return axiosInstance.get("/api/upload/imgs", {
            params: {
                page
            }
        });
    }
}