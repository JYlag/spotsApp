import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import * as actions from '../../actions';

class FacebookLogin extends Component {

    // Calls the action creator before rendering component to pull up the Facebook Login.
    componentDidMount() {
        const navigationWillFocusListener = this.props.navigation.addListener('willFocus', () => {
            this.props.facebookLogin();
        })

        navigationWillFocusListener;
    }

    // Component will re-render with new token when updated from the AuthReducer.
    componentWillReceiveProps(nextProps) {
        this.onAuthComplete(nextProps);
    }

    // If token is generated from successful
    // log in, navigate to the home screen.
    onAuthComplete(props) {
        if (props.token) {
            this.props.navigation.navigate('welcome');
        }
    }

    render() {
        return (
            <View/>
        );
    }
}

// Receiving token generated as state and bringing in as a prop from AuthReducer.
const mapStateToProps = ({ auth }) => {
    return {token: auth.token};
}

export default connect(mapStateToProps, actions)(FacebookLogin);