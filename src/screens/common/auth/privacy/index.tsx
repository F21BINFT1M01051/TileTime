import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { COLORS, FONTS } from '../../../../config/theme';
import AuthHeader from '../../../../components/AuthHeader';
import { RFPercentage } from 'react-native-responsive-fontsize';

const PrivacyPolicy = () => {
  return (
    <View style={{ flex: 1, backgroundColor: COLORS.white }}>
      <AuthHeader title="Privacy & Terms" />
      <View
        style={{
          width: '90%',
          alignSelf: 'center',
          marginTop: RFPercentage(3),
        }}
      >
        <Text
          style={{
            color: COLORS.primary,
            fontFamily: FONTS.medium,
            fontSize: RFPercentage(2),
          }}
        >
          Effective from 4th sept 2025
        </Text>
        <View style={{ marginTop: RFPercentage(3) }}>
          <Text
            style={{
              color: COLORS.lightGrey,
              fontFamily: FONTS.regular,
              fontSize: RFPercentage(1.9),
              lineHeight: RFPercentage(1.9),
            }}
          >
            Privacy Policy
          </Text>
          <Text
            style={{
              color: COLORS.lightGrey,
              fontFamily: FONTS.regular,
              fontSize: RFPercentage(1.9),
              lineHeight: RFPercentage(1.9),
            }}
          >
            At TileTime, we value your privacy. We collect basic details like
            your name, email, and usage activity to provide and improve the app.
            You may also choose to share extra information like a profile photo
            or preferences. We never sell your data - it’s only shared with
            trusted partners who help run the app or if required by law.
          </Text>
          <Text
            style={{
              color: COLORS.lightGrey,
              fontFamily: FONTS.regular,
              fontSize: RFPercentage(1.9),
              lineHeight: RFPercentage(1.9),
            }}
          >
            Your information is protected with standard security practices,
            though no system is 100% secure. You can update or delete your
            account anytime and manage notifications in settings. TileTime is
            not meant for children under 13. We may update this policy from time
            to time, and changes will appear in the app. For any questions,
            contact us at support@tiletime.com
          </Text>
        </View>

        <View style={{ marginTop: RFPercentage(3) }}>
          <Text
            style={{
              color: COLORS.lightGrey,
              fontFamily: FONTS.regular,
              fontSize: RFPercentage(1.9),
              lineHeight: RFPercentage(1.9),
            }}
          >
            Terms of Service
          </Text>
          <Text
            style={{
              color: COLORS.lightGrey,
              fontFamily: FONTS.regular,
              fontSize: RFPercentage(1.9),
              lineHeight: RFPercentage(1.9),
            }}
          >
            By using TileTime, you agree to these terms. You must be 13 or older
            and are responsible for keeping your account details secure. Use the
            app only for lawful, personal purposes and do not attempt to disrupt
            or misuse it.
          </Text>
          <Text
            style={{
              color: COLORS.lightGrey,
              fontFamily: FONTS.regular,
              fontSize: RFPercentage(1.9),
              lineHeight: RFPercentage(1.9),
            }}
          >
            We may suspend or terminate accounts that violate these rules, and
            you can delete your account whenever you like. TileTime is provided
            “as is,” and while we aim for smooth service, we can’t guarantee it
            will always be error-free. We’re not liable for any indirect damages
            from using the app. These terms may be updated, and continued use
            means you accept the changes. They are governed by the laws of
            [Insert Jurisdiction]. For questions, contact support@tiletime.com
          </Text>
        </View>
      </View>
    </View>
  );
};

export default PrivacyPolicy;

const styles = StyleSheet.create({});
