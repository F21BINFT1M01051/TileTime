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
      <Text style={styles.heading}>Where can people find you</Text>

      <View style={styles.inputContainer}>
        <InputField
          placeholder="Full Address"
          value={address}
          onChangeText={setAddress}
          password={false}
          icon={
            <Image
              source={ICONS.location}
              resizeMode="contain"
              style={styles.iconImage}
            />
          }
        />

        <InputField
          placeholder="Instagram Handle "
          value={instagram}
          onChangeText={setInstagram}
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
          value={website}
          onChangeText={setWebsite}
          password={false}
          icon={
            <Feather
              name="globe"
              color={COLORS.icon}
              size={RFPercentage(2.5)}
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
