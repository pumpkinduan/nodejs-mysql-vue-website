import {axiosInstance} from '@/axios';
export default {
    publishQuotation(data) {
        return axiosInstance.post("/api/quotation/create", data);
    },
    deleteQuotation(id) {
        return axiosInstance.delete("/api/quotation/delete/" + id);
    },
    getQuotationLists(params) {
        return axiosInstance.get("/api/quotation/list", {params});
    },
    updateQuotation(id, data) {
        return axiosInstance.put("/api/quotation/update/" + id, {data});
    }
}