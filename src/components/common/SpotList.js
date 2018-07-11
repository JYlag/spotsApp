import React, { Component } from 'react';
import { View, Text, TouchableWithoutFeedback } from 'react-native';
import { withNavigation } from 'react-navigation';
import Arrow from 'react-native-vector-icons/MaterialCommunityIcons';
import TextBody from "./TextBody";

class SpotList extends Component {
    render() {

        const { spot } = this.props;

        return (
            <View style={{flex: 1}}>
                <View style={styles.spotContainer}>
                    <View style={styles.spotStyle}>
                        <TextBody style={{ fontSize: 19, fontFamily: 'SFCompactText-Semibold' }}>{ spot.title }</TextBody>
                        <TextBody style={{ fontSize: 15, fontFamily: 'SFCompactText-LightItalic'}}>{ spot.address }</TextBody>
                    </View>
                    <View style={{ justifyContent: 'center', alignSelf: 'center'}}>
                        <TouchableWithoutFeedback
                        onPress={() => {this.props.navigation.navigate('spot', {
                            latitude: spot.latitude,
                            longitude: spot.longitude,
                            latitudeDelta: spot.latitudeDelta,
                            longitudeDelta: spot.longitudeDelta,
                            title: spot.title,
                            address: spot.address,
                            notes: spot.notes,
                            photos: spot.photos
                        })}}
                        >
                            <Arrow
                            name="chevron-right"
                            size={36}
                            />
                        </TouchableWithoutFeedback>
                    </View>
                </View>
            </View>
        );
    }
}

const styles = {
    spotContainer: {
        borderWidth: 1,
        borderColor: '#E0E0E0',
        padding: 5,
        marginHorizontal: 5,
        marginTop: 5,
        flexDirection: 'row',
        backgroundColor: '#FFFFFF',
        shadowOpacity: 0.4,
        shadowOffset: { width: 0, height: 1 },
        shadowRadius: 2,
    },
    spotStyle: {
        marginLeft: 5,
        flex: 1
    }
}

export default withNavigation(SpotList);