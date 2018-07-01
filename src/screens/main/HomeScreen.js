import React, { Component } from 'react';
import { View, Text, TouchableWithoutFeedback } from 'react-native';
import Gear from 'react-native-vector-icons/MaterialCommunityIcons';

class HomeScreen extends Component {

    static navigationOptions = ({navigation}) => {
        return {
            title: "Home",
            headerRight:
                <TouchableWithoutFeedback
                    onPress={() => navigation.navigate('settings')}
                >
                    <Gear name="settings" size={22} style={{marginRight: 10}}/>
                </TouchableWithoutFeedback>
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