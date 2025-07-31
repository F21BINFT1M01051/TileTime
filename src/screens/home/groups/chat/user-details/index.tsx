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
import SettingsButton from '../../../../../components/SettingsButton';
import SocialField from '../../../../../components/SocialField';
import CommonGroup from '../../../../../components/CommonGroups';

const UserDetails = ({ navigation }: any) => {
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
          <View>
            <Text
              style={{
                fontFamily: FONTS.headline,
                color: COLORS.primary,
                fontSize: RFPercentage(3),
                marginTop: RFPercentage(3),
              }}
            >
              Sophie Reynolds
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
                title="Add to group"
                icon={ICONS.add}
                style={{ borderRadius: RFPercentage(1.6) }}
                onPress={() => {}}
              />
            </View>
            <View style={{ width: '48%' }}>
              <CustomButton
                title="Create Event"
                icon={ICONS.calender}
                style={{ borderRadius: RFPercentage(1.6) }}
                onPress={() => {}}
              />
            </View>
          </View>
          <View style={{ marginTop: RFPercentage(3) }}>
            <SettingsButton title="View Profile" icon={ICONS.user4} />
          </View>
          <View>
            <DetailComponent title="Media and Documents" media={true} />
          </View>
          <View style={{ marginTop: RFPercentage(3) }}>
            <CommonGroup />
          </View>

          <View style={{ marginTop: RFPercentage(3) }}>
            <SettingsButton
              title="Download to Gallery"
              icon={ICONS.download}
              switch={true}
            />
            <Text
              style={{
                fontSize: RFPercentage(1.5),
                color: COLORS.lightGrey,
                fontFamily: FONTS.regular2,
                marginTop: RFPercentage(0.3),
              }}
            >
              Automatically save photos you receive to Gallery.
            </Text>
          </View>

          <View style={{ marginTop: RFPercentage(3) }}>
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
  avatarOuterLayer: {
    width: RFPercentage(10),
    height: RFPercentage(12),
    borderRadius: RFPercentage(4.6),
    backgroundColor: COLORS.purple,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarMiddleLayer: {
    backgroundColor: COLORS.green2,
    width: RFPercentage(10),
    height: RFPercentage(12),
    borderRadius: RFPercentage(4.6),
    alignItems: 'center',
    justifyContent: 'center',
    right: RFPercentage(0.3),
  },
  avatarInnerLayer: {
    backgroundColor: COLORS.pink3,
    width: RFPercentage(10),
    height: RFPercentage(12),
    borderRadius: RFPercentage(4.6),
    alignItems: 'center',
    justifyContent: 'center',
    right: RFPercentage(0.3),
  },
  avatarImage: {
    width: RFPercentage(10),
    height: RFPercentage(12),
    borderRadius: RFPercentage(4.6),
    right: RFPercentage(0.3),
    bottom: RFPercentage(0.2),
  },
});
