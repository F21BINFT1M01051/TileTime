import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Platform,
} from 'react-native';
import React from 'react';
import { RFPercentage } from 'react-native-responsive-fontsize';
import { COLORS, FONTS, ICONS } from '../config/theme';
import { useNavigation } from '@react-navigation/native';

interface Props {
  title: string;
  style?: object;
  onPress?: () => void;
  wrapStyle?: object;
  right?: boolean;
  rightText?: string;
  rightIcon?: any;
  onPress2?: () => void;
  rightIconStyle?: object;
}

const AuthHeader = (props: Props) => {
  const navigation = useNavigation();
  return (
    <View style={[styles.container, props.wrapStyle]}>
      <View style={styles.auth}>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={props.onPress ? props.onPress : () => navigation.goBack()}
          style={styles.backBtn}
        >
          <Image
            source={ICONS.back}
            resizeMode="contain"
            style={styles.backIcon}
          />
          <Text style={[styles.getStartedText, props.style]}>
            {props.title}
          </Text>
        </TouchableOpacity>

        {props.right && (
          <>
            {props.rightText ? (
              <TouchableOpacity activeOpacity={0.8} style={styles.rightBtn}>
                <Text style={styles.rightText}>{props.rightText}</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={props.onPress2}
                style={styles.rightBtn}
              >
                <Image
                  source={props.rightIcon}
                  resizeMode="contain"
                  style={[styles.rightIcon, props.rightIconStyle]}
                />
              </TouchableOpacity>
            )}
          </>
        )}
      </View>
    </View>
  );
};

export default AuthHeader;

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
    width: '100%',
    height: Platform.OS === 'ios' ? RFPercentage(13) : RFPercentage(12),
    justifyContent: 'flex-end',
    borderBottomWidth: RFPercentage(0.1),
    borderBottomColor: COLORS.lightWhite,
    paddingBottom: RFPercentage(1.5),
  },
  auth: {
    width: '90%',
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
  },
  backBtn: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  backIcon: {
    width: RFPercentage(2.5),
    height: RFPercentage(2.5),
  },
  getStartedText: {
    color: COLORS.primary,
    fontFamily: FONTS.headline,
    fontSize: RFPercentage(2.7),
    marginLeft: RFPercentage(1),
  },
  rightBtn: {
    position: 'absolute',
    right: 0,
  },
  rightText: {
    color: COLORS.icon,
    fontFamily: FONTS.bold,
    fontSize: RFPercentage(1.7),
  },
  rightIcon: {
    width: RFPercentage(2.5),
    height: RFPercentage(2.5),
  },
});
