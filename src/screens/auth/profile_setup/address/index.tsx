import { Image, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { COLORS, FONTS, ICONS } from '../../../../config/theme';
import { RFPercentage } from 'react-native-responsive-fontsize';
import InputField from '../../../../components/InputField';
import Feather from 'react-native-vector-icons/Feather';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';

const Address = () => {
  const [address, setAddress] = React.useState('');
  const [instagram, setInstagram] = React.useState('');
  const [website, setWebsite] = React.useState('');

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Connect SM</Text>

      <View style={styles.inputContainer}>
        <InputField
          placeholder="City,State"
          value={address}
          onChangeText={setAddress}
          password={false}
        />

        <InputField
          placeholder="Facebook Handle"
          value={address}
          onChangeText={setAddress}
          password={false}
          icon={
            <SimpleLineIcons
              name="social-instagram"
              color={COLORS.icon}
              size={RFPercentage(2.5)}
            />
          }
        />
        <InputField
          placeholder="TikTok Handle"
          value={address}
          onChangeText={setAddress}
          password={false}
          icon={
            <SimpleLineIcons
              name="social-instagram"
              color={COLORS.icon}
              size={RFPercentage(2.5)}
            />
          }
        />
        <InputField
          placeholder="Instagram Handle"
          value={address}
          onChangeText={setAddress}
          password={false}
          icon={
            <SimpleLineIcons
              name="social-instagram"
              color={COLORS.icon}
              size={RFPercentage(2.5)}
            />
          }
        />

        <InputField
          placeholder="Website URL"
          value={instagram}
          onChangeText={setInstagram}
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
    fontSize: RFPercentage(2.2),
  },
  inputContainer: {
    marginTop: RFPercentage(2),
  },
  iconImage: {
    width: RFPercentage(2.8),
    height: RFPercentage(2.8),
  },
});
