import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import React, { useState } from 'react';
import SearchField from '../../../../../components/SearchField';
import { RFPercentage } from 'react-native-responsive-fontsize';
import { COLORS, FONTS, IMAGES } from '../../../../../config/theme';
import ChatComponent from '../../../../../components/ChatComponent';
import { useNavigation } from '@react-navigation/native';

const Filters = [
  { id: 1, name: 'All' },
  { id: 2, name: 'Unread' },
  { id: 3, name: 'Groups' },
  { id: 4, name: 'Chats' },
  { id: 5, name: 'Managed by Me' },
];

const all = [
  {
    id: 1,
    name: 'React Native Devs',
    message: 'Sana: Just pushed the latest update, check it out!',
    unread: 0,
    mute: false,
    profile: IMAGES.customProfile,
  },
  {
    id: 2,
    name: 'Ali Khan',
    message: 'Ali: Are we still on for the meeting tomorrow?',
    unread: 3,
    mute: false,
    profile: IMAGES.profile1,
    single: true,
  },
  {
    id: 3,
    name: 'Design Team',
    message: 'Maria: Shared the new UI screens in Figma 🚀',
    unread: 0,
    mute: false,
    profile: IMAGES.customProfile,
  },
  {
    id: 4,
    name: 'Family Group',
    message: 'Mom: Dinner is ready, come downstairs 😊',
    unread: 0,
    mute: true,
    profile: IMAGES.customProfile,
  },
  {
    id: 5,
    name: 'Bilal Ahmed',
    message: 'Bilal: Don’t forget to send me the notes.',
    unread: 0,
    mute: false,
    profile: IMAGES.profile1,
    single: true,
  },
  {
    id: 6,
    name: 'Study Buddies',
    message: 'Fatima: Quiz prep session at 8pm?',
    unread: 2,
    mute: false,
    profile: IMAGES.customProfile,
  },
];

const unreads = [
  {
    id: 1,
    name: 'Design Team',
    message: 'Maria: Shared the new UI screens in Figma 🚀',
    unread: 2,
    mute: false,
    profile: IMAGES.customProfile,
  },
  {
    id: 2,
    name: 'Ali Khan',
    message: 'Ali: Are we still on for the meeting tomorrow?',
    unread: 3,
    mute: false,
    profile: IMAGES.profile1,
    single: true,
  },
  {
    id: 3,
    name: 'Study Buddies',
    message: 'Fatima: Quiz prep session at 8pm?',
    unread: 1,
    mute: false,
    profile: IMAGES.customProfile,
  },
];

const groups = [
  {
    id: 1,
    name: 'React Native Devs',
    message: 'Sana: Just pushed the latest update, check it out!',
    unread: 0,
    mute: false,
    profile: IMAGES.customProfile,
  },
  {
    id: 2,
    name: 'Design Team',
    message: 'Maria: Shared the new UI screens in Figma 🚀',
    unread: 5,
    mute: false,
    profile: IMAGES.customProfile,
  },
  {
    id: 3,
    name: 'Family Group',
    message: 'Mom: Dinner is ready, come downstairs 😊',
    unread: 0,
    mute: false,
    profile: IMAGES.customProfile,
  },
  {
    id: 4,
    name: 'Study Buddies',
    message: 'Fatima: Quiz prep session at 8pm?',
    unread: 2,
    mute: true,
    profile: IMAGES.customProfile,
  },
];

const chats = [
  {
    id: 1,
    name: 'Bilal Ahmed',
    message: 'Bilal: Don’t forget to send me the notes.',
    unread: 0,
    mute: false,
    profile: IMAGES.profile2,
  },
  {
    id: 2,
    name: 'Ali Khan',
    message: 'Ali: Are we still on for the meeting tomorrow?',
    unread: 3,
    mute: false,
    profile: IMAGES.profile1,
  },
  {
    id: 3,
    name: 'Zara Malik',
    message: 'Zara: Thanks for your help yesterday! 😊',
    unread: 0,
    mute: false,
    profile: IMAGES.profile2,
  },
  {
    id: 4,
    name: 'Hamza',
    message: 'Hamza: Can you review my code when free?',
    unread: 0,
    mute: false,
    profile: IMAGES.profile2,
  },
  {
    id: 5,
    name: 'Fatima',
    message: 'Fatima: Quiz prep session at 8pm?',
    unread: 0,
    mute: false,
    profile: IMAGES.profile1,
  },
  {
    id: 6,
    name: 'Asad Ali',
    message: 'Asad: Let’s meet at the library tomorrow.',
    unread: 1,
    mute: false,
    profile: IMAGES.profile2,
  },
];

const All = () => {
  const [activeFilter, setActiveFilter] = useState('All');
  const [query, setQuery] = useState('');
  const navigation = useNavigation();

  const applySearch = (data: any[]) => {
    return data.filter(item =>
      item.name.toLowerCase().includes(query.toLowerCase()),
    );
  };

  // 🔹 Get dataset based on active filter
  const getFilteredData = () => {
    switch (activeFilter) {
      case 'Unread':
        return applySearch(unreads);
      case 'Chats':
        return applySearch(chats);
      case 'Groups':
        return applySearch(groups);
      case 'Managed by Me':
        // if you want to filter managed groups, replace with your dataset
        return applySearch(groups);
      default:
        return applySearch(all);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <SearchField
          placeholder="Search groups"
          value={query}
          onChangeText={setQuery}
        />
      </View>

      <View style={styles.filterContainer}>
        <FlatList
          data={Filters}
          keyExtractor={item => item.id.toString()}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: RFPercentage(2) }}
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
                      activeFilter === item.name ? COLORS.white : COLORS.grey4,
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

      <FlatList
        data={getFilteredData()}
        keyExtractor={item => item.id.toString()}
        ListEmptyComponent={() => (
          <Text
            style={{
              fontFamily: FONTS.regular,
              fontSize: RFPercentage(2),
              color: COLORS.lightGrey,
              textAlign: 'center',
              marginTop: RFPercentage(3),
            }}
          >
            No results found
          </Text>
        )}
        renderItem={({ item }) => (
          <ChatComponent
            name={item.name}
            message={item.message}
            profile={item.profile}
            mute={item.mute}
            unread={item.unread}
            single={item.single}
            onPress={() =>
              navigation.navigate('ChatScreen', {
                isGroup: item.single ? false : true,
                isNew: false,
              })
            }
          />
        )}
      />
    </View>
  );
};

export default All;

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  searchContainer: {
    width: '90%',
    alignSelf: 'center',
    marginTop: RFPercentage(1),
  },
  filterContainer: {
    width: '100%',
    alignSelf: 'center',
  },
  filterButton: {
    height: RFPercentage(4.5),
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
});
