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

const GroupDetails = ({ navigation } : any) => {
  return (
    <SafeAreaView style={styles.safeArea}>
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
            <View style={styles.editButton}>
              <FontAwesome6
                name="pen"
                size={RFPercentage(2.4)}
                color={COLORS.black}
                style={styles.editIcon}
              />
              <Text style={styles.editText}>Edit</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView>
        <ImageBackground
          source={IMAGES.groupDetail}
          resizeMode="stretch"
          style={styles.groupImage}
        />

        <View style={styles.contentContainer}>
          <View style={styles.largeGroupIconContainer}>
            <Image
              source={IMAGES.customProfile}
              resizeMode="cover"
              style={styles.largeGroupIcon}
            />
          </View>

          <View>
            <Text style={styles.groupName}>Mahjong - Richie Rich Group</Text>
            <Text style={styles.groupDesc}>
              Join Fellow Mahjong Enthusiasts For An Evening Of Friendly Matches
              And Lively Conversa
            </Text>
          </View>

          <View style={styles.buttonRow}>
            <View style={styles.buttonWrapper}>
              <CustomButton
                title="Add Member"
                icon={ICONS.add}
                style={styles.customButton}
                onPress={() => {}}
              />
            </View>
            <View style={styles.buttonWrapper}>
              <CustomButton
                title="Create Event"
                icon={ICONS.calender}
                style={styles.customButton}
                onPress={() => {}}
              />
            </View>
          </View>

          <View style={styles.sectionMarginTop1}>
            <DetailComponent title="Group Members" />
          </View>
          <View>
            <DetailComponent title="Media and Documents" media={true} />
          </View>
          <View style={styles.sectionMarginTop3}>
            <AdminCard
              title="Samantha Lewis (You)"
              subTitle="Group Admin"
              profile={true}
            />
          </View>
          <View style={styles.sectionMarginTop3}>
            <SettingsButton
              title="Permissions & Settings"
              icon={ICONS.settings}
              onPress={() => navigation.navigate('GroupSettings')}
            />
          </View>
          <View style={styles.sectionMarginTop3}>
            <SocialField
              name="Mute Group"
              color={COLORS.primary}
              icon={ICONS.mute2}
              borderColor={COLORS.primary}
              navigation=""
            />
          </View>
          <View style={styles.sectionMarginTop1}>
            <SocialField
              name="Delete Group"
              color={COLORS.red}
              icon={ICONS.trash}
              borderColor={COLORS.red}
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
  safeArea: {
    backgroundColor: COLORS.white,
    flex: 1,
  },
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
  editButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  editIcon: {
    marginRight: RFPercentage(0.6),
  },
  editText: {
    color: COLORS.black,
    fontFamily: FONTS.medium,
    fontSize: RFPercentage(1.8),
  },
  groupImage: {
    width: RFPercentage(50),
    height: RFPercentage(18),
  },
  contentContainer: {
    width: '90%',
    alignSelf: 'center',
    bottom: RFPercentage(10),
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
  groupName: {
    fontFamily: FONTS.headline,
    color: COLORS.primary,
    fontSize: RFPercentage(3),
    marginTop: RFPercentage(3),
  },
  groupDesc: {
    fontFamily: FONTS.regular2,
    color: COLORS.primary,
    fontSize: RFPercentage(1.8),
    marginTop: RFPercentage(1),
  },
  buttonRow: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: RFPercentage(4),
  },
  buttonWrapper: {
    width: '48%',
  },
  customButton: {
    borderRadius: RFPercentage(1.6),
  },
  sectionMarginTop1: {
    marginTop: RFPercentage(1),
  },
  sectionMarginTop3: {
    marginTop: RFPercentage(3),
  },
});
