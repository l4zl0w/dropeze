import React, { Component } from 'react'
import { Text, View } from 'react-native'

export default class header extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.text}> {this.props.title} </Text>
      </View>
    )
  }
}

const styles = {
    container: {
        backgroundColor : '#fafbfc',
        paddingTop: 24,
        alignItems: 'center',
        borderBottomColor: '#ddd',
        borderBottomWidth: 2
    },

    text: {
      fontSize: 18,
      fontWeight: 'bold',
      textAlign: 'center',
      margin: 13
    }
}