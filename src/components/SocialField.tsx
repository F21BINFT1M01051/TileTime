import { Image, StyleSheet, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import { RFPercentage } from 'react-native-responsive-fontsize';
import { COLORS, FONTS, ICONS } from '../config/theme';
import { useNavigation } from '@react-navigation/native';

interface Props {
  name: string;
  icon: any;
  navigation: string;
  color: string;
}

const SocialField = (props: Props) => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={() => {}}
      style={{
        width: '100%',
        height: RFPercentage(6.8),
        backgroundColor: COLORS.white,
        borderWidth: 1.3,
        borderColor: COLORS.borderColor,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        borderRadius: RFPercentage(2.4),
        marginTop: RFPercentage(2.3),
      }}
    >
      {props.icon && (
        <Image
          source={props.icon}
          resizeMode="contain"
          style={{
            width: RFPercentage(3.5),
            height: RFPercentage(3.5),
            marginRight: RFPercentage(1.5),
          }}
        />
      )}

      <Text
        style={[
          {
            fontFamily: FONTS.bold,
            color: props.color ? props.color : COLORS.black,
            fontSize: RFPercentage(2),
          },
        ]}
      >
        {props.name}
      </Text>
    </TouchableOpacity>
  );
};

export default SocialField;

const styles = StyleSheet.create({});
