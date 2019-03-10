import React, { Component } from 'react'
import { Text, View, CheckBox } from 'react-native'
import { getOutBoundTrains, baseLocationInputChange, outboundTrainTimeInputChange, saveSettings } from '../actions';
import InnerSection from './inner-section';
import ButtonContainer from './button-container';
import { connect } from 'react-redux';
import { ListItem } from 'react-native-elements';
import _ from 'lodash';

class Settings extends Component {

  componentDidMount() {
    this.props.getOutBoundTrains();
  }

  renderLocationAndTrainList() {
    return JSON.parse(JSON.stringify(this.props.outboundTrains)).map((train) => {
      return (
        <ListItem
          key={train.objectId}
          title={train.stationFrom + " leaving at " + train.departureTime}
          subtitle={"Destination: " + train.stationTo}
          checkmark={train.stationFrom == this.props.passenger.outboundStation && train.departureTime == this.props.passenger.outboundTrainTime}
          topDivider={true}
          bottomDivider={true}
          onPress={this.props.saveSettings.bind(null, this.props.passenger, train)}
        />
      )
    })
  }

  render() {
    return (
      <View>
        {this.renderLocationAndTrainList()}
      </View>
    )
  }
}

const mapStateToProps = state => {
    return {
        passenger: state.transit.passenger,
        outboundTrains: state.transit.outboundTrains
    }
  }
  
export default connect(mapStateToProps, { getOutBoundTrains, saveSettings })(Settings)