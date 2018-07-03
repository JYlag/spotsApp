//====== IMPORTED ACTION TYPES ========
import {
    FORM_ADDRESS_UPDATE,
    FORM_PHOTO_UPDATE,
    FORM_TITLE_UPDATE,
    FORM_NOTE_UPDATE,
    CLEAR_SPOT_FORM
} from "../actions/types";

const INITIAL_STATE = {
    title: '',
    address: '',
    notes: [],
    note: '',
    photos: []

};

export default function(state = INITIAL_STATE, action) {
    switch ( action.type ) {
        case FORM_TITLE_UPDATE:
            return {...state, title: action.payload};
        case FORM_ADDRESS_UPDATE:
            return {...state, address: action.payload};
        case FORM_NOTE_UPDATE:
            return {...state, notes: action.payload};
        case FORM_PHOTO_UPDATE:
            return {...state, photos: action.payload};
        case CLEAR_SPOT_FORM:
            return {...INITIAL_STATE };
        default:
            return state;
    }
}