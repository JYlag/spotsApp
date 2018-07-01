import React, { Component } from 'react';
import { View, Text, Dimensions } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

class SpotPreview extends Component {

    state = {
        coordinate: {
            latitude: this.props.region.latitude,
            longitude: this.props.region.longitude
        }
    }

    render() {
        return (
          <View style={ styles.previewContainer }>
              <MapView
              region={this.props.region}
              style={[ styles.mapStyle, this.props.mapStyle]}
              scrollEnabled={false}
              >
                  <Marker
                  coordinate={this.state.coordinate}
                  />
              </MapView>
          </View>
        );
    }
}

const styles = {
    previewContainer: {
        alignSelf: 'center',
        justifyContent: 'center',
        width: SCREEN_WIDTH*0.9,
        height: SCREEN_WIDTH*0.7
    },
    mapStyle: {
        flex: 1,
        borderWidth: 1,
        marginTop: 20,
        borderColor: '#E0E0E0'
    }
}

export default SpotPreview;