import { StyleSheet, Text, View, TouchableOpacity, Image, Platform } from 'react-native';
import React from 'react';
import { RFPercentage } from 'react-native-responsive-fontsize';
import { COLORS, FONTS, ICONS } from '../config/theme';
import { useNavigation } from '@react-navigation/native';

interface Props {
  title: string;
  style?: object;
  onPress?: () => void;
  wrapStyle?: object;
}

const HomeNavigator = (props: Props) => {
  const navigation = useNavigation();
  return (
    <View
      style={[
        {
          backgroundColor: COLORS.white,
          width: '100%',
          height: Platform.OS === 'android' ? RFPercentage(10) : RFPercentage(13),
          justifyContent: 'flex-end',
          borderBottomWidth: RFPercentage(0.1),
          borderBottomColor: COLORS.lightWhite,
          paddingBottom: RFPercentage(1.5),
        },
        props.wrapStyle,
      ]}
    >
      <View style={styles.auth}>
        <Text style={[styles.getStartedText, props.style]}>{props.title}</Text>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => navigation.goBack()}
        >
          <Image
            source={ICONS.cross}
            tintColor={'#8C8C8C'}
            resizeMode="contain"
            style={styles.crossIcon}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default HomeNavigator;

const styles = StyleSheet.create({
  getStartedText: {
    color: COLORS.primary,
    fontFamily: FONTS.semiBold,
    fontSize: RFPercentage(2),
  },
  auth: {
    width: '90%',
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'space-between',
  },
  crossIcon: {
    width: RFPercentage(2.8),
    height: RFPercentage(2.8),
  },
});
