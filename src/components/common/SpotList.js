import React, { Component } from 'react';
import { View, Text, TouchableWithoutFeedback } from 'react-native';
import Arrow from 'react-native-vector-icons/MaterialCommunityIcons';

class SpotList extends Component {
    render() {

        const { spot } = this.props;

        return (
            <View style={{flex: 1}}>
                <View style={styles.spotContainer}>
                    <View style={styles.spotStyle}>
                        <Text style={{ fontSize: 20, fontWeight: '600' }}>Test</Text>
                        <Text style={{ fontSize: 15, fontWeight: '300'}}>Location</Text>
                    </View>
                    <View style={{ justifyContent: 'center', alignSelf: 'center'}}>
                        <TouchableWithoutFeedback
                        onPress={() => {console.log('hi')}}
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

export default SpotList;