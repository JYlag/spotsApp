import _ from 'lodash';
import React, { Component } from 'react';
import { AsyncStorage } from 'react-native';
import { AppLoading } from 'expo';
import { connect } from 'react-redux';
import Slides from '../../components/common/Slides';

// Immutable slide data for the welcome slides.
const SLIDE_DATA = [
    { text: 'Welcome to Spots!', color: '#03A9f4' },
    { text: "Were here to simply help you map out  and remember your favorite locations. \n\n", color: '#009688'},
    { text: "Here's how:\n\n Pinpoint your location.\n\n Tell us a little about it.\n\n Save!" , color: '#03A9F4'}
];

class WelcomeScreen extends Component {

    state = {
        token: null,
        loggedOut: false
    };

    componentWillMount() {
        this.checkToken();
    }

    componentWillReceiveProps(nextProps) {
        console.log('yo');
        this.props.navigation.navigate('auth');
        this.setState({ loggedOut: nextProps.loggedOut });
    }

    async checkToken() {
        // Check for existing token to determine render of Welcome Slides.
        let token = await AsyncStorage.getItem('fb_token');

        // If token is present, skip slides & navigate to home screen.
        if ( token ) {
            this.props.navigation.navigate('home');
        }
    }

    // Button action for completion of slides.
    onSlidesComplete() {
        this.props.navigation.navigate('main');
    }

    // Will render slides if token presence is FALSE
    render() {

        if (_.isNull(this.state.token)) {
            return <AppLoading/>;
        }

        return (
            <Slides
                data={SLIDE_DATA}
                onComplete={ this.onSlidesComplete.bind(this) }
            />
        );
    }
}

const mapStateToProps = state => {
    const { loggedOut } = state.auth;

    return { loggedOut };
}

export default connect(mapStateToProps, null)(WelcomeScreen);