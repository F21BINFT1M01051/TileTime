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
  Animated,
  TouchableWithoutFeedback,
  SectionList,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { COLORS, FONTS, IMAGES, ICONS } from '../../../../config/theme';
import { RFPercentage } from 'react-native-responsive-fontsize';
import TopNavigation from '../../../../routers/TopBar';
import SearchField from '../../../../components/SearchField';
import Feather from 'react-native-vector-icons/Feather';
import { Calendar, LocaleConfig } from 'react-native-calendars';
import CustomButton from '../../../../components/CustomButton';
import CreateEvent from '../../../../components/CreateEvent';
import { useDispatch, useSelector } from 'react-redux';
import { setEventType } from '../../../../redux/event-type/Actions';
import ToggleSwitch from 'toggle-switch-react-native';
import EventCalendar from '../../../../components/EventCalendar';
import TodayEvents from '../../../instructor/components/TodayEvents';
import { BlurView } from '@react-native-community/blur';
import moment from 'moment';
import EventCard from '../../../../components/EventCard';

const today = moment().format('YYYY-MM-DD');

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

const upcoming = [
  {
    id: 1,
    name: 'Four Winds: Community Mahjong Session',
    host: 'Akshay and Nikita',
    profile: IMAGES.customProfile,
    date: 'Wed, 6 Aug',
    type: 'Open Play',
  },
  {
    id: 2,
    name: 'Four Winds: Community Mahjong Session',
    host: 'Akshay and Nikita',
    profile: IMAGES.customProfile,
    date: 'Sat, 9 Aug',
    type: 'Guided Play',
  },
  {
    id: 3,
    name: 'Four Winds: Community Mahjong Session',
    host: 'Akshay and Nikita',
    profile: IMAGES.customProfile,
    date: 'Sat, 16 Aug',
    type: 'Lessons',
  },
  {
    id: 4,
    name: 'Four Winds: Community Mahjong Session',
    host: 'Akshay and Nikita',
    profile: IMAGES.customProfile,
    date: 'Fri, 29 Aug',
    type: 'Guided Play',
  },
  {
    id: 5,
    name: 'Four Winds: Community Mahjong Session',
    host: 'Akshay and Nikita',
    profile: IMAGES.customProfile,
    date: 'Fri, 31 Aug',
    type: 'Open Play',
  },
];

const groupByDate = (events: any) => {
  const grouped = events.reduce((acc, event) => {
    if (!acc[event.date]) {
      acc[event.date] = [];
    }
    acc[event.date].push(event);
    return acc;
  }, {});

  return Object.keys(grouped).map(date => ({
    title: date,
    data: grouped[date],
  }));
};

const Events = ({ navigation }: any) => {
  const [isCalendarVisible, setCalendarVisible] = useState(false);
  const events = ['9'];
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedType, setSelectedType] = useState('');
  const dispatch = useDispatch();
  const role = useSelector(state => state.userFlow.userFlow);
  const [isOn, setIsOn] = useState(false);
  const [query, setQuery] = useState('');

  const openModal = () => {
    setIsModalVisible(true);
  };
  const toggleCalendar = () => setCalendarVisible(!isCalendarVisible);
  const groupedUpcoming = groupByDate(upcoming);

  return (
    <LinearGradient
      colors={[events.length > 0 ? '#FFFFFF' : '#F5FDFF', '#FFFFFF']}
      style={{ flex: 1 }}
    >
      <TopNavigation title="My Events" right text="Saved Draft" />

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{ width: '90%', alignSelf: 'center' }}>
          {events.length < 0 && (
            <>
              <View style={styles.wrap}>
                <View style={{ width: '70%' }}>
                  <Text style={styles.head}>
                    {`Host an Event and\nBring People Together`}
                  </Text>
                </View>
                <Image
                  source={IMAGES.home66}
                  resizeMode="contain"
                  style={{
                    width: RFPercentage(9),
                    height: RFPercentage(9),
                    bottom: RFPercentage(2),
                  }}
                />
              </View>
              <Text style={styles.sub}>
                {`Events are a great way to gather players, share\nexperiences, and enjoy Mahjong as a community.`}
              </Text>
            </>
          )}
        </View>
        {events.length > 0 ? (
          <>
            <ImageBackground
              source={IMAGES.event9}
              resizeMode="cover"
              style={{ width: '100%', height: RFPercentage(16) }}
            >
              <View
                style={{
                  width: '90%',
                  alignSelf: 'center',
                  marginTop: RFPercentage(2.5),
                }}
              >
                <SearchField
                  placeholder="Search events"
                  value={query}
                  onChangeText={setQuery}
                />
              </View>
            </ImageBackground>
            <View style={styles.monthSelectorContainer}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
              >
                <TouchableOpacity
                  style={styles.monthButton}
                  onPress={toggleCalendar}
                >
                  <Text style={styles.monthText}>August</Text>
                  <Feather
                    name="chevron-down"
                    color={COLORS.icon}
                    size={RFPercentage(2.4)}
                    style={styles.chevronIcon}
                  />
                </TouchableOpacity>

                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Text
                    style={{
                      fontFamily: FONTS.regular,
                      color: COLORS.primary,
                      fontSize: RFPercentage(1.7),
                      marginRight: RFPercentage(1),
                    }}
                  >
                    List View
                  </Text>
                  <ToggleSwitch
                    isOn={isOn}
                    onColor={COLORS.pink}
                    offColor={COLORS.switch}
                    size="small"
                    onToggle={() => setIsOn(!isOn)}
                  />
                </View>
              </View>
              {isOn ? (
                <View>
                  <Text
                    style={{
                      fontFamily: FONTS.semiBold,
                      fontSize: RFPercentage(1.8),
                      marginTop: RFPercentage(3),
                      color: COLORS.primary,
                    }}
                  >
                    Upcoming Events
                  </Text>
                  <SectionList
                    sections={groupedUpcoming}
                    keyExtractor={(item, index) => item.id.toString() + index}
                    renderSectionHeader={({ section: { title } }) => (
                      <Text
                        style={{
                          fontFamily: FONTS.inter_semiBold,
                          fontSize: RFPercentage(1.7),
                          color: COLORS.primary,
                          marginTop: RFPercentage(2.5),
                          fontWeight: '700',
                        }}
                      >
                        {title}
                      </Text>
                    )}
                    renderItem={({ item }) => (
                      <EventCard
                        name={item.name}
                        host={item.host}
                        profile={item.profile}
                        onPress={() =>
                          navigation.navigate('InstructorEventDetail', {
                            type: item.type,
                          })
                        }
                      />
                    )}
                    contentContainerStyle={{ marginVertical: RFPercentage(1) }}
                  />
                </View>
              ) : (
                <TodayEvents />
              )}
            </View>
          </>
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
        animationType="fade"
        transparent
      >
        <BlurView
          style={StyleSheet.absoluteFill}
          blurType="dark"
          blurAmount={5}
          reducedTransparencyFallbackColor="white"
        >
          <TouchableWithoutFeedback onPress={() => setCalendarVisible(false)}>
            <View style={styles.nativeModalWrapper}>
              <View style={styles.calendarContainer}>
                <Calendar
                  style={styles.calendar}
                  hideExtraDays
                  markedDates={{
                    [today]: {
                      selected: true,
                      selectedColor: COLORS.pink,
                      selectedTextColor: COLORS.white,
                    },
                  }}
                  theme={{
                    backgroundColor: COLORS.white,
                    calendarBackground: COLORS.white,
                    textSectionTitleColor: COLORS.primary,
                    selectedDayBackgroundColor: COLORS.pink,
                    selectedDayTextColor: COLORS.white,
                    todayTextColor: COLORS.pink,
                    dayTextColor: COLORS.primary,
                    textDayFontFamily: FONTS.inter_semiBold,
                    textMonthFontFamily: FONTS.inter,
                    textDayFontSize: RFPercentage(2.3),
                    textMonthFontSize: RFPercentage(2),
                    textDayHeaderFontSize: RFPercentage(2),
                    textDayHeaderFontFamily: FONTS.inter_semiBold,
                    arrowColor: COLORS.primary,
                  }}
                />
              </View>
            </View>
          </TouchableWithoutFeedback>
        </BlurView>
      </Modal>

      {/* Event Modal */}
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
          } else if (
            selectedType === 'Mahjong Lessons' &&
            role === 'Instructor'
          ) {
            navigation.navigate('SelectPlayersInstructor');
          } else if (selectedType === 'Mahjong Lessons' && role === 'Player') {
            navigation.navigate('CreateLessonPlayer');
          } else {
            navigation.navigate('GuidedPlay', {
              players: false,
              groups: false,
              link: true,
            });
          }
        }}
      />
    </LinearGradient>
  );
};

export default Events;

const styles = StyleSheet.create({
  imageBackground: {
    width: '100%',
    height: RFPercentage(18),
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
    bottom: RFPercentage(4),
  },
  nativeModalWrapper: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  sub: {
    color: COLORS.primary,
    fontFamily: FONTS.regular,
    fontSize: RFPercentage(2),
    lineHeight: RFPercentage(2),
  },
  wrap: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: RFPercentage(3),
  },
  head: {
    fontFamily: FONTS.headline,
    color: COLORS.primary,
    fontSize: RFPercentage(2.8),
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
  calendar: {
    height: '70%',
  },

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
