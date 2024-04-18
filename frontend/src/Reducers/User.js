import { USER_PROFILE_FAILURE, USER_PROFILE_REQUEST, USER_PROFILE_SUCCESS } from "../constants/postConstants";
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
    CLEAR_ERRORS,
    POST_OF_FOLLOWING_REQUEST,
    POST_OF_FOLLOWING_SUCCESS,
    POST_OF_FOLLOWING_FAILURE,
    ALL_USERS_REQUEST,
    ALL_USERS_SUCCESS,
    ALL_USERS_FAILURE,
    LOGOUT_REQUEST,
} from "../constants/userConstants";


export const userReducer = (state = {} , action) => {
    switch (action.type) {
      case LOGIN_REQUEST:
      case REGISTER_USER_REQUEST:
      case LOAD_USER_REQUEST:
        return {
          loading: true,
          // isAuthenticated: false,
        };
      case LOGOUT_REQUEST: 
       return {
        loading: true,
       }
      case LOGIN_SUCCESS:
      case REGISTER_USER_SUCCESS:
      case LOAD_USER_SUCCESS:
        return {
          ...state,
          loading: false,
          isAuthenticated: true,
          user: action.payload,
        };
  
      case LOGOUT_SUCCESS:
        return {
          loading: false,
          user: null,
          isAuthenticated: false,
        };
      case LOGIN_FAIL:
      case REGISTER_USER_FAIL:
        return {
          ...state,
          loading: false,
          isAuthenticated: false,
          // user: null,
          error: action.payload,
        };
        case LOAD_USER_FAIL:
            return {
              loading: false,
              isAuthenticated: false,
              // user: null,
              error: action.payload,
            };
      
          case LOGOUT_FAIL:
            return {
              ...state,
              loading: false,
              error: action.payload,
              isAuthenticated: true,
            };
      
          case CLEAR_ERRORS:
            return {
              ...state,
              error: null,
            };
      
          default:
            return state;
        }
      };
      
      
export const postOfFollowingReducer = (state = {posts: []}, action) => {
  switch (action.type) {
    case POST_OF_FOLLOWING_REQUEST:
        return {
          loading: true,
        };
      case POST_OF_FOLLOWING_SUCCESS:
        return {
          ...state,
          loading: false,
          posts: action.payload,
        };
        case POST_OF_FOLLOWING_FAILURE:
          return {
            ...state,
            loading: false,
            error: action.payload,
          };
          case CLEAR_ERRORS:
            return {
              ...state,
              error: null,
            };
      
          default:
            return state; 
  }
};

export const allUsersReducer = (state = {}, action) => {
  switch (action.type) {
    case ALL_USERS_REQUEST:
        return {
          loading: true,
        };
      case ALL_USERS_SUCCESS:
        return {
          ...state,
          loading: false,
          users: action.payload,
        };
        case ALL_USERS_FAILURE:
          return {
            ...state,
            loading: false,
            error: action.payload,
          };
          case CLEAR_ERRORS:
            return {
              ...state,
              error: null,
            };
      
          default:
            return state; 
  }
};

export const userProfileReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_PROFILE_REQUEST:
        return {
          loading: true,
        };
      case USER_PROFILE_SUCCESS:
        return {
          ...state,
          loading: false,
          user: action.payload,
        };
        case USER_PROFILE_FAILURE:
          return {
            ...state,
            loading: false,
            error: action.payload,
          };
          case CLEAR_ERRORS:
            return {
              ...state,
              error: null,
            };
      
          default:
            return state; 
  }
};