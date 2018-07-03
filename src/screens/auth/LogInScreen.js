import React, { Component } from 'react';
import { View, Text, TextInput, Dimensions, Image } from 'react-native';
import LoginSignUpButton from "../../components/common/LoginSignUpButton";

import {connect} from 'react-redux';
import {
    passwordChanged,
    usernameChanged,
    loginUser
} from "../../actions/AuthActions";


const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT= Dimensions.get('window').height;

class LoginScreen extends Component {

    onUsernameChange(text) {
        this.props.usernameChanged(text);
    }

    onPasswordChange(text) {
        this.props.passwordChanged(text);
    }

    onSignUpPress() {
        this.props.navigation.navigate('signup');
    }

    onLoginPress() {
        const { username, password } = this.props;

        this.props.loginUser({ username, password}, () => {
            this.props.navigation.navigate('main')
        });

    }

    renderError() {
        if ( this.props.error ) {
            return (
              <View>
                  <Text style={styles.errorStyle}>{this.props.error}</Text>
              </View>
            );
        }
    }

    render() {
        return (
            <View style={{flex: 1, backgroundColor: '#FFB74D'}}>

                <View style={styles.logoContainer}>
                    <Image source={require('../../assets/images/SpotsFullLogo.png')} style={styles.logoStyle}/>
                </View>

                <View style={styles.authFieldContainer}>
                    <View style={{ marginBottom: 12 }}>
                        <TextInput
                        label="username"
                        value={this.props.username}
                        style={styles.authField}
                        placeholder="Phone or Email"
                        keyboardType="email-address"
                        onChangeText={this.onUsernameChange.bind(this)}
                        spellCheck={false}
                        autoCorrect={false}
                        />
                    </View>
                    <View>
                        <TextInput
                        secureTextEntry
                        label="password"
                        value={this.props.password}
                        style={styles.authField}
                        placeholder="Password..."
                        onChangeText={this.onPasswordChange.bind(this)}
                        spellCheck={false}
                        autoCorrect={false}
                        />
                    </View>
                    <View style={{ alignSelf: 'center', marginTop: 10}}>
                        {this.renderError()}
                    </View>
                </View>


                <View style={{flex:1}}>
                    <LoginSignUpButton
                    loading={this.props.loading}
                    onLoginPress={this.onLoginPress.bind(this)}
                    onSignUpPress={this.onSignUpPress.bind(this)}
                    login={true}
                    signup={true}
                    />
                </View>
            </View>
        );
    }
}

const styles = {
    authContainer: {
        flex: 1
    },
    authFieldContainer: {
        flexDirection: 'column',
        position: 'absolute',
        top: SCREEN_HEIGHT*0.5,
        left: SCREEN_WIDTH*0.2,
        right: SCREEN_WIDTH*0.2,
        zIndex: 1
    },
    authField: {
        borderWidth: 1,
        borderRadius: 3,
        borderColor: '#FFA726',
        fontSize: 15,
        padding: 8,
        backgroundColor: '#FFFFFF'
    },
    logoContainer: {
        alignSelf: 'center',
        top: 100
    },
    logoStyle: {
        height: 188,
        width: 275
    },
    errorStyle: {
        color: '#F44336'
    }
};

const mapStateToProps = state => {

    const {
        username,
        password,
        loading,
        error
    } = state.auth;

    return {
        username,
        password,
        loading,
        error
    }
}

export default connect(mapStateToProps, {
    usernameChanged,
    passwordChanged,
    loginUser
})(LoginScreen);