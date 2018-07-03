import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { Permissions, ImagePicker } from 'expo';
import AddImage from 'react-native-vector-icons/MaterialCommunityIcons';
import { formPhotoUpdate } from "../../actions/FormActions";
import { connect } from 'react-redux';

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

        if (!result.cancelled) {
            //this.setState({ picture: { uri: result.uri } });
            this.state.tempPhotos.push(result.uri);
        }

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
        // TODO: Map through photos state and render each photo horizontally
        if ( this.props.photos.length !== 0 ) {
            return this.props.photos.map((photo, key) => {
                return (
                    <View key={key} style={styles.pictureStyle}>
                        <TouchableOpacity
                        onPress={this.changeImage}
                        >
                            <Image source={{uri: photo}} style={{height: 70, width: 70}}/>
                        </TouchableOpacity>
                    </View>
                );
            });
        } else {
            return (
              <View>
                  <Text style={styles.noPhoto}>
                      Photos
                  </Text>
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
        fontSize: 24,
        fontWeight: '300'
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