import { combineReducers } from 'redux';
import AuthReducer from "./AuthReducer";
import SpotsReducer from "./SpotsReducer";
import FormReducer from "./FormReducer";
import FetchSpotsReducer from "./FetchSpotsReducer";
import MapReducer from "./MapReducer";

export default combineReducers({
    auth: AuthReducer,
    spots: SpotsReducer,
    fetchSpots: FetchSpotsReducer,
    form: FormReducer,
    map: MapReducer
});