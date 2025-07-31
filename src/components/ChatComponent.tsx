import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { RFPercentage } from 'react-native-responsive-fontsize'
import { COLORS } from '../config/theme'

const ChatComponent = () => {
  return (
    <View style={{width:'100%', borderBottomWidth:RFPercentage(0.1), borderBottomColor:COLORS.lightWhite, paddingBottom:RFPercentage(2), }}>
      <Text>ChatComponent</Text>
    </View>
  )
}

export default ChatComponent

const styles = StyleSheet.create({})