import React, { Component } from 'react';
import { View, Text, TouchableHighlight } from 'react-native';
import Arrow from 'react-native-vector-icons/MaterialCommunityIcons';

class OptionButton extends Component {
    render() {
        return (
            <View style={styles.optionButtonContainer}>
                <TouchableHighlight
                onPress={this.props.onPress}
                >
                    <View style={{ flexDirection: 'row', marginLeft: 10 }}>
                        <Text style={{ fontSize: 20, fontWeight: '400', flex: 1, alignSelf: 'center', justifyContent: 'center' }}>Directions to Spot</Text>
                        <View style={{ alignItems: 'center', justifyContent: 'center'}}>
                            <Arrow
                                name="chevron-right"
                                size={36}
                            />
                        </View>
                    </View>
                </TouchableHighlight>
            </View>
        );
    }
}

const styles = {
    optionButtonContainer: {
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderColor: '#E0E0E0',
        marginVertical: 3
    },

}

export default OptionButton;