import _ from 'lodash';
import React, { Component } from 'react';
import { View, Text, ListView } from 'react-native';
import SpotViewMode from "../../components/common/SpotViewMode";
import CardView from "../SpotViewScreens/CardView";
import ListedView from "../SpotViewScreens/ListedView";
import AccountSection from "../../components/common/AccountSection";

class ListSpotsScreen extends Component {

    state = {
        listView: false,
        cardView: true,
        gridView: false
    };

    static navigationOptions = ({navigation}) => {
        return {
            title: "MY SPOTS",
            headerStyle: { backgroundColor: '#FF9100'},
            headerTitleStyle: { color: '#F5F5F5' }
        }
    };

    listPress() {
        this.setState({ listView: true, cardView: false, gridView: false });
    }

    cardPress() {
        this.setState({ listView: false, cardView: true, gridView: false });
    }

    gridPress() {
        this.setState({ listView: false, cardView: false, gridView: true });
    }

    renderView() {
        if ( this.state.listView === true ) {
            return <ListedView/>;
        } else if ( this.state.cardView === true ) {
            return <CardView/>;
        } else if ( this.state.gridView === true ) {
            return null;
        } else {
            return console.log('Error');
        }
    }

    render() {
        return (
            <View style={{ flex: 1, flexDirection: 'column', backgroundColor: '#F5F5F5' }}>
                <AccountSection/>
                <SpotViewMode
                listPress={this.listPress.bind(this)}
                cardPress={this.cardPress.bind(this)}
                gridPress={this.gridPress.bind(this)}
                />
                {this.renderView()}
            </View>
        );
    }
}

export default ListSpotsScreen;