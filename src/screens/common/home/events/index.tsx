import React, { useState, useRef } from 'react';
import {
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Modal,
  Image,
  TouchableWithoutFeedback,
  Animated,
  Easing,
  Dimensions,
  FlatList,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { COLORS, FONTS, IMAGES, ICONS } from '../../../../config/theme';
import { RFPercentage } from 'react-native-responsive-fontsize';
import TopNavigation from '../../../../routers/TopBar';
import SearchField from '../../../../components/SearchField';
import Feather from 'react-native-vector-icons/Feather';
import { Calendar, LocaleConfig } from 'react-native-calendars';
import EventCard from '../../../../components/EventCard';
import NewEvent from '../../../../components/NewEvent';
import CustomButton from '../../../../components/CustomButton';
import { BlurView } from '@react-native-community/blur';
import Selection from '../../../../components/Selection';

const avatars = [
  { id: 1, profile: ICONS.avatar },
  { id: 2, profile: ICONS.avatar },
  { id: 3, profile: ICONS.avatar },
  { id: 4, profile: ICONS.avatar },
  { id: 5, profile: ICONS.avatar },
  { id: 6, profile: ICONS.avatar },
];

LocaleConfig.locales['en'] = {
  monthNames: [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ],
  monthNamesShort: [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ],
  dayNames: [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ],
  dayNamesShort: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],
  today: 'Today',
};
LocaleConfig.defaultLocale = 'en';

const eventTypes = [
  {
    id: 1,
    name: 'Open Play',
    subTitle:
      'Let players join freely - perfect for casual games, meetups, or impromptu tiles with friends.',
  },
  {
    id: 2,
    name: 'Guided Play',
    subTitle:
      'Lead focused sessions for small groups and teach them how to play with confidence.',
  },
  {
    id: 3,
    name: 'Mahjong Lessons',
    subTitle:
      'Lead hands - on lessons, explain rules and help players build confidence step by step.',
  },
];

const Events = ({ navigation }: any) => {
  const [isCalendarVisible, setCalendarVisible] = useState(false);
  const events = [];
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedType, setSelectedType] = useState('');

  const toggleCalendar = () => setCalendarVisible(!isCalendarVisible);

  const getSevenDayRow = () => {
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const today = new Date();
    return [...Array(7)].map((_, i) => {
      const offset = i - 3;
      const date = new Date();
      date.setDate(today.getDate() + offset);
      return {
        day: days[date.getDay()],
        date: date.getDate(),
        isToday: offset === 0,
      };
    });
  };

  const renderTimeLabels = (times: string[]) =>
    times.map((time, i) => (
      <Text
        key={i}
        style={[styles.timeLabel, { marginTop: i === 0 ? 0 : RFPercentage(3) }]}
      >
        {time}
      </Text>
    ));

  const renderAvatars = () => {
    const visible = avatars.slice(0, 2);
    const remaining = avatars.length - visible.length;
    return (
      <View style={styles.avatarContainer}>
        {visible.map((item, index) => (
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
        {remaining > 0 && (
          <View style={[styles.avatarWrapper, styles.remainingWrapper]}>
            <Text style={styles.remainingText}>+{remaining}</Text>
          </View>
        )}
      </View>
    );
  };

  const slideAnim = useRef(
    new Animated.Value(Dimensions.get('window').height),
  ).current;

  const openModal = () => {
    setIsModalVisible(true);
    Animated.timing(slideAnim, {
      toValue: 0,
      duration: 600,
      easing: Easing.out(Easing.ease),
      useNativeDriver: true,
    }).start();
  };

  const closeModal = () => {
    Animated.timing(slideAnim, {
      toValue: Dimensions.get('window').height,
      duration: 600,
      easing: Easing.in(Easing.ease),
      useNativeDriver: true,
    }).start(() => {
      setIsModalVisible(false);
    });
  };

  return (
    <LinearGradient colors={[COLORS.white, COLORS.white]} style={{ flex: 1 }}>
      <ScrollView>
        <ImageBackground
          source={IMAGES.background}
          resizeMode="cover"
          style={styles.imageBackground}
        >
          <TopNavigation
            title="My Events"
            right
            text="Saved Drafts"
            onPress={() => navigation.navigate('CreateGroup')}
          />

          {events.length > 0 ? (
            <View style={styles.searchContainer}>
              <SearchField placeholder="Search events" />
            </View>
          ) : (
            <View style={styles.wrap}>
              <Text style={styles.head}>
                {`Host an Event and\nBring People Together`}
              </Text>
              <Text style={styles.sub}>
                Events are a great way to gather players, share experiences, and
                enjoy Mahjong as a community.
              </Text>
            </View>
          )}
        </ImageBackground>
        {events.length > 0 ? (
          <View style={styles.monthSelectorContainer}>
            <TouchableOpacity
              style={styles.monthButton}
              onPress={toggleCalendar}
            >
              <Text style={styles.monthText}>August</Text>
              <Feather
                name="chevron-down"
                color={COLORS.icon}
                size={RFPercentage(2.6)}
                style={styles.chevronIcon}
              />
            </TouchableOpacity>

            <View style={styles.weekRow}>
              {getSevenDayRow().map((day, index) => (
                <View
                  key={index}
                  style={[
                    styles.dayContainer,
                    day.isToday && styles.todayContainer,
                  ]}
                >
                  <Text
                    style={[styles.dayDate, day.isToday && styles.todayText]}
                  >
                    {day.date}
                  </Text>
                  <Text
                    style={[styles.dayName, day.isToday && styles.todayText]}
                  >
                    {day.day}
                  </Text>
                </View>
              ))}
            </View>

            <Text style={styles.scheduleText}>Schedule Today</Text>

            <View style={styles.timeBlock}>
              <View>{renderTimeLabels(['08.00', '10.00'])}</View>
              <View style={styles.timeBlockRight}>
                <EventCard />
              </View>
            </View>

            <View style={styles.timeBlock}>
              <View>{renderTimeLabels(['12.00'])}</View>
              <View style={styles.timeBlockRight}>
                <View
                  style={[
                    styles.eventBox,
                    {
                      backgroundColor: 'rgba(17, 54, 239, 0.14)',
                      height: RFPercentage(5),
                    },
                  ]}
                >
                  <View style={styles.eventRow}>
                    <Text style={styles.eventText}>
                      Four Winds: Community Mahjong Session
                    </Text>
                    {renderAvatars()}
                    <Image
                      source={ICONS.event}
                      resizeMode="contain"
                      style={styles.eventImageSmall}
                    />
                  </View>
                </View>
              </View>
            </View>

            <View style={styles.timeBlock}>
              <View>
                {renderTimeLabels([
                  '14.00',
                  '16.00',
                  '18.00',
                  '20.00',
                  '22.00',
                ])}
              </View>
              <View style={{ marginLeft: RFPercentage(2) }}>
                <NewEvent />
                <View>{/* <CustomButton /> */}</View>
              </View>
            </View>
          </View>
        ) : (
          <View style={styles.wrap2}>
            <Image
              source={IMAGES.event22}
              resizeMode="contain"
              style={styles.empty}
            />
            <View style={{ marginTop: RFPercentage(3) }}>
              <CustomButton
                title="Create Your First Event"
                onPress={openModal}
              />
            </View>
          </View>
        )}
      </ScrollView>

      {/* Calender Modal */}
      <Modal
        visible={isCalendarVisible}
        onRequestClose={toggleCalendar}
        animationType="slide"
        transparent
      >
        <View style={styles.nativeModalWrapper}>
          <View style={styles.calendarContainer}>
            <Calendar
              style={styles.calendar}
              hideExtraDays
              theme={{
                backgroundColor: '#ffffff',
                calendarBackground: '#ffffff',
                textSectionTitleColor: '#b6c1cd',
                selectedDayBackgroundColor: COLORS.pink,
                selectedDayTextColor: '#ffffff',
                todayTextColor: COLORS.pink,
                dayTextColor: '#666666',
                textDayFontFamily: FONTS.medium,
                textMonthFontFamily: FONTS.semiBold,
                textDayFontSize: RFPercentage(2.3),
                textMonthFontSize: RFPercentage(2),
                textDayHeaderFontSize: RFPercentage(2),
                textDayHeaderFontFamily: FONTS.medium,
              }}
            />
          </View>
        </View>
      </Modal>

      {/* Event Modal */}

      <Modal
        visible={isModalVisible}
        transparent
        animationType="none"
        onRequestClose={closeModal}
      >
        <BlurView
          style={StyleSheet.absoluteFill}
          blurType="dark"
          blurAmount={5}
          reducedTransparencyFallbackColor="white"
        />
        <TouchableWithoutFeedback onPress={closeModal}>
          <View style={styles.overLay2}>
            <TouchableWithoutFeedback>
              <Animated.View
                style={[
                  styles.modalContent,
                  { transform: [{ translateY: slideAnim }] },
                ]}
              >
                <View style={styles.modalInnerContent}>
                  <Text style={styles.type}>Select Event Type</Text>
                  <View style={{ marginTop: RFPercentage(0.5) }}>
                    <FlatList
                      data={eventTypes}
                      scrollEnabled={false}
                      keyExtractor={item => item.id.toString()}
                      renderItem={({ item }) => {
                        return (
                          <Selection
                            title={item.name}
                            subTitle={item.subTitle}
                            icon={ICONS.user}
                            onSelect={() => setSelectedType(item.name)}
                            isSelected={selectedType === item.name}
                          />
                        );
                      }}
                    />
                  </View>
                </View>

                <View style={styles.modalFooter}>
                  <View style={styles.modalFooterInner}>
                    <CustomButton
                      title="Confirm & Continue"
                      onPress={() => {
                        closeModal();
                        navigation.navigate('InvitePlayer');
                      }}
                    />
                  </View>
                </View>
              </Animated.View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </LinearGradient>
  );
};

export default Events;

const styles = StyleSheet.create({
  imageBackground: {
    width: '100%',
    height: RFPercentage(32),
    alignItems: 'center',
  },
  searchContainer: {
    width: '90%',
    alignSelf: 'center',
    marginTop: RFPercentage(3),
  },
  monthSelectorContainer: {
    width: '90%',
    alignSelf: 'center',
    bottom: RFPercentage(5),
  },
  nativeModalWrapper: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  sub: {
    color: COLORS.primary,
    fontFamily: FONTS.stylish,
    fontSize: RFPercentage(1.8),
    marginTop: RFPercentage(1.5),
    textAlign: 'center',
  },
  wrap: {
    width: '100%',
    alignItems: 'center',
    marginTop: RFPercentage(5),
  },
  head: {
    fontFamily: FONTS.headline,
    color: COLORS.primary,
    fontSize: RFPercentage(2.6),
    textAlign: 'center',
  },
  monthButton: {
    flexDirection: 'row',
    alignItems: 'center',
    width: RFPercentage(20),
  },
  monthText: {
    color: COLORS.primary,
    fontFamily: FONTS.headline,
    fontSize: RFPercentage(2.3),
  },
  modal: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  calendarContainer: {
    backgroundColor: 'white',
    borderTopLeftRadius: RFPercentage(2),
    borderTopRightRadius: RFPercentage(2),
    padding: RFPercentage(2),
    maxHeight: '60%',
  },
  dragHandle: {},
  calendar: {},

  weekRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginTop: RFPercentage(1.5),
  },

  dayContainer: {
    alignItems: 'center',
    padding: RFPercentage(1),
    width: RFPercentage(6),
    borderRadius: RFPercentage(1),
  },
  wrap2: {
    width: '90%',
    alignSelf: 'center',
    marginTop: RFPercentage(4),
  },

  todayContainer: {
    backgroundColor: 'rgba(177, 64, 136, 0.16)',
    borderRadius: RFPercentage(1.6),
  },

  dayName: {
    fontFamily: FONTS.regular,
    fontSize: RFPercentage(1.5),
    color: COLORS.lightGrey,
  },

  dayDate: {
    fontFamily: FONTS.semiBold,
    fontSize: RFPercentage(2),
    color: COLORS.primary,
  },

  todayText: {
    color: COLORS.pink,
  },
  avatarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  empty: {
    width: '100%',
    height: RFPercentage(40),
    alignSelf: 'center',
  },
  avatarWrapper: {
    width: RFPercentage(2.8),
    height: RFPercentage(2.8),
    borderRadius: RFPercentage(2),
    borderWidth: 1.5,
    borderColor: COLORS.white,
    overflow: 'hidden',
    backgroundColor: COLORS.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
  type: {
    fontFamily: FONTS.headline,
    color: COLORS.primary,
    fontSize: RFPercentage(2.6),
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
  timeBlock: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: RFPercentage(2),
  },
  timeBlockRight: {
    marginLeft: RFPercentage(2),
  },
  timeLabel: {
    color: COLORS.lightGrey,
    fontSize: RFPercentage(1.5),
    fontFamily: FONTS.regular,
  },
  eventBox: {
    justifyContent: 'center',
    borderRadius: RFPercentage(1.3),
    paddingHorizontal: RFPercentage(1.5),
  },
  eventRow: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    width: '100%',
    position: 'relative',
  },
  eventText: {
    color: COLORS.primary,
    fontFamily: FONTS.semiBold,
    fontSize: RFPercentage(1.3),
    width: RFPercentage(25),
  },
  eventTitle: {
    color: COLORS.primary,
    fontFamily: FONTS.semiBold,
    fontSize: RFPercentage(1.7),
  },
  eventTextContainer: {
    width: RFPercentage(22),
  },
  eventImageSmall: {
    width: RFPercentage(3),
    height: RFPercentage(3),
  },
  eventImageLarge: {
    width: RFPercentage(7),
    height: RFPercentage(7),
  },
  scheduleText: {
    color: COLORS.primary,
    fontFamily: FONTS.semiBold,
    fontSize: RFPercentage(1.9),
    marginTop: RFPercentage(3),
  },
  chevronIcon: {
    left: RFPercentage(0.3),
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
});
