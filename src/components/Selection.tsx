import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { COLORS, FONTS, ICONS } from '../config/theme';
import { RFPercentage } from 'react-native-responsive-fontsize';
import { RadioButton } from 'react-native-paper';

interface Props {
  title: string;
  subTitle: string;
  isSelected: boolean;
  onSelect: () => void;
}

const Selection = ({ title, subTitle, isSelected, onSelect }: Props) => {
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
          <Image
            source={ICONS.user}
            resizeMode="contain"
            style={styles.icon}
          />
          <RadioButton
            value="selected"
            status={isSelected ? 'checked' : 'unchecked'}
            onPress={onSelect}
            uncheckedColor={COLORS.radio}
            color={COLORS.pink}
          />
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
    marginTop: RFPercentage(1.4),
  },
  title: {
    fontFamily: FONTS.bold,
    color: COLORS.primary,
    fontSize: RFPercentage(2),
  },
  subTitle: {
    fontFamily: FONTS.regular,
    color: COLORS.lightGrey,
    fontSize: RFPercentage(1.9),
    marginTop: RFPercentage(1.4),
    lineHeight: RFPercentage(2.5),
  },
});
