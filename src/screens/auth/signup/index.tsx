import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import { COLORS, FONTS, IMAGES } from '../../../config/theme';
import { RFPercentage } from 'react-native-responsive-fontsize';
import CustomButton from '../../../components/CustomButton';
import InputField from '../../../components/InputField';

const SignUp = ({ navigation }: any) => {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  return (
    <LinearGradient
      colors={[COLORS.gradient1, COLORS.gradient2]}
      style={styles.gradient}
    >
      <View style={styles.logoContainer}>
        <Image source={IMAGES.logo} resizeMode="contain" style={styles.logo} />

        <Image
          source={IMAGES.headline}
          resizeMode="contain"
          style={styles.headlineImage}
        />
      </View>

      <View style={styles.whiteContainer}>
        <View style={styles.contentWrapper}>
          <Text style={styles.getStartedText}>Create Your Account</Text>

          <View style={styles.inputMarginTop}>
            <InputField
              placeholder="Email Address"
              value={email}
              onChangeText={setEmail}
              password={false}
            />
          </View>

          <View style={styles.inputField}>
            <InputField
              placeholder="Create Your Password"
              password={true}
              value={password}
              onChangeText={setPassword}
            />
          </View>

          <View style={styles.buttonWrapper}>
            <CustomButton
              title="Sign Up"
              onPress={() => {
                navigation.navigate('RoleSelection');
              }}
            />
          </View>

          <View style={styles.footerLinkContainer}>
            <Text style={styles.footerTextGray}>Already Have An Account?</Text>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('Login');
              }}
            >
              <Text style={styles.signInLink}>Sign in</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity>
            <Text style={styles.footerText}>Privacy & Terms</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text style={styles.footerText}>Contact Us</Text>
          </TouchableOpacity>
        </View>
      </View>
    </LinearGradient>
  );
};

export default SignUp;

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
    alignItems: 'center',
  },
  logoContainer: {
    width: '100%',
    alignItems: 'center',
    paddingTop: RFPercentage(6),
  },
  logo: {
    width: RFPercentage(10),
    height: RFPercentage(10),
  },
  headlineImage: {
    width: RFPercentage(50),
    height: RFPercentage(10),
    marginTop: RFPercentage(1),
  },
  whiteContainer: {
    width: '100%',
    backgroundColor: COLORS.white,
    borderTopRightRadius: RFPercentage(2.5),
    borderTopLeftRadius: RFPercentage(2.5),
    alignItems: 'center',
    marginTop: RFPercentage(4),
    paddingBottom: RFPercentage(5),
    height: '100%',
  },
  contentWrapper: {
    width: '90%',
    alignSelf: 'center',
    marginTop: RFPercentage(3.5),
  },
  getStartedText: {
    color: COLORS.primary,
    fontFamily: FONTS.headline,
    fontSize: RFPercentage(2.8),
  },
  inputMarginTop: {
    marginTop: RFPercentage(2),
  },
  inputField: {
    // Placeholder for layout consistency
  },
  buttonWrapper: {
    width: '100%',
    marginTop: RFPercentage(7),
  },
  footerLinkContainer: {
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: RFPercentage(5),
  },
  footerTextGray: {
    fontFamily: FONTS.regular2,
    color: COLORS.lightGrey,
  },
  signInLink: {
    fontFamily: FONTS.semiBold2,
    color: COLORS.primary,
    left: RFPercentage(0.4),
  },
  footerText: {
    fontFamily: FONTS.regular2,
    color: COLORS.lightGrey,
    textAlign: 'center',
    marginTop: RFPercentage(1.3),
  },
});
