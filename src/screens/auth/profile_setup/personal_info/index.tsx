import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { COLORS, FONTS } from '../../../../config/theme';
import { RFPercentage } from 'react-native-responsive-fontsize';
import InputField from '../../../../components/InputField';

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
      <View style={{ marginTop: RFPercentage(4) }}>
        <InputField placeholder="Full Name" value={name} changeText={setName} />

        <InputField
          placeholder="Create a Username"
          value={userName}
          changeText={setUserName}
        />

        <InputField
          placeholder="Phone Number"
          value={phoneNumber}
          changeText={setPhoneNumber}
          icon={true}
          iconName="phone"
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
    // borderWidth: 1,
    // borderColor: COLORS.fieldBorder,
    borderRadius: 4,
  },
});
