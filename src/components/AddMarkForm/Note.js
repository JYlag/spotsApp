import React, { Component } from 'react';
import { View, Text, Dimensions } from 'react-native';
import { SCREEN_WIDTH } from "../../reducers/CONST_VALUES";
import BulletPoint from 'react-native-vector-icons/Octicons';
import TextBody from "../common/TextBody";

class Note extends Component {
    render() {
        return (
            <View style={styles.noteContainer}>
                <View>
                    <BulletPoint
                    name="primitive-dot"
                    size={16}
                    />
                </View>
                <View>
                    <TextBody style={[styles.noteTextStyle, this.props.noteTextStyle]}>{this.props.note}</TextBody>
                </View>
            </View>
        );
    }
}

const styles = {
    noteContainer: {
        flexDirection: 'row',
        width: SCREEN_WIDTH*0.85
    },
    noteTextStyle: {
        paddingLeft: 5,
        paddingBottom: 5
    }
}

export default Note;