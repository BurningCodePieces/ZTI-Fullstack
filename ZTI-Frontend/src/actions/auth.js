import axios from 'axios';
import { createMessage } from './messages';

import {
    GET_ALL_USERS_SUCCESS,
    GET_ALL_USERS_FAIL,
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
    GET_ERRORS,
    USER_LOADING,
    LOADING_VISIBLE,
    LOADING_INVISIBLE
} from "./types"


export const checkAuthenticated = () => async dispatch => {
    if (localStorage.getItem('access')) {
        dispatch({ type: LOADING_VISIBLE })
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `JWT ${localStorage.getItem('access')}`
            }
        };
        try {
            const res = await axios.get(`${process.env.REACT_APP_API_URL}/v1/getUser`,  config);
            if (res.data.code !== 'token_not_valid') {
                dispatch({ type: LOADING_INVISIBLE })
                dispatch({
                    type: AUTHENTICATED_SUCCESS
                });
            } else {
                dispatch({ type: LOADING_INVISIBLE })
                dispatch({
                    type: AUTHENTICATED_FAIL
                });
            }
        } catch (err) {
            dispatch({ type: LOADING_INVISIBLE })
            dispatch({
                type: AUTHENTICATED_FAIL
            });
        }
    } else {
        dispatch({ type: LOADING_INVISIBLE })
        dispatch({
            type: AUTHENTICATED_FAIL
        });
    }
};

export const load_user = () => async dispatch => {
    dispatch({
        type: USER_LOADING,
    });

    if (localStorage.getItem('access')) {
        dispatch({ type: LOADING_VISIBLE })
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `JWT ${localStorage.getItem('access')}`,
                'Accept': 'application/json'
            }
        };
        try {
            console.log(config.headers['Authorization'])
            const res = await axios.get(`${process.env.REACT_APP_API_URL}/v1/getUser`, config);
            dispatch({
                type: USER_LOADED_SUCCESS,
                payload: res.data
            });
            dispatch({ type: LOADING_INVISIBLE })

        } catch (err) {
            dispatch({
                type: USER_LOADED_FAIL
            });
            dispatch({ type: LOADING_INVISIBLE })
        }
    } else {
        dispatch({
            type: USER_LOADED_FAIL
        });
        dispatch({ type: LOADING_INVISIBLE })
    }

};

export const signup = (email, password, re_password) => async dispatch => {
    dispatch({ type: LOADING_VISIBLE })
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    const body = JSON.stringify({ "userName":email, "password":password });

    try {
        dispatch({
            type: SIGNUP_REQUEST_SENT,
        })
        const res = await axios.post(`${process.env.REACT_APP_API_URL}/v1/register`, body, config);
        dispatch({
            type: SIGNUP_SUCCESS,
            payload: res.data
        })
        dispatch({ type: LOADING_INVISIBLE })
        dispatch(createMessage({ signed_up_successfully: "You have been successfully signed up." }))
    } catch (err) {
        dispatch({
            type: SIGNUP_FAIL,
            payload: err
        });
        dispatch({ type: LOADING_INVISIBLE })
        const errors = err.response ? { msg: err.response.data, status: err.response.status } : { msg: "Connection to database failed", status: 511 }
        dispatch({
            type: GET_ERRORS,
            payload: errors
        })
    }
};

export const login = (email, password) => async dispatch => {
    dispatch({ type: LOADING_VISIBLE })
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    const body = JSON.stringify({ email, password });

    try {
        const res = await axios.post(`${process.env.REACT_APP_API_URL}/login`, body, config);
        console.log(res.data)
        dispatch({
            type: LOGIN_SUCCESS,
            payload: res.data
        })
        dispatch({ type: LOADING_INVISIBLE })
        dispatch(load_user());
        dispatch(createMessage({ logged_in_successfully: "You are now logged in." }))
    } catch (err) {
        dispatch({
            type: LOGIN_FAIL,
            payload: err
        })
        const errors = err.response ? { msg: err.response.data, status: err.response.status } : { msg: "Connection to database failed", status: 511 }
        dispatch({
            type: GET_ERRORS,
            payload: errors
        })
        dispatch({ type: LOADING_INVISIBLE })
    }
};



export const logout = () => dispatch => {
    dispatch({
        type: LOGOUT
    });
    dispatch(createMessage({ logged_out: "You have been logged out." }))
    dispatch({ type: LOADING_INVISIBLE })
};

export const get_all_users = () => async dispatch => {
    if (localStorage.getItem('access')) {
        dispatch({ type: LOADING_VISIBLE })
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `JWT ${localStorage.getItem('access')}`,
                'Accept': 'application/json'
            }
        };
        try {
            const res = await axios.get(`${process.env.REACT_APP_API_URL}/v1/user`, config);
            dispatch({
                type: GET_ALL_USERS_SUCCESS,
                payload: res.data
            });
            dispatch({ type: LOADING_INVISIBLE })
        } catch (err) {
            dispatch({
                type: GET_ALL_USERS_FAIL
            });
            dispatch({ type: LOADING_INVISIBLE })
        }
    } else {
        dispatch({
            type: GET_ALL_USERS_FAIL
        });
        dispatch({ type: LOADING_INVISIBLE })
    }

};



export const update_users_list = (email) => async dispatch => {
    if (localStorage.getItem('access')) {
        dispatch({ type: LOADING_VISIBLE })
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `JWT ${localStorage.getItem('access')}`,
                'Accept': 'application/json'
            }
        };
        const body = { "username": email };
        try {
            await axios.put(`${process.env.REACT_APP_API_URL}/v1/updateRole`, body, config);
            const res = await axios.get(`${process.env.REACT_APP_API_URL}/v1/user`, config);
            dispatch({ type: LOADING_INVISIBLE })
            dispatch({
                type: GET_ALL_USERS_SUCCESS,
                payload: res.data
            });
            dispatch(createMessage({ user_permission_changed: "Zmiana uprawnień przebiegła pomyślnie." }))

        } catch (err) {
            dispatch({ type: LOADING_INVISIBLE })
            dispatch({
                type: GET_ALL_USERS_FAIL
            });
            let message = err.response ? err.response.data : "Bad request. Server did not return any answer. This probably means there is a problem on our side. Sorry."
            dispatch(createMessage({ user_permission_bad_request: message }))
        }
    } else {
        dispatch({ type: LOADING_INVISIBLE })
        dispatch({
            type: GET_ALL_USERS_FAIL
        });
        dispatch(createMessage({ not_logged_in: "Check if you are still logged in and try again." }))
    }

};