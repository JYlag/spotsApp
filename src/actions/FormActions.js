//====== IMPORTED ACTION TYPES ========
import {
    CLEAR_SPOT_FORM,
    FORM_ADDRESS_UPDATE,
    FORM_NOTE_UPDATE,
    FORM_PHOTO_UPDATE,
    FORM_TITLE_UPDATE
} from "./types";

export const formNoteUpdate = (notes) => {
    return {
        type: FORM_NOTE_UPDATE,
        payload: notes
    };
};

export const formTitleUpdate = (title) => {
    return {
        type: FORM_TITLE_UPDATE,
        payload: title
    };
};

export const formAddressUpdate = (address) => {
    return {
        type: FORM_ADDRESS_UPDATE,
        payload: address
    };
};

export const formPhotoUpdate = (photos) => {

    console.log(photos);

    return {
        type: FORM_PHOTO_UPDATE,
        payload: photos
    }
};

export const clearSpotForm = () => {
    return {
        type: CLEAR_SPOT_FORM
    }
};