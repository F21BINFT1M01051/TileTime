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
  Platform,
  Modal,
  TouchableWithoutFeedback,
  Animated,
  Keyboard,
  Easing,
} from 'react-native';
import React, { useState, useRef } from 'react';
import LinearGradient from 'react-native-linear-gradient';
import TopNavigation from '../../../routers/TopBar';
import { COLORS, FONTS, ICONS, IMAGES } from '../../../config/theme';
import { RFPercentage } from 'react-native-responsive-fontsize';
import CustomButton from '../../../components/CustomButton';
import ActionsCard from '../../../components/ActionsCard';
import HomeCard from '../../../components/HomeCard';
import HomeGroupCard from '../../../components/HomeGroupCard';
import EventCalendar from '../../../components/EventCalendar';
import CreateEvent from '../../../components/CreateEvent';
import { useDispatch } from 'react-redux';
import { setEventType } from '../../../redux/event-type/Actions';
import { BlurView } from '@react-native-community/blur';

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

const InstructorHome = ({ navigation }: any) => {
  const actions = ['1'];
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedType, setSelectedType] = useState('');
  const dispatch = useDispatch();

  const openModal = () => {
    setIsModalVisible(true);
  };

  const [modalVisible, setModalVisible] = useState(false);
  const [modalVisible2, setModalVisible2] = useState(false);
  const [selectedGroup, setSelectedGroup] = useState(null);

  const slideAnim = React.useRef(new Animated.Value(100)).current;

  React.useEffect(() => {
    if (modalVisible2) {
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 500,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true,
      }).start();
    } else {
      slideAnim.setValue(100);
    }
  }, [modalVisible2]);

  const dismissAll = () => {
    Keyboard.dismiss();
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
        onPress2={() => navigation.navigate('SearchScreen')}
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
          <View style={{ width: '90%', alignSelf: 'center' }}>
            <EventCalendar onPress={openModal} />
          </View>

          <ImageBackground
            source={IMAGES.home_pic}
            resizeMode="cover"
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
                      onPress={() => {
                        setSelectedGroup(item);
                        setModalVisible(true);
                      }}
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
          } else if (selectedType === 'Mahjong Lessons') {
            navigation.navigate('SelectPlayersInstructor');
          } else if (selectedType === 'Guided Play') {
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

      <Modal
        visible={modalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}
      >
        <BlurView
          style={StyleSheet.absoluteFill}
          blurType="dark"
          blurAmount={5}
          reducedTransparencyFallbackColor="white"
        />
        <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
          <View style={styles.overLay}>
            <TouchableWithoutFeedback>
              <View style={styles.modalContent2}>
                <TouchableOpacity
                  onPress={() => setModalVisible(false)}
                  style={styles.closeButton}
                >
                  <Image source={ICONS.cross} style={styles.closeIcon} />
                </TouchableOpacity>

                <View style={styles.largeGroupIconContainer}>
                  <Image
                    source={IMAGES.customProfile}
                    style={styles.largeGroupIcon}
                  />
                </View>

                <Text style={styles.modalText}>
                  Join {selectedGroup?.title}
                </Text>
                <Text style={styles.modalSubText}>
                  Group – {selectedGroup?.attendees} Members
                </Text>

                <View style={styles.modalButtonWrapper}>
                  <CustomButton
                    title="Join Group Now"
                    onPress={() => {
                      setModalVisible(false);
                      setModalVisible2(true);
                    }}
                  />
                </View>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>

      {/* Bottom Sheet Modal */}
      <Modal
        visible={modalVisible2}
        transparent
        animationType="fade"
        onRequestClose={() => setModalVisible2(false)}
      >
        <BlurView
          style={StyleSheet.absoluteFill}
          blurType="dark"
          blurAmount={5}
          reducedTransparencyFallbackColor="white"
        />
        <TouchableWithoutFeedback onPress={() => setModalVisible2(false)}>
          <View style={[styles.overLay, styles.bottomSheetOverlay]}>
            <TouchableWithoutFeedback>
              <Animated.View
                style={[
                  styles.bottomSheet,
                  { transform: [{ translateY: slideAnim }] },
                ]}
              >
                <TouchableOpacity
                  onPress={() => setModalVisible2(false)}
                  style={styles.closeButton}
                >
                  <Image source={ICONS.cross} style={styles.closeIcon} />
                </TouchableOpacity>
                <Image
                  source={ICONS.group22}
                  resizeMode="cover"
                  style={styles.groupImage}
                />
                <View style={styles.groupInfoWrapper}>
                  <Text style={styles.groupName}>Emily Girls Group</Text>
                  <Text style={styles.groupInviteNote}>
                    This Group Is Invite-only
                  </Text>

                  <Image
                    source={ICONS.qoutes}
                    resizeMode="contain"
                    style={styles.qouteIcon}
                  />
                </View>
                <View style={styles.groupDescriptionWrapper}>
                  <Text style={styles.groupDescription}>
                    Reach out to a member you know for an invite or the group
                    link.
                  </Text>
                </View>
              </Animated.View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </LinearGradient>
  );
};

export default InstructorHome;

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
    height: RFPercentage(20),
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
    height: RFPercentage(86),
    marginTop: RFPercentage(5),
    // paddingBottom: RFPercentage(2),
    marginVertical: Platform.OS === 'android' ? RFPercentage(2) : 0,
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
    fontFamily: FONTS.bold,
    fontSize: RFPercentage(2.8),
    color: COLORS.primary,
  },
  iconBars: {
    width: RFPercentage(4),
    height: RFPercentage(4),
    bottom: RFPercentage(1.5),
    right: RFPercentage(0.5),
  },
  descriptionText: {
    fontFamily: FONTS.regular,
    color: COLORS.grey8,
    fontSize: RFPercentage(2.2),
    lineHeight: RFPercentage(2.3),
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
    // marginTop: RFPercentage(-1),
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
    color: COLORS.grey8,
    fontSize: RFPercentage(2.2),
    lineHeight: RFPercentage(2.2),
    marginTop: RFPercentage(0.6),
  },
  overLay2: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: COLORS.white,
    borderTopLeftRadius: RFPercentage(3),
    borderTopRightRadius: RFPercentage(3),
    paddingBottom: RFPercentage(4),
    height: '84%',
  },
  modalBanner: {
    width: RFPercentage(40),
    height: RFPercentage(14),
    alignSelf: 'center',
  },
  modalInnerContent: {
    width: '90%',
    alignSelf: 'center',
    marginTop: RFPercentage(3.5),
  },

  modalFooter: {
    borderTopWidth: RFPercentage(0.1),
    borderTopColor: COLORS.lightWhite,
    position: 'absolute',
    bottom: 0,
    width: '100%',
    paddingBottom: RFPercentage(4),
  },
  modalFooterInner: {
    width: '90%',
    alignSelf: 'center',
    marginTop: RFPercentage(2),
  },
  type: {
    fontFamily: FONTS.headline,
    color: COLORS.primary,
    fontSize: RFPercentage(2.6),
  },
  overLay: {
    flex: 1,
    // backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottomSheetOverlay: {
    justifyContent: 'flex-end',
  },
  modalContent2: {
    backgroundColor: COLORS.white,
    padding: RFPercentage(3.5),
    borderRadius: RFPercentage(2),
    width: '90%',
    alignItems: 'center',
  },
  closeButton: {
    position: 'absolute',
    right: RFPercentage(2),
    top: RFPercentage(2),
  },
  closeIcon: {
    width: RFPercentage(3),
    height: RFPercentage(3),
    tintColor: COLORS.lightGrey,
  },
  largeGroupIconContainer: {
    width: RFPercentage(7.8),
    height: RFPercentage(7.8),
    borderRadius: RFPercentage(100),
    backgroundColor: COLORS.yellow,
    alignItems: 'center',
    justifyContent: 'center',
  },
  largeGroupIcon: {
    width: RFPercentage(7.8),
    height: RFPercentage(7.8),
    borderTopRightRadius: RFPercentage(100),
    right: RFPercentage(0.5),
    borderTopLeftRadius: RFPercentage(100),
    borderBottomRightRadius: RFPercentage(100),
    borderBottomLeftRadius: RFPercentage(1),
  },
  modalText: {
    fontSize: RFPercentage(1.8),
    fontFamily: FONTS.semiBold,
    color: COLORS.primary,
    marginTop: RFPercentage(2.3),
  },
  modalSubText: {
    color: COLORS.lightGrey,
    fontSize: RFPercentage(1.7),
    fontFamily: FONTS.regular,
    marginTop: RFPercentage(0.6),
  },
  modalButtonWrapper: {
    marginTop: RFPercentage(3.5),
    width: '100%',
  },
  bottomSheet: {
    backgroundColor: COLORS.white,
    padding: RFPercentage(3),
    borderTopLeftRadius: RFPercentage(3),
    borderTopRightRadius: RFPercentage(3),
    width: '100%',
    alignItems: 'center',
    paddingVertical: RFPercentage(5),
  },
  groupImage: {
    width: RFPercentage(45),
    height: RFPercentage(15),
    left: RFPercentage(1.5),
  },
  groupInfoWrapper: {
    marginTop: RFPercentage(2),
  },
  groupName: {
    fontFamily: FONTS.headline,
    fontSize: RFPercentage(3),
    color: COLORS.primary,
    textAlign: 'center',
  },
  groupInviteNote: {
    color: COLORS.primary,
    fontSize: RFPercentage(1.8),
    fontFamily: FONTS.medium,
    textAlign: 'center',
    marginTop: RFPercentage(0.5),
  },
  qouteIcon: {
    width: RFPercentage(8),
    height: RFPercentage(4),
    position: 'absolute',
    right: RFPercentage(-7.5),
    top: RFPercentage(1.7),
  },
  groupDescriptionWrapper: {
    marginTop: RFPercentage(2),
    width: '70%',
  },
  groupDescription: {
    textAlign: 'center',
    color: COLORS.lightGrey,
    fontSize: RFPercentage(1.8),
    fontFamily: FONTS.regular,
  },
});
