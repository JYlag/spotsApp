import React, { Component } from 'react';
import { View, Text, Image } from 'react-native';
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
        this.props.navigation.navigate('login');
    }

    render() {

        return (
            <View>
                <View style={styles.profilePicContainer}>
                    <View>
                        <Image style={styles.profilePicStyle}/>
                    </View>
                </View>

                <View style={{ flex: 1}}>
                    <SignOut
                    text="Sign Out"
                    buttonStyle={{ backgroundColor: '#F44336', alignSelf: 'center', borderRadius: 5}}
                    underlayColor="#D32F2F"
                    onPress={this.logOut.bind(this)}
                    />
                </View>
            </View>
        );
    }
}

export default connect(null, {logOut} )(SettingsScreen);