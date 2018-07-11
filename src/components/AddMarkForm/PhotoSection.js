import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { Permissions, ImagePicker } from 'expo';
import AddImage from 'react-native-vector-icons/MaterialCommunityIcons';
import { formPhotoUpdate } from "../../actions/FormActions";
import { RNS3 } from 'react-native-aws3';
import { connect } from 'react-redux';
import TextBody from "../common/TextBody";

class PhotoSection extends Component {

    state = {
        tempPhotos: []
    };

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

        // IF photo is chosen, we will create an image object containing
        // File name, file type, and URI and then sending it to the reducer.
        if (!result.cancelled) {
            console.log(result);
            const uri = result.uri;
            const ext = uri.substr(uri.lastIndexOf('.') + 1);
            const name = Math.round(new Date()/1000);
            let image = {
                name: name+"."+ext,
                type: result.type+"/"+ext,
                uri
            };
            this.state.tempPhotos.push(image);
        }

        // Additional setState call to rerender component.
        this.setState({ tempPhotos: this.state.tempPhotos});

        this.props.formPhotoUpdate(this.state.tempPhotos);
    };

    changeImage = async () => {

        let { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);

        if ( status !== 'granted') {
            this.setState({ error: 'Camera Roll access was denied.' });
        }

        let result = await ImagePicker.launchImageLibraryAsync({
            allowsEditing: true,
            aspect: [4, 3],
        });

        if (!result.cancelled) {
            this.setState({ picture: { uri: result.uri } });
        }
    };

    renderPhotos() {
        if ( this.props.photos.length !== 0 ) {
            return this.props.photos.map((photo, key) => {
                return (
                    <View key={key} style={styles.pictureStyle}>
                        <TouchableOpacity
                        onPress={this.changeImage}
                        >
                            <Image source={{uri: photo.uri}} style={{height: 70, width: 70}}/>
                        </TouchableOpacity>
                    </View>
                );
            });
        } else {
            return (
              <View>
                  <TextBody style={styles.noPhoto}>
                      Photos
                  </TextBody>
              </View>
            );
        }
    }

    renderAdd() {
        if (this.props.photos.length <= 3) {
            return (
                <View style={styles.uploadStyle}>
                    <TouchableOpacity
                        onPress={this.pickImage}
                    >
                        <AddImage
                            name='plus'
                            size={30}
                        />
                    </TouchableOpacity>
                </View>
            );
        }
    }

    render() {
        return (
            <View style={styles.photoSectionContainer}>
                <View style={{ flexDirection: 'row'}}>
                    {this.renderPhotos()}
                </View>
                {this.renderAdd()}
            </View>
        );
    }
}

const styles = {
    photoSectionContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around'
    },
    noPhoto: {
        fontSize: 24
    },
    pictureStyle: {
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#BDBDBD',
        marginTop: 10,
        marginLeft: 5
    },
    uploadStyle: {
        alignItems: 'center',
        justifyContent: 'center'
    }
}

const mapStateToProps = state => {

    const { photos } = state.form;

    return { photos };
};

export default connect(mapStateToProps, { formPhotoUpdate })(PhotoSection);