import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import { RFPercentage } from 'react-native-responsive-fontsize';
import { COLORS, FONTS, ICONS, IMAGES } from '../config/theme';
import { useNavigation } from '@react-navigation/native';

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
      style={{
        width: '100%',
        borderBottomWidth: RFPercentage(0.1),
        borderBottomColor: COLORS.lightWhite,
        paddingBottom: RFPercentage(2),
        marginTop: RFPercentage(4),
      }}
    >
      <View
        style={{
          width: '90%',
          alignSelf: 'center',
          flexDirection: 'row',
          alignItems: 'center',
        }}
      >
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

        <View style={{ marginLeft: RFPercentage(1) }}>
          <Text
            style={{
              color: COLORS.primary,
              fontFamily: FONTS.semiBold,
              fontSize: RFPercentage(1.9),
            }}
          >
            {props.name}
          </Text>
          <Text
            style={{
              color: COLORS.lightGrey,
              fontFamily: FONTS.regular,
              fontSize: RFPercentage(1.7),
              marginTop: RFPercentage(0.5),
            }}
          >
            {props.message.length > 40
              ? props.message.substring(0, 40) + '...'
              : props.message}
          </Text>
        </View>
        {props.unread > 0 && (
          <View
            style={{
              width: RFPercentage(3.5),
              height: RFPercentage(3.5),
              backgroundColor: '#FFD9F2',
              borderRadius: RFPercentage(100),
              alignItems: 'center',
              justifyContent: 'center',
              position: 'absolute',
              right: 0,
            }}
          >
            <Text
              style={{
                color: COLORS.pink,
                fontFamily: FONTS.medium2,
                fontSize: RFPercentage(1.7),
              }}
            >
              {props.unread}
            </Text>
          </View>
        )}
        {props.mute && (
          <Image
            source={ICONS.mute}
            resizeMode="contain"
            style={{
              width: RFPercentage(3),
              height: RFPercentage(3),
              position: 'absolute',
              right: 0,
            }}
          />
        )}
      </View>
    </TouchableOpacity>
  );
};

export default ChatComponent;

const styles = StyleSheet.create({
  largeGroupIconContainer: {
    width: RFPercentage(8),
    height: RFPercentage(8),
    borderRadius: RFPercentage(100),
    backgroundColor: COLORS.yellow,
    alignItems: 'center',
    justifyContent: 'center',
  },
  largeGroupIcon: {
    width: RFPercentage(8),
    height: RFPercentage(8),
    borderTopRightRadius: RFPercentage(100),
    right: RFPercentage(0.5),
    borderTopLeftRadius: RFPercentage(100),
    borderBottomRightRadius: RFPercentage(100),
    borderBottomLeftRadius: RFPercentage(1),
  },
  avatarOuterLayer: {
    width: RFPercentage(7.6),
    height: RFPercentage(9),
    borderRadius: RFPercentage(3.5),
    backgroundColor: COLORS.purple,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarMiddleLayer: {
    backgroundColor: COLORS.green2,
    width: RFPercentage(7.6),
    height: RFPercentage(9),
    borderRadius: RFPercentage(3.5),
    alignItems: 'center',
    justifyContent: 'center',
    right: RFPercentage(0.3),
  },
  avatarInnerLayer: {
    backgroundColor: COLORS.pink3,
    width: RFPercentage(7.6),
    height: RFPercentage(9),
    borderRadius: RFPercentage(3.5),
    alignItems: 'center',
    justifyContent: 'center',
    right: RFPercentage(0.3),
  },
  avatarImage: {
    width: RFPercentage(7.6),
    height: RFPercentage(9),
    borderRadius: RFPercentage(3.5),
    right: RFPercentage(0.3),
    bottom: RFPercentage(0.2),
  },
});
