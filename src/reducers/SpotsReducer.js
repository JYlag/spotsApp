//====== IMPORTED ACTION TYPES ========
import {
    CLOSE_MODAL,
    OPEN_MODAL, SPOT_ADDRESS_UPDATED, SPOT_FETCH_SUCCESS, SPOT_NOTES_UPDATED, SPOT_TITLE_UPDATED
} from "../actions/types";

const INITIAL_STATE = {
    spots: []
};

export default function(state = INITIAL_STATE, action) {
    switch ( action.type ) {
        case SPOT_TITLE_UPDATED:
            return {...state, title: action.payload};
        case SPOT_ADDRESS_UPDATED:
            return {...state, address: action.payload};
        case SPOT_NOTES_UPDATED:
            return {...state, notes: [] };
        case SPOT_FETCH_SUCCESS:
            return { spots: action.payload};
        default:
            return state;
    }
}