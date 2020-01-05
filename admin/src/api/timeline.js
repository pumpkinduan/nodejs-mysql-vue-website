import { axiosInstance } from '@/axios'
export default {
    createOneTimeline(data) {
        return axiosInstance.post("/api/timeline/create", data);
    },
    getTimelineList(page) {
        return axiosInstance.get("/api/timeline/list", {
            params: {
                page
            }
        });
    },
    deleteOneTimeline(id) {
        return axiosInstance.delete("/api/timeline/delete/" + id);
    }
}