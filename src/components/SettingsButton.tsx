import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { RFPercentage } from 'react-native-responsive-fontsize';
import { COLORS, FONTS, ICONS } from '../config/theme';
import AntDesign from 'react-native-vector-icons/AntDesign';

const SettingsButton = () => {
  return (
    <TouchableOpacity
    activeOpacity={0.8}
      style={{
        width: '100%',
        height: RFPercentage(7),
        backgroundColor: COLORS.white,
        borderRadius: RFPercentage(2.4),
        borderWidth: RFPercentage(0.1),
        borderColor: COLORS.lightWhite,
        alignItems: 'center',
        flexDirection: 'row',
        paddingHorizontal: RFPercentage(2),
        shadowColor: 'rgba(203, 203, 203, 1)',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 5,
      }}
    >
      <Image source={ICONS.settings} resizeMode='contain' style={{width:RFPercentage(2.5), height:RFPercentage(2.5)}} />
      <Text
        style={{
          fontFamily: FONTS.bold,
          color: COLORS.primary,
          fontSize: RFPercentage(1.8),
          marginLeft:RFPercentage(1)
        }}
      >
        Permissions & Settings
      </Text>
      <TouchableOpacity
        style={{ position: 'absolute', right: RFPercentage(2) }}
      >
        <AntDesign name="right" color={COLORS.grey} size={RFPercentage(2)} />
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

export default SettingsButton;

const styles = StyleSheet.create({});
