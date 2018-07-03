//====== IMPORTED ACTION TYPES ========
import {
    CURRENT_LOCATION
} from "../actions/types";

const INITIAL_STATE = {
    latitude: 0,
    longitude: 0,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421

};

export default function(state = INITIAL_STATE, action) {
    switch ( action.type ) {
        case CURRENT_LOCATION:
            return {
                latitude: action.payload.latitude,
                longitude: action.payload.longitude,
                latitudeDelta: action.payload.latitudeDelta,
                longitudeDelta: action.payload.longitudeDelta
            };
        default:
            return state;
    }
}