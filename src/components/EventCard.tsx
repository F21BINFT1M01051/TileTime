import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
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

const EventCard = ({name, host, profile, onPress}) => {
  const visibleAvatars = avatars.slice(0, 2);
  const remainingCount = avatars.length - visibleAvatars.length;

  return (
    <TouchableOpacity  activeOpacity={0.8}  onPress={onPress} style={styles.card}>
      <View style={styles.header}>
        <View style={{ width: RFPercentage(25) }}>
          <Text
            style={{
              fontFamily: FONTS.medium,
              color: COLORS.primary,
              fontSize: RFPercentage(1.8),
            }}
          >
           {name}
          </Text>
           <Text
            style={{
              fontFamily: FONTS.regular,
              color: COLORS.lightGrey,
              fontSize: RFPercentage(1.5),
              marginTop:RFPercentage(0.7)
            }}
          >
           Hosted by: {host}
          </Text>
        </View>
        <View>
          <Image
            source={profile}
            resizeMode="cover"
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
    </TouchableOpacity>
  );
};

export default EventCard;

const styles = StyleSheet.create({
  card: {
    width: '100%',
    height: RFPercentage(9),
    backgroundColor: 'rgba(204, 244, 253, 0.3)',
    borderRadius: RFPercentage(1.5),
    justifyContent: 'center',
    marginTop:RFPercentage(1)
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '90%',
    alignSelf: 'center',
    alignItems: 'center',
  },
  eventImage: {
    width: RFPercentage(6.6),
    height: RFPercentage(7.6),
    borderRadius:RFPercentage(1.5)
  },
  avatarContainer: {
    flexDirection: 'row',
    marginTop: RFPercentage(1),
    alignItems: 'center',
    position: 'absolute',
    right: RFPercentage(1),
    bottom:RFPercentage(0.5)
  },
  avatarWrapper: {
    width: RFPercentage(3),
    height: RFPercentage(3),
    borderRadius: RFPercentage(2),
    borderWidth: RFPercentage(0.2),
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
