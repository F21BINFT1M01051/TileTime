import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  Keyboard,
  TouchableWithoutFeedback,
} from 'react-native';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import { COLORS, FONTS, IMAGES } from '../../../config/theme';
import { RFPercentage } from 'react-native-responsive-fontsize';
import CustomButton from '../../../components/CustomButton';
import InputField from '../../../components/InputField';
import AuthHeader from '../../../components/AuthHeader';

const Login = ({ navigation }: any) => {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <ScrollView>
        <LinearGradient
          colors={[COLORS.gradient1, COLORS.gradient2]}
          style={styles.gradient}
        >
          <View style={styles.logoContainer}>
            <Image
              source={IMAGES.logo}
              resizeMode="contain"
              style={styles.logo}
            />
            <Image
              source={IMAGES.headline}
              resizeMode="contain"
              style={styles.headlineImage}
            />
          </View>

          <View style={styles.whiteContainer}>
            <View style={styles.contentWrapper}>
              <AuthHeader title="Log In" />

              <View style={styles.emailField}>
                <InputField
                  placeholder="Email Address"
                  value={email}
                  onChangeText={setEmail}
                  password={false}
                />
              </View>

              <View style={styles.passwordField}>
                <InputField
                  placeholder="Enter Password"
                  password={true}
                  value={password}
                  onChangeText={setPassword}
                />
              </View>

              <TouchableOpacity style={styles.forgotPasswordButton}>
                <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
              </TouchableOpacity>

              <View style={styles.buttonWrapper}>
                <CustomButton
                  title="Continue"
                  onPress={() => {
                    navigation.navigate('SignUp');
                  }}
                />
              </View>

              <View style={styles.signupContainer}>
                <Text style={styles.noAccountText}>Don’t Have An Account?</Text>
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate('SignUp');
                  }}
                >
                  <Text style={styles.signupText}>Sign Up</Text>
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
      </ScrollView>
    </TouchableWithoutFeedback>
  );
};

export default Login;

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

  emailField: {
    marginTop: RFPercentage(1.5),
  },
  passwordField: {},
  forgotPasswordButton: {
    alignSelf: 'flex-end',
  },
  forgotPasswordText: {
    fontFamily: FONTS.regular,
    marginTop: RFPercentage(0.6),
    color: COLORS.lightGrey,
    fontSize: RFPercentage(1.7),
  },
  buttonWrapper: {
    width: '100%',
    marginTop: RFPercentage(14),
  },
  signupContainer: {
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: RFPercentage(5),
  },
  noAccountText: {
    fontFamily: FONTS.regular2,
    color: COLORS.lightGrey,
    fontSize: RFPercentage(1.8),
  },
  signupText: {
    fontFamily: FONTS.semiBold2,
    color: COLORS.primary,
    left: RFPercentage(0.4),
    fontSize: RFPercentage(1.8),
  },
  footerText: {
    fontFamily: FONTS.regular2,
    color: COLORS.lightGrey,
    fontSize: RFPercentage(1.8),
    textAlign: 'center',
    marginTop: RFPercentage(1.3),
  },
});
