import React, { createContext, useContext, useReducer, useState } from "react";
import { ACTIONS, API } from "../../helpers/const";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const authContext = createContext();
export const useAuth = () => useContext(authContext);
const INIT_STATE = {
  myProfile: {},
  profiles: [],
};
const reducer = (state = INIT_STATE, action) => {
  switch (action.type) {
    case ACTIONS.GET_MY_PROFILE:
      return { ...state, myProfile: action.payload };
    case ACTIONS.GET_PROFILES:
      return { ...state, profiles: action.payload };
    default:
      return state;
  }
};

const AuthContextProvider = ({ children }) => {
  const [error, setError] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const [state, dispatch] = useReducer(reducer, INIT_STATE);

  //! РЕГИСТРАЦИЯ
  const handleRegister = async (formData) => {
    try {
      await axios.post(`${API}/api/register/`, formData);
      navigate("/login");
    } catch (error) {}
  };
  //! ЛОГИН
  const handleLogin = async (formData, email) => {
    try {
      const res = await axios.post(`${API}/api/login/`, formData);
      localStorage.setItem("tokens", JSON.stringify(res.data));
      localStorage.setItem("email", email);
      navigate("/home");
      setUser(email);
    } catch (error) {
      console.error("Login Error:", error);
      setError(Object.values(error.response.data));
    }
  };
  //! Logout
  const handleLogout = () => {
    localStorage.removeItem("tokens");
    localStorage.removeItem("email");
    setUser(null);
    navigate("/login");
  };
  const checkAuth = async () => {
    try {
      const tokens = JSON.parse(localStorage.getItem("tokens"));
      const res = await axios.post(`${API}/api/refresh/`, {
        refresh: tokens.refresh,
      });
      localStorage.setItem(
        "tokens",
        JSON.stringify({ access: res.data.access, refresh: tokens.refresh })
      );
      const email = localStorage.getItem("email");
      setUser(email);
    } catch (error) {
      console.log(error);
    }
  };

  //! Мой профиль
  const getMyProfile = async () => {
    try {
      const { data } = await axios(`${API}/api/profiles/my_profile/`);

      dispatch({
        type: ACTIONS.GET_MY_PROFILE,
        payload: data,
      });
    } catch (error) {
      console.log(error);
    }
  };
  //! ВСЕ ПОЛЬЗОВАТЕЛИ
  const getProfiles = async () => {
    try {
      const { data } = await axios(
        `  ${API}/api/profiles/${window.location.search}`
      );
      dispatch({
        type: ACTIONS.GET_PROFILES,
        payload: data,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const values = {
    handleRegister,
    handleLogin,
    error,
    user,
    checkAuth,
    getMyProfile,
    getProfiles,
    myProfile: state.myProfile,
    profiles: state.profiles,
    handleLogout,
  };
  return <authContext.Provider value={values}>{children}</authContext.Provider>;
};

export default AuthContextProvider;
