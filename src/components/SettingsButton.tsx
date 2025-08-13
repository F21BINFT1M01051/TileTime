import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';
import { RFPercentage } from 'react-native-responsive-fontsize';
import { COLORS, FONTS, ICONS } from '../config/theme';
import AntDesign from 'react-native-vector-icons/AntDesign';
import ToggleSwitch from 'toggle-switch-react-native';

interface Props {
  title: string;
  icon: any;
  switch?: boolean;
  onPress?: () => void;
  style?: object;
  textStyle?: object;
}

const SettingsButton = (props: Props) => {
  const [isOn, setIsOn] = useState(false);

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={props.onPress}
      style={[styles.container, props.style]}
    >
      <Image source={props.icon} resizeMode="contain" style={styles.icon} />
      <Text style={[styles.titleText, props.textStyle]}>
        {props.title}
      </Text>
      {props.switch ? (
        <ToggleSwitch
          isOn={isOn}
          onColor={COLORS.pink}
          offColor={COLORS.switch}
          size="small"
          onToggle={() => setIsOn(!isOn)}
          style={styles.toggleSwitch}
        />
      ) : (
        <TouchableOpacity style={styles.arrowButton}>
          <AntDesign name="right" color={COLORS.grey} size={RFPercentage(2)} />
        </TouchableOpacity>
      )}
    </TouchableOpacity>
  );
};

export default SettingsButton;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: RFPercentage(6),
    backgroundColor: COLORS.white,
    borderRadius: RFPercentage(2.6),
    borderWidth: RFPercentage(0.1),
    borderBottomWidth: RFPercentage(0.6),
    borderColor: COLORS.lightWhite,
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: RFPercentage(2),
    shadowColor: 'rgba(203, 203, 203, 1)',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  icon: {
    width: RFPercentage(2.5),
    height: RFPercentage(2.5),
  },
  titleText: {
    fontFamily: FONTS.bold,
    color: COLORS.primary,
    fontSize: RFPercentage(1.8),
    marginLeft: RFPercentage(1.5),
  },
  toggleSwitch: {
    position: 'absolute',
    right: RFPercentage(2),
  },
  arrowButton: {
    position: 'absolute',
    right: RFPercentage(2),
  },
});
