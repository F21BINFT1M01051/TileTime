import { Image, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { COLORS, FONTS, ICONS } from '../../../../../config/theme';
import { RFPercentage } from 'react-native-responsive-fontsize';
import InputField from '../../../../../components/InputField';

const PersonalInfo = () => {
  const [name, setName] = React.useState('');
  const [userName, setUserName] = React.useState('');
  const [phoneNumber, setPhoneNumber] = React.useState('');

  return (
    <View style={{}}>
      <Text
        style={{
          fontFamily: FONTS.headline,
          color: COLORS.primary,
          fontSize: RFPercentage(2.2),
        }}
      >
        Enter Your Personal Details
      </Text>
      <View style={{ marginTop: RFPercentage(2) }}>
        <InputField
          placeholder="Full Name"
          value={name}
          onChangeText={setName}
          password={false}
        />

        <InputField
          placeholder="Create a Username"
          value={userName}
          onChangeText={setUserName}
          password={false}
        />

        <InputField
          placeholder="Phone Number"
          value={phoneNumber}
          onChangeText={setPhoneNumber}
          password={false}
          icon={
            <Image
              source={ICONS.phone}
              resizeMode="contain"
              style={{ width: RFPercentage(2.5), height: RFPercentage(2.5) }}
            />
          }
        />
      </View>
    </View>
  );
};

export default PersonalInfo;

const styles = StyleSheet.create({
  input: {
    backgroundColor: COLORS.fieldColor,
    fontSize: RFPercentage(1.8),
    fontFamily: FONTS.regular,
    height: RFPercentage(8),
  },
  contentStyle: {
    backgroundColor: COLORS.fieldColor,
    borderRadius: 4,
  },
});
