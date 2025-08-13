import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import React from 'react';
import { RFPercentage } from 'react-native-responsive-fontsize';
import { COLORS, FONTS, ICONS } from '../config/theme';
import { useNavigation } from '@react-navigation/native';

interface Props {
  title: string;
  style?: object;
  onPress?: () => void;
  wrapStyle? : object
}

const AuthHeader = (props: Props) => {
  const navigation = useNavigation();
  return (
    <View style={[{backgroundColor:COLORS.white, width:"100%", height:RFPercentage(13), justifyContent:"flex-end", borderBottomWidth:RFPercentage(0.1), borderBottomColor:COLORS.lightWhite, paddingBottom:RFPercentage(1.5)}, props.wrapStyle]}>
      <View style={styles.auth}>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={props.onPress ? props.onPress : () => navigation.goBack()}
        >
          <Image
            source={ICONS.back}
            resizeMode="contain"
            style={{ width: RFPercentage(2.5), height: RFPercentage(2.5) }}
          />
        </TouchableOpacity>
        <Text style={[styles.getStartedText, props.style]}>{props.title}</Text>
      </View>
    </View>
  );
};

export default AuthHeader;

const styles = StyleSheet.create({
  getStartedText: {
    color: COLORS.primary,
    fontFamily: FONTS.headline,
    fontSize: RFPercentage(2.6),
    marginLeft: RFPercentage(1),
  },
  auth: {
    width: '90%',
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf:"center"
  },
});
