import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { RFPercentage } from 'react-native-responsive-fontsize';
import { COLORS, FONTS, ICONS } from '../config/theme';

interface Props {
  title: string;
  subTitle: string;
  onPress: () => void;
}

const NextCard = (props: Props) => {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={props.onPress}
      style={styles.container}
    >
      <View style={styles.innerWrapper}>
        <View style={styles.textWrapper}>
          <Text style={styles.title}>{props.title}</Text>
          <Text style={styles.subTitle}>{props.subTitle}</Text>
        </View>
        <TouchableOpacity activeOpacity={0.8} onPress={props.onPress}>
          <Image source={ICONS.right} resizeMode="contain" style={styles.icon} />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

export default NextCard;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    borderWidth: RFPercentage(0.1),
    borderColor: COLORS.lightWhite,
    backgroundColor: COLORS.white,
    paddingVertical: RFPercentage(1.6),
    borderRadius: RFPercentage(1.6),
    marginTop: RFPercentage(2),
  },
  innerWrapper: {
    width: '90%',
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  textWrapper: {
    width: '80%',
  },
  title: {
    color: COLORS.primary,
    fontFamily: FONTS.bold,
    fontSize: RFPercentage(2),
  },
  subTitle: {
    color: COLORS.lightGrey,
    fontFamily: FONTS.regular,
    fontSize: RFPercentage(1.8),
    marginTop: RFPercentage(1.2),
    lineHeight: RFPercentage(1.9),
  },
  icon: {
    width: RFPercentage(1.3),
    height: RFPercentage(1.3),
  },
});
