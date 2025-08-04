import React from 'react';
import { Image, StyleSheet, Text, View, Dimensions } from 'react-native';
import { RFPercentage } from 'react-native-responsive-fontsize';
import { COLORS, FONTS, ICONS, IMAGES } from '../config/theme';

const { width } = Dimensions.get('window');

const HomeCard = () => {
  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <View style={styles.borderWrapper}>
          <Image
            source={IMAGES.customProfile}
            style={styles.image}
            resizeMode="cover"
          />

          <View style={styles.banner}>
            <Image
              source={ICONS.border2}
              resizeMode="cover"
              style={styles.bannerImage}
            />
            <Text style={styles.bannerText}>Beginner-Friendly</Text>
          </View>
        </View>
      </View>

      <View style={styles.contentContainer}>
        <Text style={styles.title}>Harmony Hands:</Text>
        <Text style={styles.subtitle}>Community Mahjong Meetup</Text>
        <View style={{ marginTop: RFPercentage(1.5) }}>
          <View style={styles.chipRow}>
            <View style={styles.dateChip}>
              <Image
                source={ICONS.calender3}
                resizeMode="contain"
                style={{ width: RFPercentage(2), height: RFPercentage(2) }}
              />
              <Text style={styles.chipText}>April 30, 2025</Text>
            </View>
          </View>

          <View style={styles.chipRow}>
            <View style={styles.locationChip}>
              <Image
                source={ICONS.map2}
                resizeMode="contain"
                style={{ width: RFPercentage(2), height: RFPercentage(2) }}
              />
              <Text style={styles.chipText}>32 mi away</Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

export default HomeCard;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
  },
  imageContainer: {
    width: RFPercentage(18),
    height: RFPercentage(21),
    borderRadius: RFPercentage(8),
    overflow: 'hidden',
    backgroundColor: '#E594C4',
    justifyContent: 'flex-end',
  },
  borderWrapper: {
    width: '100%',
    height: '100%',
    borderRadius: RFPercentage(8),
    overflow: 'hidden',
    right: RFPercentage(0.5),
    bottom: RFPercentage(0.2),
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: RFPercentage(8),
  },
  banner: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  bannerImage: {
    width: '100%',
    height: RFPercentage(5),
  },
  bannerText: {
    fontSize: RFPercentage(1.2),
    position: 'absolute',
    top: RFPercentage(1.8),
    fontFamily: FONTS.semiBold,
    color: COLORS.primary,
    textAlign: 'center',
  },
  contentContainer: {
    flex: 1,
    marginLeft: RFPercentage(2),
  },
  title: {
    fontSize: RFPercentage(2.1),
    color: COLORS.primary,
    fontFamily: FONTS.bold,
    lineHeight: RFPercentage(2.7),
  },
  subtitle: {
    fontSize: RFPercentage(2.1),
    color: COLORS.primary,
    fontFamily: FONTS.bold,
    lineHeight: RFPercentage(2.7),
  },
  chipRow: {
    marginTop: RFPercentage(1),
  },
  dateChip: {
    backgroundColor: '#E8FCFC',
    flexDirection: 'row',
    alignItems: 'center',
    height: RFPercentage(4),
    paddingHorizontal: RFPercentage(1),
    borderRadius: RFPercentage(100),
    maxWidth: RFPercentage(16),
  },
  locationChip: {
    backgroundColor: '#FFEDE2',
    flexDirection: 'row',
    alignItems: 'center',
    height: RFPercentage(4),
    paddingHorizontal: RFPercentage(1),
    borderRadius: RFPercentage(100),
    width: RFPercentage(13),
  },
  chipIcon: {
    marginRight: 6,
    fontSize: RFPercentage(2),
  },
  chipText: {
    fontSize: RFPercentage(1.6),
    color: COLORS.primary,
    fontFamily: FONTS.medium2,
    marginLeft: RFPercentage(0.6),
  },
});
