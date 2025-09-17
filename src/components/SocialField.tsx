import {
  Image,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import { RFPercentage } from 'react-native-responsive-fontsize';
import { COLORS, FONTS, IMAGES } from '../config/theme';
import { useNavigation } from '@react-navigation/native';

interface Props {
  name: string;
  icon?: any;
  navigation?: string;
  color?: string;
  borderColor?: string;
  connected?: boolean;
  onPress?: () => void;
  style?: object;
  textStyle?: object;
}

const SocialField = (props: Props) => {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={props.onPress}
      style={[
        styles.container,
        {
          borderColor: props.borderColor || COLORS.borderColor,
          height: props.connected ? RFPercentage(8.5) : RFPercentage(6),
        },
        props.style,
      ]}
    >
      {props.connected ? (
        <View style={styles.connectedContainer}>
          <Image
            source={IMAGES.profile}
            resizeMode="contain"
            style={styles.connectedProfileImage}
          />

          <View style={styles.connectedTextWrapper}>
            <Text style={styles.connectedName}>Nikita Maheshwari</Text>
            <Text style={styles.connectedFollowers}>1.1k Followers</Text>
          </View>

          <View style={styles.connectedIconWrapper}>
            {props.icon && (
              <Image
                source={props.icon}
                resizeMode="contain"
                style={[styles.icon, { marginRight: 0 }]}
              />
            )}
          </View>
        </View>
      ) : (
        <View style={styles.disconnectedContainer}>
          {props.icon && (
            <Image
              source={props.icon}
              resizeMode="contain"
              style={styles.icon}
            />
          )}

          <Text
            style={[
              styles.text,
              { color: props.color ? props.color : COLORS.black },
              props.textStyle,
            ]}
          >
            {props.name}
          </Text>
        </View>
      )}
    </TouchableOpacity>
  );
};

export default SocialField;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: COLORS.white,
    borderWidth: RFPercentage(0.1),
    borderColor: COLORS.borderColor,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: RFPercentage(2.3),
    marginTop: RFPercentage(2.3),
  },
  icon: {
    width: RFPercentage(2.5),
    height: RFPercentage(2.5),
    marginRight: RFPercentage(1.5),
  },
  text: {
    fontFamily: FONTS.bold,
    fontSize: RFPercentage(2),
    lineHeight: RFPercentage(2),
  },
  connectedContainer: {
    width: '90%',
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
  },
  connectedProfileImage: {
    width: RFPercentage(5.2),
    height: RFPercentage(5.2),
    borderRadius: RFPercentage(100),
  },
  connectedTextWrapper: {
    marginLeft: RFPercentage(1.3),
  },
  connectedName: {
    color: COLORS.icon,
    fontSize: RFPercentage(2),
    fontFamily: FONTS.semiBold,
  },
  connectedFollowers: {
    color: COLORS.lightGrey,
    fontSize: RFPercentage(1.7),
    fontFamily: FONTS.regular,
    marginTop: Platform.OS === 'android' ? 2 : RFPercentage(1),
  },
  connectedIconWrapper: {
    position: 'absolute',
    right: 0,
  },
  disconnectedContainer: {
    width: '90%',
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
