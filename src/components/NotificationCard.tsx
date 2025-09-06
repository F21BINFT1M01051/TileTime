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
  eventInvite?: boolean;
  onPress3?: () => void;
}

const NotificationCard = (props: Props) => {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      style={[
        {
          width: '100%',
          borderBottomWidth: RFPercentage(0.1),
          borderBottomColor: COLORS.lightWhite,
          marginTop: RFPercentage(1),
          justifyContent: 'flex-end',
          paddingVertical: RFPercentage(1.5),
        },
        props.style,
      ]}
    >
      <View style={{ width: '90%', alignSelf: 'center' }}>
        <View
          style={{
            width: '100%',
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
          <View style={{ width: '80%', marginLeft: RFPercentage(1.4) }}>
            <Text
              style={{
                color: COLORS.primary,
                fontSize: RFPercentage(1.9),
                fontFamily: props.unread ? FONTS.semiBold : FONTS.regular,
                lineHeight: RFPercentage(2.1),
              }}
            >
              {props.notification}
            </Text>
          </View>

          <Text
            style={{
              color: COLORS.lightGrey,
              fontSize: RFPercentage(1.6),
              fontFamily: FONTS.regular,
              position: 'absolute',
              right: RFPercentage(-1.2),
              textAlign: 'right',
            }}
          >
            {props.time}
          </Text>
        </View>

        <View style={{ width: '70%', alignSelf: 'center' }}>
          {props.eventInvite && (
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: RFPercentage(1),
                gap: RFPercentage(0.7),
              }}
            >
              <TouchableOpacity
                activeOpacity={0.8}
                style={{
                  width: RFPercentage(6.5),
                  height: RFPercentage(2.7),
                  borderRadius: RFPercentage(100),
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: COLORS.primary,
                  borderWidth: RFPercentage(0.1),
                  borderColor: COLORS.primary,
                }}
              >
                <Text
                  style={{
                    fontFamily: FONTS.semiBold,
                    color: COLORS.white,
                    fontSize: RFPercentage(1.3),
                    lineHeight: RFPercentage(1.3),
                    textAlign: 'center',
                    includeFontPadding: false,
                  }}
                >
                  YES
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={0.8}
                style={{
                  width: RFPercentage(6.5),
                  height: RFPercentage(2.7),
                  borderRadius: RFPercentage(100),
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: COLORS.white,
                  borderWidth: RFPercentage(0.1),
                  borderColor: COLORS.red,
                }}
              >
                <Text
                  style={{
                    fontFamily: FONTS.semiBold,
                    color: COLORS.red,
                    fontSize: RFPercentage(1.3),
                    lineHeight: RFPercentage(1.3),
                    textAlign: 'center',
                    includeFontPadding: false,
                  }}
                >
                  NO
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={props.onPress3}
                activeOpacity={0.8}
                style={{
                  width: RFPercentage(9.3),
                  height: RFPercentage(2.7),
                  borderRadius: RFPercentage(100),
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: COLORS.white,
                  borderWidth: RFPercentage(0.1),
                  borderColor: COLORS.primary,
                }}
              >
                <Text
                  style={{
                    fontFamily: FONTS.semiBold,
                    color: COLORS.primary,
                     fontSize: RFPercentage(1.4),
                    lineHeight: RFPercentage(1.4),
                    textAlign: 'center',
                    includeFontPadding: false,
                  }}
                >
                  View Event
                </Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default NotificationCard;

const styles = StyleSheet.create({
  avatarOuterLayer: {
    width: RFPercentage(4.5),
    height: RFPercentage(5.5),
    borderRadius: RFPercentage(2),
    backgroundColor: COLORS.purple,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarMiddleLayer: {
    backgroundColor: COLORS.green2,
    width: RFPercentage(4.5),
    height: RFPercentage(5.5),
    borderRadius: RFPercentage(2),
    alignItems: 'center',
    justifyContent: 'center',
    right: RFPercentage(0.2),
  },
  avatarInnerLayer: {
    backgroundColor: COLORS.pink3,
    width: RFPercentage(4.5),
    height: RFPercentage(5.5),
    borderRadius: RFPercentage(2),
    alignItems: 'center',
    justifyContent: 'center',
    right: RFPercentage(0.2),
  },
  avatarImage: {
    width: RFPercentage(4.5),
    height: RFPercentage(5.5),
    borderRadius: RFPercentage(2),
    right: RFPercentage(0.2),
    bottom: RFPercentage(0.1),
  },
  largeGroupIconContainer: {
    width: RFPercentage(5),
    height: RFPercentage(5),
    borderRadius: RFPercentage(100),
    backgroundColor: COLORS.yellow,
    alignItems: 'center',
    justifyContent: 'center',
  },
  largeGroupIcon: {
    width: RFPercentage(5),
    height: RFPercentage(5),
    borderTopRightRadius: RFPercentage(100),
    right: RFPercentage(0.5),
    borderTopLeftRadius: RFPercentage(100),
    borderBottomRightRadius: RFPercentage(100),
    borderBottomLeftRadius: RFPercentage(1),
  },
  nonMemberAvatarWrapper: {
    width: RFPercentage(5),
    height: RFPercentage(5),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.pink3,
    borderTopRightRadius: RFPercentage(3),
    borderTopLeftRadius: RFPercentage(3),
  },
  nonMemberAvatarImage: {
    width: RFPercentage(5),
    height: RFPercentage(5),
    right: RFPercentage(0.1),
    bottom: RFPercentage(0.1),
    borderTopRightRadius: RFPercentage(3),
    borderTopLeftRadius: RFPercentage(3),
  },
});
