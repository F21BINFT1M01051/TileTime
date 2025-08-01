import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import React, { useState } from 'react';
import { RFPercentage } from 'react-native-responsive-fontsize';
import { COLORS, FONTS, IMAGES } from '../../../../config/theme';
import ChatComponent from '../../../../components/ChatComponent';
import { useNavigation } from '@react-navigation/native';



const chats = [
  {
    id: 1,
    name: 'Mahjong - Richie Rich Group',
    message: 'Michelle : Same here! Can’t wait to play. Also, feel free to share tips',
    unread: 0,
    mute: false,
    profile: IMAGES.profile2,
  },
  {
    id: 2,
    name: 'Mahjong - Richie Rich Group',
    message: 'Michelle : Same here! Can’t wait to play. Also, feel free to share tips',
    unread: 12,
    mute: false,
    profile: IMAGES.profile1,
  },
  {
    id: 3,
    name: 'Mahjong - Richie Rich Group',
    message: 'Michelle : Same here! Can’t wait to play. Also, feel free to share tips',
    unread: 0,
    mute: false,
    profile: IMAGES.profile2,
  },
  {
    id: 4,
    name: 'Mahjong - Richie Rich Group',
    message: 'Michelle : Same here! Can’t wait to play. Also, feel free to share tips',
    unread: 0,
    mute: false,
    profile: IMAGES.profile2,
  },
  {
    id: 5,
    name: 'Mahjong - Richie Rich Group',
    message: 'Michelle : Same here! Can’t wait to play. Also, feel free to share tips',
    unread: 0,
    mute: false,
    profile: IMAGES.profile1,
  },
  {
    id: 6,
    name: 'Mahjong - Richie Rich Group',
    message: 'Michelle : Same here! Can’t wait to play. Also, feel free to share tips',
    unread: 2,
    mute: false,
    profile: IMAGES.profile2,
  },
];

const Chat = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
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
            single={true}
            onPress={() => navigation.navigate('DirectChat')}
          />
        )}
      />
    </View>
  );
};

export default Chat;

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  searchContainer: {
    width: '90%',
    alignSelf: 'center',
  },
  filterContainer: {
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
