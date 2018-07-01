//====== IMPORTED ACTION TYPES ========
import {
    NOTE_UPDATE
} from "../actions/types";

const INITIAL_STATE = {
    note: ''
};

export default function(state = INITIAL_STATE, action) {
    switch ( action.type ) {
        case NOTE_UPDATE:
            return {note: action.payload};
        default:
            return state;
    }
}