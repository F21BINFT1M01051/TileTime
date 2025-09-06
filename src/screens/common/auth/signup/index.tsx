import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Keyboard,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  ImageBackground,
} from 'react-native';
import React from 'react';
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
  const handleSignUp = async (values: any) => {
    if (!values.email || !values.password) {
      Toast.show({
        type: 'info',
        text1: 'Email/Password',
        text2: 'Email and Password is required',
      });
      return;
    } else {
      Keyboard.dismiss()
      navigation.navigate('RoleSelection');
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
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="always"
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
              title="Create Your Account"
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
                onSubmit={values => handleSignUp(values)}
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
                    <View style={styles.inputMarginTop}>
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
                              fontSize: RFPercentage(1.7),
                            }}
                          >
                            {errors?.email}
                          </Text>
                        </View>
                      )}
                    </View>

                    <View>
                      <InputField
                        placeholder="Create Your Password"
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
                              fontSize: RFPercentage(1.7),
                            }}
                          >
                            {errors?.password}
                          </Text>
                        </View>
                      )}
                    </View>

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
                  onPress={() => {
                    navigation.navigate('Login');
                  }}
                >
                  <Text style={styles.signInLink}>Log In</Text>
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

export default SignUp;

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

  inputMarginTop: {},

  buttonWrapper: {
    width: '100%',
    marginTop: RFPercentage(11),
  },
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
    marginTop: RFPercentage(1.3),
    fontSize: RFPercentage(1.9),
  },
});
