import {
  Image,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import { COLORS, FONTS, ICONS } from '../../../../../config/theme';
import AuthHeader from '../../../../../components/AuthHeader';
import { RFPercentage } from 'react-native-responsive-fontsize';
import CustomButton from '../../../../../components/CustomButton';

const Stripe = ({ navigation }: any) => {
  const [checked, setChecked] = React.useState(false);

  return (
    <View style={styles.container}>
      <AuthHeader title="Setup Stripe" />
      <View style={styles.innerContainer}>
        <Image source={ICONS.stripe2} resizeMode="cover" style={styles.logo} />

        <View style={styles.card}>
          <View style={styles.formWrap}>
            <Text style={styles.heading}>Sign In to your account</Text>

            <Text style={[styles.label, { marginTop: RFPercentage(2.4) }]}>
              Email
            </Text>
            <View style={styles.inputWrapper}>
              <TextInput
                placeholder=""
                placeholderTextColor={COLORS.placeholder}
                style={styles.input}
                cursorColor={COLORS.primary}
                selectionColor={COLORS.primary}
              />
            </View>

            <View
              style={[styles.passwordRow, { marginTop: RFPercentage(2.4) }]}
            >
              <Text style={styles.label}>Password</Text>
              <TouchableOpacity activeOpacity={0.8}>
                <Text style={styles.forgetPassword}>Forget your password?</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.inputWrapper}>
              <TextInput
                placeholder=""
                placeholderTextColor={COLORS.placeholder}
                style={styles.input}
                cursorColor={COLORS.primary}
                selectionColor={COLORS.primary}
              />
            </View>
          </View>

          <View style={styles.actionWrap}>
            <TouchableOpacity
              style={styles.checkWrap}
              activeOpacity={0.8}
              onPress={() => setChecked(!checked)}
            >
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => setChecked(!checked)}
              >
                <Image
                  source={checked ? ICONS.checked : ICONS.uncheck}
                  resizeMode="contain"
                  style={styles.checkboxIcon}
                />
              </TouchableOpacity>
              <Text style={styles.business}>Stay Signed In For This Week</Text>
            </TouchableOpacity>

            <CustomButton
              title="Continue"
              onPress={() => {}}
              textStyle={styles.continueText}
              style={styles.continueBtn}
            />
          </View>
        </View>
      </View>
    </View>
  );
};

export default Stripe;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  innerContainer: {
    width: '90%',
    alignSelf: 'center',
    alignItems: 'center',
    marginTop: RFPercentage(2),
  },
  logo: {
    width: RFPercentage(10),
    height: RFPercentage(10),
    alignSelf: 'center',
  },
  card: {
    width: '100%',
    height: '60%',
    backgroundColor: COLORS.white,
    alignItems: 'center',
    marginTop: RFPercentage(3),
    borderWidth: RFPercentage(0.1),
    borderColor: COLORS.lightWhite,
    paddingVertical: RFPercentage(4),
    borderRadius: RFPercentage(0.6),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 3.84,
    elevation: 5,
  },
  formWrap: {
    width: '80%',
    alignSelf: 'center',
  },
  heading: {
    color: COLORS.primary,
    fontFamily: FONTS.bold,
    fontSize: RFPercentage(2.2),
  },
  label: {
    fontFamily: FONTS.regular,
    color: COLORS.primary,
    fontSize: RFPercentage(1.6),
  },
  inputWrapper: {
    width: '100%',
    borderWidth: RFPercentage(0.1),
    borderColor: COLORS.fieldBorder,
    height: RFPercentage(4.5),
    marginTop: RFPercentage(1),
    paddingHorizontal: RFPercentage(1),
    borderRadius: RFPercentage(0.5),
  },
  input: {
    width: '100%',
    height: RFPercentage(4.5),
    fontFamily: FONTS.regular,
    color: COLORS.primary,
    fontSize: RFPercentage(1.6),
  },
  passwordRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  forgetPassword: {
    fontFamily: FONTS.medium,
    color: COLORS.primary,
    fontSize: RFPercentage(1.6),
  },
  actionWrap: {
    width: '80%',
    marginTop: RFPercentage(3),
  },
  checkWrap: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkboxIcon: {
    width: RFPercentage(2.3),
    height: RFPercentage(2.3),
  },
  business: {
    color: COLORS.inputColor,
    fontSize: RFPercentage(1.6),
    fontFamily: FONTS.regular,
    marginLeft: RFPercentage(1),
  },
  continueBtn: {
    height: RFPercentage(4.8),
    borderRadius: RFPercentage(1),
    marginTop: RFPercentage(3),
  },
  continueText: {
    fontFamily: FONTS.medium,
    fontSize: RFPercentage(1.8),
  },
});
