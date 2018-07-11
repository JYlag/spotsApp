import React, { Component } from 'react';
import { View, Text, ScrollView, Image } from 'react-native';
import { Permissions, Location } from 'expo';
import MapView, { Marker } from 'react-native-maps';
import { withNavigation } from 'react-navigation';
import { OpenMapDirections } from 'react-native-navigation-directions';
import OptionButton from "./common/OptionButton";
import Note from "./AddMarkForm/Note";
import { SCREEN_WIDTH } from "../reducers/CONST_VALUES";

class Spot extends Component {

    state = {
        latitude: null,
        longitude: null
    }

    // ===== LIFECYCLE METHODS ======

    // Will grab the currentLocation before component is rendered.
    // For 'Directions To' functionality.
    componentWillMount() {
        this.getCurrentLocation;
    }

    // ===== HELPER FUNCTIONS =====

    // Renders notes that were passed in specifically for this spot.
    renderNotes() {
        let notes = this.props.navigation.getParam('notes');

        if ( notes ) {
            return notes.map( note => {
                return (
                    <Note
                        key={note}
                        note={note}
                        noteTextStyle={{ fontSize: 15}}
                    />
                );
            });
        }
    }

    // Renders each photo that is passed in specifically for this spot.
    renderPhotos() {
        let photos = this.props.navigation.getParam('photos');

        if ( photos ) {
            return photos.map( photo => {
                return (
                    <View key={photo}>
                        <Image source={{ uri: photo}} style={styles.photoStyle}/>
                    </View>
                );
            });
        }
    }

    // Grabs current location-- Used for starting point when getting directions.
    getCurrentLocation = async () => {
        let { status } = await Permissions.askAsync(Permissions.LOCATION);

        if ( status !== 'granted') {
            this.setState({ errorMessage: 'Location access was denied.' });
        }

        let { coords } = await Location.getCurrentPositionAsync({});
        let { latitude, longitude } = coords

        this.setState({ latitude, longitude });
    }

    ///////
    // Function called to initiate navigation to Maps Application on iOS.
    // Uses current location and location of spot for starting and ending point
    // Static method of transportation declared as driving.
    // 'd' = driving
    // 'w' = walking
    // 'r' = public transit
    ////////
    goToDirections() {
        const startPoint = {
            latitude: this.state.latitude,
            longitude: this.state.longitude
        }
        const endPoint = {
            latitude: this.props.navigation.getParam('latitude'),
            longitude: this.props.navigation.getParam('longitude')
        }
        const transportPlan = 'd';

        OpenMapDirections(startPoint, endPoint, transportPlan);
    }

    // ================================

    render() {

        // Deconstruct Parameters passed by the previous screen for use.
        const { getParam } = this.props.navigation;

        return (
            <View style={{ flex: 1, backgroundColor: '#FFFFFF' }}>
                <ScrollView>
                    <View styles={styles.spotSection}>
                        <View style={styles.mapContainer}>
                            <MapView
                            region={{
                                latitude: getParam('latitude'),
                                longitude: getParam('longitude'),
                                latitudeDelta: 0.005,
                                longitudeDelta: 0.005
                            }}
                            scrollEnabled={false}
                            zoomEnabled={false}
                            style={styles.mapStyle}
                            >
                                <Marker
                                coordinate={{
                                    latitude: getParam('latitude'),
                                    longitude: getParam('longitude')
                                }}
                                />
                            </MapView>
                        </View>
                        <View style={styles.spotTextContainer}>
                            <Text style={{ fontSize: 24, fontFamily: 'Quicksand-Bold'}}>{getParam('title')}</Text>
                            <Text style={{ fontSize: 18, fontFamily: 'SFCompactText-RegularItalic'}}>{getParam('address')}</Text>
                            <Text style={{ fontSize: 14, fontFamily: 'SFCompactText-LightItalic'}}>Date Saved</Text>
                        </View>
                    </View>

                    <View style={styles.noteSection}>
                        <Text style={{ fontSize: 24, fontFamily: 'SFCompactText-Bold'}}>Notes</Text>
                        <View style={styles.noteContainer}>
                            {this.renderNotes()}
                        </View>
                    </View>

                    <View style={styles.photoSection}>
                        <Text style={{ fontSize: 24, fontFamily: 'SFCompactText-Bold'}}>Photos</Text>
                        <View style={styles.photoContainer}>
                            {this.renderPhotos()}
                        </View>
                    </View>

                    <OptionButton
                    buttonText="Directions to Spot"
                    onPress={this.goToDirections.bind(this)}
                    buttonTextStyle={{ fontFamily: 'SFCompactText-Bold'}}
                    />
                    <OptionButton
                        buttonText="Share Spot"
                        onPress={() => {console.log('hi')}}
                        buttonTextStyle={{ fontFamily: 'SFCompactText-Bold'}}
                    />

                </ScrollView>
            </View>
        );
    }
}

const styles = {
    spotSection: {
        flexDirection: 'row'
    },
    mapContainer: {
        height: 200,
        width: SCREEN_WIDTH,
        alignSelf: 'center',
        borderBottomWidth: 1,
        borderColor: '#E0E0E0'
    },
    mapStyle: {
        flex: 1
    },
    spotTextContainer: {
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 8,
        borderBottomWidth: 1,
        borderColor: '#E0E0E0'
    },
    noteSection: {
        borderBottomWidth: 1,
        borderColor: '#E0E0E0',
        paddingHorizontal: 10,
        paddingVertical: 8,
        height: 150
    },
    noteContainer: {
        marginVertical: 5
    },
    photoSection: {
        paddingHorizontal: 10,
        paddingVertical: 8
    },
    photoContainer: {
        marginVertical: 5
    },
    photoStyle: {
        height: 150,
        width: 150,
        borderRadius: 5
    }
}

export default withNavigation(Spot);