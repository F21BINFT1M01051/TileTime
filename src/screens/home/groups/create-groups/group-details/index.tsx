import {
  ImageBackground,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import React from 'react';
import { COLORS, IMAGES, FONTS, ICONS } from '../../../../../config/theme';
import { RFPercentage } from 'react-native-responsive-fontsize';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import CustomButton from '../../../../../components/CustomButton';
import DetailComponent from '../../../../../components/DetailComponent';
import AdminCard from '../../../../../components/AdminCard';
import SettingsButton from '../../../../../components/SettingsButton';
import SocialField from '../../../../../components/SocialField';

const GroupDetails = ({ navigation }: any) => {
  return (
    <SafeAreaView style={{ backgroundColor: COLORS.white, flex: 1 }}>
      <View style={styles.headerBorder}>
        <View style={styles.headerContainer}>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => navigation.goBack()}
          >
            <AntDesign
              name="arrowleft"
              color={COLORS.grey}
              size={RFPercentage(3)}
            />
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.8}
            style={styles.dotsButton}
            onPress={() => {
              navigation.navigate('GroupDetails');
            }}
          >
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <FontAwesome6
                name="pen"
                size={RFPercentage(2.4)}
                color={COLORS.black}
                style={{ marginRight: RFPercentage(0.6) }}
              />
              <Text
                style={{
                  color: COLORS.black,
                  fontFamily: FONTS.medium,
                  fontSize: RFPercentage(1.8),
                }}
              >
                Edit
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
      <ScrollView>
        <ImageBackground
          source={IMAGES.groupDetail}
          resizeMode="stretch"
          style={{ width: RFPercentage(50), height: RFPercentage(18) }}
        />

        <View
          style={{
            width: '90%',
            alignSelf: 'center',
            bottom: RFPercentage(10),
          }}
        >
          <View style={styles.largeGroupIconContainer}>
            <Image
              source={IMAGES.customProfile}
              resizeMode="cover"
              style={styles.largeGroupIcon}
            />
          </View>
          <View>
            <Text
              style={{
                fontFamily: FONTS.headline,
                color: COLORS.primary,
                fontSize: RFPercentage(3),
                marginTop: RFPercentage(3),
              }}
            >
              Mahjong - Richie Rich Group
            </Text>
            <Text
              style={{
                fontFamily: FONTS.regular2,
                color: COLORS.primary,
                fontSize: RFPercentage(1.8),
                marginTop: RFPercentage(1),
              }}
            >
              Join Fellow Mahjong Enthusiasts For An Evening Of Friendly Matches
              And Lively Conversa
            </Text>
          </View>
          <View
            style={{
              width: '100%',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginTop: RFPercentage(4),
            }}
          >
            <View style={{ width: '48%' }}>
              <CustomButton
                title="Add Member"
                icon={ICONS.link}
                style={{ borderRadius: RFPercentage(1.6) }}
                onPress={() => {}}
              />
            </View>
            <View style={{ width: '48%' }}>
              <CustomButton
                title="Create Event"
                icon={ICONS.link}
                style={{ borderRadius: RFPercentage(1.6) }}
                onPress={() => {}}
              />
            </View>
          </View>
          <View>
            <DetailComponent
              title="Group Members"
              subTitle="26 confirmed attendees, 2 cancelled"
            />
          </View>
          <View>
            <DetailComponent
              title="Media and Documents"
              subTitle="121 files"
              media={true}
            />
          </View>
          <View style={{ marginTop: RFPercentage(3) }}>
            <AdminCard />
          </View>
          <View style={{ marginTop: RFPercentage(3) }}>
            <SettingsButton />
          </View>
          <View style={{ marginTop: RFPercentage(3) }}>
            <SocialField
              name="Delete Group"
              color="#B5000C"
              icon={ICONS.trash}
              borderColor="#B5000C"
              navigation=""
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default GroupDetails;

const styles = StyleSheet.create({
  headerBorder: {
    borderBottomWidth: 1,
    borderBottomColor: COLORS.fieldBorder,
    paddingBottom: RFPercentage(2),
    backgroundColor: COLORS.white,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '90%',
    alignSelf: 'center',
    marginTop: RFPercentage(5),
  },

  dotsButton: {
    position: 'absolute',
    right: 0,
    zIndex: 9999,
  },
  largeGroupIconContainer: {
    width: RFPercentage(13),
    height: RFPercentage(13),
    backgroundColor: COLORS.yellow,
    alignItems: 'center',
    justifyContent: 'center',
    borderTopLeftRadius: RFPercentage(100),
    borderBottomRightRadius: RFPercentage(100),
    borderTopRightRadius: RFPercentage(100),
  },
  largeGroupIcon: {
    width: RFPercentage(13),
    height: RFPercentage(13),
    borderTopRightRadius: RFPercentage(100),
    right: RFPercentage(0.6),
    borderTopLeftRadius: RFPercentage(100),
    borderBottomRightRadius: RFPercentage(100),
    borderBottomLeftRadius: RFPercentage(2),
  },
});
