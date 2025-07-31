import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { COLORS, FONTS, IMAGES } from '../config/theme';
import { RFPercentage } from 'react-native-responsive-fontsize';
import AntDesign from 'react-native-vector-icons/AntDesign';

interface Props {
  profile?: boolean;
  icon?: boolean;
  title: string;
  subTitle: string;
}

const AdminCard = (props: Props) => {
  return (
    <View
      style={{
        width: '100%',
        backgroundColor: COLORS.white,
        borderWidth: RFPercentage(0.1),
        borderColor: COLORS.lightWhite,
        borderBottomWidth: RFPercentage(0.6),
        borderRadius: RFPercentage(2),
        padding: RFPercentage(2),
        alignItems: 'center',
        flexDirection: 'row',
        shadowColor: 'rgba(203, 203, 203, 1)',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 5,
      }}
    >
      {props.profile ? (
        <>
          <View
            style={{
              width: RFPercentage(6),
              height: RFPercentage(6),
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: COLORS.pink3,
              borderTopRightRadius: RFPercentage(3),
              borderTopLeftRadius: RFPercentage(3),
            }}
          >
            <Image
              source={IMAGES.chatProfile}
              resizeMode="contain"
              style={{
                width: RFPercentage(6),
                height: RFPercentage(6),
                right: RFPercentage(0.2),
                bottom: RFPercentage(0.1),
              }}
            />
          </View>
        </>
      ) : (
        <></>
      )}

      <View style={{ marginLeft: props.profile ? RFPercentage(2) : 0 }}>
        <Text
          style={{
            color: COLORS.primary,
            fontFamily: FONTS.bold,
            fontSize: RFPercentage(1.9),
          }}
        >
          {props.title}
        </Text>
        <Text
          style={{
            color: COLORS.grey4,
            fontFamily: FONTS.regular,
            fontSize: RFPercentage(1.7),
            marginTop: RFPercentage(0.5),
          }}
        >
          {props.subTitle}
        </Text>
      </View>
      {props.icon && (
        <TouchableOpacity
          activeOpacity={0.8}
          style={{ position: 'absolute', right: RFPercentage(2) }}
        >
          <AntDesign name="right" color={COLORS.icon} size={RFPercentage(2)} />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default AdminCard;

const styles = StyleSheet.create({});
