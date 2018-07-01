import { AsyncStorage } from 'react-native';
import { Facebook } from 'expo';
import firebase from 'firebase';

//====== IMPORTED ACTION TYPES ========
import {
    FACEBOOK_LOG_OUT,
    FACEBOOK_LOGIN_FAIL,
    FACEBOOK_LOGIN_SUCCESS,
    LOGIN_USER, LOGIN_USER_FAIL,
    LOGIN_USER_SUCCESS,
    PASSWORD_UPDATED,
    USERNAME_UPDATED,
    VERIFY_CHANGED
} from "./types";

export const usernameChanged = (text) => {
    return  {
      type: USERNAME_UPDATED,
      payload: text
    }
};

export const passwordChanged = (text) => {
    return  {
        type: PASSWORD_UPDATED,
        payload: text
    }
};

export const verifyChanged = (text) => {
    return {
        type: VERIFY_CHANGED,
        payload: text
    }
};

export const facebookLogin = () => async dispatch => {

    let token = await AsyncStorage.getItem('fb_token');

    if ( token ) {
        dispatch({ type: FACEBOOK_LOGIN_SUCCESS, payload: token })
    } else {
        doFacebookLogin(dispatch);
    }
};

const doFacebookLogin = async dispatch => {
    let { type, token } = await Facebook.logInWithReadPermissionsAsync('832030950321751', {
        permissions: ['public_profile']
    });

    if (type === 'cancel') {
        return dispatch({ type: FACEBOOK_LOGIN_FAIL });
    }

    await AsyncStorage.setItem('fb_token', token);
    dispatch({ type: FACEBOOK_LOGIN_SUCCESS, payload: token });
};

export const logOut = () => async dispatch => {

    let token = await AsyncStorage.getItem('fb_token');

    if ( token ) {
        AsyncStorage.removeItem('fb_token');
        dispatch({ type: FACEBOOK_LOG_OUT });
    }
};

export const loginUser = ({ username, password }, callback) => {
    return (dispatch) => {
        dispatch({ type: LOGIN_USER });

        firebase.auth().signInWithEmailAndPassword(username, password)
            .then(user => loginUserSuccess(dispatch, user, callback))
            .catch( () => loginUserFail(dispatch));
    };
};

const loginUserSuccess = ( dispatch, user, callback ) => {
    dispatch({
        type: LOGIN_USER_SUCCESS,
        payload: user
    });

    callback();
};

const loginUserFail = (dispatch) => {
    dispatch({
        type: LOGIN_USER_FAIL
    });
};