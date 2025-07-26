import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { COLORS, FONTS } from '../../../../config/theme';
import { RFPercentage } from 'react-native-responsive-fontsize';
import InputField from '../../../../components/InputField';
import Feather from 'react-native-vector-icons/Feather';

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
            <Feather
              name="phone"
              color={COLORS.icon}
              size={RFPercentage(2.4)}
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
