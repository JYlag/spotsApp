import React, { Component } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, Dimensions} from 'react-native';
import Modal from 'react-native-modal';
import Plus from 'react-native-vector-icons/MaterialCommunityIcons';
import Note from "./Note";
import Check from 'react-native-vector-icons/MaterialCommunityIcons';
import Cancel from 'react-native-vector-icons/MaterialCommunityIcons';
import { formNoteUpdate } from "../../actions/FormActions";
import { connect } from 'react-redux'

const SCREEN_HEIGHT = Dimensions.get('window').height;

class NotesList extends Component {

    state = {
        notes: [],
        note: '',
        add: false,
        noteModalHeight: 0
    }

    //===== BUTTON PRESS HANDLERS =====>

    // Initializes modal to add a note.
    onAddPress() {
        this.setState({ add: true });
    }

    // Handler to submit the note.
    // NOTE: Does not save the note until the SAVE button is pressed.
    onSubmitNote() {
        this.state.notes.push(this.state.note);
        this.props.formNoteUpdate(this.state.notes);
        this.setState({ note: '' });
        this.setState({ add: false });
    }

    // Handler to cancel any submission of a note.
    onNoteCancel() {
        this.setState({ add: false, note: '' });
    }

    //===== HELPER METHODS ======>

    // Helper method used to grab the height of the note input modal view.
    onLayout = (e) => {
            this.setState({
            noteModalHeight: e.nativeEvent.layout.height,
        })
    }

    //===== RENDER FUNCTIONS =====>

    // Renders Modal to add a note.
    renderNoteModal() {
            return (
                <View>
                    <Modal
                        style={{ justifyContent: 'flex-end', margin: 0 }}
                        isVisible={this.state.add}
                        avoidKeyboard={true}
                        animationOutTiming={1000}
                    >
                        <View style={styles.modalStyle}>
                            <View onLayout={this.onLayout} style={{ flexDirection: 'row', height: SCREEN_HEIGHT*0.25  }}>
                                <TextInput
                                style={[ styles.noteInputStyle, { height: this.state.noteModalHeight }]}
                                value={this.state.note}
                                onChangeText={ value => {this.setState({ note: value})} }
                                placeholder="Enter Note..."
                                multiline={true}
                                />
                                <View style={{ marginLeft: 5}}>
                                    <TouchableOpacity
                                    style={{ marginBottom: 5 }}
                                    >
                                        <Check
                                        name="check"
                                        size={30}
                                        onPress={this.onSubmitNote.bind(this)}
                                        />
                                    </TouchableOpacity>
                                    <TouchableOpacity>
                                        <Cancel
                                        name="close"
                                        size={30}
                                        onPress={this.onNoteCancel.bind(this)}
                                        />
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    </Modal>
                </View>
            );
    }

    // Renders the submitted notes.
    renderNotesList() {
        if ( this.props.notes.length > 0 ) {
            return this.props.notes.map( note => {
                return (
                    <Note
                    key={note}
                    note={note}
                    />
                );
            });
        }
    }

    render() {
        return (
            <View>
                <View style={styles.notesContainer}>
                    <View style={{ flexDirection: 'row'}}>
                        <Text style={styles.notesHeader}>Notes</Text>
                        <View style={{ alignSelf: 'center', justifyContent: 'center' }}>
                            <TouchableOpacity
                            onPress={this.onAddPress.bind(this)}
                            >
                                <Plus
                                name="plus"
                                size={30}
                                />
                            </TouchableOpacity>
                        </View>
                    </View>

                    <View style={styles.noteSection}>
                        <ScrollView>
                            {this.renderNotesList()}
                            {this.renderNoteModal()}
                        </ScrollView>
                    </View>
                </View>
            </View>
        );
    }
}

const styles = {
    notesContainer: {
        marginTop: 10,
        marginHorizontal: 10
    },
    notesHeader: {
        fontSize: 24,
        fontWeight: '300'
    },
    modalStyle: {
        backgroundColor: 'white',
        paddingHorizontal: 20,
        paddingVertical: SCREEN_HEIGHT*0.01,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 4,
        borderColor: 'rgba(0, 0, 0, 0.1)'
    },
    noteInputStyle: {
        borderWidth: 1,
        borderColor: '#BDBDBD',
        flex: 1,
        paddingLeft: 5
    },
    noteSection: {
        height: 150
    }
}

const mapStateToProps = state => {
    const { note, notes } = state.form;

    return { note, notes };
}

export default connect(mapStateToProps, { formNoteUpdate })(NotesList);