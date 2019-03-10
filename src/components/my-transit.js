import React, { Component } from 'react'
import { Text, View } from 'react-native'
import { getPassengerProfile, getInboundTrains, setInboundTrain } from '../actions'
import { connect } from 'react-redux'
import 'localstorage-polyfill'
import { ListItem } from 'react-native-elements';
//import _ from 'lodash'


class MyTransitPage extends Component {
  componentDidMount() {
    this.props.getPassengerProfile();
    if(this.props.passenger === 'undefined' || this.props.passenger === {}) {
      this.props.navigation.navigate('Settings');
    }
    // console.log(this.props.passenger);
    //this.props.getInboundTrains.bind(null, this.props.passenger.outboundStation);
    this.props.getInboundTrains();
  }

  componentWillReceiveProps() {
    if(this.props.passenger === 'undefined' || this.props.passenger === {}) {
      this.props.getInboundTrains.bind(null, this.props.passenger.outboundStation);
    }
  }

  renderLocationAndTrainList() {
    return JSON.parse(JSON.stringify(this.props.inboundTrains)).map((train) => {
      return (
        <ListItem
          key={train.objectId}
          title={train.stationFrom + " leaving at " + train.departureTime}
          subtitle={"Destination: " + train.stationTo}
          checkmark={train.objectId == this.props.inboundTrain}
          topDivider={true}
          bottomDivider={true}
          onPress={this.props.setInboundTrain.bind(null, train.objectId, this.props.passenger.pid)}
        />
      )
    })
  }

  render() {
    return (
      <View>
        <Text>Please confirm which train you are taking on your way home:</Text>
        {this.renderLocationAndTrainList()}
      </View>
    );
  }
}

const mapStateToProps = ( state ) => {
  return {
    passenger: state.transit.passenger,
    inboundTrains: state.transit.inboundTrains,
    inboundTrain: state.transit.inboundTrain
  }
}

export default connect(mapStateToProps, { getPassengerProfile, getInboundTrains, setInboundTrain })(MyTransitPage)
