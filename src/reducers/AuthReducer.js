import {
    FACEBOOK_LOGIN_SUCCESS,
    FACEBOOK_LOGIN_FAIL,
    FACEBOOK_LOG_OUT,
    USERNAME_UPDATED,
    PASSWORD_UPDATED,
    LOGIN_USER,
    LOGIN_USER_SUCCESS,
    LOGIN_USER_FAIL,
    VERIFY_CHANGED
} from "../actions/types";

const INITIAL_STATE = {
    username: '',
    password: '',
    verify: '',
    token: null,
    loggedOut: null,
    error: '',
    loading: false,
    user: null
};

export default function(state = INITIAL_STATE, action) {
    switch ( action.type ) {
        case USERNAME_UPDATED:
            return { ...state, username: action.payload };
        case PASSWORD_UPDATED:
            return { ...state, password: action.payload};
        case VERIFY_CHANGED:
            return { ...state, verify: action.payload};
        case FACEBOOK_LOGIN_SUCCESS:
            return { token: action.payload };
        case FACEBOOK_LOGIN_FAIL:
            return { token: null };
        case FACEBOOK_LOG_OUT:
            return { loggedOut: true };
        case LOGIN_USER:
            return {...state, loading: true, error: ''};
        case LOGIN_USER_SUCCESS:
            return {...state,
            ...INITIAL_STATE,
            user: action.payload}
        case LOGIN_USER_FAIL:
            return {
                ...state,
                error: 'Invalid Username or Password',
                password: '',
                loading: false
            }
        default:
            return state;
    }
}