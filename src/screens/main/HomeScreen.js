import React, { Component } from 'react';
import { View, Text, TouchableWithoutFeedback } from 'react-native';
import Gear from 'react-native-vector-icons/MaterialCommunityIcons';

class HomeScreen extends Component {

    static navigationOptions = ({navigation}) => {
        return {
            title: "HOME",
            headerRight:
                <TouchableWithoutFeedback
                    onPress={() => navigation.navigate('settings')}
                >
                    <Gear name="settings" size={22} style={{marginRight: 10, color: '#424242'}}/>
                </TouchableWithoutFeedback>,
            headerStyle: { backgroundColor: '#FFAB40'},
            headerTitleStyle: { color: '#424242', fontFamily: 'Quicksand-Bold', fontSize: 25}
        }
    }

    render() {
        return (
            <View>
            </View>
        );
    }
}

export default HomeScreen;