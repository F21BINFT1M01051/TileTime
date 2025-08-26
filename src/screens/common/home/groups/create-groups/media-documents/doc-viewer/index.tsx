import { Image, ImageBackground, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { COLORS, IMAGES, FONTS } from '../../../../../../../config/theme';
import AuthHeader from '../../../../../../../components/AuthHeader';
import { RFPercentage } from 'react-native-responsive-fontsize';

const DocViewer = () => {
  return (
    <View style={styles.container}>
      <AuthHeader title="Mahjong Rule Book.pdf" style={styles.headerTitle} />
      <ImageBackground
        source={IMAGES.viewer}
        resizeMode="repeat"
        style={styles.imageBackground}
      >
        <View style={styles.overlay}>
          <Image
            source={IMAGES.doc}
            resizeMode="contain"
            style={styles.docImage}
          />
        </View>
      </ImageBackground>
    </View>
  );
};

export default DocViewer;

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
  },
  overlay: {
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(236, 236, 236, 0.5)',
    alignItems: 'center',
    paddingTop: RFPercentage(14),
  },
  docImage: {
    width: '100%',
    height: '60%',
  },
});
