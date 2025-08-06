import { StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native';
import React from 'react';
import { COLORS, FONTS, IMAGES } from '../../../config/theme';
import { RFPercentage } from 'react-native-responsive-fontsize';

interface Props {
  onPress: () => void;
  isGroup?: boolean;
  isPlayer?: boolean;
  isInstructor?: boolean;
  name: string;
  location?: string;
  members?: number;
}

const SearchCard = (props: Props) => {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={props.onPress}
      style={{
        width: '100%',
        backgroundColor: COLORS.white,
        height: RFPercentage(11),
        borderRadius: RFPercentage(3.5),
        borderWidth: RFPercentage(0.1),
        borderColor: COLORS.lightWhite,
        borderBottomWidth: RFPercentage(0.6),
        justifyContent: 'center',
        marginTop: RFPercentage(2),
      }}
    >
      <View
        style={{
          width: '88%',
          alignSelf: 'center',
          flexDirection: 'row',
          alignItems: 'center',
        }}
      >
        {props.isPlayer ? (
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
        ) : props.isInstructor ? (
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
        <View style={{ marginLeft: RFPercentage(2) }}>
          <Text
            style={{
              fontFamily: FONTS.semiBold,
              color: COLORS.primary,
              fontSize: RFPercentage(1.8),
            }}
          >
            {props.name}
          </Text>

          {props.members ? (
            <>
              <Text
                style={{
                  fontFamily: FONTS.regular,
                  color: COLORS.lightGrey,
                  fontSize: RFPercentage(1.6),
                  marginTop: RFPercentage(0.8),
                }}
              >
                {props.members} Members
              </Text>
            </>
          ) : (
            <>
              <Text
                style={{
                  fontFamily: FONTS.regular,
                  color: COLORS.lightGrey,
                  fontSize: RFPercentage(1.6),
                  marginTop: RFPercentage(0.8),
                }}
              >
                {props.location}
              </Text>
            </>
          )}
        </View>

        {props.isInstructor && (
          <>
            <View
              style={{
                width: RFPercentage(10),
                height: RFPercentage(3.5),
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: COLORS.pink5,
                borderRadius: RFPercentage(100),
                position: 'absolute',
                right: 0,
              }}
            >
              <Text
                style={{
                  color: COLORS.primary,
                  fontSize: RFPercentage(1.5),
                  fontFamily: FONTS.medium,
                }}
              >
                Instructor
              </Text>
            </View>
          </>
        )}
      </View>
    </TouchableOpacity>
  );
};

export default SearchCard;

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
