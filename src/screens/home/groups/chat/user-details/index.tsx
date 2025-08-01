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
import CustomButton from '../../../../../components/CustomButton';
import DetailComponent from '../../../../../components/DetailComponent';
import SettingsButton from '../../../../../components/SettingsButton';
import SocialField from '../../../../../components/SocialField';
import CommonGroup from '../../../../../components/CommonGroups';

const UserDetails = ({ navigation }: any) => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView>
        <View style={{ width: '100%'}}>
          <ImageBackground
            source={IMAGES.single}
            resizeMode="repeat"
            style={styles.backgroundImage}
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
                   <Image source={ICONS.pen} resizeMode='contain' style={{width:RFPercentage(3), height:RFPercentage(3), marginRight:RFPercentage(0.5)}} />
                    <Text style={styles.editText}>Edit</Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          </ImageBackground>
        </View>
        <View style={styles.mainContent}>
          <View style={styles.avatarOuterLayer}>
            <View style={styles.avatarMiddleLayer}>
              <View style={styles.avatarInnerLayer}>
                <Image
                  source={IMAGES.profile2}
                  resizeMode="cover"
                  style={styles.avatarImage}
                />
              </View>
            </View>
          </View>

          <Text style={styles.userName}>Sophie Reynolds</Text>

          <View style={styles.buttonRow}>
            <View style={styles.buttonHalf}>
              <CustomButton
                title="Add to group"
                icon={ICONS.add}
                style={styles.buttonRounded}
                onPress={() => {}}
              />
            </View>
            <View style={styles.buttonHalf}>
              <CustomButton
                title="Create Event"
                icon={ICONS.calender}
                style={styles.buttonRounded}
                onPress={() => {}}
              />
            </View>
          </View>

          <View style={styles.viewProfile}>
            <SettingsButton title="View Profile" icon={ICONS.user4} />
          </View>

          <View>
            <DetailComponent title="Media and Documents" media={true} />
          </View>

          <View style={styles.sectionMargin}>
            <CommonGroup />
          </View>

          <View style={styles.sectionMargin}>
            <SettingsButton
              title="Download to Gallery"
              icon={ICONS.download}
              switch={true}
            />
            <Text style={styles.galleryText}>
              Automatically save photos you receive to Gallery.
            </Text>
          </View>

          <View style={styles.sectionMargin}>
            <SocialField
              name="Unmute Group"
              color={COLORS.primary}
              icon={ICONS.mute2}
              borderColor={COLORS.primary}
              navigation=""
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default UserDetails;

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
  penIcon: {
    marginRight: RFPercentage(0.6),
  },
  editText: {
    color: COLORS.black,
    fontFamily: FONTS.semiBold,
    fontSize: RFPercentage(1.8),
  },
  backgroundImage: {
    width: '100%',
    height: RFPercentage(20),
  },
  mainContent: {
    width: '90%',
    alignSelf: 'center',
    bottom: RFPercentage(6),
  },
  avatarOuterLayer: {
    width: RFPercentage(11),
    height: RFPercentage(12),
    borderRadius: RFPercentage(4.6),
    backgroundColor: COLORS.purple,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarMiddleLayer: {
    backgroundColor: COLORS.green2,
    width: RFPercentage(11),
    height: RFPercentage(12),
    borderRadius: RFPercentage(4.6),
    alignItems: 'center',
    justifyContent: 'center',
    right: RFPercentage(0.3),
  },
  avatarInnerLayer: {
    backgroundColor: COLORS.pink3,
    width: RFPercentage(11),
    height: RFPercentage(12),
    borderRadius: RFPercentage(4.6),
    alignItems: 'center',
    justifyContent: 'center',
    right: RFPercentage(0.3),
  },
  avatarImage: {
    width: RFPercentage(11),
    height: RFPercentage(12),
    borderRadius: RFPercentage(4.6),
    right: RFPercentage(0.3),
    bottom: RFPercentage(0.2),
  },
  userName: {
    fontFamily: FONTS.headline,
    color: COLORS.primary,
    fontSize: RFPercentage(3),
    marginTop: RFPercentage(3),
  },
  buttonRow: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: RFPercentage(4),
  },
  buttonHalf: {
    width: '48%',
  },
  buttonRounded: {
    borderRadius: RFPercentage(1.6),
  },
  viewProfile: {
    marginTop: RFPercentage(4),
  },
  sectionMargin: {
    marginTop: RFPercentage(3),
  },
  galleryText: {
    fontSize: RFPercentage(1.5),
    color: COLORS.lightGrey,
    fontFamily: FONTS.regular2,
    marginTop: RFPercentage(0.3),
  },
});
