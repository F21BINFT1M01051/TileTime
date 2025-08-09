import { Image, StyleSheet, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import { RFPercentage } from 'react-native-responsive-fontsize';
import { COLORS, FONTS } from '../config/theme';

interface Props {
  title: string;
  onPress: () => void;
  icon?: any;
  style?: object;
  disabled?: boolean;
  textStyle?: object;
}

const CustomButton = (props: Props) => {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={props.onPress}
      disabled={props.disabled}
      style={[styles.button, props.style]}
    >
      {props.icon ? (
        <>
          <Image source={props.icon} resizeMode="contain" style={styles.img} />
        </>
      ) : null}
      <Text style={[styles.text, props.textStyle]}>{props.title}</Text>
    </TouchableOpacity>
  );
};

export default CustomButton;

const styles = StyleSheet.create({
  button: {
    width: '100%',
    height: RFPercentage(5.5),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.primary,
    borderRadius: RFPercentage(2),
    flexDirection: 'row',
  },
  text: {
    color: COLORS.white,
    fontFamily: FONTS.bold,
    fontSize: RFPercentage(1.8),
  },
  img: {
    width: RFPercentage(2.5),
    height: RFPercentage(2.5),
    marginRight: RFPercentage(1),
  },
});
