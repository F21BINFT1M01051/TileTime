import { Image, ImageBackground, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { COLORS, IMAGES, FONTS } from '../../../../../../../config/theme';
import AuthHeader from '../../../../../../../components/AuthHeader';
import { RFPercentage } from 'react-native-responsive-fontsize';

const ImageViewer = () => {
  return (
    <View style={styles.container}>
      <AuthHeader title="IMG_3585" style={styles.headerTitle} />
      <ImageBackground
        source={IMAGES.viewer}
        resizeMode="repeat"
        style={styles.imageBackground}
      >
        <Image
          source={IMAGES.customProfile}
          resizeMode="contain"
          style={styles.profileImage}
        />
      </ImageBackground>
    </View>
  );
};

export default ImageViewer;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  headerTitle: {
    fontFamily: FONTS.semiBold,
    fontSize: RFPercentage(2.2),
  },
  imageBackground: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    paddingTop: RFPercentage(10),
  },
  profileImage: {
    width: '100%',
    height: '50%',
  },
});
