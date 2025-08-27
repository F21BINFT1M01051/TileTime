import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { COLORS, FONTS, ICONS } from '../../../../../config/theme';
import AuthHeader from '../../../../../components/AuthHeader';
import { RFPercentage } from 'react-native-responsive-fontsize';
import CustomButton from '../../../../../components/CustomButton';

const PayPal = ({navigation} : any) => {
  return (
    <View style={styles.container}>
      <AuthHeader title="Link PayPal" />
      <View style={styles.innerContainer}>
        <Image source={ICONS.paypal2} resizeMode="cover" style={styles.paypalImage} />

        <Text style={styles.titleText}>
          Connect Your PayPal Account to TileTime
        </Text>

        <View style={styles.sectionContainer}>
          <Text style={styles.sectionHeading}>This Let's TileTime:</Text>

          <Text style={styles.sectionHeadingWithMargin}>Receive Personal Info</Text>
          <View style={styles.inputWrapper}>
            <TextInput
              placeholder="Full name, email address, shipping address"
              placeholderTextColor={COLORS.placeholder}
              style={styles.input}
            />
          </View>

          <Text style={styles.sectionHeadingWithMargin}>Access Payment Methods</Text>
          <View style={styles.inputWrapper}>
            <TextInput
              placeholder="Access last 4 digits of your payment method"
              placeholderTextColor={COLORS.placeholder}
              style={styles.input}
            />
          </View>
        </View>

        <View style={styles.footerContainer}>
          <Text style={styles.footerText}>
            TileTime is responsible for the use of your info in accordance with
            its <Text style={styles.linkText}>Privacy Statement</Text> and
            <Text style={styles.linkText}> Terms and Condition</Text>. You can stop future sharing of
            your info at any time in your <Text style={styles.linkText}>PayPal Profile</Text>.
          </Text>
        </View>

        <View style={styles.actionsContainer}>
          <CustomButton title='Login' onPress={()=> {}} />
          <TouchableOpacity style={styles.cancelButton} activeOpacity={0.8} onPress={()=> navigation.goBack()}>
            <Text style={styles.cancelText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default PayPal;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  innerContainer: {
    width: '90%',
    alignSelf: 'center',
    marginTop: RFPercentage(2),
  },
  paypalImage: {
    width: RFPercentage(24),
    height: RFPercentage(10),
    alignSelf: 'center',
  },
  titleText: {
    textAlign: 'center',
    fontFamily: FONTS.bold,
    color: COLORS.primary,
    fontSize: RFPercentage(2.6),
    marginTop: RFPercentage(0.5),
    lineHeight: RFPercentage(3.3),
  },
  sectionContainer: {
    marginTop: RFPercentage(3),
  },
  sectionHeading: {
    fontFamily: FONTS.semiBold,
    color: COLORS.primary,
    fontSize: RFPercentage(2),
  },
  sectionHeadingWithMargin: {
    fontFamily: FONTS.semiBold,
    color: COLORS.primary,
    fontSize: RFPercentage(2),
    marginTop: RFPercentage(3),
  },
  inputWrapper: {
    width: '100%',
    borderBottomWidth: RFPercentage(0.1),
    borderBottomColor: COLORS.fieldBorder,
    height: RFPercentage(4),
    marginTop: RFPercentage(0.5),
  },
  input: {
    width: '100%',
    height: RFPercentage(4),
    fontFamily: FONTS.regular,
    color: COLORS.primary,
    fontSize: RFPercentage(1.8),
  },
  footerContainer: {
    marginTop: RFPercentage(9),
    width: '90%',
    alignSelf: 'center',
  },
  footerText: {
    textAlign: 'center',
    fontFamily: FONTS.regular,
    color: COLORS.lightGrey,
    fontSize: RFPercentage(1.8),
    lineHeight: RFPercentage(2.2),
  },
  linkText: {
    color: COLORS.primary,
    fontFamily: FONTS.semiBold,
  },
  actionsContainer: {
    marginTop: RFPercentage(3),
  },
  cancelButton: {
    marginTop: RFPercentage(2),
  },
  cancelText: {
    fontFamily: FONTS.semiBold,
    color: COLORS.primary,
    textAlign: 'center',
    fontSize: RFPercentage(2),
  },
});
