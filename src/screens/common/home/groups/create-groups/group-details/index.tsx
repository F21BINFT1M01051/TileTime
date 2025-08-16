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
import { COLORS, IMAGES, FONTS, ICONS } from '../../../../../../config/theme';
import { RFPercentage } from 'react-native-responsive-fontsize';
import AntDesign from 'react-native-vector-icons/AntDesign';
import CustomButton from '../../../../../../components/CustomButton';
import DetailComponent from '../../../../../../components/DetailComponent';
import AdminCard from '../../../../../../components/AdminCard';
import SettingsButton from '../../../../../../components/SettingsButton';
import SocialField from '../../../../../../components/SocialField';

const GroupDetails = ({ navigation }: any) => {
  return (
    <View style={styles.safeArea}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <ImageBackground
          source={IMAGES.groupDetail}
          resizeMode="contain"
          style={styles.groupImage}
        >
          <View style={styles.headerBorder}>
            <View style={styles.headerContainer}>
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => navigation.goBack()}
              >
                <AntDesign
                  name="arrowleft"
                  color={COLORS.grey}
                  size={RFPercentage(2.5)}
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
                  <Image
                    source={ICONS.pen}
                    resizeMode="contain"
                    style={{
                      width: RFPercentage(2.5),
                      height: RFPercentage(2.5),
                      marginRight: RFPercentage(0.7),
                    }}
                  />
                  <Text style={styles.editText}>Edit</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </ImageBackground>

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
            <DetailComponent
              title="Group Members"
              onPress={() => navigation.navigate('GroupMembers')}
            />
          </View>
          <View style={{ marginTop: RFPercentage(0.5) }}>
            <DetailComponent
              title="Media and Documents"
              media={true}
              onPress={() => {}}
            />
          </View>
          <View style={styles.sectionMarginTop3}>
            <AdminCard
              title="Samantha Lewis (You)"
              subTitle="Group Admin"
              profile={true}
              userId={1}
              visibleTooltipId={null}
              setVisibleTooltipId={() => {}}
            />
          </View>
          <View style={{ marginTop: RFPercentage(1.5) }}>
            <SettingsButton
              title="Permissions & Settings"
              icon={ICONS.settings}
              onPress={() => navigation.navigate('GroupSettings')}
            />
          </View>
          <View style={{ marginTop: RFPercentage(2) }}>
            <SocialField
              name="Mute Group"
              color={COLORS.primary}
              icon={ICONS.mute2}
              borderColor={COLORS.primary}
              navigation=""
            />
          </View>
          <SocialField
            name="Delete Group"
            color={COLORS.red}
            icon={ICONS.trash}
            borderColor={COLORS.red}
            navigation=""
          />
        </View>
      </ScrollView>
    </View>
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
    marginTop: RFPercentage(8),
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
    fontFamily: FONTS.semiBold,
    fontSize: RFPercentage(1.8),
  },
  groupImage: {
    width: '100%',
    height: RFPercentage(26),
  },
  contentContainer: {
    width: '90%',
    alignSelf: 'center',
    bottom: RFPercentage(8),
  },
  largeGroupIconContainer: {
    width: RFPercentage(12),
    height: RFPercentage(12),
    backgroundColor: COLORS.yellow,
    alignItems: 'center',
    justifyContent: 'center',
    borderTopLeftRadius: RFPercentage(100),
    borderBottomRightRadius: RFPercentage(100),
    borderTopRightRadius: RFPercentage(100),
  },
  largeGroupIcon: {
    width: RFPercentage(11.9),
    height: RFPercentage(11.9),
    borderTopRightRadius: RFPercentage(100),
    right: RFPercentage(0.6),
    borderTopLeftRadius: RFPercentage(100),
    borderBottomRightRadius: RFPercentage(100),
    borderBottomLeftRadius: RFPercentage(2),
  },
  groupName: {
    fontFamily: FONTS.headline,
    color: COLORS.primary,
    fontSize: RFPercentage(2.6),
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
    borderRadius: RFPercentage(1.4),
    height: RFPercentage(5.3),
  },
  sectionMarginTop1: {
    marginTop: RFPercentage(1),
  },
  sectionMarginTop3: {
    marginTop: RFPercentage(3.5),
  },
});
