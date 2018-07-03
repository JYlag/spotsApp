import React, { Component } from 'react';
import {View, Image, Dimensions } from 'react-native';
import { Permissions, Location } from 'expo';
import MapView, { AnimatedRegion, Animated } from 'react-native-maps';
import MapButton from "../../components/common/MapButton";
import CurrentLocationButton from "../../components/common/CurrentLocationButton";
import CloseModalButton from "../../components/common/CloseModalButton";
import MapSearchBar from "../../components/common/MapSearchBar";
import { saveSpot } from "../../actions/SpotActions";
import { currentLocationChanged } from "../../actions/MapActions";
import { connect } from "react-redux";

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

class MapScreen extends Component {

    state = {
        errorMessage: null
    };

    //===== LIFECYCLE METHODS ======>

    // Fetches current location before the component renders to provide currentLocation on user.
    // Adds listener and provides a callback function when this screen is focused.
    componentDidMount() {
        const navigationWillFocusListener = this.props.navigation.addListener('willFocus', () => {
            this.getCurrentLocation();
        })

        navigationWillFocusListener;
    }

    //===== METHODS =======>

    /* onLayout helper method to pass Component height and width props to state.
    onLayout = (e) => {
        this.setState({
            mapViewHeight: e.nativeEvent.layout.height,
            mapViewWidth: e.nativeEvent.layout.width
        })
    */

    // Action handler to update region on map when cursor is moved.
    onRegionChangeComplete(changedRegion) {
        this.props.currentLocationChanged(changedRegion);
    }

    // Fetches current location and stores in in currentLocation state.
    getCurrentLocation = async () => {
        let { status } = await Permissions.askAsync(Permissions.LOCATION);

        if ( status !== 'granted') {
            this.setState({ errorMessage: 'Location access was denied.' });
        }

        let { coords } = await Location.getCurrentPositionAsync({});
        let { latitude, longitude } = coords

        // local region variable used to update the current location when called.
        var region = {
            latitude: latitude,
            longitude: longitude,
            latitudeDelta: this.props.latitudeDelta,
            longitudeDelta: this.props.longitudeDelta
        };

        this.props.currentLocationChanged(region);
    }

    //===== BUTTON PRESS HANDLERS =======>

    // Closes MapView Modal on press.
    onPressClose() {
        this.props.navigation.navigate('listSpots');
    }

    // onPress button action handler for button
    onPressMarkButton() {
        this.props.navigation.navigate('addSpot');
    }

    render() {

        let { latitude, latitudeDelta, longitude, longitudeDelta } = this.props;

        return (
            <View style={{ flex: 1 }} onLayout={this.onLayout}>
                <MapView
                style={{ flex: 1 }}
                region={{
                    latitude: latitude,
                    latitudeDelta: latitudeDelta,
                    longitude: longitude,
                    longitudeDelta: longitudeDelta
                }}
                onRegionChangeComplete={this.onRegionChangeComplete.bind(this)}
                rotateEnabled={false}
                showsUserLocation={true}
                />
                <MapSearchBar
                style={{ top: 30 }}
                />
                <CloseModalButton
                    onPress={this.onPressClose.bind(this)}
                />
                <Image source={require('../../assets/images/MapMarker.png')} style={[styles.fixedMarker, { top: SCREEN_HEIGHT*0.5 }]}/>
                <MapButton
                    text="Mark Spot"
                    onPress={this.onPressMarkButton.bind(this)}
                    buttonStyle={{ backgroundColor: '#FFA000', bottom: 25, alignSelf: 'center' }}
                    underlayColor="#FF8F00"
                />
                <CurrentLocationButton
                    buttonStyle={{ backgroundColor: '#FFA000', bottom: 25, right: 15 }}
                    onPress={this.getCurrentLocation}
                    underlayColor="#FF8F00"
                />
            </View>
        );
    }
}

const styles = {
    fixedMarker: {
        left: SCREEN_WIDTH*0.5,
        position: 'absolute',
        height: 27,
        width: 27,
        marginLeft: -27*0.5,
        marginTop: -27,
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 2
    }
}

const mapStateToProps = state => {

    const { latitude, longitude, latitudeDelta, longitudeDelta } = state.map;

    const { title, address, notes } = state.spots;

    return {
        title,
        address,
        notes,
        latitude,
        latitudeDelta,
        longitude,
        longitudeDelta
    };
};

export default connect(mapStateToProps, { saveSpot, currentLocationChanged })(MapScreen);