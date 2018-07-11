import React, { Component } from 'react';
import { View, Text, Image, Button, TouchableOpacity } from 'react-native';
import { ImagePicker, Permissions } from 'expo';
import images from '../../assets/images/index';
import TextBody from "./TextBody";


class AccountSection extends Component {

    state = {
        picture: images.defaultPicture,
        error: ''
    }

    pickImage = async () => {

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

    render() {
        return (
          <View style={{ borderBottomWidth: 1, borderColor: '#BDBDBD', backgroundColor: '#FFFFFF'}}>
              <View style={styles.accountContainer}>
                  <TouchableOpacity
                  title="profilePicture"
                  onPress={this.pickImage}
                  >
                    <Image source={this.state.picture} style={styles.profilePicture} />
                  </TouchableOpacity>
                  <View style={styles.profileDetailsContainer}>
                      <TextBody style={styles.nameStyle}>Joe Ylagan</TextBody>
                      <TextBody style={styles.biographyStyle}>Hi I'm from Seattle Hi I'm from Seattle Hi I'm from Seattle</TextBody>
                  </View>
              </View>
          </View>
        );
    }
}

const styles = {
    accountContainer: {
        flexDirection: 'row',
        marginLeft: 10,
        marginVertical: 10,
    },
    profilePicture: {
        width: 90,
        height: 90,
        borderRadius: 45,
        borderWidth: 1,
        borderColor: '#BDBDBD'
    },
    profileDetailsContainer: {
        marginLeft: 15,
        marginTop: 5,
        width: '70%'
    },
    nameStyle: {
        fontSize: 17,
        fontWeight: '700',
        fontFamily: 'SFCompactDisplay-Semibold'
    },
    biographyStyle: {
        marginTop: 5,
        fontSize: 12,
        fontFamily: 'SFCompactText-Light'
    }
}

export default AccountSection;
