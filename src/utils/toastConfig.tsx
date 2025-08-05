import React from 'react';
import { Text, View, StyleSheet, Dimensions } from 'react-native';
import { RFPercentage } from 'react-native-responsive-fontsize';
import { COLORS, FONTS } from '../config/theme';
const { width } = Dimensions.get('window');

const baseToastStyle = {
  borderLeftWidth: RFPercentage(1.5),
  paddingHorizontal: RFPercentage(2),
  paddingVertical: RFPercentage(2),
  borderRadius: RFPercentage(1),
  marginHorizontal: RFPercentage(2),
  width: width * 0.85,
};

type ToastProps = {
  type: any;
  text1?: string;
  text2?: string;
};

const ThemedToast = ({ type, text1, text2 }: ToastProps) => {
  const backgroundColor = COLORS.white;
  const borderLeftColor =
    type === 'success'
      ? COLORS.green
      : type === 'error'
      ? COLORS.red
      : COLORS.pink;

  return (
    <View
      style={[
        baseToastStyle,
        {
          backgroundColor,
          borderLeftColor,
          borderBottomWidth: 1,
          borderBottomColor: COLORS.lightWhite,
          borderRightWidth: 1,
          borderRightColor: COLORS.lightWhite,
          borderTopWidth: 1,
          borderTopColor: COLORS.lightWhite,
        },
      ]}
    >
      <Text style={[styles.text1, { color: COLORS.primary }]}>{text1}</Text>
      <Text style={[styles.text2, { color: COLORS.lightGrey }]}>{text2}</Text>
    </View>
  );
};

export const toastConfig = {
  success: ({ text1, text2 }: ToastProps) => (
    <ThemedToast type="success" text1={text1} text2={text2} />
  ),
  error: ({ text1, text2 }: ToastProps) => (
    <ThemedToast type="error" text1={text1} text2={text2} />
  ),
  info: ({ text1, text2 }: ToastProps) => (
    <ThemedToast type="info" text1={text1} text2={text2} />
  ),
};

const styles = StyleSheet.create({
  text1: {
    fontFamily: FONTS.semiBold,
    fontSize: RFPercentage(1.7),
  },
  text2: {
    fontFamily: FONTS.regular,
    fontSize: RFPercentage(1.5),
  },
});
