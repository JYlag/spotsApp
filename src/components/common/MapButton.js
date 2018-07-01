import React, { Component } from 'react';
import { Text, TouchableHighlight } from 'react-native';

class MapButton extends Component {

    state = {
        buttonColor: null
    };

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
                <Text style={styles.buttonTextStyle}>
                    {this.props.text}
                </Text>
            </TouchableHighlight>
        );
    }
}

const styles = {
    buttonStyle: {
        position: 'absolute',
        borderRadius: 25,
        width: 150,
        shadowOpacity: 0.4,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 2

    },
    buttonTextStyle: {
        alignSelf: 'center',
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: '600',
        paddingTop: 10,
        paddingBottom: 10
    }
}

export default MapButton;