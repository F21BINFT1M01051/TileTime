import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import React, { useState } from 'react';
import SearchField from '../../../../../components/SearchField';
import { RFPercentage } from 'react-native-responsive-fontsize';
import { COLORS, FONTS, IMAGES } from '../../../../../config/theme';
import ChatComponent from '../../../../../components/ChatComponent';
import { useNavigation } from '@react-navigation/native';

const Filters = [
  { id: 1, name: 'All' },
  { id: 2, name: 'Unread 4' },
  { id: 3, name: 'Managed By Me' },
];

const chats = [
  {
    id: 1,
    name: 'Mahjong - Richie Rich Group',
    message: 'Michelle : Same here! Can’t wait to play. Also, feel free to share tips',
    unread: 0,
    mute: false,
    profile: IMAGES.customProfile,
  },
  {
    id: 2,
    name: 'Mahjong - Richie Rich Group',
    message: 'Michelle : Same here! Can’t wait to play. Also, feel free to share tips',
    unread: 12,
    mute: false,
    profile: IMAGES.customProfile,
  },
  {
    id: 3,
    name: 'Mahjong - Richie Rich Group',
    message: 'Michelle : Same here! Can’t wait to play. Also, feel free to share tips',
    unread: 0,
    mute: false,
    profile: IMAGES.customProfile,
  },
  {
    id: 4,
    name: 'Mahjong - Richie Rich Group',
    message: 'Michelle : Same here! Can’t wait to play. Also, feel free to share tips',
    unread: 0,
    mute: true,
    profile: IMAGES.customProfile,
  },
  {
    id: 5,
    name: 'Mahjong - Richie Rich Group',
    message: 'Michelle : Same here! Can’t wait to play. Also, feel free to share tips',
    unread: 0,
    mute: false,
    profile: IMAGES.customProfile,
  },
  {
    id: 6,
    name: 'Mahjong - Richie Rich Group',
    message: 'Michelle : Same here! Can’t wait to play. Also, feel free to share tips',
    unread: 2,
    mute: false,
    profile: IMAGES.customProfile,
  },
];

const Group = () => {
  const [activeFilter, setActiveFilter] = useState(1);
  const [query, setQuery] = useState('');
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <SearchField
          placeholder="Search groups"
          value={query}
          onChangeText={setQuery}
        />
      </View>

      <View style={styles.innerContainer}>
        <FlatList
          data={Filters}
          keyExtractor={item => item.id.toString()}
          horizontal
          renderItem={({ item }) => (
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => setActiveFilter(item.id)}
              style={[
                styles.filterButton,
                {
                  backgroundColor: activeFilter === item.id ? COLORS.inputColor : COLORS.fieldColor,
                },
              ]}
            >
              <Text
                style={[
                  styles.filterText,
                  {
                    color: activeFilter === item.id ? COLORS.white : COLORS.grey3,
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
        data={chats}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <ChatComponent
            name={item.name}
            message={item.message}
            profile={item.profile}
            mute={item.mute}
            unread={item.unread}
            onPress={() =>
              navigation.navigate('GroupCreated', { isNew: false })
            }
          />
        )}
      />
    </View>
  );
};

export default Group;

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  innerContainer: {
    width: '90%',
    alignSelf: 'center',
  },
  filterButton: {
    height: RFPercentage(5.5),
    paddingHorizontal: RFPercentage(2),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: RFPercentage(2.9),
    marginTop: RFPercentage(3),
    marginRight: RFPercentage(1),
  },
  filterText: {
    fontFamily: FONTS.medium,
  },
});
