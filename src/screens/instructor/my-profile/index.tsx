import {
  FlatList,
  Image,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Share,
} from 'react-native';
import React, { useState } from 'react';
import { COLORS, FONTS, ICONS, IMAGES } from '../../../config/theme';
import { RFPercentage } from 'react-native-responsive-fontsize';
import CustomButton from '../../../components/CustomButton';
import ToggleSwitch from 'toggle-switch-react-native';
import TopNavigation from '../../../routers/TopBar';
import SettingsButton from '../../../components/SettingsButton';
import Insights from '../../../components/Insights';

const connects = [
  {
    id: 1,
    icon: ICONS.phone2,
    connected: true,
    connection: '(909) 934 6677',
  },
  {
    id: 2,
    icon: ICONS.insta,
    connected: true,
    connection: '@adam11kiwi__',
  },
  {
    id: 3,
    icon: ICONS.facebook,
    connected: true,
    connection: '@adam11kiwi__',
  },

  {
    id: 5,
    icon: ICONS.web,
    connected: true,
    connection: 'adam11kiwi.com',
  },
  {
    id: 6,
    icon: ICONS.tiktok,
    connected: false,
  },
];

const credentials = [
  {
    id: 1,
    name: 'MahjongLine Certified',
  },
];

const experience = [
  {
    id: 1,
    name: 'Beginner-friendly',
  },
  {
    id: 2,
    name: 'Fast Paced',
  },
  {
    id: 3,
    name: 'Elder Friendly',
  },
];

const InsightsData = [
  {
    id: 1,
    name: 'Total Earnings',
    subText: '$45.00k',
  },
  {
    id: 2,
    name: 'Total Students Taught',
    subText: '12',
  },
  {
    id: 3,
    name: 'Repeat Players',
    subText: '102',
  },
  {
    id: 4,
    name: 'New Players This Month',
    subText: '23%',
  },
  {
    id: 5,
    name: 'Total Events hosted',
    subText: '1,039',
  },

  {
    id: 6,
    name: 'Average RSVP count',
    subText: '23%',
  },
  {
    id: 7,
    name: 'Profile Views',
    subText: '679',
  },
  {
    id: 8,
    name: 'Event Views',
    subText: '1234',
  },
];

const MyProfileInstructor = ({ navigation }: any) => {
  const [isOn, setIsOn] = useState(false);

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
      <TopNavigation title="Profile" />
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.innerContainer}>
          <View style={styles.profileRow}>
            <View style={{ width: '40%' }}>
              <ImageBackground
                source={ICONS.premiumBorder}
                resizeMode="contain"
                style={styles.avatarBorder}
              >
                <Image
                  source={IMAGES.customProfile}
                  resizeMode="cover"
                  style={styles.avatarImage}
                />
                <Image
                  source={ICONS.premium}
                  resizeMode="contain"
                  style={styles.premiumIcon}
                />
              </ImageBackground>
            </View>

            <View style={styles.nameSection}>
              <Text style={styles.nameText}>Samantha Lewis</Text>
              <Text style={styles.locationText}>Seattle, WA</Text>
              <CustomButton
                title="Edit Profile"
                icon={ICONS.pen22}
                onPress={() => navigation.navigate('EditProfileInstructor')}
                style={styles.editButton}
              />
            </View>
          </View>

          <Text style={styles.bioText}>
            Mahjong instructor focused on strategy, community, and fun. Open to
            all skill levels - join the table and play your way.
          </Text>

          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => setIsOn(!isOn)}
            style={styles.toggleRow}
          >
            <Text style={styles.toggleLabel}>Keep My Profile Private</Text>
            <ToggleSwitch
              isOn={isOn}
              onColor={COLORS.pink}
              offColor={COLORS.switch}
              size="small"
              onToggle={() => setIsOn(!isOn)}
            />
          </TouchableOpacity>

          <View style={{ marginTop: RFPercentage(5) }}>
            <Text style={styles.sectionTitle}>Credentials</Text>
            <View style={styles.badgeWrapper}>
              {credentials.map(item => (
                <View key={item.id} style={styles.credentialBadge}>
                  <Text style={styles.badgeText}>{item.name}</Text>
                </View>
              ))}
            </View>
          </View>

          <View style={styles.sectionWrapper}>
            <Text style={styles.sectionTitle}>Your Experience</Text>
            <View style={styles.badgeWrapper}>
              {experience.map(item => (
                <View key={item.id} style={styles.experienceBadge}>
                  <Text style={styles.badgeText}>{item.name}</Text>
                </View>
              ))}
            </View>
          </View>
          <View style={{ marginTop: RFPercentage(2.5) }}>
            <SettingsButton
              title="Payouts"
              icon={ICONS.arrow22}
              onPress={() => navigation.navigate('PayoutsInstructor')}
              style={{ borderBottomColor: COLORS.lightWhite }}
            />
          </View>

          <View>
            <FlatList
              data={connects}
              scrollEnabled={false}
              keyExtractor={item => item.id.toString()}
              contentContainerStyle={styles.connectList}
              renderItem={({ item }) => (
                <View style={styles.connectionRow}>
                  <Image
                    source={item.icon}
                    resizeMode="contain"
                    style={styles.connectionIcon}
                  />
                  {item.connected ? (
                    <Text style={styles.connectedText}>{item.connection}</Text>
                  ) : (
                    <>
                      <Text style={styles.notConnectedText}>Not Connected</Text>
                      <TouchableOpacity
                        activeOpacity={0.8}
                        style={styles.connectNowButton}
                      >
                        <Text style={styles.connectNowText}>Connect Now</Text>
                      </TouchableOpacity>
                    </>
                  )}
                </View>
              )}
            />
          </View>
          <View>
            <View style={styles.stepRow}>
              <View style={styles.stepLeft}>
                <Image
                  source={ICONS.hm3}
                  resizeMode="contain"
                  style={styles.stepIcon}
                />
                <Text style={styles.stepName}>Invite Friends</Text>
              </View>

              <TouchableOpacity
                activeOpacity={0.8}
                style={styles.stepButton}
                onPress={onShare}
              >
                <Text style={styles.stepButtonText}>Invite</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={{ flex: 1, marginTop: RFPercentage(4) }}>
            <Text
              style={{
                color: COLORS.primary,
                fontSize: RFPercentage(1.9),
                fontFamily: FONTS.semiBold,
              }}
            >
              Insights
            </Text>
            <FlatList
              data={InsightsData}
              keyExtractor={item => item.id.toString()}
              numColumns={2}
              columnWrapperStyle={{
                justifyContent: 'space-between',
                gap: RFPercentage(1.8),
                marginTop: RFPercentage(1.9),
              }}
              renderItem={({ item }) => (
                <View
                  style={{
                    flex: 1,
                  }}
                >
                  <Insights name={item.name} subText={item.subText} />
                </View>
              )}
            />
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default MyProfileInstructor;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  scrollContent: {
    paddingBottom: RFPercentage(2),
  },
  innerContainer: {
    width: '90%',
    alignSelf: 'center',
    marginTop: RFPercentage(3),
  },
  profileRow: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    justifyContent: 'space-between',
  },
  avatarBorder: {
    width: RFPercentage(14),
    height: RFPercentage(14),
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarImage: {
    width: RFPercentage(13),
    height: RFPercentage(13),
    borderRadius: RFPercentage(100),
  },
  premiumIcon: {
    position: 'absolute',
    bottom: RFPercentage(-1.6),
    width: RFPercentage(4),
    height: RFPercentage(4),
  },
  nameSection: {
    width: '60%',
  },
  nameText: {
    fontFamily: FONTS.headline,
    color: COLORS.primary,
    fontSize: RFPercentage(2.5),
  },
  locationText: {
    fontFamily: FONTS.regular,
    color: COLORS.black,
    fontSize: RFPercentage(1.8),
    marginTop: RFPercentage(0.5),
  },
  editButton: {
    borderRadius: RFPercentage(1.3),
    marginTop: RFPercentage(1.8),
    height: RFPercentage(5.3),
    width: '100%',
  },
  bioText: {
    color: COLORS.primary,
    fontFamily: FONTS.regular,
    fontSize: RFPercentage(1.8),
    marginTop: RFPercentage(4),
    lineHeight: RFPercentage(2),
  },
  toggleRow: {
    width: '100%',
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: RFPercentage(5),
  },
  toggleLabel: {
    textAlign: 'center',
    fontFamily: FONTS.medium,
    color: COLORS.inputColor,
    fontSize: RFPercentage(1.9),
  },
  sectionWrapper: {
    marginTop: RFPercentage(2.5),
  },
  sectionTitle: {
    color: COLORS.primary,
    fontSize: RFPercentage(1.9),
    fontFamily: FONTS.bold,
  },
  badgeWrapper: {
    marginTop: RFPercentage(1.5),
    flexWrap: 'wrap',
    flexDirection: 'row',
  },
  credentialBadge: {
    height: RFPercentage(4.5),
    paddingHorizontal: RFPercentage(1.8),
    backgroundColor: '#DEE3FD',
    borderRadius: RFPercentage(100),
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: RFPercentage(1.5),
    marginBottom: RFPercentage(1.5),
  },
  experienceBadge: {
    height: RFPercentage(4.5),
    paddingHorizontal: RFPercentage(1.8),
    backgroundColor: '#DAE4F7',
    borderRadius: RFPercentage(100),
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: RFPercentage(1.5),
    marginBottom: RFPercentage(1.5),
  },
  badgeText: {
    color: COLORS.primary,
    fontSize: RFPercentage(1.7),
    fontFamily: FONTS.medium,
    lineHeight: RFPercentage(1.7),
  },
  connectList: {
    paddingBottom: RFPercentage(2),
  },
  connectionRow: {
    width: '100%',
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: RFPercentage(3.5),
  },
  connectionIcon: {
    width: RFPercentage(2.5),
    height: RFPercentage(2.5),
  },
  connectedText: {
    color: COLORS.primary,
    fontSize: RFPercentage(1.9),
    fontFamily: FONTS.regular,
    marginLeft: RFPercentage(1.6),
    lineHeight: RFPercentage(1.9),
  },
  notConnectedText: {
    color: COLORS.lightGrey,
    fontSize: RFPercentage(1.9),
    fontFamily: FONTS.regular,
    marginLeft: RFPercentage(1.6),
    lineHeight: RFPercentage(1.9),
  },
  connectNowButton: {
    width: RFPercentage(12),
    height: RFPercentage(3.5),
    borderRadius: RFPercentage(100),
    backgroundColor: COLORS.primary,
    position: 'absolute',
    right: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  connectNowText: {
    color: COLORS.white,
    fontSize: RFPercentage(1.5),
    fontFamily: FONTS.medium,
    lineHeight: RFPercentage(1.5),
  },
  stepRow: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: RFPercentage(3),
  },
  stepLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  stepIcon: {
    width: RFPercentage(4.5),
    height: RFPercentage(4.5),
  },
  stepName: {
    marginLeft: RFPercentage(1.5),
    fontFamily: FONTS.semiBold,
    color: COLORS.primary,
    fontSize: RFPercentage(1.9),
  },
  checkIcon: {
    width: RFPercentage(5),
    height: RFPercentage(5),
  },
  stepButton: {
    width: RFPercentage(10),
    height: RFPercentage(3.5),
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: RFPercentage(100),
  },
  stepButtonText: {
    color: COLORS.white,
    fontSize: RFPercentage(1.7),
    fontFamily: FONTS.medium,
    lineHeight: RFPercentage(1.7),
  },
});
