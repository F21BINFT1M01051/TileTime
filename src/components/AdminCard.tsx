import { Image, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { COLORS, FONTS, IMAGES } from '../config/theme';
import { RFPercentage } from 'react-native-responsive-fontsize';

const AdminCard = () => {
  return (
    <View
      style={{
        width: '100%',
        backgroundColor: COLORS.white,
        borderWidth: RFPercentage(0.1),
        borderColor: COLORS.lightWhite,
        borderRadius: RFPercentage(2),
        padding: RFPercentage(2),
        alignItems: 'center',
        flexDirection: 'row',
        shadowColor: 'rgba(203, 203, 203, 1)',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 5,
      }}
    >
      <View
        style={{
          width: RFPercentage(6),
          height: RFPercentage(6),
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: COLORS.pink3,
          borderTopRightRadius: RFPercentage(3),
          borderTopLeftRadius: RFPercentage(3),
        }}
      >
        <Image
          source={IMAGES.chatProfile}
          resizeMode="contain"
          style={{
            width: RFPercentage(6),
            height: RFPercentage(6),
            right: RFPercentage(0.2),
            bottom: RFPercentage(0.1),
          }}
        />
      </View>

      <View style={{ marginLeft: RFPercentage(2) }}>
        <Text
          style={{
            color: COLORS.primary,
            fontFamily: FONTS.bold,
            fontSize: RFPercentage(2),
          }}
        >
          Samantha Lewis (You)
        </Text>
        <Text
          style={{
            color: '#696969',
            fontFamily: FONTS.regular,
            fontSize: RFPercentage(1.8),
            marginTop: RFPercentage(0.4),
          }}
        >
          Group Admin
        </Text>
      </View>
    </View>
  );
};

export default AdminCard;

const styles = StyleSheet.create({});
