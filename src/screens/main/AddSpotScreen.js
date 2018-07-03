import React, { Component } from 'react';
import { View, StatusBar } from 'react-native';
import { Permissions, ImagePicker } from 'expo';
import CancelSaveButton from "../../components/common/CancelSaveButton";
import SpotPreview from "../../components/common/SpotPreview";
import AddMarkForm from "../../components/AddMarkForm/AddMarkForm";
import { clearSpotForm } from "../../actions/FormActions";
import { connect } from 'react-redux'

import {
    spotTitleUpdate,
    spotAddressUpdate,
    spotNotesUpdate
} from "../../actions/SpotActions";

class AddSpotScreen extends Component {

    // onPress button action to cancel saving spot.
    onPressCancel() {
        this.props.navigation.navigate('map');
        this.props.clearSpotForm();
    }

    // onPress button action to complete save spot.
    onPressSave() {
        const { title, address, notes } = this.props;

        this.props.saveSpot(
            //this.props.currentLocation,
            title,
            address,
            notes
        );

        this.props.navigation.navigate('listSpots');
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <StatusBar hidden={true}/>
                <SpotPreview
                    region={{
                        latitude: this.props.latitude,
                        longitude: this.props.longitude,
                        latitudeDelta: 0.005,
                        longitudeDelta: 0.005
                    }}
                />
                <AddMarkForm/>
                <CancelSaveButton
                    onPressCancel={this.onPressCancel.bind(this)}
                    onPressSave={this.onPressSave.bind(this)}
                />
            </View>
        );
    }
}

const mapStateToProps = state => {
    const {
        latitude,
        longitude,
        latitudeDelta,
        longitudeDelta
    } = state.map;

    return {
        latitude,
        longitude,
        longitudeDelta,
        latitudeDelta
    };
};

export default connect(mapStateToProps, {
    spotTitleUpdate,
    spotAddressUpdate,
    spotNotesUpdate,
    clearSpotForm
})(AddSpotScreen);