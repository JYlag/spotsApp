import React, { Component } from 'react';
import { View, Text, TouchableHighlight } from 'react-native';

class CancelSaveButton extends Component {
    render() {
        return (
            <View style={styles.wholeButtonStyle}>
                <TouchableHighlight
                style={[ styles.buttonStyle, { backgroundColor: '#F44336'} ]}
                underlayColor="#D32F2F"
                onPress={this.props.onPressCancel}
                >
                    <Text style={styles.buttonTextStyle}>
                        Cancel
                    </Text>
                </TouchableHighlight>
                <TouchableHighlight
                style={[ styles.buttonStyle, { backgroundColor: '#8BC34A'} ]}
                underlayColor="#689F38"
                onPress={this.props.onPressSave}
                >
                    <Text style={styles.buttonTextStyle}>
                        Save
                    </Text>
                </TouchableHighlight>
            </View>
        );
    }
}

const styles = {
    wholeButtonStyle: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        flexDirection: 'row'
    },
    buttonStyle: {
        flex: 1,
        alignItems: 'center',
        paddingVertical: 10
    },
    buttonTextStyle: {
        flex: 1,
        fontSize: 18,
        color: '#FAFAFA'
    }
}

export default CancelSaveButton;