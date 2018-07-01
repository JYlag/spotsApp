import React, { Component } from 'react';
import { View, Text, AsyncStorage } from 'react-native';
import SignOut from "../../components/common/MapButton";
import { logOut } from "../../actions/AuthActions";
import { connect } from 'react-redux';

class SettingsScreen extends Component {

    static navigationOptions = ({ navigation }) => {
        return({
            headerTitle: "Settings"
        });
    }

    logOut() {
        this.props.logOut();
    }

    render() {

        return (
            <View style={{ flex: 1}}>
                <SignOut
                text="Sign Out"
                buttonStyle={{ backgroundColor: '#F44336', alignSelf: 'center', borderRadius: 5}}
                underlayColor="#D32F2F"
                onPress={this.logOut.bind(this)}
                />
            </View>
        );
    }
}

export default connect(null, {logOut} )(SettingsScreen);