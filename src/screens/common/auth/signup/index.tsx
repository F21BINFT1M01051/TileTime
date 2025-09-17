import React, { useState, useEffect, useRef } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Keyboard,
  TouchableWithoutFeedback,
  Platform,
  ImageBackground,
  Linking,
  Dimensions,
  Animated,
  ScrollView,
  KeyboardAvoidingView,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { COLORS, FONTS, IMAGES } from '../../../../config/theme';
import { RFPercentage } from 'react-native-responsive-fontsize';
import CustomButton from '../../../../components/CustomButton';
import InputField from '../../../../components/InputField';
import AuthHeader from '../../../../components/AuthHeader';
import * as yup from 'yup';
import { Formik } from 'formik';
import Toast from 'react-native-toast-message';

let validationSchema = yup.object({
  email: yup.string().email('Invalid email').required('Email is required'),
  password: yup
    .string()
    .required('Password is required')
    .min(8, 'Password must be at least 8 characters long')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&._-])[A-Za-z\d@$!%*?&._-]{8,}$/,
      'Password must include uppercase, lowercase, number, and special character',
    ),
});

const SignUp = ({ navigation }: any) => {
  const [screenHeight, setScreenHeight] = useState(
    Dimensions.get('window').height,
  );
  const keyboardHeight = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const showListener = Keyboard.addListener(
      Platform.OS === 'ios' ? 'keyboardWillShow' : 'keyboardDidShow',
      e => {
        Animated.timing(keyboardHeight, {
          toValue: e.endCoordinates.height,
          duration: 300,
          useNativeDriver: false,
        }).start();
      },
    );

    const hideListener = Keyboard.addListener(
      Platform.OS === 'ios' ? 'keyboardWillHide' : 'keyboardDidHide',
      () => {
        Animated.timing(keyboardHeight, {
          toValue: 0,
          duration: 300,
          useNativeDriver: false,
        }).start();
      },
    );

    const dimensionChangeListener = Dimensions.addEventListener(
      'change',
      ({ window }) => setScreenHeight(window.height),
    );

    return () => {
      showListener.remove();
      hideListener.remove();
      dimensionChangeListener?.remove();
    };
  }, []);

  const handleSignUp = async (values: any) => {
    if (!values.email || !values.password) {
      Toast.show({
        type: 'info',
        text1: 'Email/Password',
        text2: 'Email and Password is required',
      });
      return;
    } else {
      Keyboard.dismiss();
      navigation.navigate('RoleSelection');
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <Animated.ScrollView
          style={{ flex: 1, backgroundColor: COLORS.white }}
          contentContainerStyle={{
            flexGrow: 1,
            minHeight: screenHeight,
            paddingBottom: keyboardHeight,
          }}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
          bounces={false}
        >
          {/* Logo Section */}
          <Animated.View
            style={{
              width: '100%',
              height: keyboardHeight.interpolate({
                inputRange: [0, 300],
                outputRange: [RFPercentage(22), RFPercentage(15)],
                extrapolate: 'clamp',
              }),
            }}
          >
            <ImageBackground
              source={IMAGES.auth}
              resizeMode="cover"
              style={{ width: '100%', height: '100%' }}
            >
              <LinearGradient
                colors={[COLORS.authGradient1, COLORS.authGradient2]}
                style={styles.logoContainer}
              >
                <Animated.Image
                  source={IMAGES.logo}
                  resizeMode="contain"
                  style={{
                    width: keyboardHeight.interpolate({
                      inputRange: [0, 300],
                      outputRange: [RFPercentage(18), RFPercentage(14)],
                      extrapolate: 'clamp',
                    }),
                    height: keyboardHeight.interpolate({
                      inputRange: [0, 300],
                      outputRange: [RFPercentage(18), RFPercentage(14)],
                      extrapolate: 'clamp',
                    }),
                  }}
                />
              </LinearGradient>
            </ImageBackground>
          </Animated.View>

          {/* Form Container */}
          <Animated.View
            style={[
              styles.whiteContainer,
              {
                marginTop: keyboardHeight.interpolate({
                  inputRange: [0, 300],
                  outputRange: [RFPercentage(-1.5), RFPercentage(-3)],
                  extrapolate: 'clamp',
                }),
              },
            ]}
          >
            <AuthHeader
              title="Create Your Account"
              wrapStyle={{
                height: RFPercentage(5),
                borderBottomWidth: 0,
                marginTop: RFPercentage(2.5),
              }}
            />

            <View style={styles.contentWrapper}>
              <Formik
                initialValues={{ email: '', password: '' }}
                validationSchema={validationSchema}
                onSubmit={handleSignUp}
              >
                {({
                  handleChange,
                  handleBlur,
                  handleSubmit,
                  values,
                  errors,
                  touched,
                }) => (
                  <>
                    <View style={styles.inputMarginTop}>
                      <InputField
                        placeholder="Email Address"
                        onChangeText={handleChange('email')}
                        handleBlur={handleBlur('email')}
                        value={values.email}
                        password={false}
                        hasError={touched.email && !!errors.email}
                        defaultColor={COLORS.placeholder}
                        focusedColor={COLORS.focused}
                        errorColor={COLORS.red}
                        style={{
                          borderColor:
                            touched.email && errors.email
                              ? COLORS.red
                              : COLORS.fieldBorder,
                        }}
                      />
                      {touched.email && errors.email && (
                        <Text style={styles.errorText}>{errors.email}</Text>
                      )}
                    </View>

                    <InputField
                      placeholder="Create Your Password"
                      onChangeText={handleChange('password')}
                      handleBlur={handleBlur('password')}
                      value={values.password}
                      password={true}
                      hasError={touched.password && !!errors.password}
                      defaultColor={COLORS.placeholder}
                      focusedColor={COLORS.focused}
                      errorColor={COLORS.red}
                      style={{
                        borderColor:
                          touched.password && errors.password
                            ? COLORS.red
                            : COLORS.fieldBorder,
                        marginTop: RFPercentage(2.2),
                      }}
                    />
                    {touched.password && errors.password && (
                      <Text style={styles.errorText}>{errors.password}</Text>
                    )}

                    <View style={styles.buttonWrapper}>
                      <CustomButton
                        title="Sign Up"
                        onPress={handleSubmit}
                        style={{
                          backgroundColor:
                            !values.email ||
                            !!errors.email ||
                            !values.password ||
                            !!errors.password
                              ? COLORS.disabled
                              : COLORS.primary,
                        }}
                      />
                    </View>
                  </>
                )}
              </Formik>

              <View style={styles.footerLinkContainer}>
                <Text style={styles.footerTextGray}>Have An Account?</Text>
                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={() => navigation.navigate('Login')}
                >
                  <Text style={styles.signInLink}>Log In</Text>
                </TouchableOpacity>
              </View>

              <TouchableOpacity
                style={{ width: RFPercentage(16), alignSelf: 'center' }}
                activeOpacity={0.8}
                onPress={() => navigation.navigate('PrivacyPolicy')}
              >
                <Text style={styles.footerText}>Privacy & Terms</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{ width: RFPercentage(16), alignSelf: 'center' }}
                activeOpacity={0.8}
                onPress={async () => {
                  const email = 'alston@tiletime.com';
                  const subject = 'Support';
                  const body = 'Hello..,';
                  const url = `mailto:${email}?subject=${encodeURIComponent(
                    subject,
                  )}&body=${encodeURIComponent(body)}`;
                  await Linking.openURL(url);
                }}
              >
                <Text style={styles.footerText}>Contact Us</Text>
              </TouchableOpacity>
            </View>
          </Animated.View>
        </Animated.ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default SignUp;

const styles = StyleSheet.create({
  logoContainer: {
    width: '100%',
    alignItems: 'center',
    height: '100%',
    justifyContent: 'center',
  },
  logo: { width: RFPercentage(18), height: RFPercentage(18) },
  whiteContainer: {
    width: '100%',
    backgroundColor: COLORS.white,
    borderTopRightRadius: RFPercentage(2.5),
    borderTopLeftRadius: RFPercentage(2.5),
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.lightWhite,
    flex: 1,
    marginTop: RFPercentage(-1.5),
    paddingBottom: RFPercentage(2),
  },
  contentWrapper: { width: '90%', alignSelf: 'center' },
  inputMarginTop: {},
  buttonWrapper: { width: '100%', marginTop: RFPercentage(8) },
  footerLinkContainer: {
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: RFPercentage(3),
  },
  footerTextGray: {
    fontFamily: FONTS.regular,
    color: COLORS.lightGrey,
    fontSize: RFPercentage(1.9),
  },
  signInLink: {
    fontFamily: FONTS.semiBold,
    color: COLORS.primary,
    left: RFPercentage(0.4),
    fontSize: RFPercentage(1.9),
  },
  footerText: {
    fontFamily: FONTS.regular,
    color: COLORS.lightGrey,
    textAlign: 'center',
    marginTop: RFPercentage(1.6),
    fontSize: RFPercentage(1.9),
  },
  errorText: {
    color: COLORS.red,
    fontFamily: FONTS.regular,
    fontSize: RFPercentage(1.7),
    marginBottom: RFPercentage(1),
  },
});
