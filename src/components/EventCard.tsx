import { Image, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { RFPercentage } from 'react-native-responsive-fontsize';
import { COLORS, FONTS, ICONS } from '../config/theme';

const avatars = [
  { id: 1, profile: ICONS.avatar },
  { id: 2, profile: ICONS.avatar },
  { id: 3, profile: ICONS.avatar },
  { id: 4, profile: ICONS.avatar },
  { id: 5, profile: ICONS.avatar },
  { id: 6, profile: ICONS.avatar },
];

const EventCard = () => {
  const visibleAvatars = avatars.slice(0, 2);
  const remainingCount = avatars.length - visibleAvatars.length;

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <View style={{ width: RFPercentage(16) }}>
          <Text
            style={{
              fontFamily: FONTS.medium,
              color: COLORS.primary,
              fontSize: RFPercentage(1.7),
            }}
          >
            Four Winds:
          </Text>
          <Text
            style={{
              fontFamily: FONTS.medium,
              color: COLORS.primary,
              fontSize: RFPercentage(1.7),
            }}
          >
            Community Mahjong Session
          </Text>
        </View>
        <View>
          <Image
            source={ICONS.event}
            resizeMode="contain"
            style={styles.eventImage}
          />
        </View>
      </View>

      {/* Horizontal Avatar List */}
      <View style={styles.avatarContainer}>
        {visibleAvatars.map((item, index) => (
          <View
            key={item.id}
            style={[
              styles.avatarWrapper,
              { marginLeft: index === 0 ? 0 : -10 },
            ]}
          >
            <Image source={item.profile} style={styles.avatarImage} />
          </View>
        ))}
        {remainingCount > 0 && (
          <View style={[styles.avatarWrapper, styles.remainingWrapper]}>
            <Text style={styles.remainingText}>+{remainingCount}</Text>
          </View>
        )}
      </View>
    </View>
  );
};

export default EventCard;

const styles = StyleSheet.create({
  card: {
    width: '100%',
    height: RFPercentage(11),
    backgroundColor: 'rgba(182, 239, 17, 0.14)',
    borderRadius: RFPercentage(2),
    justifyContent: 'center',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '90%',
    alignSelf: 'center',
  },
  eventImage: {
    width: RFPercentage(8),
    height: RFPercentage(8),
  },
  avatarContainer: {
    flexDirection: 'row',
    marginTop: RFPercentage(1),
    alignItems: 'center',
    position: 'absolute',
    bottom: RFPercentage(1),
    right: RFPercentage(1),
  },
  avatarWrapper: {
    width: RFPercentage(3.5),
    height: RFPercentage(3.5),
    borderRadius: RFPercentage(2),
    borderWidth: 1.5,
    borderColor: COLORS.white,
    overflow: 'hidden',
    backgroundColor: COLORS.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarImage: {
    width: '100%',
    height: '100%',
    borderRadius: RFPercentage(2.25),
  },
  remainingWrapper: {
    backgroundColor: '#FFE5F6',
    right: RFPercentage(1),
  },
  remainingText: {
    color: COLORS.pink,
    fontSize: RFPercentage(1.6),
    fontFamily: FONTS.medium,
  },
});
