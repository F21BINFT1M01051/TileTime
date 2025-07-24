import { Image, StyleSheet, Text, TextInput, View } from 'react-native';
import React from 'react';
import { COLORS, FONTS, ICONS, IMAGES } from '../../../../config/theme';
import { RFPercentage } from 'react-native-responsive-fontsize';
import Feather from 'react-native-vector-icons/Feather';

const About = () => {
  return (
    <View>
      <Text
        style={{
          fontFamily: FONTS.headline,
          color: COLORS.primary,
          fontSize: RFPercentage(2.2),
        }}
      >
        Help others get to know you
      </Text>
      <View style={{ marginTop: RFPercentage(3) }}>
        <Image
          source={IMAGES.profile}
          resizeMode="contain"
          style={{
            width: RFPercentage(12),
            height: RFPercentage(12),
            borderRadius: RFPercentage(100),
          }}
        />
        <Image
          source={ICONS.edit}
          resizeMode="contain"
          style={{
            width: RFPercentage(4),
            height: RFPercentage(4),
            left: RFPercentage(4),
            bottom: RFPercentage(2),
          }}
        />
      </View>
      <View style={{marginTop:RFPercentage(2)}}>
        <View
          style={{
            backgroundColor: '#F2F2F2',
            borderWidth: 1,
            borderColor: '#DEDEDE',
            borderRadius: RFPercentage(1.5),
            paddingVertical: RFPercentage(2),
          }}
        >
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              width: '90%',
              alignSelf: 'center',
            }}
          >
            <Text style={{ fontFamily: FONTS.medium2, color: COLORS.primary }}>
              Add Bio
            </Text>
            <Feather name="user" color={'#1F1F1F'} size={RFPercentage(2)} />
          </View>
          <TextInput
            placeholder="Passionate coach with a love for helping players unlock their full potential. Let’s grow your game, one step at a time."
            placeholderTextColor={'#1D211E'}
            style={{
              width: '90%',
              marginTop: RFPercentage(1),
              alignSelf: 'center',
              textAlignVertical: 'top', // aligns text to top
              fontFamily: FONTS.regular,
              color: COLORS.inputColor,
              lineHeight:RFPercentage(2.5),
              fontSize:RFPercentage(2)
              
            }}
            multiline={true}
          />
        </View>
      </View>
    </View>
  );
};

export default About;

const styles = StyleSheet.create({});
