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

const LoginSignUp = ({ navigation }: any) => {
  const [email, setEmail] = React.useState('');

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
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
            <View>
              <AuthHeader title="Log In/Sign up with Email" />
            </View>

            <View style={styles.emailField}>
              <InputField
                placeholder="Email Address"
                value={email}
                onChangeText={setEmail}
                password={false}
              />
            </View>

            <View style={styles.buttonWrapper}>
              <CustomButton
                title="Proceed"
                onPress={() => {
                  navigation.navigate('Login');
                }}
              />
            </View>

            <View style={styles.signupContainer}>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('OnBoarding');
                }}
              >
                <Text style={styles.signupText}>
                  Continue With Other Options
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </LinearGradient>
    </TouchableWithoutFeedback>
  );
};

export default LoginSignUp;

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
    flex: 1,
  },
  contentWrapper: {
    width: '90%',
    alignSelf: 'center',
    marginTop: RFPercentage(3.5),
  },

  emailField: {
    marginTop: RFPercentage(1.8),
  },

  buttonWrapper: {
    width: '100%',
    marginTop: RFPercentage(8),
  },
  signupContainer: {
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: RFPercentage(4),
  },

  signupText: {
    fontFamily: FONTS.semiBold,
    color: COLORS.black,
    fontSize: RFPercentage(1.9),
  },
});
