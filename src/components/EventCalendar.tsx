// components/EventCalendar.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { COLORS, FONTS, ICONS } from '../config/theme';
import { RFPercentage } from 'react-native-responsive-fontsize';
import CustomButton from './CustomButton';

const getSevenDayRow = () => {
  const days = ['Mo', 'Tu', 'Wed', 'Th', 'Fr', 'Sa', 'Su'];
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

const EventCalendar = () => {
  const renderTimeLabels = (times) =>
    times.map((time, i) => (
      <Text
        key={i}
        style={[styles.timeLabel, { marginTop: i === 0 ? 0 : RFPercentage(4) }]}
      >
        {time}
      </Text>
    ));

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Your Event Calendar</Text>

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

      <View style={styles.timeBlock}>
        <View style={styles.timeColumn}>
          {renderTimeLabels(['08.00', '10.00', '12.00', '14.00'])}
        </View>
        <View style={styles.eventColumn}>
          <Text style={styles.noEventText}>No events for this date</Text>
          <CustomButton
            title="Create Event"
            icon={ICONS.calender}
            style={styles.button}
          />
        </View>
      </View>
    </View>
  );
};

export default EventCalendar;

const styles = StyleSheet.create({
  container: {
    width: '90%',
    marginTop: RFPercentage(3),
    alignSelf: 'center',
  },
  header: {
    color: COLORS.primary,
    fontFamily: FONTS.semiBold,
    fontSize: RFPercentage(1.8),
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
  todayContainer: {
    backgroundColor: 'rgba(177, 64, 136, 0.16)',
    borderRadius: RFPercentage(1.6),
  },
  dayName: {
    fontFamily: FONTS.regular,
    fontSize: RFPercentage(1.5),
    color: COLORS.lightGrey,
    top:RFPercentage(0.3)
  },
  dayDate: {
    fontFamily: FONTS.semiBold,
    fontSize: RFPercentage(2),
    color: COLORS.primary,
  },
  todayText: {
    color: COLORS.pink,
  },
  scheduleText: {
    color: COLORS.primary,
    fontFamily: FONTS.medium,
    fontSize: RFPercentage(1.7),
    marginTop: RFPercentage(2),
  },
  timeBlock: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: RFPercentage(2),
  },
  timeColumn: {
    paddingLeft: RFPercentage(1),
    marginTop: RFPercentage(1),
  },
  eventColumn: {
    marginLeft: RFPercentage(2),
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  timeLabel: {
    color: COLORS.lightGrey,
    fontSize: RFPercentage(1.5),
    fontFamily: FONTS.regular,
  },
  noEventText: {
    color: COLORS.primary,
    fontFamily: FONTS.medium,
    fontSize: RFPercentage(1.7),
  },
  button: {
    width: RFPercentage(22),
    borderRadius: RFPercentage(1.4),
    marginTop: RFPercentage(1),
  },
});
