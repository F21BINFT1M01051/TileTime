import { Image, StyleSheet, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import { RFPercentage } from 'react-native-responsive-fontsize';
import { COLORS, FONTS, ICONS } from '../config/theme';
import { useNavigation } from '@react-navigation/native';

interface Props {
  name: string;
  icon: any;
  navigation: string;
  color: string;
  borderColor: string;
}

const SocialField = (props: Props) => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={() => {}}
      style={[styles.container]}
    >
      {props.icon && (
        <Image source={props.icon} resizeMode="contain" style={styles.icon} />
      )}

      <Text
        style={[
          styles.text,
          { color: props.color ? props.color : COLORS.black },
        ]}
      >
        {props.name}
      </Text>
    </TouchableOpacity>
  );
};

export default SocialField;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: RFPercentage(6.8),
    backgroundColor: COLORS.white,
    borderWidth: RFPercentage(0.1),
    borderColor: COLORS.borderColor,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    borderRadius: RFPercentage(2.4),
    marginTop: RFPercentage(2.3),
  },
  icon: {
    width: RFPercentage(3.2),
    height: RFPercentage(3.2),
    marginRight: RFPercentage(1.5),
  },
  text: {
    fontFamily: FONTS.bold,
    fontSize: RFPercentage(2),
  },
});
