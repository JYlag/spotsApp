import React, { Component } from 'react';
import { View, Text, TextInput, Dimensions, TouchableOpacity} from 'react-native';
import {connect} from 'react-redux';
import {
    passwordChanged,
    usernameChanged,
    verifyChanged
} from "../../actions/AuthActions";
import LoginSignUpButton from "../../components/common/LoginSignUpButton";
import Submit from 'react-native-vector-icons/MaterialCommunityIcons';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT= Dimensions.get('window').height;

class SignUpScreen extends Component {

    static navigationOptions = ({ navigation }) => {
        return({
            headerTitle: "Add Tickets"
        });
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

    render() {
        return (
            <View style={{flex: 1, backgroundColor: '#FFB74D'}}>
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
                    <View>
                        <TouchableOpacity
                        >
                            <Submit
                            name="arrow-right-box"
                            size={40}
                            style={{ alignSelf: 'center'}}
                            color="#039BE5"
                            />
                        </TouchableOpacity>
                    </View>
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
    }
}

const mapStateToProps = state => {

    const {
        username,
        password,
        verify
    } = state.auth;

    return {
        username,
        password,
        verify
    }
}

export default connect(mapStateToProps, { usernameChanged, passwordChanged, verifyChanged })(SignUpScreen);