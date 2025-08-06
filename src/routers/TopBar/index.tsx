import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Platform,
} from 'react-native';
import React from 'react';
import { RFPercentage } from 'react-native-responsive-fontsize';
import { COLORS, FONTS, ICONS } from '../../config/theme';

interface Props {
  right?: boolean;
  onPress? : () => void;
  title: string;
  text?: string;
  home?: boolean;
  onPress2?: () => void;
  onPress3?: () => void;
}

const TopNavigation = (props: Props) => {
  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <Text style={styles.titleText}>{props.title}</Text>
        <Image
          source={ICONS.vector}
          resizeMode="contain"
          style={styles.vectorIcon}
        />
        {props.right && props.text && (
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={props.onPress}
            style={{ position: 'absolute', right: 0 }}
          >
            <Text
              style={{
                color: COLORS.white,
                fontFamily: FONTS.semiBold,
                fontSize: RFPercentage(1.8),
              }}
            >
              {props.text}
            </Text>
          </TouchableOpacity>
        )}
        {props.right && props.home && (
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'absolute',
              right: 0,
            }}
          >
            <TouchableOpacity activeOpacity={0.8} onPress={props.onPress2}>
              <Image
                source={ICONS.search}
                resizeMode="contain"
                style={{
                  width: RFPercentage(3.8),
                  height: RFPercentage(3.8),
                  marginRight: RFPercentage(1.4),
                }}
              />
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={0.8} onPress={props.onPress3}>
              <Image
                source={ICONS.homeUser}
                resizeMode="contain"
                style={{ width: RFPercentage(3.8), height: RFPercentage(3.8) }}
              />
            </TouchableOpacity>
          </View>
        )}
      </View>
    </View>
  );
};

export default TopNavigation;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: COLORS.pink,
    height: Platform.OS === 'ios' ? RFPercentage(14) : RFPercentage(12),
    justifyContent: 'flex-end',
    paddingBottom: RFPercentage(2),
  },
  innerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '90%',
    alignSelf: 'center',
  },
  titleText: {
    color: COLORS.white,
    fontFamily: FONTS.headline,
    fontSize: RFPercentage(3),
    marginRight: RFPercentage(0.2),
  },
  vectorIcon: {
    width: RFPercentage(2.2),
    height: RFPercentage(2.2),
    bottom: RFPercentage(1),
  },
});
