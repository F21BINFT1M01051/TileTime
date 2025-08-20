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
  Dimensions,
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

const Events = ({ navigation }: any) => {
  const [isCalendarVisible, setCalendarVisible] = useState(false);
  const events = [];
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedType, setSelectedType] = useState('');
  const dispatch = useDispatch();
  const role = useSelector(state => state.userFlow.userFlow);
  const [isOn, setIsOn] = useState(false);

  const openModal = () => {
    setIsModalVisible(true);
  };

  const toggleCalendar = () => setCalendarVisible(!isCalendarVisible);

  return (
    <LinearGradient colors={[COLORS.white, COLORS.white]} style={{ flex: 1 }}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <ImageBackground
          source={IMAGES.background}
          resizeMode="cover"
          style={styles.imageBackground}
        >
          <TopNavigation title="My Events" right text="Saved Draft" />

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
                {`Events are a great way to gather players, share\nexperiences, and enjoy Mahjong as a community.`}
              </Text>
            </View>
          )}
        </ImageBackground>
        {events.length > 0 ? (
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
                  size={RFPercentage(2.6)}
                  style={styles.chevronIcon}
                />
              </TouchableOpacity>

              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Text
                  style={{
                    fontFamily: FONTS.regular,
                    color: COLORS.primary,
                    fontSize: RFPercentage(1.8),
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

            <TodayEvents />
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
    bottom: RFPercentage(6.5),
  },
  nativeModalWrapper: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  sub: {
    color: COLORS.primary,
    fontFamily: FONTS.stylish,
    fontSize: RFPercentage(2),
    marginTop: RFPercentage(1.5),
    textAlign: 'center',
    lineHeight: RFPercentage(2.7),
  },
  wrap: {
    width: '100%',
    alignItems: 'center',
    marginTop: RFPercentage(5),
  },
  head: {
    fontFamily: FONTS.headline,
    color: COLORS.primary,
    fontSize: RFPercentage(2.8),
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
