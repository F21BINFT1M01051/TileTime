import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import React from 'react';
import { RFPercentage } from 'react-native-responsive-fontsize';
import { COLORS, FONTS, ICONS } from '../config/theme';
import { useNavigation } from '@react-navigation/native';

interface Props {
  title: string;
}

const AuthHeader = (props: Props) => {
  const navigation = useNavigation();
  return (
    <View
      style={{
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
      }}
    >
      <TouchableOpacity activeOpacity={0.8} onPress={() => navigation.goBack()}>
       <Image source={ICONS.back} resizeMode='contain' style={{width:RFPercentage(2.8), height:RFPercentage(2.8)}} />
      </TouchableOpacity>
      <Text style={styles.getStartedText}>{props.title}</Text>
    </View>
  );
};

export default AuthHeader;

const styles = StyleSheet.create({
  getStartedText: {
    color: COLORS.primary,
    fontFamily: FONTS.headline,
    fontSize: RFPercentage(2.8),
    marginLeft: RFPercentage(0.9),
  },
});
