import {
    FlatList,
  Image,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useState } from 'react';
import { COLORS, FONTS, IMAGES } from '../../../../../../config/theme';
import { RFPercentage } from 'react-native-responsive-fontsize';
import SearchField from '../../../../../../components/SearchField';

const contacts = [
  {
    id: 1,
    name: 'Jamie Anderson',
    profile: 'JA',
    phone: '(909) 92288 3355',
  },
  {
    id: 2,
    name: 'Jamie Anderson',
    profile: 'JA',
    phone: '(909) 92288 3355',
  },
  {
    id: 3,
    name: 'Jamie Anderson',
    profile: 'JA',
    phone: '(909) 92288 3355',
  },
  {
    id: 4,
    name: 'Jamie Anderson',
    profile: 'JA',
    phone: '(909) 92288 3355',
  },
  {
    id: 5,
    name: 'Jamie Anderson',
    profile: 'JA',
    phone: '(909) 92288 3355',
  },
  {
    id: 6,
    name: 'Jamie Anderson',
    profile: 'JA',
    phone: '(909) 92288 3355',
  },
  {
    id: 1,
    name: 'Jamie Anderson',
    profile: 'JA',
    phone: '(909) 92288 3355',
  },
  {
    id: 1,
    name: 'Jamie Anderson',
    profile: 'JA',
    phone: '(909) 92288 3355',
  },
];

const Contacts = () => {
  const [enable, setEnable] = useState(false);
  return (
    <ScrollView>
      {enable ? (
        <>
          <SearchField placeholder="Search by name" />
          <Text
            style={{
              color: '#82848C',
              fontFamily: FONTS.medium,
              fontSize: RFPercentage(1.7),
              letterSpacing: 2,
              marginTop: RFPercentage(2),
            }}
          >
            YOUR CONTACTS
          </Text>
          <View>
            {/* <FlatList data={contacts} keyExtractor={(item)=> item.id.toString()} renderItem={({item})=> { */}
                
            {/* }} /> */}
          </View>
        </>
      ) : (
        <>
          <Text
            style={{
              color: '#82848C',
              fontFamily: FONTS.medium,
              fontSize: RFPercentage(1.7),
              letterSpacing: 2,
              marginTop: RFPercentage(5),
            }}
          >
            YOUR CONTACTS
          </Text>
          <ImageBackground
            source={IMAGES.contacts}
            resizeMode="contain"
            style={{
              width: '100%',
              height: RFPercentage(30),
              alignSelf: 'center',
              justifyContent: 'flex-end',
              marginTop: RFPercentage(1),
            }}
          >
            <Text
              style={{
                textAlign: 'center',
                color: '#82848C',
                fontFamily: FONTS.regular,
                fontSize: RFPercentage(1.9),
                bottom: RFPercentage(2),
                marginHorizontal: RFPercentage(1),
              }}
            >
              Enable Access To Your Contacts So You Can Easily Connect, Share
              Invites, And Message Your Friends.
            </Text>
          </ImageBackground>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => setEnable(true)}
            style={{
              height: RFPercentage(5.6),
              alignItems: 'center',
              justifyContent: 'center',
              borderWidth: RFPercentage(0.2),
              borderColor: COLORS.primary,
              borderRadius: RFPercentage(2.6),
              alignSelf: 'center',
              paddingHorizontal: RFPercentage(2.5),
              marginTop: RFPercentage(2),
            }}
          >
            <Text
              style={{
                color: COLORS.primary,
                fontFamily: FONTS.semiBold,
                fontSize: RFPercentage(1.9),
              }}
            >
              Enable Contact Access
            </Text>
          </TouchableOpacity>
        </>
      )}
    </ScrollView>
  );
};

export default Contacts;

const styles = StyleSheet.create({});
