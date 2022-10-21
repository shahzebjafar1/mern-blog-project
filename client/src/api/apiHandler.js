import axiosBase from "../utils/axiosapi"

//* Posts
// Get
export const getAllPostsAPI = () => axiosBase.get('/api/v1/posts');
export const getPostByIdAPI = (id) => axiosBase.get(`/api/v1/posts/${id}`);
export const getUserPostsAPI = (id) => axiosBase.post(`/api/v1/posts/users`,id);
// Post
export const addPostAPI = (data) => axiosBase.post('/api/v1/posts', data)
// Put
export const editPostAPI = (id, data) => axiosBase.put(`/api/v1/posts/${id}`, data)
// Delete
export const deletePostAPI = (id) => axiosBase.delete(`/api/v1/posts/${id}`)


//* Comments
export const getCommentsAPI = (post_id) => axiosBase.get(`/api/v1/posts/${post_id}/comments`);
export const addCommentsAPI = (post_id,data) => axiosBase.post(`/api/v1/posts/${post_id}/comments`, data);
export const editCommentsAPI = (post_id,comment_id, data) => axiosBase.put(`/api/v1/posts/${post_id}/comments/${comment_id}`, data);
export const deleteCommentsAPI = (post_id,id) => axiosBase.delete(`/api/v1/posts/${post_id}/comments/${id}`);

//* User Login
export const usersLoginApi = (email, password) => axiosBase.post('/api/v1/users/login',{email,password});


//* User SignUp
export const usersSignUpApi = (data) => axiosBase.post('/api/v1/users', data);


