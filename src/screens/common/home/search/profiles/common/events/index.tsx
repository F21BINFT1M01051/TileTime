import {
  FlatList,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
} from 'react-native';
import React from 'react';
import AuthHeader from '../../../../../../../components/AuthHeader';
import { IMAGES } from '../../../../../../../config/theme';
import { FONTS, COLORS } from '../../../../../../../config/theme';
import { RFPercentage } from 'react-native-responsive-fontsize';

const events = [
  {
    id: 1,
    name: 'Four Winds: Community Mahjong Session',
    profile: IMAGES.profile3,
    date: 'June 10, 2025',
  },
  {
    id: 2,
    name: 'Harmony Hands: Community Mahjong Meetup',
    profile: IMAGES.profile3,
    date: 'April 30, 2025',
  },
  {
    id: 3,
    name: 'Majestic Mahjong: Competitive Tournaments',
    profile: IMAGES.customProfile,
    date: 'June 15, 2025',
  },
  {
    id: 4,
    name: 'Mystique of Mahjong: Strategy Workshops',
    profile: IMAGES.profile3,
    date: 'September 10, 2025',
  },
];

const CommonEvents = ({ navigation, route }) => {
  const { title } = route.params;
  return (
    <View style={{ backgroundColor: COLORS.white, flex: 1 }}>
      <AuthHeader
        title={title}
        style={{ fontFamily: FONTS.semiBold, fontSize: RFPercentage(2.4) }}
      />
      <View
        style={{
          width: '90%',
          alignSelf: 'center',
          marginTop: RFPercentage(1),
          flex: 1,
        }}
      >
        <FlatList
          data={events}
          keyExtractor={item => item.id.toString()}
          renderItem={({ item }) => {
            return (
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => navigation.navigate('EventDetails')}
              >
                <View style={styles.contactRow}>
                  <View style={styles.contactLeft}>
                    <View>
                      <Image
                        source={IMAGES.customProfile}
                        resizeMode="cover"
                        style={styles.contactAvatar}
                      />
                    </View>
                    <View style={styles.contactInfo}>
                      <Text style={styles.contactName}>{item.name}</Text>
                      <Text style={styles.contactMembers}>{item.date}</Text>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            );
          }}
        />
      </View>
    </View>
  );
};

export default CommonEvents;

const styles = StyleSheet.create({
  contactRow: {
    width: '100%',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: RFPercentage(1.8),
    borderBottomWidth: 1,
    borderBottomColor: COLORS.lightWhite,
    paddingBottom: RFPercentage(1.5),
  },
  contactLeft: {
    marginLeft: RFPercentage(1),
    flexDirection: 'row',
    alignItems: 'center',
  },
  contactAvatarWrapper: {
    width: RFPercentage(7),
    height: RFPercentage(7),
    borderTopRightRadius: RFPercentage(100),
    borderTopLeftRadius: RFPercentage(100),
    borderBottomRightRadius: RFPercentage(100),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.yellow,
  },
  contactAvatar: {
    width: RFPercentage(5),
    height: RFPercentage(6),
    borderRadius: RFPercentage(1),
    borderRightWidth: RFPercentage(0.3),
    borderColor: COLORS.yellow,
    borderBottomWidth: RFPercentage(0.2),
  },
  contactInfo: { marginLeft: RFPercentage(1.5), width: '85%' },
  contactName: {
    fontFamily: FONTS.medium,
    color: COLORS.primary,
    fontSize: RFPercentage(1.9),
    lineHeight: RFPercentage(2.2),
  },
  contactMembers: {
    fontFamily: FONTS.regular,
    color: COLORS.lightGrey,
    fontSize: RFPercentage(1.7),
    marginTop: RFPercentage(0.7),
  },
});
