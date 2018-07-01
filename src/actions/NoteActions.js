//====== IMPORTED ACTION TYPES ========
import {
    NOTE_UPDATE
} from "../actions/types";

export const noteUpdate = (note) => {
    return {
      type: NOTE_UPDATE,
      payload: note
    };
}