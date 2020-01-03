import {axiosInstance} from '@/axios'
export default {
    getAllImgs(page) {
        return axiosInstance.get("/api/upload/getAllImgs", {
            params: {
                page
            }
        });
    }
}