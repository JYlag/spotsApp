import firebase from 'firebase';

//====== IMPORTED ACTION TYPES ========
import {
    SAVE_SPOT,
    SPOT_FETCH_SUCCESS,
    SPOT_TITLE_UPDATED,
    SPOT_ADDRESS_UPDATED,
    SPOT_NOTES_UPDATED
} from "../actions/types";

export const spotTitleUpdate = (text) => {
    return {
        type: SPOT_TITLE_UPDATED,
        payload: text
    };
};

export const spotAddressUpdate = (text) => {
    return {
        type: SPOT_ADDRESS_UPDATED,
        payload: text
    };
};

export const spotNotesUpdate = (array) => {
    return {
        type: SPOT_NOTES_UPDATED,
        payload: array
    };
};

export const saveSpot = (region, title='', address='', notes=[]) => {
    const { currentUser } = firebase.auth();

    return (dispatch) => {
        firebase.database().ref(`users/${currentUser.uid}/spots`)
            .push({
                latitude: region.latitude,
                longitude: region.longitude,
                latitudeDelta: region.latitudeDelta,
                longitudeDelta: region.longitudeDelta,
                title,
                address,
                notes
            })
            .then( () => {
                dispatch({ type: SAVE_SPOT });
            });
    }
};

export const fetchSpots = () => {
    const { currentUser } = firebase.auth();

    return (dispatch) => {
        firebase.database().ref(`users/${currentUser.uid}/spots`)
            .on( 'value', snapshot => {
                dispatch({ type: SPOT_FETCH_SUCCESS, payload: snapshot.val()})
            });
    };
};