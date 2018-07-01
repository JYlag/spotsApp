import React , { Component } from 'react';
import { View, Text, Dimensions } from 'react-native';
import MapView from 'react-native-maps';
import SpotPreview from "./SpotPreview";

const SCREEN_WIDTH = Dimensions.get('window').width;

class SpotCard extends Component {

    render() {

        const { spot } = this.props;

        return (
          <View style={styles.cardContainer}>
              <View style={{ marginBottom: -5}}>
                  <SpotPreview
                  region={{
                      latitude: spot.latitude,
                      longitude: spot.longitude,
                      latitudeDelta: spot.latitudeDelta,
                      longitudeDelta: spot.longitudeDelta
                  }}
                  mapStyle={styles.mapStyle}
                  />
              </View>
              <View style={styles.infoStyle}>
                  <View style={{ paddingHorizontal: 10, paddingVertical: 8, backgroundColor: '#FFFFFF' }}>
                    <Text style={{ fontSize: 22 }}>{spot.title}</Text>
                  </View>
              </View>
          </View>
        );
    }
}

const styles = {
    cardContainer: {
        width: SCREEN_WIDTH*0.91,
        borderWidth: 1,
        borderColor: '#E0E0E0',
        borderRadius: 3,
        alignSelf: 'center',
        marginTop: 10,
        shadowOpacity: 0.4,
        shadowOffset: { width: 0, height: 1 },
        shadowRadius: 2
    },
    mapStyle: {
        borderWidth:0,
        borderColor: '#E0E0E0',
        borderRadius: 5,
        flex: 1,
        marginTop: 0
    },
    infoStyle: {
        borderTopWidth: 1,
        borderColor: '#E0E0E0',
        flexDirection: 'column'
    }
}

export default SpotCard;