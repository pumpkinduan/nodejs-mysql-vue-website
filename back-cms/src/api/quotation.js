import axios from 'axios';
export default {
    publishQuotation(data) {
        return axios.post("/quotation/create", data);
    },
    deleteQuotation(id) {
        return axios.delete("/quotation/delete/" + id);
    },
    getLists(params) {
        return axios.get("/quotation/list", {params});
    },
    updateQuotation(id, data) {
        return axios.get("/quotation/update/" + id, {data});
    }
}