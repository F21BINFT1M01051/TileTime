import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { COLORS, FONTS, ICONS } from '../config/theme';
import { RFPercentage } from 'react-native-responsive-fontsize';
import CustomButton from './CustomButton';

// Mock avatars (if needed)
const avatars = [
  { id: 1, profile: ICONS.avatar },
  { id: 2, profile: ICONS.avatar },
  { id: 3, profile: ICONS.avatar },
  { id: 4, profile: ICONS.avatar },
];

const getSevenDayRow = () => {
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const today = new Date();
  const dayOfWeek = today.getDay(); // 0 (Sun) - 6 (Sat)
  const diffToMonday = dayOfWeek === 0 ? -6 : 1 - dayOfWeek;

  return [...Array(7)].map((_, i) => {
    const date = new Date();
    date.setDate(today.getDate() + diffToMonday + i);
    return {
      day: days[i],
      date: date.getDate(),
      isToday: date.toDateString() === today.toDateString(),
    };
  });
};

const EventCalendar = ({ onPress, events = [] }: any) => {
  const renderTimeLabels = (times: string[]) =>
    times.map((time, i) => (
      <Text
        key={i}
        style={[styles.timeLabel, { marginTop: i === 0 ? 0 : RFPercentage(4) }]}
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

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Your Event Calendar</Text>

      {/* Week Row */}
      <View style={styles.weekRow}>
        {getSevenDayRow().map((day, index) => (
          <View
            key={index}
            style={[
              styles.dayContainer,
              day.isToday && styles.todayContainer,
            ]}
          >
            <Text style={[styles.dayDate, day.isToday && styles.todayText]}>
              {day.date}
            </Text>
            <Text style={[styles.dayName, day.isToday && styles.todayText]}>
              {day.day}
            </Text>
          </View>
        ))}
      </View>

      <Text style={styles.scheduleText}>Schedule Today</Text>

      {/* Events vs Empty */}
      {events.length === 0 ? (
        <View style={styles.timeBlock}>
          <View style={styles.timeColumn}>
            {renderTimeLabels(['08.00', '10.00', '12.00', '14.00'])}
          </View>
          <View style={styles.eventColumn}>
            <Text style={styles.noEventText}>No events for this date</Text>
            <CustomButton
              onPress={onPress}
              title="Create Event"
              icon={ICONS.calender}
              style={styles.button}
            />
          </View>
        </View>
      ) : (
        <>
          {/* Example: Event at 10:00 */}
          <View style={styles.timeBlock}>
            <View>{renderTimeLabels(['10.00'])}</View>
            <View style={styles.eventBox}>
              <Text style={styles.eventText}>
                {events[0].title || 'Community Mahjong Session'}
              </Text>
              {renderAvatars()}
              <Image
                source={ICONS.event}
                resizeMode="contain"
                style={styles.eventImageSmall}
              />
            </View>
          </View>
        </>
      )}
    </View>
  );
};

export default EventCalendar;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginTop: RFPercentage(3),
    alignSelf: 'center',
  },
  header: {
    color: COLORS.primary,
    fontFamily: FONTS.bold,
    fontSize: RFPercentage(2),
  },
  weekRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: RFPercentage(1.5),
  },
  dayContainer: {
    alignItems: 'center',
    padding: RFPercentage(1),
    width: RFPercentage(6),
    borderRadius: RFPercentage(1),
    height:RFPercentage(6),
    justifyContent:'center'
  },
  todayContainer: {
    backgroundColor: '#E3F6F9',
    borderRadius: RFPercentage(1.55),
  },
  dayName: {
    fontFamily: FONTS.regular,
    fontSize: RFPercentage(1.5),
    color: COLORS.lightGrey,
    top: RFPercentage(0.3),
  },
  dayDate: {
    fontFamily: FONTS.inter_semiBold,
    fontSize: RFPercentage(1.9),
    color: COLORS.primary,
    fontWeight:"600"
  },
  todayText: {
    color: COLORS.pink,
  },
  scheduleText: {
    color: COLORS.primary,
    fontFamily: FONTS.medium,
    fontSize: RFPercentage(1.9),
    marginTop: RFPercentage(2),
  },
  timeBlock: {
    flexDirection: 'row',
    marginTop: RFPercentage(2),
  },
  timeColumn: {
    paddingLeft: RFPercentage(1),
    marginTop: RFPercentage(1),
  },
  eventColumn: {
    marginLeft: RFPercentage(2),
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  timeLabel: {
    color: COLORS.lightGrey,
    fontSize: RFPercentage(1.5),
    fontFamily: FONTS.regular,
  },
  noEventText: {
    color: COLORS.primary,
    fontFamily: FONTS.medium,
    fontSize: RFPercentage(1.9),
  },
  button: {
    width: RFPercentage(22),
    borderRadius: RFPercentage(1.4),
    marginTop: RFPercentage(1),
  },
  eventBox: {
    marginLeft: RFPercentage(2),
    padding: RFPercentage(1),
    backgroundColor: 'rgba(17, 54, 239, 0.14)',
    borderRadius: RFPercentage(1),
    flexDirection: 'row',
    alignItems: 'center',
    gap: RFPercentage(1),
  },
  eventText: {
    flex: 1,
    color: COLORS.primary,
    fontFamily: FONTS.medium,
    fontSize: RFPercentage(1.6),
  },
  avatarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatarWrapper: {
    width: RFPercentage(3.5),
    height: RFPercentage(3.5),
    borderRadius: RFPercentage(2),
    overflow: 'hidden',
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.lightGrey,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarImage: {
    width: '100%',
    height: '100%',
  },
  remainingWrapper: {
    backgroundColor: COLORS.lightGrey,
  },
  remainingText: {
    fontSize: RFPercentage(1.3),
    fontFamily: FONTS.medium,
    color: COLORS.white,
  },
  eventImageSmall: {
    width: RFPercentage(2.5),
    height: RFPercentage(2.5),
  },
});
