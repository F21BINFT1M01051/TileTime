import { StyleSheet, Text, View, Image } from 'react-native';
import React from 'react';
import { IMAGES, COLORS, FONTS, ICONS } from '../config/theme';
import { RFPercentage } from 'react-native-responsive-fontsize';

interface Props {
  title: string;
  attendees: number;
  status: string;
  profile: any;
}

export default function HomeGroupCard(props: Props) {
  return (
    <View style={styles.container}>
      <View style={styles.largeGroupIconContainer}>
        <Image
          source={props.profile}
          resizeMode="cover"
          style={styles.largeGroupIcon}
        />
      </View>
      <View style={styles.contentWrapper}>
        <Text style={styles.title}>{props.title}</Text>
        <Text style={styles.attendees}>{props.attendees} attendees</Text>
        <View style={styles.tagContainer}>
          <Text style={styles.tagText}>{props.status}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  largeGroupIconContainer: {
    width: RFPercentage(12),
    height: RFPercentage(12),
    borderRadius: RFPercentage(100),
    backgroundColor: COLORS.yellow,
    alignItems: 'center',
    justifyContent: 'center',
  },
  largeGroupIcon: {
    width: RFPercentage(12),
    height: RFPercentage(12),
    borderTopRightRadius: RFPercentage(100),
    right: RFPercentage(0.5),
    borderTopLeftRadius: RFPercentage(100),
    borderBottomRightRadius: RFPercentage(100),
    borderBottomLeftRadius: RFPercentage(1),
  },
  contentWrapper: {
    marginLeft: RFPercentage(2),
  },
  title: {
    color: COLORS.primary,
    fontFamily: FONTS.bold,
    fontSize: RFPercentage(1.9),
  },
  attendees: {
    color: COLORS.lightGrey,
    fontSize: RFPercentage(1.6),
    fontFamily: FONTS.regular,
    marginTop: RFPercentage(1),
  },
  tagContainer: {
    height: RFPercentage(4),
    backgroundColor: '#FFE9F6',
    borderRadius: RFPercentage(100),
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: RFPercentage(1),
    width: RFPercentage(19),
  },
  tagText: {
    color: COLORS.pink,
    fontSize: RFPercentage(1.7),
    fontFamily: FONTS.medium2,
  },
});
