import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import AddImage from 'react-native-vector-icons/MaterialCommunityIcons';

class PhotoSection extends Component {

    renderPhotos() {
        // TODO: Map through photos state and render each photo horizontally
        if ( this.props.photos.length !== 0 ) {
            return this.props.photos.map((photo, key) => {
                return (
                    <View key={key}>
                        <Image source={{uri: photo.uri}} style={{height: 40, width: 40}}/>
                    </View>
                );
            });
        } else {
            return (
              <View>
                  <Text>
                      No Pictures
                  </Text>
              </View>
            );
        }
    }

    render() {
        return (
            <View>
                <View>
                    {this.renderPhotos()}
                </View>
                <View>
                    <TouchableOpacity
                    onPress={this.props.pickImage}
                    >
                        <AddImage
                        name='plus-box'
                        size={32}
                        />
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

export default PhotoSection;