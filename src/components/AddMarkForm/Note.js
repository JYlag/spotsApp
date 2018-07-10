import React, { Component } from 'react';
import { View, Text, Dimensions } from 'react-native';
import { SCREEN_WIDTH } from "../../reducers/CONST_VALUES";
import BulletPoint from 'react-native-vector-icons/Octicons';

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
                    <Text style={{ paddingLeft: 5, paddingBottom: 5 }}>{this.props.note}</Text>
                </View>
            </View>
        );
    }
}

const styles = {
    noteContainer: {
        flexDirection: 'row',
        width: SCREEN_WIDTH*0.85
    }
}

export default Note;