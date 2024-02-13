import axios from "axios";
import React, { createContext, useContext, useReducer } from "react";
import { ACTIONS, API } from "../../helpers/const";

const contentContext = createContext();
export const useContent = () => useContext(contentContext);

const INIT_STATE = {
  myProfile: {},
  posts: [],
  onePosts: {},
  oneUsers: [],
};

const reducer = (state = INIT_STATE, action) => {
  switch (action.type) {
    case "GET_MY_PROFILE":
      return { ...state, myProfile: action.payload };
    case "GET_POSTS":
      return { ...state, posts: action.payload };
    case "GET_ONE_POST":
      return { ...state, onePosts: action.payload };
    case "GET_USERS":
      return { ...state, users: action.payload };
    case "GET_ONE_USERS":
      return { ...state, oneUsers: action.payload };
    default:
      return state;
  }
};
const ContentContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, INIT_STATE);
  const getConfig = () => {
    const tokens = JSON.parse(localStorage.getItem("tokens"));
    const Authorization = `Bearer ${tokens.access}`;
    const config = {
      headers: { Authorization },
    };
    return config;
  };

  //!  READ
  const getPosts = async () => {
    try {
      const { data } = await axios.get(`${API}/api/posts/`, getConfig());
      dispatch({
        type: ACTIONS.GET_POSTS,
        payload: data.results,
      });
    } catch (error) {
      console.error("Error fetching posts:", error);
      return null;
    }
  };
  //! CREATE
  const postsCreate = async (newPosts) => {
    try {
      const res = await axios.post(`${API}/api/posts/`, newPosts, getConfig());
    } catch (error) {
      console.error("Error creating post:", error);
      return { error: "Ошибка создания поста" };
    }
  };
  //! ЧАСТИЧНЙ UPDATE
  const postsPartialUpdate = async (id, newPost) => {
    try {
      const response = await axios.patch(
        `${API}/api/posts/${id}/`,
        newPost,
        getConfig()
      );
      return response.data;
    } catch (error) {
      console.error("Error partially updating post:", error);
      return null;
    }
  };
  //! DELETE
  const postsDelete = async (id) => {
    try {
      await axios.delete(`${API}/api/posts/${id}/`, getConfig());
      return true;
    } catch (error) {
      console.error("Error deleting post:", error);
      return false;
    }
  };
  const values = {
    getPosts,
    postsCreate,
    posts: state.posts,
    onePosts: state.onePosts,
    postsDelete,
  };
  return (
    <contentContext.Provider value={values}>{children}</contentContext.Provider>
  );
};

export default ContentContextProvider;
