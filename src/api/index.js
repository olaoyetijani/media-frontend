import axios, { formToJSON } from "axios";

// const url = "https://media-backend-xxg4.onrender.com/posts";
// const userUrl = "https://media-backend-xxg4.onrender.com/user";

const API = axios.create({
  baseURL: "https://media-backend-xxg4.onrender.com",
});

API.interceptors.request.use((req) => {
  if (localStorage.getItem("profile")) {
    req.headers.Authorization = `Bearer ${
      JSON.parse(localStorage.getItem("profile")).token
    }`;
  }

  return req;
});

export const fetchPosts = () => API.get("/posts");
export const createPosts = (newPost) => API.post("/posts", newPost);
export const updatePost = (id, updatedPost) =>
  API.patch(`/posts/${id}`, updatedPost);
export const deletePost = (id) => API.delete(`/posts/${id}`);
export const likePost = (id) => API.patch(`/posts/${id}/likePost`);

export const signIn = (FormData) => API.post("/user/signin", FormData);
export const signUp = (FormData) => API.post("/user/signup", FormData);

// export const fetchPosts = () => axios.get(url);
// export const createPosts = (newPost) => axios.post(url, newPost);
// export const likePost = (id) => axios.patch(`${url}/${id}/likePost`);
// export const updatePost = (id, updatedPost) =>
//   axios.patch(`${url}/${id}`, updatedPost);
// export const deletePost = (id) => axios.delete(`${url}/${id}`);

// export const signIn = (FormData) => axios.post(`${userUrl}/signin`, FormData);
// export const signUp = (FormData) => axios.post(`${userUrl}/signup`, FormData);
