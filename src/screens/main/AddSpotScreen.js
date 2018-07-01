import React, { Component } from 'react';
import { View, Text, TouchableWithoutFeedback, StatusBar, Modal } from 'react-native';
import CancelSaveButton from "../../components/common/CancelSaveButton";
import SpotPreview from "../../components/common/SpotPreview";
import AddMarkForm from "../../components/AddMarkForm/AddMarkForm";
import { connect } from 'react-redux'

import {
    spotTitleUpdate,
    spotAddressUpdate,
    spotNotesUpdate
} from "../../actions/SpotActions";

class AddSpotScreen extends Component {

    onTitleChange(text) {
        this.props.spotTitleUpdate(text);
        console.log(this.props.title);
    }

    onAddressChange(text) {
        this.props.spotAddressUpdate(text);
    }

    onNotesChange(list) {
        this.props.spotNotesUpdate(list);
    }

    render() {
        return (
            <View>
                <StatusBar hidden={true}/>
                <Modal
                    animationType="slide"
                    visible={this.props.addSpotVisible}
                    style={{ backgroundColor: '#ffffff'}}
                >
                    <SpotPreview
                        region={{
                            latitude: this.props.currentLocation.latitude,
                            longitude: this.props.currentLocation.longitude,
                            latitudeDelta: 0.005,
                            longitudeDelta: 0.005
                        }}
                    />
                    <AddMarkForm
                    onTitleChange={this.onTitleChange.bind(this)}
                    onAddressChange={this.onAddressChange.bind(this)}
                    onNotesChange={this.onNotesChange.bind(this)}
                    pickImage={this.props.pickImage}
                    photos={this.props.photos}
                    />
                    <CancelSaveButton
                        onPressCancel={this.props.onPressCancel}
                        onPressSave={this.props.onPressSave}
                    />
                </Modal>
            </View>
        );
    }
}

const mapStateToProps = state => {
    const { title } = state.spots;

    return { title };
};

export default connect(mapStateToProps, {
    spotTitleUpdate,
    spotAddressUpdate,
    spotNotesUpdate
})(AddSpotScreen);