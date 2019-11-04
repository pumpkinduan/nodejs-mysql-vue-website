import axios from 'axios';
export default {
    login(data) {
        return axios.post("/api/user/login", data);
    },
    register(data) {
        return axios.post("/api/user/register", data);
    }
}