import React, { Component } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import Magnify from 'react-native-vector-icons/MaterialCommunityIcons';
import Clear from 'react-native-vector-icons/MaterialCommunityIcons';

class MapSearchBar extends Component {

    state = {
        clearText: this.props.clearText
    }

    renderClearText() {
        if ( this.state.clearText ) {
            return (
                <View style={styles.searchBarIconStyle}>
                    <TouchableOpacity
                    >
                        <Clear
                            name="close-circle"
                            size={15}
                        />
                    </TouchableOpacity>
                </View>
            );
        }
    }

    render() {
        return (
          <View style={[ styles.searchBarStyle, this.props.style ]}>
              <View style={styles.searchBarIconStyle}>
                  <Magnify
                  name="magnify"
                  size={20}
                  />
              </View>
              <TextInput
              placeholder="Search..."
              style={ styles.searchBarTextStyle }
              clearTextOnFocus={true}
              autoCorrect={false}
              />
              {this.renderClearText()}
          </View>
        );
    }
}

const styles = {
    searchBarStyle: {
        position: 'absolute',
        alignSelf: 'center',
        width: 250,
        borderWidth: 1,
        borderRadius: 5,
        borderColor: '#EEEEEE',
        backgroundColor: '#F5F5F5',
        paddingVertical: 0,
        flexDirection: 'row',
        paddingVertical: 10

    },
    searchBarIconStyle: {
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 5
    },
    searchBarTextStyle: {
        flex: 1,
        fontSize: 18,
    }
}

export default MapSearchBar;