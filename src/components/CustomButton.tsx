import { Image, StyleSheet, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import { RFPercentage } from 'react-native-responsive-fontsize';
import { COLORS, FONTS } from '../config/theme';

interface Props {
  title: string;
  onPress: () => void;
  icon?: any;
  style?: object;
}

const CustomButton = (props: Props) => {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={props.onPress}
      style={[styles.button, props.style]}
    >
      {props.icon ? (
        <>
          <Image
            source={props.icon}
            resizeMode="contain"
            style={{
              width: RFPercentage(2.5),
              height: RFPercentage(2.5),
              marginRight: RFPercentage(1),
            }}
          />
        </>
      ) : null}
      <Text style={styles.text}>{props.title}</Text>
    </TouchableOpacity>
  );
};

export default CustomButton;

const styles = StyleSheet.create({
  button: {
    width: '100%',
    height: RFPercentage(6.4),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.primary,
    borderRadius: RFPercentage(2.6),
    flexDirection: 'row',
  },
  text: {
    color: COLORS.white,
    fontFamily: FONTS.bold,
    fontSize: RFPercentage(2),
  },
});
