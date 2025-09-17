import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import { RFPercentage } from 'react-native-responsive-fontsize';
import { COLORS, FONTS, ICONS, IMAGES } from '../config/theme';

interface Props {
  name: string;
  message: string;
  unread: number;
  mute: boolean;
  profile: any;
  single?: boolean;
  onPress: () => void;
}

const ChatComponent = (props: Props) => {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={props.onPress}
      style={styles.touchableContainer}
    >
      <View style={styles.rowContainer}>
        {props.single ? (
          <>
            <View style={styles.avatarOuterLayer}>
              <View style={styles.avatarMiddleLayer}>
                <View style={styles.avatarInnerLayer}>
                  <Image
                    source={props.profile}
                    resizeMode="cover"
                    style={styles.avatarImage}
                  />
                </View>
              </View>
            </View>
          </>
        ) : (
          <>
            <View style={styles.largeGroupIconContainer}>
              <Image
                source={props.profile}
                resizeMode="cover"
                style={styles.largeGroupIcon}
              />
            </View>
          </>
        )}

        <View style={styles.textContainer}>
          <Text
            style={[
              styles.nameText,
              {
                fontFamily:
                  props.unread || props.mute ? FONTS.bold : FONTS.medium,
              },
            ]}
          >
            {props.name}
          </Text>
          <Text
            style={[
              styles.messageText,
              {
                color:
                  props.unread || props.mute
                    ? COLORS.primary
                    : COLORS.lightGrey,
                fontFamily:
                  props.unread || props.mute ? FONTS.medium : FONTS.regular,
              },
            ]}
          >
            {props.message.length > 40
              ? props.message.substring(0, 40) + '...'
              : props.message}
          </Text>
        </View>
        {props.unread > 0 && (
          <View style={styles.unreadBadge}>
            <Text style={styles.unreadText}>{props.unread}</Text>
          </View>
        )}
        {props.mute && (
          <Image
            source={ICONS.mute}
            resizeMode="contain"
            style={styles.muteIcon}
            tintColor={COLORS.pink}
          />
        )}
      </View>
    </TouchableOpacity>
  );
};

export default ChatComponent;

const styles = StyleSheet.create({
  touchableContainer: {
    width: '100%',
    borderBottomWidth: RFPercentage(0.1),
    borderBottomColor: COLORS.lightWhite,
    paddingBottom: RFPercentage(1.5),
    marginTop: RFPercentage(3.4),
  },
  rowContainer: {
    width: '90%',
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
  },
  textContainer: {
    marginLeft: RFPercentage(1),
  },
  nameText: {
    color: COLORS.primary,
    fontSize: RFPercentage(2),
  },
  messageText: {
    color: COLORS.lightGrey,
    fontFamily: FONTS.regular,
    fontSize: RFPercentage(1.9),
    marginTop: RFPercentage(0.5),
  },
  unreadBadge: {
    width: RFPercentage(3),
    height: RFPercentage(3),
    backgroundColor: 'rgba(96, 203, 224, 0.16)',
    borderRadius: RFPercentage(100),
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    right: 0,
    bottom: RFPercentage(2.8),
  },
  unreadText: {
    color: COLORS.pink,
    fontFamily: FONTS.medium2,
    fontSize: RFPercentage(1.6),
    lineHeight:RFPercentage(1.6)
  },
  muteIcon: {
    width: RFPercentage(2.6),
    height: RFPercentage(2.6),
    position: 'absolute',
    right: 0,
    bottom: RFPercentage(2.8),
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
    right: RFPercentage(0.2),
  },
  avatarInnerLayer: {
    backgroundColor: COLORS.pink3,
    width: RFPercentage(6),
    height: RFPercentage(7),
    borderRadius: RFPercentage(2.5),
    alignItems: 'center',
    justifyContent: 'center',
    right: RFPercentage(0.2),
  },
  avatarImage: {
    width: RFPercentage(6),
    height: RFPercentage(7),
    borderRadius: RFPercentage(2.5),
    right: RFPercentage(0.2),
    bottom: RFPercentage(0.2),
  },
});
