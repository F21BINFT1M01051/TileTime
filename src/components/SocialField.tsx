import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { RFPercentage } from 'react-native-responsive-fontsize';
import { COLORS, FONTS, ICONS, IMAGES } from '../config/theme';
import { useNavigation } from '@react-navigation/native';

interface Props {
  name: string;
  icon: any;
  navigation: string;
  color: string;
  borderColor?: string;
  connected?: boolean;
}

const SocialField = (props: Props) => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={() => {}}
      style={[
        styles.container,
        {
          borderColor: props.borderColor
            ? props.borderColor
            : COLORS.borderColor,
            height : props.connected ? RFPercentage(8.5) : RFPercentage(6.5)
        },
      ]}
    >
      {props.connected ? (
        <View
          style={{
            width: '90%',
            alignSelf: 'center',
            flexDirection: 'row',
            alignItems: 'center',
          }}
        >
          <Image
            source={IMAGES.profile}
            resizeMode="contain"
            style={{width:RFPercentage(5.2), height:RFPercentage(5.2), borderRadius:RFPercentage(100)}}
          />

          <View style={{ marginLeft: RFPercentage(1.3) }}>
            <Text
              style={{
                color: '#1F1F1F',
                fontSize: RFPercentage(1.7),
                fontFamily: FONTS.semiBold,
              }}
            >
              Nikita Maheshwari
            </Text>
            <Text
              style={[
                styles.text,
                {
                  color: '#919191',
                  fontSize: RFPercentage(1.5),
                  fontFamily: FONTS.regular,
                  marginTop:RFPercentage(1)
                },
              ]}
            >
              1.1k Followers
            </Text>
          </View>
          <View style={{ position: 'absolute', right: 0 }}>
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
        <View
          style={{
            width: '90%',
            alignSelf: 'center',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
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
    height: RFPercentage(6.8),
    backgroundColor: COLORS.white,
    borderWidth: RFPercentage(0.1),
    borderColor: COLORS.borderColor,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: RFPercentage(2.4),
    marginTop: RFPercentage(2.3),
  },
  icon: {
    width: RFPercentage(3.2),
    height: RFPercentage(3.2),
    marginRight: RFPercentage(1.5),
  },
  text: {
    fontFamily: FONTS.bold,
    fontSize: RFPercentage(2),
  },
});
