import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:9090" }); //creates base connection with API
API.interceptors.request.use((req) => {

  return req;
});

export const insert = (post) => API.post(`/database/insert`,post);
export const update = (post) => API.post(`/database/update`,post);
export const delete1 = (id) => API.get(`/database/delete/${id}`);
export const viewall= (id) => API.get(`/database/viewall/${id}`);
export const view= (id) => API.get(`/database/view/${id}`);
export const setCommited= () => API.get(`/database/commited`);
export const setUncommited= () => API.get(`/database/uncommited`);
export const setRepeatable= () => API.get(`/database/repeatable`);
export const setSerializable= () => API.get(`/database/serializable`);