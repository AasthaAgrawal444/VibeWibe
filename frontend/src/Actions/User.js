import { DELETE_PROFILE_FAILURE, DELETE_PROFILE_REQUEST, DELETE_PROFILE_SUCCESS, FOLLOW_USER_FAILURE, FOLLOW_USER_REQUEST, FOLLOW_USER_SUCCESS, FORGOT_PASSWORD_FAILURE, FORGOT_PASSWORD_REQUEST, FORGOT_PASSWORD_SUCCESS, MY_POSTS_FAILURE, MY_POSTS_REQUEST, MY_POSTS_SUCCESS, RESET_PASSWORD_FAILURE, RESET_PASSWORD_REQUEST, RESET_PASSWORD_SUCCESS, UPDATE_PASSWORD_FAILURE, UPDATE_PASSWORD_REQUEST, UPDATE_PASSWORD_SUCCESS, UPDATE_PROFILE_FAILURE, UPDATE_PROFILE_REQUEST, UPDATE_PROFILE_SUCCESS, USER_POSTS_FAILURE, USER_POSTS_REQUEST, USER_POSTS_SUCCESS, USER_PROFILE_FAILURE, USER_PROFILE_REQUEST, USER_PROFILE_SUCCESS } from "../constants/postConstants";
import {
    LOGIN_REQUEST,
    LOGIN_FAIL,
    LOGIN_SUCCESS,
    REGISTER_USER_REQUEST,
    REGISTER_USER_SUCCESS,
    REGISTER_USER_FAIL,
    LOAD_USER_REQUEST,
    LOAD_USER_SUCCESS,
    LOAD_USER_FAIL,
    LOGOUT_SUCCESS,
    LOGOUT_FAIL,
    POST_OF_FOLLOWING_REQUEST,
    POST_OF_FOLLOWING_SUCCESS,
    POST_OF_FOLLOWING_FAILURE,
    ALL_USERS_REQUEST,
    ALL_USERS_SUCCESS,
    ALL_USERS_FAILURE,
    LOGOUT_REQUEST,
} from "../constants/userConstants";
import axios from "axios";

export const loginUser = (email, password)=> async (dispatch)=>{
    try {

        dispatch({ type: LOGIN_REQUEST });

        const config = { headers: { "Content-Type": "application/json" } };

        const {data} = await axios.post("/api/v1/login",{email, password},
        config
        );

        dispatch({ type: LOGIN_SUCCESS, payload: data.user });
    } catch (error) {
        dispatch({ type: LOGIN_FAIL, payload: error.response.data.message });
    }
}

export const loadUser = ()=> async (dispatch)=>{
    try {
        dispatch({ type: LOAD_USER_REQUEST });

        const {data} = await axios.get("/api/v1/me");

        dispatch({ type: LOAD_USER_SUCCESS, payload: data.user });
    } catch (error) {
        dispatch({ type: LOAD_USER_FAIL, payload: error.response.data.message });
    }
}

export const getFollowingPosts = () => async (dispatch) => {
    try {
      dispatch({ type: POST_OF_FOLLOWING_REQUEST });
  
      const { data } = await axios.get("/api/v1/posts");
      dispatch({
        type: POST_OF_FOLLOWING_SUCCESS,
        payload: data.posts,
      });
    } catch (error) {
      dispatch({
        type: POST_OF_FOLLOWING_FAILURE,
        payload: error.response.data.message,
      });
    }
  };

  
  export const getAllUsers =
  (name = "") =>
  async (dispatch) => {
    try {
      dispatch({
        type: ALL_USERS_REQUEST,
      });

      const { data } = await axios.get(`/api/v1/users?name=${name}`);
      dispatch({
        type: ALL_USERS_SUCCESS,
        payload: data.users,
      });
    } catch (error) {
      dispatch({
        type: ALL_USERS_FAILURE,
        payload: error.response.data.message,
      });
    }
  };


  export const getMyPosts = () => async (dispatch) => {
    try {
      dispatch({ type: MY_POSTS_REQUEST });
  
      const { data } = await axios.get("/api/v1/my/posts");
      dispatch({
        type: MY_POSTS_SUCCESS,
        payload: data.posts,
      });
    } catch (error) {
      dispatch({
        type: MY_POSTS_FAILURE,
        payload: error.response.data.message,
      });
    }
  };
  
  export const logoutUser = ()=> async (dispatch)=>{
    try {

        dispatch({ type: LOGOUT_REQUEST });

        await axios.get("/api/v1/logout");

        dispatch({ type: LOGOUT_SUCCESS});
    } catch (error) {
        dispatch({ type: LOGOUT_FAIL, payload: error.response.data.message });
    }
}

export const registerUser = (name, email, password, avatar)=> async (dispatch)=>{
  try {

      dispatch({ type: REGISTER_USER_REQUEST });

      const config = { headers: { "Content-Type": "application/json" } };

      const {data} = await axios.post("/api/v1/register",{name, email, password, avatar},
      config
      );

      dispatch({ type: REGISTER_USER_SUCCESS, payload: data.user });
  } catch (error) {
      dispatch({ type: REGISTER_USER_FAIL, payload: error.response.data.message });
  }
}

export const updateProfile = (name, email, avatar) => async (dispatch) => {
  try {
    dispatch({
      type: UPDATE_PROFILE_REQUEST,
    });

    const { data } = await axios.put(
      "/api/v1/update/profile",
      { name, email, avatar },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    dispatch({
      type: UPDATE_PROFILE_SUCCESS,
      payload: data.message,
    });
  } catch (error) {
    dispatch({
      type: UPDATE_PROFILE_FAILURE,
      payload: error.response.data.message,
    });
  }
};

export const updatePassword = (oldPassword, newPassword) => async (dispatch) => {
  try {
    dispatch({
      type: UPDATE_PASSWORD_REQUEST,
    });

    const { data } = await axios.put("/api/v1/update/password",
      { oldPassword, newPassword },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    dispatch({
      type: UPDATE_PASSWORD_SUCCESS,
      payload: data.message,
    });
  } catch (error) {
    dispatch({
      type: UPDATE_PASSWORD_FAILURE,
      payload: error.response.data.message,
    });
  }
};

export const deleteMyProfile = () => async (dispatch) => {
  try {
    dispatch({
      type: DELETE_PROFILE_REQUEST,
    });

    const { data } = await axios.delete(
      "/api/v1/delete/me");

    dispatch({
      type: DELETE_PROFILE_SUCCESS,
      payload: data.message,
    });
  } catch (error) {
    dispatch({
      type: DELETE_PROFILE_FAILURE,
      payload: error.response.data.message,
    });
  }
};

export const forgotPassword = (email) => async (dispatch) => {
  try {
    dispatch({
      type: FORGOT_PASSWORD_REQUEST,
    });

    const { data } = await axios.post(
      "/api/v1/forgot/password",
      { email },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    dispatch({
      type: FORGOT_PASSWORD_SUCCESS,
      payload: data.message,
    });
  } catch (error) {
    dispatch({
      type: FORGOT_PASSWORD_FAILURE,
      payload: error.response.data.message,
    });
  }
};

export const resetPassword = (token, password) => async (dispatch) => {
  try {
    dispatch({
      type: RESET_PASSWORD_REQUEST,
    });

    const { data } = await axios.put(
      `/api/v1/password/reset/:${token}`,
      { password },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    dispatch({
      type: RESET_PASSWORD_SUCCESS,
      payload: data.message,
    });
  } catch (error) {
    dispatch({
      type: RESET_PASSWORD_FAILURE,
      payload: error.response.data.message,
    });
  }
};

export const getUserPosts = (id) => async (dispatch) => {
  try {
    dispatch({ type: USER_POSTS_REQUEST });

    const { data } = await axios.get(`/api/v1/userposts/${id}`);
    dispatch({
      type: USER_POSTS_SUCCESS,
      payload: data.posts,
    });
  } catch (error) {
    dispatch({
      type: USER_POSTS_FAILURE,
      payload: error.response.data.message,
    });
  }
};

export const getUserProfile = (id) => async (dispatch) => {
  try {
    dispatch({
      type: USER_PROFILE_REQUEST,
    });

    const { data } = await axios.get(`/api/v1/user/${id}`);
    dispatch({
      type: USER_PROFILE_SUCCESS,
      payload: data.user,
    });
  } catch (error) {
    dispatch({
      type: USER_PROFILE_FAILURE,
      payload: error.response.data.message,
    });
  }
};

export const followAndUnfollowUser = (id) => async (dispatch) => {
  try {
    dispatch({
      type: FOLLOW_USER_REQUEST,
    });

    const { data } = await axios.get(`/api/v1/follow/${id}`);
    dispatch({
      type: FOLLOW_USER_SUCCESS,
      payload: data.message,
    });
  } catch (error) {
    dispatch({
      type: FOLLOW_USER_FAILURE,
      payload: error.response.data.message,
    });
  }
};