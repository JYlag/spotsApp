import React, { Component } from 'react';
import { View, Text, TouchableHighlight, Image } from 'react-native';
import Arrow from 'react-native-vector-icons/MaterialCommunityIcons'

class CurrentLocationButton extends Component {

    render() {
        return (
            <TouchableHighlight
            onPress={() => {this.props.onPress()} }
            underlayColor={this.props.underlayColor}
            activeOpacity={1}
            style={[
                styles.buttonStyle,
                this.props.buttonStyle
            ]}
            >
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                    <Arrow
                    name="crosshairs-gps"
                    size={26}
                    color="#ffffff"
                    />
                </View>
            </TouchableHighlight>
        );
    }
}

const styles = {
    buttonStyle: {
        position: 'absolute',
        borderRadius: 0,
        width: 40,
        height: 40,
        shadowOpacity: 0.4,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 2,
        bottom: 25

    }
}

export default CurrentLocationButton;