import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  FlatList,
  TouchableWithoutFeedback,
} from 'react-native';
import React, { useState } from 'react';
import { COLORS, FONTS, IMAGES } from '../config/theme';
import { RFPercentage } from 'react-native-responsive-fontsize';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import { useNavigation } from '@react-navigation/native';

interface Props {
  profile?: boolean;
  icon?: boolean;
  title: string;
  subTitle: string;
  admin?: boolean;
  self?: boolean;
  onPress?: () => void;
  isAdmin?: boolean;
  member?: boolean;
  visibleTooltipId?: string | number | null;
  setVisibleTooltipId?: (id: string | number | null) => void;
  userId?: string | number;
  onRemove?: () => void;
  event?: boolean;
}

const AdminCard = (props: Props) => {
  const navigation = useNavigation();

  const isToolTip = props.visibleTooltipId === props.userId;

  const toggleTooltip = () => {
    if (isToolTip) {
      props.setVisibleTooltipId(null);
    } else {
      props.setVisibleTooltipId(props.userId);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={() => props.setVisibleTooltipId(null)}>
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={props.onPress}
        style={styles.cardContainer}
      >
        {props.profile &&
          (props.member ? (
            <View style={styles.avatarOuterLayer}>
              <View style={styles.avatarMiddleLayer}>
                <View style={styles.avatarInnerLayer}>
                  <Image
                    source={IMAGES.profile2}
                    resizeMode="contain"
                    style={styles.avatarImage}
                  />
                </View>
              </View>
            </View>
          ) : (
            <View style={styles.nonMemberAvatarWrapper}>
              <Image
                source={IMAGES.chatProfile}
                resizeMode="contain"
                style={styles.nonMemberAvatarImage}
              />
            </View>
          ))}

        <View
          style={[
            styles.textContainer,
            { marginLeft: props.profile ? RFPercentage(1.8) : 0 },
          ]}
        >
          <Text
            style={[
              styles.titleText,
              {
                fontFamily:
                  props.admin || props.member ? FONTS.medium : FONTS.bold,
              },
            ]}
          >
            {props.title}
          </Text>

          {props.admin ? (
            <>
              <Text style={styles.admin}>
                {props.self ? `Member since` : `Admin since`}
                {` `}
                <Text style={{ fontFamily: FONTS.medium }}>
                  {props.subTitle}
                </Text>
              </Text>
            </>
          ) : props.member ? (
            <>
              <Text style={styles.member}>
                {`Member since`}
                {` `}
                <Text style={{ fontFamily: FONTS.medium }}>
                  {props.subTitle}
                </Text>
              </Text>
            </>
          ) : (
            <Text style={styles.subTitle}>{props.subTitle}</Text>
          )}
        </View>

        {props.icon && (
          <TouchableOpacity activeOpacity={0.8} style={styles.rightIcon}>
            <AntDesign
              name="right"
              color={COLORS.icon}
              size={RFPercentage(2)}
            />
          </TouchableOpacity>
        )}

        {/* Admin or Member Icon */}
        {props.member && props.self ? (
          <View style={styles.adminBadge}>
            <Text style={styles.adminBadgeText}>Admin</Text>
          </View>
        ) : props.admin && !props.self ? (
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={toggleTooltip}
            style={styles.rightIcon}
          >
            <Entypo
              name="dots-three-vertical"
              color={COLORS.icon}
              size={RFPercentage(2)}
            />
          </TouchableOpacity>
        ) : (
          <></>
        )}

        {/* Tooltip */}
        {isToolTip && (
          <View style={styles.toolTipBox}>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => {
                props.setVisibleTooltipId(null);
                navigation.navigate('PlayerProfile');
              }}
            >
              <Text style={styles.view}>View Profile</Text>
            </TouchableOpacity>
            <View style={styles.divider}></View>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => {
                props.setVisibleTooltipId(null);
                props.onRemove && props.onRemove();
              }}
            >
              <Text style={styles.remove}>
                {`Remove from ${props.event ? 'Event' : 'Group'}`}
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </TouchableOpacity>
    </TouchableWithoutFeedback>
  );
};

export default AdminCard;

const styles = StyleSheet.create({
  cardContainer: {
    width: '100%',
    backgroundColor: COLORS.white,
    borderWidth: RFPercentage(0.1),
    borderColor: COLORS.lightWhite,
    borderBottomWidth: RFPercentage(0.6),
    borderBottomColor: 'rgba(230, 247, 250, 0.6)',
    borderRadius: RFPercentage(2.5),
    padding: RFPercentage(2),
    alignItems: 'center',
    flexDirection: 'row',

    position: 'relative',
    zIndex: 1,
  },
  textContainer: {
    flex: 1,
  },
  titleText: {
    color: COLORS.primary,
    fontSize: RFPercentage(2),
  },
  admin: {
    color: COLORS.grey4,
    fontFamily: FONTS.regular,
    fontSize: RFPercentage(1.7),
    marginTop: RFPercentage(0.8),
  },
  subTitleText: {
    color: COLORS.grey4,
    fontFamily: FONTS.regular,
    fontSize: RFPercentage(1.8),
    marginTop: RFPercentage(0.5),
  },
  subTitleBold: {
    fontFamily: FONTS.medium,
  },
  rightIcon: {
    position: 'absolute',
    right: RFPercentage(2),
  },
  avatarOuterLayer: {
    width: RFPercentage(5),
    height: RFPercentage(6),
    borderRadius: RFPercentage(2),
    backgroundColor: COLORS.purple,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarMiddleLayer: {
    backgroundColor: COLORS.green2,
    width: RFPercentage(5),
    height: RFPercentage(6),
    borderRadius: RFPercentage(2),
    alignItems: 'center',
    justifyContent: 'center',
    right: RFPercentage(0.1),
  },
  avatarInnerLayer: {
    backgroundColor: COLORS.pink3,
    width: RFPercentage(5),
    height: RFPercentage(6),
    borderRadius: RFPercentage(2),
    alignItems: 'center',
    justifyContent: 'center',
    right: RFPercentage(0.1),
  },
  avatarImage: {
    width: RFPercentage(5),
    height: RFPercentage(6),
    borderRadius: RFPercentage(2),
    right: RFPercentage(0.1),
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
  adminBadge: {
    width: RFPercentage(7.5),
    height: RFPercentage(3),
    borderRadius: RFPercentage(100),
    backgroundColor: '#ECEDFF',
    borderWidth: RFPercentage(0.1),
    borderColor: COLORS.white3,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    right: RFPercentage(2),
  },
  adminBadgeText: {
    fontFamily: FONTS.regular2,
    color: COLORS.primary,
    fontSize: RFPercentage(1.4),
    lineHeight:RFPercentage(1.4)
  },
  toolTipBox: {
    width: RFPercentage(30),
    height: RFPercentage(14),
    paddingHorizontal: RFPercentage(2),
    backgroundColor: COLORS.white,
    borderWidth: RFPercentage(0.1),
    borderColor: COLORS.lightWhite,
    position: 'absolute',
    right: 0,
    zIndex: 999999,
    borderRadius: RFPercentage(2),
    borderBottomWidth: RFPercentage(0.5),
    justifyContent: 'center',
  },
  toolTipItem: {
    borderBottomWidth: RFPercentage(0.1),
    borderBottomColor: COLORS.lightWhite,
  },
  lastToolTipItem: {
    borderBottomWidth: 0,
  },
  toolTipText: {
    color: COLORS.primary,
    fontSize: RFPercentage(1.7),
    fontFamily: FONTS.medium,
    left: RFPercentage(1),
  },
  member: {
    color: COLORS.grey4,
    fontFamily: FONTS.regular,
    fontSize: RFPercentage(1.8),
    marginTop: RFPercentage(0.8),
  },
  subTitle: {
    color: COLORS.grey4,
    fontFamily: FONTS.regular,
    fontSize: RFPercentage(1.8),
    marginTop: RFPercentage(0.7),
  },
  view: {
    fontFamily: FONTS.medium,
    color: COLORS.primary,
    fontSize: RFPercentage(1.9),
    left: RFPercentage(1),
  },
  divider: {
    width: '100%',
    height: RFPercentage(0.1),
    backgroundColor: COLORS.lightWhite,
    marginVertical: RFPercentage(1.9),
  },
  remove: {
    fontFamily: FONTS.medium,
    color: COLORS.red,
    fontSize: RFPercentage(1.9),
    left: RFPercentage(1),
  },
});
