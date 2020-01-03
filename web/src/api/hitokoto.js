import {axiosInstance} from '@/axios'
export default {
    getHitokoto() {
        // return axiosInstance.get('/api/quotation/exact');
        //使用第三方一言公开的api
        return axiosInstance.get('https://v1.hitokoto.cn/?c=d')
    }
}