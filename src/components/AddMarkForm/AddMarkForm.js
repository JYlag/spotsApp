import React, { Component } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import NotesList from "./NotesList";
import Title from 'react-native-vector-icons/MaterialCommunityIcons';
import Address from 'react-native-vector-icons/MaterialCommunityIcons';
import PhotoSection from "./PhotoSection";

class AddMarkForm extends Component {
    render() {
        return (
            <View style={styles.formContainer}>
                <View style={[styles.sectionContainer, { paddingTop: 10, paddingBottom: 5 }]}>
                    <View style={styles.iconContainer}>
                        <Title
                        name="format-title"
                        size={26}
                        />
                    </View>
                    <TextInput
                    placeholder="Title"
                    style={styles.titleStyle}
                    onChangeText={value => {this.props.onTitleChange(value)}}
                    autoCorrect={false}
                    />
                </View>
                <View style={[ styles.sectionContainer, { paddingVertical: 5 }]}>
                    <View style={styles.iconContainer}>
                        <Address
                        name="map-marker"
                        size={26}
                        />
                    </View>
                    <TextInput
                    placeholder="Address"
                    style={styles.addressStyle}
                    onChangeText={value => {this.props.onAddressChange(value)}}
                    autoCorrect={false}
                    />
                </View>
                <View style={{ borderBottomWidth: 1, borderColor: '#BDBDBD'}}>
                    <NotesList/>
                </View>

                <View style={{ marginHorizontal: 10, flexDirection: 'row'}}>
                    <PhotoSection
                    pickImage={this.props.pickImage}
                    photos={this.props.photos}
                    />
                </View>
            </View>
        );
    }
}

const styles = {
    sectionContainer: {
        borderBottomWidth: 1,
        borderColor: '#E0E0E0',
        flexDirection: 'row'
    },
    titleStyle: {
        fontSize: 20,
        fontWeight: '500',
        marginHorizontal: 10,
        flex: 1
    },
    addressStyle: {
        fontSize: 15,
        marginHorizontal: 10,
        flex: 1
    },
    formContainer: {
        flex: 1
    },
    iconContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 5
    },
    uploadStyle: {
        borderWidth: 1,
        borderRadius: 5
    }
}

export default AddMarkForm;