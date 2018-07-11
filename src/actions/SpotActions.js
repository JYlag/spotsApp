import firebase from 'firebase';
import { options } from '../../App';
import { RNS3 } from 'react-native-aws3';
import _ from 'lodash';

//====== IMPORTED ACTION TYPES ========
import {
    SAVE_SPOT,
    SPOT_FETCH_SUCCESS
} from "../actions/types";
import {CLEAR_SPOT_FORM} from "./types";

export const saveSpot = (latitude, longitude, latitudeDelta, longitudeDelta, title='', address='', notes=[''], photos=['']) => async (dispatch) => {
    saveToFirebase(dispatch, latitude, longitude, latitudeDelta, longitudeDelta, title, address, notes, photos);
    /*return (dispatch) => {

        const post = {};

        post['latitude'] = latitude;
        post['longitude'] = longitude;
        post['latitudeDelta'] = latitudeDelta;
        post['longitudeDelta'] = longitudeDelta;
        post['title'] = title;
        post['address'] = address;
        post['notes'] = notes;

        if ( photos.length > 0 ) {

           post['photos'] = [];

           for ( var i = 0; i < photos.length; i++) {
               RNS3.put(photos[i], options).then( response => {
                   if (response.status === 201) {
                       let location = response.body.postResponse.location;
                       post['photos'].push(location);
                       console.log(post);
                   }
               });
           }

            firebase.database().ref(`users/${currentUser.uid}/spots`)
                .push(post)
                .then(() => {
                    dispatch({type: SAVE_SPOT});
                });

        } else {
            firebase.database().ref(`users/${currentUser.uid}/spots`)
                .push(post)
                .then(() => {
                    dispatch({type: SAVE_SPOT});
                });
        }
    }*/
};

export const fetchSpots = () => {
    const { currentUser } = firebase.auth();

    return (dispatch) => {
        firebase.database().ref(`users/${currentUser.uid}/spots`)
            .on( 'value', snapshot => {
                // Reverse the order of the snapshots to display newest on top.
                const feed = _.reverse(_.values(snapshot.val()));
                dispatch({ type: SPOT_FETCH_SUCCESS, payload: feed})
            });
    };
};

const saveToFirebase = async (dispatch, latitude, longitude, latitudeDelta, longitudeDelta, title, address, notes, photos) => {
    //console.log(latitude, longitude, latitudeDelta, longitudeDelta, title, address, notes, photos );
    const { currentUser } = firebase.auth();
    const post = {};

    post['latitude'] = latitude;
    post['longitude'] = longitude;
    post['latitudeDelta'] = latitudeDelta;
    post['longitudeDelta'] = longitudeDelta;
    post['title'] = title;
    post['address'] = address;
    post['notes'] = notes;
    //console.log(photos);
    //console.log(post);

    if ( photos.length > 0 ) {

        post['photos'] = [];
        //console.log(photos);

        for ( let i = 0; i < photos.length; i++) {
            console.log('this worked')
            await RNS3.put(photos[i], options).then( response => {
                if (response.status === 201) {
                    console.log(response);
                    console.log("RSN3 WOrked");
                    let location = response.body.postResponse.location;
                    post['photos'].push(location);
                }
            });
        }

        firebase.database().ref(`users/${currentUser.uid}/spots`)
            .push(post)
            .then(() => {
                dispatch({type: SAVE_SPOT});
            });

    } else {
        console.log('NO PHOTOS!');
        firebase.database().ref(`users/${currentUser.uid}/spots`)
            .push(post)
            .then(() => {
                dispatch({type: SAVE_SPOT});
            });
    }
}