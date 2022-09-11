import axios from 'axios';
import { load_user } from './auth';
import { createMessage } from './messages';

import {
    GET_DONATES_LIST_SUCCESS,
    GET_SHELTER_SUCCESS,
    ADD_PET_SUCCESS,
    GET_PET_SUCCESS,
    GET_PETS_LIST_SUCCESS,
    GET_SHELTERS_LIST_SUCCESS,
    ADD_STRUCTURE_SUCCESS,
    ADD_STRUCTURE_FAIL,
    GET_ENTITY_FAIL,
    UPDATE_ENTITY_SUCCESS,
    UPDATE_ENTITY_FAIL,
    DELETE_PET_SUCCESS,
    DELETE_PET_FAIL,
    LOADING_VISIBLE,
    LOADING_INVISIBLE,
} from "./types"

export const get_donates = () => async dispatch => {
    dispatch({ type: LOADING_VISIBLE })
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/v1/donate`, config);
        dispatch({
            type: GET_DONATES_LIST_SUCCESS,
            payload: res.data
        });
        dispatch({ type: LOADING_INVISIBLE })

    } catch (err) {
        dispatch({ type: LOADING_INVISIBLE })
        if (!err.response) {
            dispatch(createMessage({ no_server_response: "We are sorry. Server did not return any message. Try again later" }))
        }
    }
}


export const getAllPets = () => async dispatch => {
    dispatch({ type: LOADING_VISIBLE })
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/v1/pet`, config);
        dispatch({
            type: GET_PETS_LIST_SUCCESS,
            payload: res.data
        });
        dispatch({ type: LOADING_INVISIBLE })

    } catch (err) {
        dispatch({ type: LOADING_INVISIBLE })
        if (!err.response) {
            dispatch(createMessage({ no_server_response: "We are sorry. Server did not return any message. Try again later" }))
        }
    }
}


export const getAllShelters = () => async dispatch => {
    dispatch({ type: LOADING_VISIBLE })
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/v1/shelter`, config);
        dispatch({
            type: GET_SHELTERS_LIST_SUCCESS,
            payload: res.data
        });
        dispatch({ type: LOADING_INVISIBLE })

    } catch (err) {
        dispatch({ type: LOADING_INVISIBLE })
        if (!err.response) {
            dispatch(createMessage({ no_server_response: "We are sorry. Server did not return any message. Try again later" }))
        }
    }
}

export const chargeAccount = (username, money) => async dispatch => {

    if (localStorage.getItem('access')) {
        dispatch({ type: LOADING_VISIBLE })
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `JWT ${localStorage.getItem('access')}`,
                'Accept': 'application/json'
            }
        };

        const body = { username, money };
        try {
            const res = await axios.put(`${process.env.REACT_APP_API_URL}/v1/chargeAccount`, body, config);
            dispatch({
                type: UPDATE_ENTITY_SUCCESS,
                payload: res.data
            });
            dispatch(createMessage({ structure_status_changed: "Doładowano." }))
            dispatch(load_user())
            dispatch({ type: LOADING_INVISIBLE })

        } catch (err) {
            dispatch({
                type: UPDATE_ENTITY_FAIL
            });
            if (!err.response) {
                dispatch(createMessage({ no_server_response: "We are sorry. Server did not return any message. Try again later" }))

            }
            dispatch(createMessage({ structure_status_unchanged: "Twoje konto NIE zostało doładowane." }))
            dispatch({ type: LOADING_INVISIBLE })
        }
    }
    else {
        dispatch({
            type: UPDATE_ENTITY_FAIL
        });
        dispatch(createMessage({ structure_status_unchanged: "Twoje konto NIE zostało doładowane." }))
        dispatch({ type: LOADING_INVISIBLE })
    }

}


export const saveDonate = (petId, userId, money) => async dispatch => {
    if (localStorage.getItem('access')) {
        dispatch({ type: LOADING_VISIBLE })
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `JWT ${localStorage.getItem('access')}`,
                'Accept': 'application/json'
            }
        };

        const body = { petId, userId, money };
        try {
            const res = await axios.put(`${process.env.REACT_APP_API_URL}/v1/donate`, body, config);
            dispatch({
                type: UPDATE_ENTITY_SUCCESS,
                payload: res.data
            });
            dispatch(get_donates())
            dispatch(load_user())
            dispatch(createMessage({ structure_status_changed: "Wysłano pieniądze. Dziękujemy!" }))
            dispatch({ type: LOADING_INVISIBLE })

        } catch (err) {
            dispatch({
                type: UPDATE_ENTITY_FAIL
            });
            if (!err.response) {
                dispatch(createMessage({ no_server_response: "We are sorry. Server did not return any message. Try again later" }))

            }
            dispatch(createMessage({ structure_status_unchanged: "Nie udało się wysłać donejta. Odpowiedź serwera: "+err.response.data.message }))
            dispatch({ type: LOADING_INVISIBLE })
        }
    }
    else {
        dispatch({
            type: UPDATE_ENTITY_FAIL
        });
        dispatch(createMessage({ structure_status_unchanged: "Donate was NOT send." }))
        dispatch({ type: LOADING_INVISIBLE })
    }

}

export const getShelter = (id) => async dispatch => {
    dispatch({ type: LOADING_VISIBLE })
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/v1/shelter/${id}`, config);
        dispatch({
            type: GET_SHELTER_SUCCESS,
            payload: res.data
        });
        dispatch({ type: LOADING_INVISIBLE })

    } catch (err) {
        dispatch({
            type: GET_ENTITY_FAIL
        });
        dispatch({ type: LOADING_INVISIBLE })
        if (!err.response) {
            dispatch(createMessage({ no_server_response: "We are sorry. Server did not return any message. Try again later" }))
        }
    }
}



export const getPet = (id) => async dispatch => {
    dispatch({ type: LOADING_VISIBLE })
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/v1/pet/${id}`, config);
        dispatch({
            type: GET_PET_SUCCESS,
            payload: res.data
        });
        dispatch({ type: LOADING_INVISIBLE })

    } catch (err) {
        dispatch({
            type: GET_ENTITY_FAIL
        });
        dispatch({ type: LOADING_INVISIBLE })
        if (!err.response) {
            dispatch(createMessage({ no_server_response: "We are sorry. Server did not return any message. Try again later" }))
        }
    }
}



export const addPet = (pet) => async dispatch => {

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
            const res = await axios.post(`${process.env.REACT_APP_API_URL}/v1/pet`, pet, config);
            if (res.status === 200) { // ==
                dispatch({
                    type: ADD_PET_SUCCESS,
                    payload: res.data
                });
                dispatch({ type: LOADING_INVISIBLE })
                dispatch(createMessage({ structure_added: "Your pet has been added." }))
            }
            else {
                dispatch({
                    type: ADD_STRUCTURE_FAIL
                });
                dispatch({ type: LOADING_INVISIBLE })
                dispatch(createMessage({ structure_adding_fail: "Your pet has NOT been added." }))
            }


        } catch (err) {
            dispatch({
                type: ADD_STRUCTURE_FAIL
            });
            if (err.response) {
                Object.keys(err.response.data).map((key, index) => (
                    dispatch(createMessage({ structure_error_field_info: "Validation error: " + key + " : " + err.response.data[key] }))
                ))
            }
            dispatch({ type: LOADING_INVISIBLE })
            dispatch(createMessage({ structure_adding_fail: "Your pet has NOT been added." }))
        }
    } else {
        dispatch({
            type: ADD_STRUCTURE_FAIL
        });
        dispatch({ type: LOADING_INVISIBLE })
        dispatch(createMessage({ structure_adding_fail: "Your pet has NOT been added. Check if you are still logged in and try again." }))
    }

}

export const addShelter = (shelter) => async dispatch => {

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
            const res = await axios.post(`${process.env.REACT_APP_API_URL}/v1/shelter`, shelter, config);
            if (res.status === 200) { // ==
                dispatch({
                    type: ADD_STRUCTURE_SUCCESS,
                    payload: res.data
                });
                dispatch({ type: LOADING_INVISIBLE })
                dispatch(createMessage({ structure_added: "Your shelter has been added." }))
            }
            else {
                dispatch({
                    type: ADD_STRUCTURE_FAIL
                });
                dispatch({ type: LOADING_INVISIBLE })
                dispatch(createMessage({ structure_adding_fail: "Your shelter has NOT been added." }))
            }


        } catch (err) {
            dispatch({
                type: ADD_STRUCTURE_FAIL
            });
            if (err.response) {
                Object.keys(err.response.data).map((key, index) => (
                    dispatch(createMessage({ structure_error_field_info: "Validation error: " + key + " : " + err.response.data[key] }))
                ))
            }
            dispatch({ type: LOADING_INVISIBLE })
            dispatch(createMessage({ structure_adding_fail: "Your shelter has NOT been added." }))
        }
    } else {
        dispatch({
            type: ADD_STRUCTURE_FAIL
        });
        dispatch({ type: LOADING_INVISIBLE })
        dispatch(createMessage({ structure_adding_fail: "Your shelter has NOT been added. Check if you are still logged in and try again." }))
    }

}


export const deletePet = (id) => async dispatch => {
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
            const res = await axios.delete(`${process.env.REACT_APP_API_URL}/v1/pet/${id}`, config);
            dispatch({
                type: DELETE_PET_SUCCESS,
                payload: res.data
            });
            dispatch({ type: LOADING_INVISIBLE })
            dispatch(createMessage({ structure_deleted: "Zwierzak został usunięty.." }))


        } catch (err) {
            dispatch({
                type: DELETE_PET_FAIL
            });
            dispatch({ type: LOADING_INVISIBLE })
            if (!err.response) {
                dispatch(createMessage({ no_server_response: "We are sorry. Server did not return any message. Try again later" }))
            }
            dispatch(createMessage({ structure_deleting_fail: "Zwierzak NIE został usunięty." }))

        }
    }
    else {
        dispatch({
            type: DELETE_PET_FAIL
        });
        dispatch({ type: LOADING_INVISIBLE })
        dispatch(createMessage({ structure_deleting_fail: "Zwierzak NIE został usunięty." }))
    }
}