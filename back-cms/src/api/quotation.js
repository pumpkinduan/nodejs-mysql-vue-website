import axios from 'axios';
export default {
    publishQuotation(data) {
        return axios.post("/api/quotation/create", data);
    },
    deleteQuotation(id) {
        return axios.delete("/api/quotation/delete/" + id);
    },
    getQuotationLists(params) {
        return axios.get("/api/quotation/list", {params});
    },
    updateQuotation(id, data) {
        return axios.put("/api/quotation/update/" + id, {data});
    }
}