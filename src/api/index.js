import axios from 'axios';
import firebase from '../firebase';

const API = axios.create({ baseURL: "http://localhost:5000/api" });
const url = 'http://localhost:5000/api';
export const webSocketURL = "ws://localhost:5000/api/videoChat/join";

API.interceptors.request.use(async (req) => {
    await firebase.auth().currentUser?.getIdToken(/* forceRefresh */ true).then(async function (idToken) {
        // Send token to your backend via HTTPS
        req.headers.authorization = idToken;
        // ...
    }).catch(function (error) {
        // Handle error
        console.log(error);
    });
    return req;
});


export const storeMessageToken = token => API.post(`/msgToken`, {token});
export const fetchPosts = () => API.post('/posts');
export const createPost = (newPost) => API.post('/posts/create', newPost);
export const likePost = (id) => API.patch(`/posts/${id}/likePost`);
export const updatePost = (id, updatedPost) => API.patch(`/posts/${id}`, updatedPost);
export const deletePost = (id) => API.delete(`/posts/${id}`);
export const createChat = () => axios.get(`${url}/videoChat/createMeeting`)