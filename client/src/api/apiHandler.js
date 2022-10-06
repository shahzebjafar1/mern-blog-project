import axiosBase from "../utils/axiosapi"
import { getAllPostsUrl } from "../config/config_urls"

//* Posts
// Get
export const getAllPostsAPI = () => axiosBase.get(getAllPostsUrl);
export const getUserPostsAPI = (id) => axiosBase.get(`/posts?userId=${id}&_sort=id&_order=desc`);
// Post
export const addPostAPI = (data) => axiosBase.post('/api/v1/posts', data)
// Put
export const editPostAPI = (id, data) => axiosBase.put(`/posts/${id}`, data)
// Delete
export const deletePostAPI = (id) => axiosBase.delete(`/posts/${id}`)


//* Comments
export const getCommentsAPI = (post_id) => axiosBase.get(`/comments?postId=${post_id}`);
export const addCommentsAPI = (data) => axiosBase.post(`/comments`, data);
export const editCommentsAPI = (id, data) => axiosBase.put(`/comments/${id}`, data);
export const deleteCommentsAPI = (id) => axiosBase.delete(`/comments/${id}`);

//* User Login
export const usersLoginApi = (email, password) => axiosBase.post('/api/v1/users/login',{email,password});


//* User SignUp
export const usersSignUpApi = (data) => axiosBase.post('/api/v1/users', data);


