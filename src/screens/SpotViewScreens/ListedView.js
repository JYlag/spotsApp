import _ from 'lodash';
import React, { Component } from 'react';
import { View, ListView } from 'react-native';
import { connect } from 'react-redux';
import { fetchSpots } from "../../actions/SpotActions";
import SpotList from "../../components/common/SpotList";

class ListedView extends Component {

    componentWillMount() {
        this.props.fetchSpots();
        this.createDataSource(this.props);
    }

    componentWillReceiveProps(nextProps) {
        this.createDataSource(nextProps)
    }

    createDataSource({ spots }) {
        const ds = new ListView.DataSource({
            rowHasChanged: (r1,r2) => r1 !== r2
        });

        this.dataSource = ds.cloneWithRows(spots);
    }

    renderRow(spot) {
        return <SpotList spot={spot}/>
    }

    render() {
        return (
            <View style={{ flex: 1, flexDirection: 'column' }}>
                <ListView
                    enableEmptySections
                    dataSource={this.dataSource}
                    renderRow={this.renderRow}
                />
            </View>
        );
    }
}

const mapStateToProps = state => {
    const spots = _.map(state.fetchSpots, ( val, uid ) => {
        return {...val, uid};
    });

    return { spots };
};

export default connect(mapStateToProps, { fetchSpots })(ListedView);