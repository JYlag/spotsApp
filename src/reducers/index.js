import { combineReducers } from 'redux';
import AuthReducer from "./AuthReducer";
import SpotsReducer from "./SpotsReducer";
import NoteReducer from "./NoteReducer";
import FetchSpotsReducer from "./FetchSpotsReducer";

export default combineReducers({
    auth: AuthReducer,
    spots: SpotsReducer,
    fetchSpots: FetchSpotsReducer,
    note: NoteReducer
});