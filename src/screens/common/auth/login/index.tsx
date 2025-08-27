import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  Keyboard,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Platform,
  ImageBackground,
} from 'react-native';
import React, { useState } from 'react';
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

const Login = ({ navigation }: any) => {
  const handleSignIn = async (values: any) => {
    if (!values.email || !values.password) {
      Toast.show({
        type: 'info',
        text1: 'Email/Password',
        text2: 'Email and Password is required',
      });
      return;
    } else {
      navigation.navigate('SignUp');
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView
          style={{ backgroundColor: COLORS.white, flex: 1 }}
          contentContainerStyle={{ flexGrow: 1 }}
        >
          <ImageBackground
            source={IMAGES.auth}
            resizeMode="cover"
            style={{ width: '100%', height: RFPercentage(22) }}
          >
            <LinearGradient
              colors={[COLORS.authGradient1, COLORS.authGradient2]}
              style={styles.logoContainer}
            >
              <Image
                source={IMAGES.logo}
                resizeMode="contain"
                style={styles.logo}
              />
            </LinearGradient>
          </ImageBackground>

          <View style={styles.whiteContainer}>
            <AuthHeader
              title="Log In"
              wrapStyle={{
                height: RFPercentage(5),
                borderBottomWidth: 0,
                marginTop: RFPercentage(2.5),
              }}
            />

            <View style={styles.contentWrapper}>
              <Formik
                initialValues={{
                  email: '',
                  password: '',
                }}
                validationSchema={validationSchema}
                onSubmit={values => handleSignIn(values)}
              >
                {({
                  handleChange,
                  handleBlur,
                  handleSubmit,
                  values,
                  errors,
                  touched,
                  setFieldTouched,
                }) => (
                  <>
                    <View style={styles.emailField}>
                      <InputField
                        placeholder="Email Address"
                        onChangeText={handleChange('email')}
                        handleBlur={handleBlur('email')}
                        value={values.email}
                        password={false}
                        hasError={touched.email && errors.email ? true : false}
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
                        <View style={{ marginTop: RFPercentage(0.6) }}>
                          <Text
                            style={{
                              color: COLORS.red,
                              fontFamily: FONTS.regular,
                              fontSize: RFPercentage(1.6),
                            }}
                          >
                            {errors?.email}
                          </Text>
                        </View>
                      )}
                    </View>

                    <View style={styles.passwordField}>
                      <InputField
                        placeholder="Enter Password"
                        onChangeText={text => {
                          // setFieldTouched('password', true);
                          handleChange('password')(text);
                        }}
                        handleBlur={handleBlur('password')}
                        value={values.password}
                        password={true}
                        hasError={
                          touched.password && errors.password ? true : false
                        }
                        defaultColor={COLORS.placeholder}
                        focusedColor={COLORS.focused}
                        errorColor={COLORS.red}
                        style={{
                          borderColor:
                            touched.password && errors.password
                              ? COLORS.red
                              : COLORS.fieldBorder,
                        }}
                      />
                      {touched.password && errors.password && (
                        <View style={{ marginTop: RFPercentage(0.6) }}>
                          <Text
                            style={{
                              color: COLORS.red,
                              fontFamily: FONTS.regular,
                              fontSize: RFPercentage(1.6),
                            }}
                          >
                            {errors?.password}
                          </Text>
                        </View>
                      )}
                    </View>

                    <TouchableOpacity style={styles.forgotPasswordButton}>
                      <Text style={styles.forgotPasswordText}>
                        Forgot Password?
                      </Text>
                    </TouchableOpacity>

                    <View style={styles.buttonWrapper}>
                      <CustomButton
                        title="Continue"
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
        </ScrollView>
      </KeyboardAvoidingView>
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
    height: '100%',
  },
  logo: {
    width: RFPercentage(18),
    height: RFPercentage(18),
    marginTop: RFPercentage(2),
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
    borderWidth: 1,
    borderColor: COLORS.lightWhite,
    flex: 1,
    marginTop: RFPercentage(-1.5),
  },
  contentWrapper: {
    width: '90%',
    alignSelf: 'center',
  },

  emailField: {},
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
    marginTop: RFPercentage(5),
  },
  signupContainer: {
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: RFPercentage(5),
  },
  noAccountText: {
    fontFamily: FONTS.regular,
    color: COLORS.lightGrey,
    fontSize: RFPercentage(1.9),
  },
  signupText: {
    fontFamily: FONTS.semiBold,
    color: COLORS.primary,
    left: RFPercentage(0.4),
    fontSize: RFPercentage(1.9),
  },
  footerText: {
    fontFamily: FONTS.regular,
    color: COLORS.lightGrey,
    fontSize: RFPercentage(1.9),
    textAlign: 'center',
    marginTop: RFPercentage(1.3),
  },
});
