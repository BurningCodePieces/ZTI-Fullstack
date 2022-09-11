import {
    GET_ALL_USERS_SUCCESS,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    USER_LOADED_SUCCESS,
    USER_LOADED_FAIL,
    AUTHENTICATED_SUCCESS,
    AUTHENTICATED_FAIL,
    LOGOUT,
    SIGNUP_FAIL,
    SIGNUP_SUCCESS,
    SIGNUP_REQUEST_SENT,
    USER_LOADING,
    GET_ALL_USERS_FAIL,
} from "../actions/types"

const initialState = {
    access: localStorage.getItem('access'),
    refresh: localStorage.getItem('refresh'),
    isAuthenticated: null,
    isLoading : false,
    user: null,
    requestSent: false,
    payload: null,
    message: null,
    users_list: []
}

export default function(state = initialState, action){
    const {type, payload} = action;

    switch(type){
        case AUTHENTICATED_SUCCESS:
            return {
                ...state,
                isAuthenticated: true
            } 
        case LOGIN_SUCCESS:
            localStorage.setItem('access', payload.access_token);
            return{
                ...state,
                isAuthenticated: true,
                access: payload.access_token,
                refresh: payload.refresh
            }
        case SIGNUP_REQUEST_SENT:
            return {
                ...state,
                isAuthenticated: false,
                waitForSignUp: true,
            }
        case SIGNUP_SUCCESS:
            return {
                ...state,
                isAuthenticated: false,
                waitForSignUp: false,
                payload: payload,
                error:null
            }
        
        case USER_LOADED_SUCCESS:
            return{
                ...state,
                user:payload,
                isLoading: false
            }
        
        case USER_LOADED_FAIL:
            return{
                ...state,
                user: null,
                isLoading: false
            }
        case USER_LOADING:
            return{
                ...state,
                isLoading: true
            }
        case AUTHENTICATED_FAIL:
            return {
                ...state,
                access: null,
                refresh: null,
                isAuthenticated: false,
                user: null,
                waitForSignUp: false,
                error: payload,
                payload: null,
            } 
        case LOGOUT:
        case SIGNUP_FAIL:
        case LOGIN_FAIL:
            localStorage.removeItem('access');
            localStorage.removeItem('refresh');
            return{
                ...state,
                access: null,
                refresh: null,
                isAuthenticated: false,
                user: null,
                waitForSignUp: false,
                error: payload,
                payload: null
            }
        case GET_ALL_USERS_FAIL:
            return{
                ...state
            }
        case GET_ALL_USERS_SUCCESS:
            return{
                ...state,
                users_list: payload
            }
        default:
            return {...state};
    }
}