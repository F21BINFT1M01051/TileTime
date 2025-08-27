import {
  FlatList,
  Image,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Platform,
} from 'react-native';
import React, { useState } from 'react';
import LinearGradient from 'react-native-linear-gradient';
import TopNavigation from '../../../routers/TopBar';
import { COLORS, FONTS, ICONS, IMAGES } from '../../../config/theme';
import { RFPercentage } from 'react-native-responsive-fontsize';
import CustomButton from '../../../components/CustomButton';
import ActionsCard from '../../../components/ActionsCard';
import HomeCard from '../../../components/HomeCard';
import HomeGroupCard from '../../../components/HomeGroupCard';
import { useDispatch, useSelector } from 'react-redux';
import CreateEvent from '../../../components/CreateEvent';
import { setEventType } from '../../../redux/event-type/Actions';

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

const PlayerHome = ({ navigation }: any) => {
  const actions = ['1'];
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedType, setSelectedType] = useState('');
  const dispatch = useDispatch();

  const openModal = () => {
    setIsModalVisible(true);
  };

  return (
    <LinearGradient
      colors={[COLORS.white4, COLORS.white]}
      style={styles.gradientContainer}
    >
      <TopNavigation
        title="Home"
        right={true}
        home={true}
        // onPress2={() => navigation.navigate('SearchScreen')}
        onPress3={() => navigation.navigate('Notifications')}
      />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            width: '90%',
            alignSelf: 'center',
            justifyContent: 'space-between',
          }}
        >
          {actions.length > 0 ? (
            <View style={styles.titleContainer}>
              <Text style={styles.mainTitle}>
                {`Let’s get your Mahjong journey started`}
              </Text>
            </View>
          ) : (
            <View style={styles.titleContainer}>
              <Text style={styles.mainTitle}>
                {`You're Ready to Join,\nTeach, or Play`}
              </Text>
            </View>
          )}
          <Image
            source={IMAGES.home55}
            resizeMode="contain"
            style={{
              width: RFPercentage(15),
              height: RFPercentage(15),
              bottom: RFPercentage(1),
            }}
          />
        </View>

        <View style={styles.actionsWrapper}>
          {actions.length > 0 && (
            <>
              <View style={styles.actionsCardWrapper}>
                <ActionsCard />
              </View>
            </>
          )}

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
                  onPress={openModal}
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
              {/* <Image
                source={ICONS.star}
                resizeMode="contain"
                style={styles.iconStar}
              /> */}
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

            <TouchableOpacity activeOpacity={0.8} style={styles.viewAllButton}>
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

      <CreateEvent
        visible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
        title="Select Event Type"
        selectedValue={selectedType}
        onSelect={(value: any) => {
          setSelectedType(value);
          dispatch(setEventType(value));
        }}
        onConfirm={() => {
          setIsModalVisible(false);
          if (selectedType === 'Open Play') {
            navigation.navigate('InvitePlayer');
          }
          // else if (
          //   selectedType === 'Mahjong Lessons' &&
          //   role === 'Instructor'
          // ) {
          //   navigation.navigate('SelectPlayersInstructor');
          // }
          // else if (selectedType === 'Mahjong Lessons' && role === 'Player') {
          //   navigation.navigate('CreateLessonPlayer');
          // }
          else if (selectedType === 'Guided Play') {
            navigation.navigate('GuidedPlay', {
              players: false,
              groups: false,
              link: true,
            });
          } else {
            setIsModalVisible(false);
          }
        }}
      />
    </LinearGradient>
  );
};

export default PlayerHome;

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
    height: RFPercentage(22),
  },
  titleContainer: { width: '75%' },
  mainTitle: {
    color: COLORS.primary,
    fontFamily: FONTS.bold,
    fontSize: RFPercentage(3),
    lineHeight: RFPercentage(3),
  },
  actionsWrapper: {
    width: '100%',
    // bottom: Platform.OS === 'android' ? RFPercentage(8) : RFPercentage(6),
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
    fontFamily: FONTS.regular,
    color: COLORS.primary,
    fontSize: RFPercentage(2),
    lineHeight: RFPercentage(2),
    marginTop: RFPercentage(0.5),
  },
  buttonMargin: {
    marginTop: RFPercentage(4),
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
    fontFamily: FONTS.regular,
    color: COLORS.primary,
    fontSize: RFPercentage(2),
    lineHeight: RFPercentage(2),
    marginTop: RFPercentage(0.6),
  },
});
