import {
  FlatList,
  Image,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import TopNavigation from '../../../../routers/TopBar';
import { COLORS, FONTS, ICONS, IMAGES } from '../../../../config/theme';
import { RFPercentage } from 'react-native-responsive-fontsize';
import CustomButton from '../../../../components/CustomButton';
import ActionsCard from '../../../../components/ActionsCard';
import HomeCard from '../../../../components/HomeCard';
import HomeGroupCard from '../../../../components/HomeGroupCard';
import EventCalendar from '../../../../components/EventCalendar';

const Groups = [
  {
    id: 1,
    title: 'Mahjong - Richie Rich Group',
    attendees: 6,
    status: 'High Engagement',
    profile: IMAGES.customProfile,
  },
  {
    id: 2,
    title: 'Mahjong - Power Rangers',
    attendees: 2,
    status: 'Rapidly Growing',
    profile: IMAGES.customProfile,
  },
];

const Cards = [
  {
    id: 1,
    title: 'Harmony Hands:',
    bannerText: 'Beginner-Friendly',
    subTitle: 'Community Mahjong Meetup',
    profile: IMAGES.customProfile,
    date: 'April 30, 2025',
    distance: '32 mi away',
  },
  {
    id: 2,
    title: 'Harmony Hands:',
    bannerText: 'Open Table',
    subTitle: 'Community Mahjong Meetup',
    profile: IMAGES.customProfile,
    date: 'April 30, 2025',
    distance: '32 mi away',
  },
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

const Home = ({ navigation }: any) => {
  const actions = ['1'];

  return (
    <LinearGradient
      colors={[COLORS.offWhite2, COLORS.white]}
      style={styles.gradientContainer}
    >
      <ScrollView>
        <ImageBackground
          source={IMAGES.background}
          resizeMode="cover"
          style={styles.imageBackground}
        >
          <TopNavigation
            title="Home"
            right={true}
            home={true}
            onPress2={() => navigation.navigate('PlayerSearch')}
            onPress3={() => navigation.navigate('MyProfile')}
          />

          {actions.length > 0 ? (
            <View style={styles.titleContainer}>
              <Text style={styles.mainTitle}>
                {`Let’s get your Mahjong\njourney started`}
              </Text>
            </View>
          ) : (
            <View style={styles.titleContainer}>
              <Text style={styles.mainTitle}>
                {`You're Ready to Join,\nTeach, or Play`}
              </Text>
            </View>
          )}
        </ImageBackground>

        <View style={styles.actionsWrapper}>
          {actions.length > 0 && (
            <>
              <View style={styles.actionsCardWrapper}>
                <ActionsCard />
              </View>
            </>
          )}

          <EventCalendar />
          <ImageBackground
            source={IMAGES.home_pic}
            resizeMode="contain"
            style={[
              styles.homeTopBackground,
              { marginTop: actions.length > 0 ? RFPercentage(2) : 0 },
            ]}
          >
            <View style={styles.homeTopContent}>
              <View style={styles.rowCenter}>
                <Text style={styles.sectionTitle}>Explore Events Near You</Text>
                <Image
                  source={ICONS.bars2}
                  resizeMode="contain"
                  style={styles.iconBars}
                />
              </View>
              <Text style={styles.descriptionText}>
                A curated list of Mahjong sessions happening around you. Join as
                a player or instructor to engage with the community.
              </Text>
              <View style={styles.buttonMargin}>
                <CustomButton
                  title="Create Event"
                  icon={ICONS.calender}
                  style={styles.createEventButton}
                  onPress={() => {}}
                />
              </View>
            </View>

            <View style={styles.cardsWrapper}>
              <FlatList
                data={Cards}
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
                      />
                    </View>
                  );
                }}
              />
            </View>
          </ImageBackground>

          <View style={styles.groupSection}>
            <View style={styles.rowCenter}>
              <Text style={styles.sectionTitle}>Instructor Recommended</Text>
              <Image
                source={ICONS.star}
                resizeMode="contain"
                style={styles.iconStar}
              />
            </View>
            <Text style={styles.descriptionText}>
              Events you may want to join as an Instructor
            </Text>

            <View
              style={{
                width: '100%',
                alignSelf: 'center',
                marginTop: RFPercentage(0.6),
              }}
            >
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
                      />
                    </View>
                  );
                }}
              />
            </View>

            <TouchableOpacity style={styles.viewAllButton}>
              <Text style={styles.viewAllText}>View All</Text>
            </TouchableOpacity>

            <View style={styles.sectionMargin}>
              <Text style={styles.sectionTitle}>Open Groups You Can Join</Text>
            </View>
            <Text style={styles.groupText}>
              Discover active Mahjong groups looking for new members,
              instructors, or co-hosts.
            </Text>

            <FlatList
              data={Groups}
              keyExtractor={item => item.id.toString()}
              scrollEnabled={false}
              renderItem={({ item }) => {
                return (
                  <View style={styles.cardMargin}>
                    <HomeGroupCard
                      title={item.title}
                      profile={item.profile}
                      status={item.status}
                      attendees={item.attendees}
                    />
                  </View>
                );
              }}
            />
          </View>
        </View>
      </ScrollView>
    </LinearGradient>
  );
};

export default Home;

const styles = StyleSheet.create({
  gradientContainer: {
    flex: 1,
  },
  timeLabel: {
    color: COLORS.lightGrey,
    fontSize: RFPercentage(1.5),
    fontFamily: FONTS.regular,
  },
  timeBlock: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: RFPercentage(2),
  },
  imageBackground: {
    width: '100%',
    height: RFPercentage(35),
  },
  titleContainer: {},
  mainTitle: {
    color: COLORS.primary,
    fontFamily: FONTS.headline,
    fontSize: RFPercentage(3),
    textAlign: 'center',
    width: '90%',
    alignSelf: 'center',
    marginTop: RFPercentage(5),
  },
  actionsWrapper: {
    width: '100%',
    bottom: RFPercentage(7),
  },
  actionsCardWrapper: {
    width: '90%',
    alignSelf: 'center',
  },
  homeTopBackground: {
    width: '100%',
    height: RFPercentage(85),
    marginTop: RFPercentage(5),
    paddingBottom: RFPercentage(2),
  },
  homeTopContent: {
    width: '90%',
    alignSelf: 'center',
    marginTop: RFPercentage(5),
  },
  rowCenter: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: RFPercentage(2),
  },
  sectionTitle: {
    fontFamily: FONTS.headline,
    fontSize: RFPercentage(2.4),
    color: COLORS.primary,
  },
  iconBars: {
    width: RFPercentage(4),
    height: RFPercentage(4),
    bottom: RFPercentage(1),
    right: RFPercentage(0.7),
  },
  descriptionText: {
    fontFamily: FONTS.stylish,
    color: COLORS.primary,
    fontSize: RFPercentage(2.3),
    lineHeight: RFPercentage(2.8),
    marginTop: RFPercentage(0.5),
  },
  buttonMargin: {
    marginTop: RFPercentage(3),
  },
  createEventButton: {
    width: RFPercentage(23),
    height: RFPercentage(5.5),
    borderRadius: RFPercentage(1.4),
  },
  homeBottomBackground: {
    width: '100%',
    height: RFPercentage(48),
  },
  cardsWrapper: {
    width: '90%',
    alignSelf: 'center',
    marginTop: RFPercentage(0.5),
  },
  cardMargin: {
    marginTop: RFPercentage(3.5),
    paddingLeft: RFPercentage(1),
  },
  groupSection: {
    width: '90%',
    alignSelf: 'center',
    marginTop: RFPercentage(-1),
  },
  iconStar: {
    width: RFPercentage(3),
    height: RFPercentage(3),
    left: RFPercentage(0.6),
  },
  viewAllButton: {
    width: '100%',
    height: RFPercentage(5.5),
    backgroundColor: 'transparent',
    borderWidth: RFPercentage(0.2),
    borderColor: COLORS.primary,
    borderRadius: RFPercentage(100),
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: RFPercentage(4.5),
  },
  viewAllText: {
    color: COLORS.primary,
    fontSize: RFPercentage(2),
    fontFamily: FONTS.semiBold,
  },
  sectionMargin: {
    marginTop: RFPercentage(4),
  },
  groupText: {
    fontFamily: FONTS.stylish,
    color: COLORS.primary,
    fontSize: RFPercentage(2.2),
    lineHeight: RFPercentage(2.9),
    marginTop: RFPercentage(0.6),
  },
});
