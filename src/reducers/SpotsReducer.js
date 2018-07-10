//====== IMPORTED ACTION TYPES ========
import {
    SPOT_FETCH_SUCCESS
} from "../actions/types";

const INITIAL_STATE = {
    spots: []
};

export default function(state = INITIAL_STATE, action) {
    switch ( action.type ) {
        case SPOT_FETCH_SUCCESS:
            return { spots: action.payload};
        default:
            return state;
    }
}