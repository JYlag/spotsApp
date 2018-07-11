import React, { Component } from 'react';
import { View, Text, TouchableHighlight } from 'react-native';
import Spinner from "./Spinner";
import TextBody from "./TextBody";

class LoginSignUpButton extends Component {

    state = {
        signup: this.props.signup,
        login: this.props.login
    }

    renderButton() {
        if (this.props.loading) {
            return (
                <View style={{marginBottom: 10}}>
                    <Spinner size="large"></Spinner>
                </View>
            );
        }

        return (
            <View>
                {this.renderLogin()}
                {this.renderSignup()}
            </View>
        );
    }

    renderSignup() {
        if (this.state.signup === true) {
            return (
                <TouchableHighlight
                    style={[ styles.buttonStyle, {backgroundColor: '#039BE5', borderColor: '#0288D1'} ]}
                    underlayColor="#0277BD"
                    onPress={this.props.onSignUpPress}
                >
                    <TextBody style={[styles.buttonTextStyle, this.props.buttonTextStyle]}>Sign Up</TextBody>
                </TouchableHighlight>
            );
        }

    }

    renderLogin() {
        if ( this.state.login === true) {
            return (
                <TouchableHighlight
                    style={[styles.buttonStyle, {backgroundColor: '#43A047', borderColor: '#2E7D32'}]}
                    underlayColor="#2E7D32"
                    onPress={this.props.onLoginPress}
                >
                    <TextBody style={[styles.buttonTextStyle, this.props.buttonTextStyle]}>Login</TextBody>
                </TouchableHighlight>
            )
        }
    }

    render() {
        return (
            <View style={styles.buttonContainer}>
                {this.renderButton()}
            </View>
        );
    }
}

const styles = {
    buttonContainer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0

    },
    buttonStyle: {
        flex: 1,
        paddingVertical: 10,
        borderWidth: 1,
        alignItems: 'center',
        shadowOpacity: 0.4,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 2
    },
    buttonTextStyle: {
        flex: 1,
        fontSize: 20,
        color: '#ffffff',
        fontFamily: 'Quicksand-Bold'
    }
}

export default LoginSignUpButton;