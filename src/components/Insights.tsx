import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { COLORS, FONTS } from '../config/theme';
import { RFPercentage } from 'react-native-responsive-fontsize';

interface Props {
    name : string;
    subText : string;
}

const Insights = (props :Props) => {
  return (
    <View
      style={{
        width: '100%',
        backgroundColor: COLORS.white,
        borderRadius: RFPercentage(2.5),
        borderWidth: RFPercentage(0.1),
        borderBottomWidth: RFPercentage(0.5),
        borderColor: COLORS.lightWhite,
        justifyContent: 'center',
        paddingVertical:RFPercentage(2.5),
        paddingHorizontal:RFPercentage(2)
      }}
    >
      <Text style={{fontFamily:FONTS.medium2, color:COLORS.primary, fontSize:RFPercentage(1.4)}}>{props.name}</Text>
      <Text style={{marginTop:RFPercentage(1.5), fontFamily:FONTS.bold, color:COLORS.primary, fontSize:RFPercentage(2.4)}}>{props.subText}</Text>
    </View>
  );
};

export default Insights;

const styles = StyleSheet.create({});
