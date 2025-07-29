import { Image, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { RFPercentage } from 'react-native-responsive-fontsize';
import { COLORS, FONTS, ICONS } from '../../config/theme';

const TopNavigation = () => {
  return (
    <View
      style={{
        width: '100%',
        backgroundColor: '#B14088',
        height: RFPercentage(12),
        justifyContent: 'flex-end',
        paddingBottom: RFPercentage(2),
      }}
    >
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          width: '90%',
          alignSelf: 'center',
        }}
      >
        <Text
          style={{
            color: COLORS.white,
            fontFamily: FONTS.headline,
            fontSize: RFPercentage(3),
            marginRight: RFPercentage(0.2),
          }}
        >
          Groups & Chats
        </Text>
        <Image
          source={ICONS.vector}
          resizeMode="contain"
          style={{
            width: RFPercentage(2.2),
            height: RFPercentage(2.2),
            bottom: RFPercentage(1),
          }}
        />
      </View>
    </View>
  );
};

export default TopNavigation;
