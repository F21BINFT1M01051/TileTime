import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  FlatList,
  Share,
} from 'react-native';
import React from 'react';
import { COLORS, FONTS, ICONS, IMAGES } from '../../../../../config/theme';
import { RFPercentage } from 'react-native-responsive-fontsize';
import AuthHeader from '../../../../../components/AuthHeader';
import DetailComponent from '../../../../../components/DetailComponent';
import HomeCard from '../../../../../components/HomeCard';
import CustomButton from '../../../../../components/CustomButton';
import SocialField from '../../../../../components/SocialField';

const cohosts = [
  { id: 1, profile: IMAGES.chatProfile },
  { id: 2, profile: IMAGES.customProfile },
];

const attachments = [
  { id: 1, profile: ICONS.attach },
  { id: 2, profile: ICONS.attach },
  { id: 3, profile: ICONS.attach },
];

const Cards2 = [
  {
    id: 1,
    title: 'Harmony Hands:',
    bannerText: 'Co-Host',
    subTitle: 'Community Mahjong Meetup',
    profile: IMAGES.customProfile,
    date: 'April 30, 2025',
    distance: '32 mi away',
    free: true,
  },
  {
    id: 2,
    title: 'Harmony Hands:',
    bannerText: 'Assist',
    subTitle: 'Community Mahjong Meetup',
    profile: IMAGES.customProfile,
    date: 'April 30, 2025',
    distance: '32 mi away',
  },
  {
    id: 3,
    title: 'Harmony Hands:',
    bannerText: 'Assist',
    subTitle: 'Community Mahjong Meetup',
    profile: IMAGES.customProfile,
    date: 'April 30, 2025',
    distance: '32 mi away',
  },
];

const EventDetails = ({ navigation }: any) => {
  const onShare = async () => {
    try {
      const result = await Share.share({
        message: 'Check out this awesome content! 🚀',
        url: 'https://example.com',
      });

      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          console.log('Shared with activity type: ', result.activityType);
        } else {
          console.log('Shared successfully');
        }
      } else if (result.action === Share.dismissedAction) {
        console.log('Dismissed');
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <View style={styles.container}>
      <AuthHeader
        title="Event Details"
        style={styles.headerTitle}
        right={true}
        rightIcon={ICONS.share}
        onPress2={onShare}
      />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.innerContainer}>
          <Text style={styles.eventTitle}>
            Four Winds: Community Mahjong Session
          </Text>

          {/* Date & Location Chips */}
          <View style={styles.row}>
            <View style={styles.chipRow}>
              <View style={styles.dateChip}>
                <Image
                  source={ICONS.calender3}
                  resizeMode="contain"
                  style={styles.chipIconImage}
                />
                <Text style={styles.chipText}>{'April 30, 2025'}</Text>
              </View>
            </View>

            <View style={styles.chipRow}>
              <View style={styles.locationChip}>
                <Image
                  source={ICONS.map2}
                  resizeMode="contain"
                  style={styles.chipIconImage}
                />
                <Text style={styles.chipText}>{'32 mi away'}</Text>
              </View>
            </View>
          </View>

          {/* Event Image */}
          <View style={styles.eventImageWrapper}>
            <Image
              source={ICONS.event33}
              resizeMode="cover"
              style={styles.eventImage}
            />
          </View>

          {/* Description */}
          <Text style={styles.description}>
            Join fellow Mahjong enthusiasts for an evening of friendly matches
            and lively conversation. Swap strategies, pick up new tips, and meet
            players of all experience levels.
          </Text>

          {/* Host Section */}
          <Text style={styles.sectionTitle}>Host/Organiser</Text>
          <View style={styles.hostRow}>
            <View style={styles.hostImageWrapper}>
              <Image
                source={IMAGES.chatProfile}
                resizeMode="cover"
                style={styles.hostImage}
              />
              <TouchableOpacity activeOpacity={0.8} style={styles.messageBtn}>
                <Text style={styles.messageBtnText}>Message</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.hostDetails}>
              <Text style={styles.hostName}>Samantha Lewis</Text>
              <Text style={styles.hostFollowers}>231 Followers</Text>
              <Text style={styles.hostBio}>
                Join us for tile-matching fun, exchange tips, and engage in
                exci...
              </Text>
            </View>
          </View>

          {/* Co-Hosts */}
          <View style={{ marginTop: RFPercentage(4.5) }}>
            <TouchableOpacity activeOpacity={0.8} style={styles.card}>
              <View style={styles.cardInner}>
                <View>
                  <Text style={styles.cardTitle}>Co - Hosts</Text>
                  <FlatList
                    horizontal
                    data={cohosts}
                    keyExtractor={item => item.id.toString()}
                    contentContainerStyle={styles.cohostList}
                    renderItem={({ item }) => (
                      <View style={styles.cohostImageWrapper}>
                        <Image
                          source={item.profile}
                          resizeMode="cover"
                          style={styles.cohostImage}
                        />
                      </View>
                    )}
                  />
                </View>
                <TouchableOpacity activeOpacity={0.8}>
                  <Image
                    source={ICONS.right}
                    resizeMode="contain"
                    style={styles.rightIcon}
                  />
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          </View>

          {/* Attendees */}
          <DetailComponent title="Attendees" onPress={() => {}} />

          {/* Attachments */}
          <View style={styles.sectionSpacing}>
            <TouchableOpacity activeOpacity={0.8} style={styles.attachmentCard}>
              <View style={styles.cardInner}>
                <View>
                  <Text style={styles.cardTitle}>Attachments</Text>
                  <Text style={styles.attachmentCount}>3 attachments</Text>
                  <FlatList
                    horizontal
                    data={attachments}
                    keyExtractor={item => item.id.toString()}
                    contentContainerStyle={styles.attachmentList}
                    renderItem={({ item }) => (
                      <View style={styles.attachmentWrapper}>
                        <Image
                          source={item.profile}
                          resizeMode="cover"
                          style={styles.attachmentImage}
                        />
                      </View>
                    )}
                  />
                </View>
                <TouchableOpacity activeOpacity={0.8}>
                  <Image
                    source={ICONS.right}
                    resizeMode="contain"
                    style={styles.rightIcon}
                  />
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          </View>

          {/* Location */}
          <View style={styles.sectionSpacing}>
            <TouchableOpacity activeOpacity={0.8} style={styles.locationCard}>
              <View style={styles.cardInner}>
                <View style={styles.locationDetails}>
                  <Text style={styles.cardTitle}>Location</Text>
                  <Text style={styles.locationAddress}>
                    518 E 4th St, North Platte, NE 69101, United States
                  </Text>
                  <TouchableOpacity style={styles.directionBtn}>
                    <Text style={styles.directionBtnText}>Get Directions</Text>
                  </TouchableOpacity>
                </View>
                <Image
                  source={ICONS.loc}
                  resizeMode="contain"
                  style={styles.locImage}
                />
              </View>
            </TouchableOpacity>
          </View>

          <Text style={styles.sectionTitle}>Similar Events</Text>
          <FlatList
            data={Cards2}
            keyExtractor={item => item.id.toString()}
            scrollEnabled={false}
            renderItem={({ item }) => {
              return (
                <View style={{ marginTop: RFPercentage(3) }}>
                  <HomeCard
                    title={item.title}
                    profile={item.profile}
                    subTitle={item.subTitle}
                    bannerText={item.bannerText}
                    date={item.date}
                    distance={item.distance}
                    free={item.free}
                  />
                </View>
              );
            }}
          />
        </View>

        <View style={styles.footer}>
          <View style={{ width: '90%', alignSelf: 'center' }}>
            <View style={styles.confirm}>
              <Image
                source={ICONS.greenCheck}
                resizeMode="contain"
                style={{ width: RFPercentage(3.8), height: RFPercentage(3.8) }}
              />
              <View style={{ marginLeft: RFPercentage(1.5) }}>
                <Text style={styles.txt}>Your Seat Is Confirmed</Text>
                <Text style={styles.sub}>See you in 5 days</Text>
              </View>
            </View>
            <View style={{ marginTop: RFPercentage(2) }}>
              <CustomButton
                onPress={() => {
                  navigation.navigate('InviteFriends');
                }}
                title="Invite Friends"
              />

              <SocialField
                name="Not Attending, Cancel"
                icon={ICONS.x}
                borderColor={COLORS.red}
                color={COLORS.red}
                style={{ marginTop: RFPercentage(1.5) }}
              />
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default EventDetails;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.white },
  scrollContent: { paddingBottom: RFPercentage(4) },
  headerTitle: { fontFamily: FONTS.semiBold, fontSize: RFPercentage(2) },
  innerContainer: { width: '90%', alignSelf: 'center' },
  eventTitle: {
    color: COLORS.primary,
    fontFamily: FONTS.headline,
    fontSize: RFPercentage(2.6),
    marginTop: RFPercentage(4),
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: RFPercentage(2),
  },
  chipRow: {},
  dateChip: {
    backgroundColor: COLORS.date,
    flexDirection: 'row',
    alignItems: 'center',
    height: RFPercentage(3.5),
    paddingHorizontal: RFPercentage(1),
    borderRadius: RFPercentage(100),
    maxWidth: RFPercentage(14),
  },
  locationChip: {
    backgroundColor: COLORS.location,
    flexDirection: 'row',
    alignItems: 'center',
    height: RFPercentage(3.5),
    paddingHorizontal: RFPercentage(1),
    borderRadius: RFPercentage(100),
    width: RFPercentage(12),
    marginLeft: RFPercentage(1),
  },
  chipIconImage: { width: RFPercentage(2), height: RFPercentage(2) },
  chipText: {
    fontSize: RFPercentage(1.4),
    color: COLORS.primary,
    fontFamily: FONTS.medium2,
    marginLeft: RFPercentage(0.6),
  },
  eventImageWrapper: {
    width: '100%',
    height: RFPercentage(32),
    backgroundColor: COLORS.pink6,
    borderRadius: RFPercentage(6.5),
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: RFPercentage(3),
  },
  eventImage: {
    width: '100%',
    height: RFPercentage(32),
    borderRadius: RFPercentage(6.5),
    right: RFPercentage(0.3),
    bottom: RFPercentage(0.3),
  },
  description: {
    color: COLORS.primary,
    fontFamily: FONTS.regular2,
    fontSize: RFPercentage(1.8),
    marginTop: RFPercentage(3),
    lineHeight: RFPercentage(2.2),
  },
  sectionTitle: {
    color: COLORS.primary,
    fontFamily: FONTS.headline,
    fontSize: RFPercentage(2.4),
    marginTop: RFPercentage(3),
  },
  hostRow: {
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    marginTop: RFPercentage(2),
  },
  hostImageWrapper: {
    width: RFPercentage(12),
    height: RFPercentage(12),
    backgroundColor: COLORS.pink6,
    borderTopRightRadius: RFPercentage(100),
    borderTopLeftRadius: RFPercentage(100),
    alignItems: 'center',
    justifyContent: 'center',
  },
  hostImage: {
    width: RFPercentage(12),
    height: RFPercentage(12),
    borderTopRightRadius: RFPercentage(100),
    borderTopLeftRadius: RFPercentage(100),
    right: RFPercentage(0.4),
    bottom: RFPercentage(0.2),
  },
  messageBtn: {
    position: 'absolute',
    bottom: RFPercentage(-1),
    width: RFPercentage(9),
    height: RFPercentage(3.7),
    borderWidth: RFPercentage(0.1),
    borderColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.white,
    borderRadius: RFPercentage(1.3),
  },
  messageBtnText: {
    color: COLORS.primary,
    fontFamily: FONTS.bold,
    fontSize: RFPercentage(1.6),
  },
  hostDetails: { marginLeft: RFPercentage(2), width: RFPercentage(25) },
  hostName: {
    color: COLORS.primary,
    fontFamily: FONTS.bold,
    fontSize: RFPercentage(1.8),
  },
  hostFollowers: {
    color: COLORS.grey3,
    fontFamily: FONTS.regular,
    fontSize: RFPercentage(1.6),
    marginTop: RFPercentage(0.8),
  },
  hostBio: {
    color: COLORS.lightGrey,
    fontFamily: FONTS.regular,
    fontSize: RFPercentage(1.6),
    marginTop: RFPercentage(0.8),
  },
  sectionSpacing: { marginTop: RFPercentage(3) },
  card: {
    width: '100%',
    height: RFPercentage(13),
    backgroundColor: COLORS.white,
    borderColor: COLORS.lightWhite,
    borderWidth: RFPercentage(0.1),
    borderBottomWidth: RFPercentage(0.5),
    borderRadius: RFPercentage(1.8),
    justifyContent: 'center',
  },
  attachmentCard: {
    width: '100%',
    height: RFPercentage(16),
    backgroundColor: COLORS.white,
    borderColor: COLORS.lightWhite,
    borderWidth: RFPercentage(0.1),
    borderBottomWidth: RFPercentage(0.5),
    borderRadius: RFPercentage(1.8),
    justifyContent: 'center',
  },
  locationCard: {
    width: '100%',
    height: RFPercentage(16.5),
    backgroundColor: COLORS.white,
    borderColor: COLORS.lightWhite,
    borderWidth: RFPercentage(0.1),
    borderBottomWidth: RFPercentage(0.5),
    borderRadius: RFPercentage(1.8),
    justifyContent: 'center',
  },
  cardInner: {
    width: '90%',
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  cardTitle: {
    color: COLORS.primary,
    fontFamily: FONTS.bold,
    fontSize: RFPercentage(1.8),
  },
  cohostList: {
    marginTop: RFPercentage(1.5),
    paddingHorizontal: RFPercentage(0.5),
  },
  cohostImageWrapper: {
    width: RFPercentage(6),
    height: RFPercentage(6),
    backgroundColor: COLORS.pink6,
    borderTopRightRadius: RFPercentage(100),
    borderTopLeftRadius: RFPercentage(100),
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: RFPercentage(1.8),
  },
  cohostImage: {
    width: RFPercentage(6),
    height: RFPercentage(6),
    borderTopRightRadius: RFPercentage(100),
    borderTopLeftRadius: RFPercentage(100),
    right: RFPercentage(0.3),
    bottom: RFPercentage(0.2),
  },
  rightIcon: { width: RFPercentage(1.7), height: RFPercentage(1.7) },
  attachmentCount: {
    color: COLORS.lightGrey,
    fontFamily: FONTS.regular,
    fontSize: RFPercentage(1.6),
    marginTop: RFPercentage(0.5),
  },
  attachmentList: { marginTop: RFPercentage(1) },
  attachmentWrapper: {
    width: RFPercentage(7),
    height: RFPercentage(7.5),
    backgroundColor: COLORS.fieldColor,
    borderRadius: RFPercentage(1.3),
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: RFPercentage(1.5),
  },
  attachmentImage: {
    width: RFPercentage(5.5),
    height: RFPercentage(6.5),
    borderRadius: RFPercentage(1.3),
    alignSelf: 'center',
    top: RFPercentage(0.3),
  },
  locationDetails: { width: RFPercentage(20) },
  locationAddress: {
    color: COLORS.primary,
    fontFamily: FONTS.regular,
    fontSize: RFPercentage(1.6),
    marginTop: RFPercentage(1),
  },
  directionBtn: {
    marginTop: RFPercentage(1),
    width: RFPercentage(14),
    height: RFPercentage(4.2),
    backgroundColor: COLORS.white,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: RFPercentage(0.1),
    borderColor: COLORS.primary,
    borderRadius: RFPercentage(1.7),
  },
  directionBtnText: {
    color: COLORS.primary,
    fontFamily: FONTS.bold,
    fontSize: RFPercentage(1.7),
  },
  locImage: { width: RFPercentage(12), height: RFPercentage(12) },
  footer: {
    width: '100%',
    alignItems: 'center',
    borderTopWidth: RFPercentage(0.1),
    borderTopColor: COLORS.lightWhite,
    marginTop: RFPercentage(10),
  },
  confirm: {
    width: '90%',
    alignSelf: 'center',
    height: RFPercentage(8),
    borderWidth: RFPercentage(0.1),
    borderColor: COLORS.grey7,
    borderRadius: RFPercentage(1.7),
    paddingHorizontal: RFPercentage(2),
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: RFPercentage(-4.2),
    zIndex: 999,
    backgroundColor: COLORS.white,
  },
  txt: {
    color: COLORS.black,
    fontSize: RFPercentage(1.7),
    fontFamily: FONTS.medium,
  },
  sub: {
    color: COLORS.lightGrey,
    fontSize: RFPercentage(1.5),
    fontFamily: FONTS.regular,
    marginTop: RFPercentage(0.6),
  },
});
