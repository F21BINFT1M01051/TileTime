import {
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useState } from 'react';
import { COLORS, FONTS, ICONS, IMAGES } from '../../../../config/theme';
import { RFPercentage } from 'react-native-responsive-fontsize';
import NotificationCard from '../../../../components/NotificationCard';
import HomeNavigator from '../../../../components/HomeNavigator';

const notificationData = [
  {
    id: 1,
    notification: 'You’ve got 3 new signups for Intro to Mahjong - Aug 3rd',
    time: '12h',
    profile: IMAGES.customProfile,
    unread: false,
    admin: true,
  },
  {
    id: 2,
    notification:
      'Michael Johnson invited you to join Four Winds: Community Mahjong Session. Want to Join?',
    time: '12h',
    profile: IMAGES.customProfile,
    unread: true,
    player: true,
    eventInvite: true,
  },
  {
    id: 3,
    notification: 'New feature: You can now message attendees before sessions.',
    time: '12h',
    profile: IMAGES.customProfile,
    unread: false,
    group: true,
  },
  {
    id: 4,
    notification: 'Group sessions are now live - try creating one today.',
    time: '12h',
    profile: IMAGES.customProfile,
    unread: false,
    player: true,
  },
];

const Filters = [
  { id: 1, name: 'All' },
  { id: 2, name: 'Unread 1' },
];

const unread = [
  {
    id: 1,
    notification:
      'Michael Johnson invited you to join Four Winds: Community Mahjong Session. Want to Join?',
    time: '12h',
    profile: IMAGES.customProfile,
    unread: true,
    player: true,
    eventInvite: true,
  },
];

const Notifications = ({ navigation }: any) => {
  const [activeFilter, setActiveFilter] = useState('All');
  const displayData = activeFilter === 'All' ? notificationData : unread;

  return (
    <View style={styles.container}>
      <HomeNavigator title="Notifications" />

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.filterContainer}>
          <FlatList
            data={Filters}
            keyExtractor={item => item.id.toString()}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.filterList}
            renderItem={({ item }) => (
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => setActiveFilter(item.name)}
                style={[
                  styles.filterButton,
                  {
                    backgroundColor:
                      activeFilter === item.name
                        ? COLORS.inputColor
                        : COLORS.fieldColor,
                  },
                ]}
              >
                <Text
                  style={[
                    styles.filterText,
                    {
                      color:
                        activeFilter === item.name
                          ? COLORS.white
                          : COLORS.grey4,
                      fontFamily:
                        activeFilter === item.name
                          ? FONTS.semiBold
                          : FONTS.regular,
                    },
                  ]}
                >
                  {item.name}
                </Text>
              </TouchableOpacity>
            )}
          />
        </View>
        <View style={styles.notificationListContainer}>
          <FlatList
            data={displayData}
            keyExtractor={item => item.id.toString()}
            contentContainerStyle={styles.notificationList}
            scrollEnabled={false}
            renderItem={({ item, index }) => {
              const isLastItem = index === notificationData.length - 1;
              return (
                <NotificationCard
                  notification={item.notification}
                  player={item.player}
                  admin={item.admin}
                  group={item.group}
                  unread={item.unread}
                  time={item.time}
                  profile={item.profile}
                  eventInvite={item.eventInvite}
                  onPress3={() => navigation.navigate('EventDetails')}
                  style={{
                    borderBottomWidth: isLastItem ? 0 : RFPercentage(0.1),
                  }}
                />
              );
            }}
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default Notifications;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  topBar: {
    paddingBottom: RFPercentage(1.5),
    borderBottomWidth: RFPercentage(0.1),
    borderBottomColor: COLORS.grey7,
    height: RFPercentage(12),
    justifyContent: 'flex-end',
  },
  topBarContent: {
    width: '90%',
    alignSelf: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  title: {
    color: COLORS.primary,
    fontFamily: FONTS.semiBold,
    fontSize: RFPercentage(1.9),
  },
  crossIcon: {
    width: RFPercentage(2.8),
    height: RFPercentage(2.8),
  },
  filterContainer: {
    width: '100%',
    alignSelf: 'center',
  },
  filterList: {
    paddingHorizontal: RFPercentage(2),
  },
  filterButton: {
    height: RFPercentage(4.2),
    paddingHorizontal: RFPercentage(2),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: RFPercentage(2.9),
    marginTop: RFPercentage(3),
    marginRight: RFPercentage(1),
  },
  filterText: {
    fontFamily: FONTS.medium,
    fontSize: RFPercentage(1.8),
  },
  notificationListContainer: {
    width: '90%',
    alignSelf: 'center',
    marginTop: RFPercentage(1),
  },
  notificationList: {
    paddingVertical: RFPercentage(0.3),
  },
});
