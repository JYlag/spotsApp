import React, { Component } from 'react';
import { View, TextInput, Dimensions, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import {connect} from 'react-redux';
import {
    emailChanged,
    passwordChanged,
    usernameChanged,
    verifyChanged,
    resetAuthForm
} from "../../actions/AuthActions";
import TextBody from "../../components/common/TextBody";
import ArrowBack from 'react-native-vector-icons/MaterialCommunityIcons';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT= Dimensions.get('window').height;

class SignUpScreen extends Component {

    static navigationOptions = ({ navigation }) => {
        return({
            headerTitle: "Add Tickets"
        });
    }

    onEmailChange(text) {
        this.props.emailChanged(text);
    }

    onUsernameChange(text) {
        this.props.usernameChanged(text);
    }

    onPasswordChange(text) {
        this.props.passwordChanged(text);
    }

    onVerifyChange(text) {
        this.props.verifyChanged(text);
    }

    onBackPress() {
        this.props.resetAuthForm();
        this.props.navigation.navigate('login');
    }

    render() {
        return (
            <View style={{flex: 1, backgroundColor: '#FFB74D'}}>
                <View style={styles.signupContainer}>
                    <TextBody style={styles.signupTitle}> Sign up for Spots!</TextBody>
                    <TextBody style={{ fontFamily: 'SFCompactText-Light', fontSize: 18, marginTop: 10 }}>Create an account now</TextBody>
                </View>
                <View style={styles.authFieldContainer}>
                    <View style={{ marginBottom: 12 }}>
                        <TextInput
                            label="username"
                            value={this.props.username}
                            style={styles.authField}
                            placeholder="Pick a Username"
                            onChangeText={this.onUsernameChange.bind(this)}
                            spellCheck={false}
                            autoCorrect={false}
                        />
                    </View>
                    <View>
                        <TextInput
                            label="email"
                            value={this.props.email}
                            style={styles.authField}
                            placeholder="Email"
                            keyboardType="email-address"
                            onChangeText={this.onEmailChange.bind(this)}
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
                    <View>
                        <TextInput
                            secureTextEntry
                            label="verify"
                            value={this.props.verify}
                            style={styles.authField}
                            placeholder="Verify Password..."
                            onChangeText={this.onVerifyChange.bind(this)}
                            spellCheck={false}
                            autoCorrect={false}
                        />
                    </View>
                    <View style={styles.buttonStyle}>
                        <TouchableOpacity

                        >
                            <TextBody style={styles.buttonTextStyle}>Submit</TextBody>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.arrowStyle}>
                    <TouchableWithoutFeedback
                    onPress={this.onBackPress.bind(this)}>
                        <ArrowBack
                        name="arrow-left"
                        size={45}
                        />
                    </TouchableWithoutFeedback>
                </View>

            </View>
        );
    }
}

const styles = {
    signupContainer: {
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        top: 80,
        width: '80%'
    },
    signupTitle: {
        fontSize: 60,
        fontFamily: 'Quicksand-Bold'

    },
    authContainer: {
        flex: 1
    },
    authFieldContainer: {
        flexDirection: 'column',
        position: 'absolute',
        top: SCREEN_HEIGHT*0.4,
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
    buttonStyle: {
        borderWidth: 1,
        borderRadius: 3,
        borderColor: '#2E7D32',
        alignSelf: 'center',
        backgroundColor: '#43A047',
        width: '75%',
        marginTop: 10
    },
    buttonTextStyle: {
        fontSize: 22,
        fontFamily: 'SFCompactText-Regular',
        color: '#FFFFFF',
        alignSelf: 'center',
        padding: 8
    },
    arrowStyle: {
        position: 'absolute',
        left: 0,
        bottom: 0
    }
}

const mapStateToProps = state => {

    const {
        email,
        username,
        password,
        verify
    } = state.auth;

    return {
        email,
        username,
        password,
        verify
    }
}

export default connect(mapStateToProps, { usernameChanged, passwordChanged, verifyChanged, emailChanged, resetAuthForm })(SignUpScreen);