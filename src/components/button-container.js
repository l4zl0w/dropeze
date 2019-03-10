import React from 'react'
import { View } from 'react-native'

const ButtonContainer = props => {
    return <View style={styles.comtainer}>{props.children}</View>
}

const styles = {
    comtainer: {
        height: 50,
        alignItems: 'center',
        justifyContent: 'center'
    }
}

export default ButtonContainer;