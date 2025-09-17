import { Image, ImageBackground, StyleSheet, Text, View } from 'react-native';
import React, { useEffect } from 'react';
import { COLORS, FONTS, ICONS, IMAGES } from '../../../config/theme';
import { RFPercentage } from 'react-native-responsive-fontsize';

const Splash = ({ navigation }: any) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace('OnBoarding'); 
    }, 3000); 

    return () => clearTimeout(timer); 
  }, [navigation]);

  return (
    <ImageBackground
      source={IMAGES.sp}
      resizeMode="cover"
      style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
    >
      <Image
        source={IMAGES.s2}
        resizeMode="contain"
        style={{ width: RFPercentage(13), height: RFPercentage(13) }}
      />
      <Text
        style={{
          color: COLORS.lightGrey,
          fontFamily: FONTS.regular,
          fontSize: RFPercentage(1.9),
          position: 'absolute',
          bottom: RFPercentage(6),
        }}
      >
        Version 1.6 (1)
      </Text>
    </ImageBackground>
  );
};

export default Splash;

const styles = StyleSheet.create({});
