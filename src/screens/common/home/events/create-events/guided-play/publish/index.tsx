import { StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native';
import React, { useState } from 'react';
import { COLORS, FONTS, ICONS } from '../../../../../../../config/theme';
import { RFPercentage } from 'react-native-responsive-fontsize';

const GuidedPlayPublish = ({ onPreviewNow }: any) => {
  return (
    <View style={styles.container}>
      <View style={styles.innerWrapper}>
        <View style={styles.sectionHeader}>
          <Text style={styles.eventTitle}>Preview & Publish</Text>
          <Text style={styles.eventSubtitle}>
            Review everything and go live when ready.
          </Text>
        </View>

        <Image source={ICONS.publish} resizeMode="contain" style={styles.publishImage} />

        <View style={styles.blurWrapper}>
          <Image source={ICONS.blur} resizeMode="cover" style={styles.blurImage} />
          <View style={styles.blurContent}>
            <Text style={styles.readyText}>Your event is ready to go!</Text>
            <Text style={styles.previewSubtitle}>
              Preview and make sure everything looks good.
            </Text>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={onPreviewNow}
              style={styles.previewBtn}
            >
              <Text style={styles.previewBtnText}>Preview Now</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

export default GuidedPlayPublish;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.white },
  innerWrapper: { width: '100%', alignSelf: 'center' },
  sectionHeader: { marginTop: RFPercentage(4) },
  eventTitle: {
    color: COLORS.primary,
    fontSize: RFPercentage(2.5),
    fontFamily: FONTS.headline,
  },
  eventSubtitle: {
    color: COLORS.lightGrey,
    fontSize: RFPercentage(1.8),
    fontFamily: FONTS.regular,
    marginTop: RFPercentage(2),
  },
  publishImage: {
    width: RFPercentage(30),
    height: RFPercentage(40),
    alignSelf: 'center',
    marginTop: RFPercentage(7),
  },
  blurWrapper: {
    width: '100%',
    height: RFPercentage(20),
    bottom: RFPercentage(17),
    alignItems: 'center',
    justifyContent: 'center',
  },
  blurImage: { width: '100%', height: RFPercentage(20) },
  blurContent: { position: 'absolute', top: RFPercentage(5) },
  readyText: {
    textAlign: 'center',
    color: COLORS.primary,
    fontFamily: FONTS.semiBold,
    fontSize: RFPercentage(2.1),
  },
  previewSubtitle: {
    textAlign: 'center',
    color: COLORS.lightGrey,
    fontFamily: FONTS.regular,
    fontSize: RFPercentage(1.9),
    marginTop: RFPercentage(1.5),
  },
  previewBtn: {
    width: RFPercentage(15),
    height: RFPercentage(4.5),
    borderRadius: RFPercentage(2),
    borderWidth: RFPercentage(0.2),
    borderColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: RFPercentage(2),
    alignSelf: 'center',
  },
  previewBtnText: {
    textAlign: 'center',
    color: COLORS.primary,
    fontFamily: FONTS.bold,
    fontSize: RFPercentage(1.8),
    lineHeight:RFPercentage(1.8)
  },
});
