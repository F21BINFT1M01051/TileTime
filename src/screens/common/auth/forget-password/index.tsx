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
  Animated,
} from 'react-native';
import React, { useState, useEffect, useRef } from 'react';
import LinearGradient from 'react-native-linear-gradient';
import { COLORS, FONTS, ICONS, IMAGES } from '../../../../config/theme';
import { RFPercentage } from 'react-native-responsive-fontsize';
import CustomButton from '../../../../components/CustomButton';
import InputField from '../../../../components/InputField';
import AuthHeader from '../../../../components/AuthHeader';
import * as yup from 'yup';
import { Formik } from 'formik';
import Toast from 'react-native-toast-message';

const validationSchema = yup.object({
  email: yup.string().email('Email is invalid').required('Email is required'),
});

const ForgetPassword = ({ navigation }: any) => {
  const [sent, setSent] = useState(false);
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

    return () => {
      showListener.remove();
      hideListener.remove();
    };
  }, []);

  const handleNext = async (values: any) => {
    if (!values.email) {
      Toast.show({
        type: 'info',
        text1: 'Email',
        text2: 'Email is required',
      });
      return;
    } else {
      setSent(true);
    }
  };
  const back = () => {
    Keyboard.dismiss();
    navigation.goBack();
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <Animated.ScrollView
          style={{ backgroundColor: COLORS.white, flex: 1 }}
          contentContainerStyle={{
            flexGrow: 1,
            paddingBottom: keyboardHeight,
          }}
          keyboardShouldPersistTaps="always"
        >
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
                    marginTop: RFPercentage(2),
                  }}
                />
              </LinearGradient>
            </ImageBackground>
          </Animated.View>

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
            {sent ? (
              <View style={{ width: '90%', marginTop: RFPercentage(4), flex:1 }}>
                <Image
                  source={ICONS.mail}
                  resizeMode="contain"
                  style={{ width: RFPercentage(12), height: RFPercentage(12) }}
                />
                <Text
                  style={{
                    color: COLORS.primary,
                    fontFamily: FONTS.bold,
                    fontSize: RFPercentage(2.4),
                    marginTop: RFPercentage(2.2),
                  }}
                >
                  Check Your Email
                </Text>
                <Text
                  style={{
                    color: COLORS.lightGrey,
                    fontFamily: FONTS.regular,
                    fontSize: RFPercentage(1.8),
                    marginTop: RFPercentage(1.3),
                    lineHeight: RFPercentage(1.9),
                  }}
                >
                  {` Enter your email below, and we will send you a\n link to reset your password`}
                </Text>
                <View style={{ marginTop: RFPercentage(5.5) }}>
                  <CustomButton
                    title="Back To Login"
                    onPress={() => {
                      navigation.goBack();
                      Keyboard.dismiss;
                    }}
                  />
                </View>
              </View>
            ) : (
              <View style={{ width: '100%' }}>
                <AuthHeader
                  title="Reset Password"
                  onPress={back}
                  wrapStyle={{
                    height: RFPercentage(5),
                    borderBottomWidth: 0,
                    marginTop: RFPercentage(2.5),
                  }}
                />
                <View
                  style={{
                    width: '80%',
                    marginLeft: RFPercentage(2.7),
                    alignSelf: 'center',
                  }}
                >
                  <Text
                    style={{
                      fontFamily: FONTS.regular,
                      fontSize: RFPercentage(1.8),
                      color: COLORS.lightGrey,
                      lineHeight: RFPercentage(1.9),
                    }}
                  >
                    Enter your email below, and we will send you a link to reset
                    your password
                  </Text>
                </View>

                <View style={styles.contentWrapper}>
                  <Formik
                    initialValues={{ email: '' }}
                    validationSchema={validationSchema}
                    onSubmit={handleNext}
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
                        <View style={styles.emailField}>
                          <InputField
                            placeholder="Email Address"
                            onChangeText={handleChange('email')}
                            handleBlur={handleBlur('email')}
                            value={values.email}
                            password={false}
                            hasError={
                              touched.email && errors.email ? true : false
                            }
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
                                  fontSize: RFPercentage(1.7),
                                }}
                              >
                                {errors?.email}
                              </Text>
                            </View>
                          )}
                        </View>

                        <View style={styles.buttonWrapper}>
                          <CustomButton
                            title="Continue"
                            onPress={handleSubmit}
                            style={{
                              backgroundColor:
                                !values.email || !!errors.email
                                  ? COLORS.disabled
                                  : COLORS.primary,
                            }}
                          />
                        </View>
                      </>
                    )}
                  </Formik>
                </View>
              </View>
            )}
          </Animated.View>
        </Animated.ScrollView>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

export default ForgetPassword;

const styles = StyleSheet.create({
  logoContainer: {
    width: '100%',
    alignItems: 'center',
    height: '100%',
  },
  logo: {
    width: RFPercentage(18),
    height: RFPercentage(18),
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
    marginTop: RFPercentage(2),
  },
  emailField: {},
  buttonWrapper: {
    width: '100%',
    marginTop: RFPercentage(10),
  },
});
