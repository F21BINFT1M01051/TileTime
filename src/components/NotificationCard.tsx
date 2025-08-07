import { StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native';
import React from 'react';
import { RFPercentage } from 'react-native-responsive-fontsize';
import { COLORS, FONTS, IMAGES } from '../config/theme';

interface Props {
  notification: string;
  time: string;
  profile: any;
  admin?: boolean;
  group?: boolean;
  player?: boolean;
  unread: boolean;
  style?: object;
}

const NotificationCard = (props: Props) => {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      style={[
        {
          width: '100%',
          alignItems: 'center',
          borderBottomWidth: RFPercentage(0.1),
          borderBottomColor: COLORS.lightWhite,
          height: RFPercentage(10),
          marginTop: RFPercentage(2),
          justifyContent: 'flex-end',
          paddingBottom: RFPercentage(2),
        },
        props.style,
      ]}
    >
      <View
        style={{
          width: '90%',
          alignSelf: 'center',
          flexDirection: 'row',
          alignItems: 'center',
        }}
      >
        {props.player ? (
          <>
            <View style={styles.avatarOuterLayer}>
              <View style={styles.avatarMiddleLayer}>
                <View style={styles.avatarInnerLayer}>
                  <Image
                    source={IMAGES.customProfile}
                    resizeMode="cover"
                    style={styles.avatarImage}
                  />
                </View>
              </View>
            </View>
          </>
        ) : props.admin ? (
          <>
            <View style={styles.nonMemberAvatarWrapper}>
              <Image
                source={IMAGES.chatProfile}
                resizeMode="contain"
                style={styles.nonMemberAvatarImage}
              />
            </View>
          </>
        ) : (
          <>
            <View style={styles.largeGroupIconContainer}>
              <Image
                source={IMAGES.customProfile}
                resizeMode="cover"
                style={styles.largeGroupIcon}
              />
            </View>
          </>
        )}
        <Text
          style={{
            color: COLORS.primary,
            fontSize: RFPercentage(1.8),
            fontFamily: props.unread ? FONTS.semiBold : FONTS.regular,
            marginLeft: RFPercentage(1.5),
            width: '70%',
          }}
        >
          {props.notification}
        </Text>
        <Text
          style={{
            color: COLORS.lightGrey,
            fontSize: RFPercentage(1.6),
            fontFamily: FONTS.regular,
            position: 'absolute',
            right: 0,
          }}
        >
          {props.time}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default NotificationCard;

const styles = StyleSheet.create({
  avatarOuterLayer: {
    width: RFPercentage(6),
    height: RFPercentage(7),
    borderRadius: RFPercentage(2.5),
    backgroundColor: COLORS.purple,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarMiddleLayer: {
    backgroundColor: COLORS.green2,
    width: RFPercentage(6),
    height: RFPercentage(7),
    borderRadius: RFPercentage(2.5),
    alignItems: 'center',
    justifyContent: 'center',
    right: RFPercentage(0.3),
  },
  avatarInnerLayer: {
    backgroundColor: COLORS.pink3,
    width: RFPercentage(6),
    height: RFPercentage(7),
    borderRadius: RFPercentage(2.5),
    alignItems: 'center',
    justifyContent: 'center',
    right: RFPercentage(0.3),
  },
  avatarImage: {
    width: RFPercentage(6),
    height: RFPercentage(7),
    borderRadius: RFPercentage(2.5),
    right: RFPercentage(0.3),
    bottom: RFPercentage(0.2),
  },
  largeGroupIconContainer: {
    width: RFPercentage(6),
    height: RFPercentage(6),
    borderRadius: RFPercentage(100),
    backgroundColor: COLORS.yellow,
    alignItems: 'center',
    justifyContent: 'center',
  },
  largeGroupIcon: {
    width: RFPercentage(6),
    height: RFPercentage(6),
    borderTopRightRadius: RFPercentage(100),
    right: RFPercentage(0.5),
    borderTopLeftRadius: RFPercentage(100),
    borderBottomRightRadius: RFPercentage(100),
    borderBottomLeftRadius: RFPercentage(1),
  },
  nonMemberAvatarWrapper: {
    width: RFPercentage(6),
    height: RFPercentage(6),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.pink3,
    borderTopRightRadius: RFPercentage(3),
    borderTopLeftRadius: RFPercentage(3),
  },
  nonMemberAvatarImage: {
    width: RFPercentage(6),
    height: RFPercentage(6),
    right: RFPercentage(0.2),
    bottom: RFPercentage(0.1),
    borderTopRightRadius: RFPercentage(3),
    borderTopLeftRadius: RFPercentage(3),
  },
});
