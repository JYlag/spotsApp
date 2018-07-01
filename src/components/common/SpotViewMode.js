import React, { Component } from 'react';
import { View, TouchableWithoutFeedback } from 'react-native';
import ListView from 'react-native-vector-icons/MaterialCommunityIcons';
import CardView from 'react-native-vector-icons/MaterialCommunityIcons';
import GridView from 'react-native-vector-icons/MaterialCommunityIcons';

class SpotViewMode extends Component {
    render() {
        return (
            <View style={styles.containerStyle}>
                <TouchableWithoutFeedback
                onPress={this.props.listPress}
                >
                    <ListView name="menu" size={27}/>
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback
                onPress={this.props.cardPress}
                >
                    <CardView name="square" size={27} style={{ marginHorizontal: 8 }}/>
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback
                onPress={this.props.gridPress}
                >
                    <GridView name="view-grid" size={27}/>
                </TouchableWithoutFeedback>
            </View>
        );
    }
}

const styles = {
    containerStyle: {
        marginHorizontal: 0,
        justifyContent: 'space-around',
        borderBottomWidth: 1,
        borderColor: '#BDBDBD',
        flexDirection: 'row',
        paddingBottom: 3,
        marginTop: 5
    }
}
export default SpotViewMode;