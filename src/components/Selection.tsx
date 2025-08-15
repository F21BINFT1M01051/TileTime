import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { COLORS, FONTS, ICONS } from '../config/theme';
import { RFPercentage } from 'react-native-responsive-fontsize';

interface Props {
  title: string;
  subTitle: string;
  isSelected: boolean;
  onSelect: () => void;
  icon : any
}

const Selection = ({ title, subTitle, isSelected, onSelect, icon }: Props) => {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onSelect}
      style={[
        styles.container,
        { borderColor: isSelected ? COLORS.pink : COLORS.lightWhite },
      ]}
    >
      <View style={styles.innerWrapper}>
        <View style={styles.header}>
          <Image source={icon} resizeMode="contain" style={styles.icon} />
          <TouchableOpacity
            onPress={onSelect}
            style={[
              styles.radioButton,
              {
                borderColor: isSelected ? COLORS.pink : COLORS.radio,
                backgroundColor: isSelected ? 'transparent' : COLORS.radio2,
              },
            ]}
          >
            {isSelected && <View style={styles.radioDot} />}
          </TouchableOpacity>
        </View>
        <View style={styles.textWrapper}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.subTitle}>{subTitle}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default Selection;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: COLORS.white,
    borderWidth: 1,
    alignItems: 'center',
    borderRadius: RFPercentage(1.7),
    paddingVertical: RFPercentage(1.8),
    marginTop: RFPercentage(2),
  },
  innerWrapper: {
    width: '90%',
    alignSelf: 'center',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  icon: {
    width: RFPercentage(3.5),
    height: RFPercentage(3.5),
  },
  textWrapper: {
    marginTop: RFPercentage(1.8),
  },
  title: {
    fontFamily: FONTS.bold,
    color: COLORS.primary,
    fontSize: RFPercentage(2),
  },
  subTitle: {
    fontFamily: FONTS.regular,
    color: COLORS.lightGrey,
    fontSize: RFPercentage(1.8),
    marginTop: RFPercentage(1.4),
    lineHeight: RFPercentage(2.3),
  },
  radioButton: {
    width: RFPercentage(3),
    height: RFPercentage(3),
    borderRadius: RFPercentage(100),
    borderWidth: RFPercentage(0.1),
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioDot: {
    width: RFPercentage(2),
    height: RFPercentage(2),
    borderRadius: RFPercentage(100),
    backgroundColor: COLORS.pink,
  },
});
