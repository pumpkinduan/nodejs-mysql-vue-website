import {axiosInstance} from '@/axios'
export default {
    getArticleList(params) {
        return axiosInstance.get('/api/article/lists', {
            params: {
                page: params
            }
        });
    },
    getArticleListsByTag(tag) {
        if (!tag) return;
        return axiosInstance.get("/api/article/lists_tag", {params: {tag}});
    },
    getCategories() {
        return axiosInstance.get('/api/article/categories');
    },
    getArchives() {
        return axiosInstance.get('/api/article/archives');
    },
    getArticleDetail(id) {
        return axiosInstance.get('/api/article/detail/' + id);
    },
    updateBrowse(id, data) {
        return axiosInstance.put("/api/browse/update/" + id, data);
    }
}