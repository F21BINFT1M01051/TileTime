import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  Platform,
} from 'react-native';
import { RFPercentage } from 'react-native-responsive-fontsize';
import { COLORS, FONTS, ICONS, IMAGES } from '../../../config/theme';

// Week row helper
const getSevenDayRow = () => {
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const today = new Date();
  const dayOfWeek = today.getDay();
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

// Timeline slots (even hours only)
const timeSlots = [
  '08:00',
  '10:00',
  '12:00',
  '14:00',
  '16:00',
  '18:00',
  '20:00',
  '22:00',
];

// Events
const events = [
  { id: 1, title: 'Morning Session', start: '08:00', end: '10:00' },
  { id: 2, title: 'Lunch Meetup', start: '12:00', end: '13:00' },
  { id: 3, title: 'Evening Workshop', start: '14:00', end: '22:00' },
];

const avatars = [
  { id: 1, profile: ICONS.avatar },
  { id: 2, profile: ICONS.avatar },
  { id: 3, profile: ICONS.avatar },
  { id: 4, profile: ICONS.avatar },
  { id: 5, profile: ICONS.avatar },
  { id: 6, profile: ICONS.avatar },
];

// helper: index of time in slots
const getTimeIndex = time => timeSlots.indexOf(time);

// helper: event position & height
const getEventStyle = (start, end) => {
  const slotHeight = RFPercentage(5.8); // height of each time slot
  const startIndex = getTimeIndex(start);
  const endIndex = getTimeIndex(end);
  const top = startIndex * slotHeight;
  const height = (endIndex - startIndex) * slotHeight + RFPercentage(3);
  return { top, height };
};

export default function TodayEvents() {
  const visibleAvatars = avatars.slice(0, 2);
  const remainingCount = avatars.length - visibleAvatars.length;

  return (
    <ScrollView style={styles.container}>
      {/* Week Row */}
      <View style={styles.weekRow}>
        {getSevenDayRow().map((day, index) => (
          <View
            key={index}
            style={[styles.dayContainer, day.isToday && styles.todayContainer]}
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

      {/* Timeline + Events */}
      <View style={styles.timelineRow}>
        {/* Time column */}
        <View style={styles.timeline}>
          {timeSlots.map((time, index) => (
            <View key={index} style={styles.timeSlot}>
              <Text style={styles.timeText}>{time}</Text>
            </View>
          ))}
        </View>

        {/* Events container */}
        <View style={styles.eventsContainer}>
          {events.map(event => {
            const { height } = getEventStyle(event.start, event.end);
            return (
              <View
                key={event.id}
                style={[
                  styles.event,
                  {
                    height,
                    marginTop: RFPercentage(2),
                    backgroundColor:
                      event.id === 2
                        ? 'rgba(150, 152, 200, 0.25)'
                        : event.id === 3
                        ? 'rgba(222, 234, 255, 0.69)'
                        : 'rgba(81, 135, 144, 0.14)',
                  },
                ]}
              >
                <View style={styles.header}>
                  <View style={styles.eventTitleWrapper}>
                    <Text
                      style={[
                        styles.eventTitleText,
                        event.id === 2 && styles.smallEventText,
                      ]}
                    >
                      Four Winds: Community Mahjong Session
                    </Text>
                  </View>
                  <View>
                    <Image
                      source={IMAGES.customProfile}
                      resizeMode="cover"
                      style={[
                        event.id === 2
                          ? styles.smallEventImage
                          : styles.eventImage,
                      ]}
                    />
                  </View>

                  {/* Horizontal Avatar List */}
                  <View
                    style={[
                      event.id === 2
                        ? styles.smallAvatarRow
                        : styles.avatarContainer,
                    ]}
                  >
                    {visibleAvatars.map((item, index) => (
                      <View
                        key={item.id}
                        style={[
                          styles.avatarWrapper,
                          {
                            marginLeft: index === 0 ? 0 : -10,
                            width:
                              event.id === 2
                                ? RFPercentage(2.5)
                                : RFPercentage(2.8),
                            height:
                              event.id === 2
                                ? RFPercentage(2.5)
                                : RFPercentage(2.8),
                          },
                        ]}
                      >
                        <Image
                          source={item.profile}
                          style={styles.avatarImage}
                        />
                      </View>
                    ))}
                    {remainingCount > 0 && (
                      <View
                        style={[
                          styles.avatarWrapper,
                          styles.remainingWrapper,
                          {
                            width:
                              event.id === 2
                                ? RFPercentage(2.5)
                                : RFPercentage(2.8),
                            height:
                              event.id === 2
                                ? RFPercentage(2.5)
                                : RFPercentage(2.8),
                          },
                        ]}
                      >
                        <Text style={styles.remainingText}>
                          +{remainingCount}
                        </Text>
                      </View>
                    )}
                  </View>
                </View>
              </View>
            );
          })}
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: RFPercentage(2),
  },
  // Week row styles
  weekRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  dayContainer: {
    alignItems: 'center',
    padding: RFPercentage(1),
    width: RFPercentage(6),
    borderRadius: RFPercentage(1),
    height: RFPercentage(5.6),
    justifyContent: 'center',
  },
  todayContainer: {
    backgroundColor: 'rgba(96, 203, 224, 0.16)',
    borderRadius: RFPercentage(1.6),
  },
  dayName: {
    fontFamily: FONTS.regular,
    fontSize: RFPercentage(1.5),
    color: COLORS.lightGrey,
    marginTop: Platform.OS === 'ios' ? RFPercentage(0.4) : 0,
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
    fontFamily: FONTS.semiBold,
    fontSize: RFPercentage(1.9),
    color: COLORS.primary,
    marginTop: RFPercentage(3),
  },
  // Timeline row
  timelineRow: {
    flexDirection: 'row',
    marginTop: RFPercentage(1),
    width: '95%',
    alignSelf: 'center',
  },
  timeline: {
    width: RFPercentage(5),
  },
  timeSlot: {
    height: RFPercentage(5.8),
    justifyContent: 'center',
  },
  timeText: {
    fontSize: RFPercentage(1.6),
    color: COLORS.lightGrey,
  },
  // Events
  eventsContainer: {
    flex: 1,
    marginLeft: RFPercentage(2),
    position: 'relative',
  },
  event: {
    backgroundColor: 'rgba(81, 135, 144, 0.14)',
    width: '100%',
    borderRadius: RFPercentage(1.5),
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: RFPercentage(0.5),
  },
  eventTitleWrapper: {
    width: RFPercentage(16),
  },
  eventTitleText: {
    fontFamily: FONTS.medium,
    color: COLORS.primary,
    fontSize: RFPercentage(1.8),
  },
  smallEventText: {
    fontSize: RFPercentage(1.4),
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '90%',
    alignSelf: 'center',
    alignItems: 'center',
  },
  eventImage: {
    width: RFPercentage(6),
    height: RFPercentage(7),
    borderRadius: RFPercentage(1.5),
    borderRightWidth: RFPercentage(0.3),
    borderRightColor: COLORS.yellow,
  },
  smallEventImage: {
    width: RFPercentage(3),
    height: RFPercentage(3),
    borderRadius: RFPercentage(1),
  },
  avatarContainer: {
    flexDirection: 'row',
    marginTop: RFPercentage(1),
    alignItems: 'center',
    position: 'absolute',
    bottom: 0,
    right: RFPercentage(-1),
  },
  smallAvatarRow: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'absolute',
    right: RFPercentage(4),
  },
  avatarWrapper: {
    width: RFPercentage(2.6),
    height: RFPercentage(2.6),
    borderRadius: RFPercentage(2),
    borderWidth: 1.5,
    borderColor: COLORS.white,
    overflow: 'hidden',
    backgroundColor: COLORS.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarImage: {
    width: '100%',
    height: '100%',
    borderRadius: RFPercentage(2.25),
  },
  remainingWrapper: {
    backgroundColor: '#E6F7FA',
    right: RFPercentage(1),
  },
  remainingText: {
    color: COLORS.pink,
    fontSize: RFPercentage(1.3),
    fontFamily: FONTS.medium,
  },
  // New Event Button
  newEventButton: {
    position: 'absolute',
    bottom: RFPercentage(-0.5),
    right: RFPercentage(-0.8),
    width: RFPercentage(12),
    height: RFPercentage(4.3),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.pink,
    borderRadius: RFPercentage(1),
    flexDirection: 'row',
  },
  newEventIcon: {
    width: RFPercentage(2),
    height: RFPercentage(2),
  },
  newEventText: {
    color: COLORS.white,
    fontFamily: FONTS.semiBold,
    fontSize: RFPercentage(1.5),
    marginLeft: RFPercentage(0.4),
  },
});
