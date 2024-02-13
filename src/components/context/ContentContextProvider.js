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

  // Функция для подписки на группу
  const followGroup = async (id, groupData) => {
    try {
      // Отправляем POST запрос на сервер с указанием id группы и данных группы
      const response = await axios.post(
        `${API}/api
        /groups/${id}/follow_group/`,
        groupData
      );

      // Возвращаем данные о группе, если запрос выполнен успешно
      return response.data;
    } catch (error) {
      // В случае ошибки выводим её в консоль
      console.error("Error following group:", error);
      return null;
    }
  };

  // Функция для отписки от группы
  const unfollowGroup = async (id) => {
    try {
      // Отправляем DELETE запрос на сервер с указанием id группы
      await axios.delete(`${API}/api/groups/${id}/unfollow_group/`);

      // Возвращаем true, чтобы показать, что отписка прошла успешно
      return true;
    } catch (error) {
      // В случае ошибки выводим её в консоль
      console.error("Error unfollowing group:", error);
      return false;
    }
  };

  // Функция для создания новой группы
  const createGroup = async (newGroup) => {
    try {
      // Отправляем POST запрос на сервер
      const response = await axios.post(
        `${API}/api/groups/create_group/`,
        newGroup
      );

      // Если запрос выполнен успешно, возвращаем данные созданной группы
      return response.data;
    } catch (error) {
      // В случае ошибки выводим её в консоль и возвращаем null
      console.error("Error creating group:", error);
      return null;
    }
  };

  const fetchGroups = async () => {
    try {
      const response = await axios.get(`${API}/api/groups/groups_list`);
      return response.data; // Возвращает данные групп
    } catch (error) {
      console.error("Ошибка при загрузке групп:", error);
      throw error; // Бросает ошибку в случае неудачного запроса
    }
  };

  //! EDIT GROUPS
  const updateGroupPartial = async (id, updatedData) => {
    try {
      const response = await axios.patch(
        `${API}/api/groups/${id}/`,
        updatedData
      );

      return response.data;
    } catch (error) {
      console.error("Error updating group:", error);
      return null;
    }
  };

  // ! create hashtags
  const createHashtag = async (newHashtag) => {
    try {
      // Отправляем POST запрос на сервер
      const response = await axios.post("/hashtags/", newHashtag);

      // Если запрос выполнен успешно, возвращаем данные созданного хэштэга
      return response.data;
    } catch (error) {
      // В случае ошибки выводим её в консоль и возвращаем null
      console.error("Error creating hashtag:", error);
      return null;
    }
  };
  const values = {
    getPosts,
    postsCreate,
    posts: state.posts,
    onePosts: state.onePosts,
    postsDelete,
    postsPartialUpdate,
  };
  return (
    <contentContext.Provider value={values}>{children}</contentContext.Provider>
  );
};

export default ContentContextProvider;
