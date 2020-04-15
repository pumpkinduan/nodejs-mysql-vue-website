import server from "./server";
export const getArticleList = page => server.get("/article/lists", {page});
export const getArticleListsByTag = tag => server.get("/article/lists_tag", {tag});
export const getCategories = () => server.get("/article/categories");
export const getArchives = () => server.get("/article/archives");
export const getArticleDetail = id => server.get("/article/detail/" + id);
export const updateBrowse = (id, data) => server.put("/browse/update/" + id, data);

export const getArticleComments = (article_id, page) => server.get('/comment/list', {article_id, page})
export const createComment = (data) => server.post('comment/create', data)

export const getHitokoto = () => server.get('https://v1.hitokoto.cn/?c=d')

export const getAllImgs = (page) => server.get('/upload/imgs', {page})

export const createReply = (data) => server.post('/reply/create', data)