import React, { Component } from 'react';
import { View, Text } from 'react-native';
import Fonts from '../../assets/fonts/index';
import { Font } from 'expo';

class TextBody extends Component {

    state = {
        fontLoading: false
    }

    async componentWillMount() {
        await Font.loadAsync(Fonts);

        this.setState({ fontLoading: true });
    }

    renderText() {
        if ( this.state.fontLoading === true ) {
            return (
                <View>
                    <Text style={[styles.textStyle, this.props.style]}>{this.props.children}</Text>
                </View>
            );
        }
    }

    render() {
        return (
            <View>
                {this.renderText()}
            </View>
        );
    }
}

const styles = {
    textStyle: {
        fontFamily: 'SFCompactText-Light'
    }
}

export default TextBody;