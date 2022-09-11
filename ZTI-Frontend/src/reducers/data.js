import { GET_DONATES_LIST_SUCCESS, GET_PET_SUCCESS, GET_SHELTER_SUCCESS, ADD_PET_SUCCESS, GET_PETS_LIST_SUCCESS, DELETE_PET_SUCCESS, DELETE_PET_FAIL, UPDATE_ENTITY_SUCCESS, UPDATE_ENTITY_FAIL, ADD_STRUCTURE_FAIL, ADD_STRUCTURE_SUCCESS, GET_SHELTERS_LIST_SUCCESS, GET_STRUCTURE_SUCCESS, GET_ENTITY_FAIL } from "../actions/types";

const initialState = {
    shelters: [],
    shelter: [],
    pets: [],
    pet: [],
    donates: []
}

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_DONATES_LIST_SUCCESS:

            return {
                ...state,
                donates: action.payload
            }
        case GET_SHELTERS_LIST_SUCCESS:
            return {
                ...state,
                shelters: action.payload
            }
        case GET_PET_SUCCESS:
            return {
                ...state,
                pet: action.payload
            }
        case GET_SHELTER_SUCCESS:
            return {
                ...state,
                shelter: action.payload
            }
        case GET_PETS_LIST_SUCCESS:
            return {
                ...state,
                pets: action.payload
            }
        case ADD_STRUCTURE_SUCCESS:
            return {
                ...state,
                shelters: [...state.shelters, action.payload]
            }
        case ADD_PET_SUCCESS:
            return {
                ...state,
                pets: [...state.pets, action.payload]
            }
        case UPDATE_ENTITY_SUCCESS:
            return {
                ...state
            }
        case DELETE_PET_SUCCESS:
            return {
                ...state
            }
        case DELETE_PET_FAIL:
        case UPDATE_ENTITY_FAIL:
        case ADD_STRUCTURE_FAIL:
        default:
            return { ...state }
    }
}