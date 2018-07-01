import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import Close from 'react-native-vector-icons/MaterialCommunityIcons'

class CloseModalButton extends Component {

    render() {
        return (
            <TouchableOpacity
                onPress={() => {this.props.onPress()} }
                style={[
                    styles.buttonStyle,
                    this.props.buttonStyle
                ]}
            >
                <Close
                    name="close"
                    size={36}
                />
            </TouchableOpacity>
        );
    }
}

const styles = {
    buttonStyle: {
        position: 'absolute',
        shadowOpacity: 0.4,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 2,
        top: 25,
        left: 10

    }
}

export default CloseModalButton;