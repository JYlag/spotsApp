import React, { Component } from 'react';
import {View, Image, Dimensions, Modal, StatusBar} from 'react-native';
import { Permissions, Location, ImagePicker } from 'expo';
import MapView, { AnimatedRegion, Animated } from 'react-native-maps';
import MapButton from "../../components/common/MapButton";
import CurrentLocationButton from "../../components/common/CurrentLocationButton";
import CloseModalButton from "../../components/common/CloseModalButton";
import MapSearchBar from "../../components/common/MapSearchBar";
import AddSpotScreen from "./AddSpotScreen";
import { saveSpot } from "../../actions/SpotActions";
import { connect } from "react-redux";

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

class MapScreen extends Component {

    state = {
        currentLocation: {
            latitude: 0,
            longitude: 0,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421
        },
        coordinate: new AnimatedRegion({
            latitude: 0,
            longitude: 0
        }),
        addSpotVisible: false,
        photos: [],
        errorMessage: null,
    };

    //===== LIFECYCLE METHODS ======>

    // Fetches current location before the component renders to provide currentLocation on user.
    // Adds listener and provides a callback function when this screen is focused.
    componentDidMount() {
        const navigationWillFocusListener = this.props.navigation.addListener('willFocus', () => {
            this.setState({ visible: true });
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
        let { latitude, longitude } = changedRegion;
        this.setState({ coordinate: { latitude, longitude }});
        this.setState({ currentLocation: changedRegion });
    }

    // Render adding a spot screen.
    renderAddModal() {
        if ( this.state.addSpotVisible ) {
            return (
                <AddSpotScreen
                addSpotVisible={this.state.addSpotVisible}
                currentLocation={this.state.currentLocation}
                onPressCancel={this.onPressCancel.bind(this)}
                onPressSave={this.onPressSave.bind(this)}
                pickImage={this.pickImage.bind(this)}
                photos={this.state.photos}
                />
            );
        }
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
            latitudeDelta: this.state.currentLocation.latitudeDelta,
            longitudeDelta: this.state.currentLocation.longitudeDelta
        };

        this.setState({ currentLocation: region });
        this.setState({ coordinate: {latitude, longitude} });
    }

    pickImage = async () => {

        let { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);

        if ( status !== 'granted') {
            this.setState({ errorMessage: 'Camera Roll access was denied.' });
        }

        this.setState({ addSpotVisible: false });

        let result = await ImagePicker.launchImageLibraryAsync({
            allowsEditing: true,
            aspect: [4, 3],
        });

        if (!result.cancelled) {
            //this.setState({ picture: { uri: result.uri } });
            this.state.photos.push('uri', result.uri);
        }

        console.log(this.state.photos);
    };

    //===== BUTTON PRESS HANDLERS =======>

    // Closes MapView Modal on press.
    onPressClose() {
        this.props.navigation.navigate('listSpots');
    }

    // onPress button action handler for button
    onPressMarkButton() {
        this.setState({ addSpotVisible: true });
    }

    // onPress button action to cancel saving spot.
    onPressCancel() {
        this.setState({ addSpotVisible: false });
    }

    // onPress button action to complete save spot.
    onPressSave() {
        const { title, address, notes } = this.props;

        this.props.saveSpot(
            this.state.currentLocation,
            title,
            address,
            notes
        );
        this.setState({ addSpotVisible: false });
        this.props.navigation.navigate('listSpots');
    }

    render() {
        return (
            <View style={{ flex: 1 }} onLayout={this.onLayout}>
                <MapView
                style={{ flex: 1 }}
                region={ this.state.currentLocation }
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
                {this.renderAddModal()}
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
    const { title, address, notes } = state.spots;

    return {
        title,
        address,
        notes
    };
};

export default connect(mapStateToProps, { saveSpot })(MapScreen);