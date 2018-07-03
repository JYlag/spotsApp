//====== IMPORTED ACTION TYPES ========
import {
    CURRENT_LOCATION
} from "../actions/types";

export const currentLocationChanged = (location) => {
    return {
        type: CURRENT_LOCATION,
        payload: location
    };
}