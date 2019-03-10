import React from 'react'
import { View } from 'react-native'

const InnerSection = props => {
    return <View style={styles.comtainer}>{props.children}</View>
}

const styles = {
    comtainer: {
        marginTop: 10,
        marginBottom: 10
    }
}

export default InnerSection;