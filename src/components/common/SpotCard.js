import React , { Component } from 'react';
import { View, Text, TouchableWithoutFeedback } from 'react-native';
import { withNavigation } from 'react-navigation';
import { SCREEN_WIDTH } from "../../reducers/CONST_VALUES";
import Arrow from 'react-native-vector-icons/MaterialCommunityIcons';
import SpotPreview from "./SpotPreview";

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
                  <View style={styles.infoSection}>
                      <View style={{ flex: 1, justifyContent: 'center'}}>
                          <Text style={{ fontSize: 22 }}>{spot.title}</Text>
                      </View>
                      <TouchableWithoutFeedback
                      onPress={ () => {this.props.navigation.navigate('spot', {
                          latitude: spot.latitude,
                          longitude: spot.longitude,
                          latitudeDelta: spot.latitudeDelta,
                          longitudeDelta: spot.longitudeDelta,
                          title: spot.title,
                          address: spot.address,
                          notes: spot.notes,
                          photos: spot.photos
                      })}}
                      >
                          <Arrow
                          name="chevron-right"
                          size={36}
                          />
                      </TouchableWithoutFeedback>
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
    },
    infoSection: {
        paddingHorizontal: 10,
        paddingVertical: 8,
        backgroundColor: '#FFFFFF',
        flexDirection: 'row'
    }
}

export default withNavigation(SpotCard);