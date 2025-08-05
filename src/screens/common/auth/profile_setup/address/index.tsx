import { Image, StyleSheet, Text, View, FlatList } from 'react-native';
import React from 'react';
import { COLORS, FONTS, ICONS } from '../../../../../config/theme';
import { RFPercentage } from 'react-native-responsive-fontsize';
import InputField from '../../../../../components/InputField';
import SocialField from '../../../../../components/SocialField';

const data = [
  {
    id: 1,
    name: 'Connect With Facebook',
    navigationScreen: '',
    color: COLORS.skyBlue,
    icon: ICONS.facebook,
  },
  {
    id: 2,
    name: 'Connect With Instagram',
    navigationScreen: '',
    icon: ICONS.insta,
    color: COLORS.pink2,
  },
  {
    id: 3,
    name: 'Connect With TikTok',
    navigationScreen: '',
    icon: ICONS.tiktok,
    color: COLORS.black,
  },
];

const Address = () => {
  const [website, setWebsite] = React.useState('');

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Where can people find you</Text>

      <View style={styles.inputContainer}>
        <FlatList
          data={data}
          scrollEnabled={false}
          keyExtractor={item => item.id.toString()}
          renderItem={({ item }) => (
            <SocialField
              icon={item.icon}
              name={item.name}
              navigation={item.navigationScreen}
              color={item.color}
            />
          )}
        />
        <View style={{ marginTop: RFPercentage(0.5) }}>
          <InputField
            placeholder="Your Website URL"
            value={website}
            onChangeText={setWebsite}
            password={false}
            icon={
              <Image
                source={ICONS.globe}
                resizeMode="contain"
                style={{ width: RFPercentage(3), height: RFPercentage(3) }}
              />
            }
          />
        </View>
      </View>
    </View>
  );
};

export default Address;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  heading: {
    fontFamily: FONTS.headline,
    color: COLORS.primary,
    fontSize: RFPercentage(2.3),
  },
  inputContainer: {
    marginTop: RFPercentage(2),
  },
  iconImage: {
    width: RFPercentage(2.8),
    height: RFPercentage(2.8),
  },
});
