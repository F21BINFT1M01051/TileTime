import {
  Image,
  Keyboard,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
  FlatList,
} from 'react-native';
import React, {
  useState,
  useRef,
  forwardRef,
  useImperativeHandle,
  useEffect,
} from 'react';
import { COLORS, FONTS, ICONS, IMAGES } from '../../../../config/theme';
import { RFPercentage } from 'react-native-responsive-fontsize';
import DropdownField from '../../../../components/DropDown';
import { launchImageLibrary } from 'react-native-image-picker';
import InputField from '../../../../components/InputField';
import ToggleSwitch from 'toggle-switch-react-native';
import SocialField from '../../../../components/SocialField';
import * as yup from 'yup';
import { Formik } from 'formik';

export interface AboutFormRef {
  validateForm: () => Promise<any>;
  submitForm: () => void;
}

interface AboutProps {
  setFormValid?: (valid: boolean) => void;
}

const validationSchema = yup.object().shape({
  name: yup.string().required('Full Name is required'),
  checked: yup.boolean(),
  businessName: yup.string().when('checked', (checked: boolean, schema) => {
    return checked
      ? schema.required('Business Name is required')
      : schema.notRequired();
  }),
  city: yup.string().required('City is required'),
  phoneNumber: yup
    .string()
    .required('Phone number is required')
    .matches(/^[0-9]{10,15}$/, 'Enter a valid phone number'),
});

const data = [
  {
    id: 1,
    name: 'Connect With Facebook',
    navigationScreen: '',
    color: COLORS.skyBlue,
    icon: ICONS.facebook,
    connected: false,
  },
  {
    id: 2,
    name: 'Connect With Instagram',
    navigationScreen: '',
    icon: ICONS.insta,
    color: COLORS.pink2,
    connected: false,
  },
  {
    id: 3,
    name: 'Connect With TikTok',
    navigationScreen: '',
    icon: ICONS.tiktok,
    color: COLORS.black,
    connected: false,
  },
];

const MAX_LENGTH = 200;
const About = forwardRef<AboutFormRef, AboutProps>(({ setFormValid }, ref) => {
  const [state, setState] = useState(null);
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const [isDropdownVisible2, setIsDropdownVisible2] = useState(false);
  const [imageUri, setImageUri] = useState(null);
  const [bio, setBio] = useState('');
  const [isOn, setIsOn] = useState(false);
  const [website, setWebsite] = React.useState('');
  const formikRef = useRef<any>(null);

  useImperativeHandle(ref, () => ({
    validateForm: () => {
      if (formikRef.current) {
        formikRef.current.setTouched({
          name: true,
          // businessName: true,
          city: true,
          phoneNumber: true,
          // checked: formikRef.current.values.checked,
        });
        return formikRef.current.validateForm();
      }
      return Promise.resolve();
    },
    submitForm: () => {
      if (formikRef.current) {
        formikRef.current.handleSubmit();
      }
    },
  }));


  const pickImage = () => {
    const options = {
      mediaType: 'photo',
      quality: 1,
    };

    launchImageLibrary(options, response => {
      if (response.assets && response.assets.length > 0) {
        setImageUri(response?.assets[0].uri);
      }
    });
  };

  useEffect(() => {
    if (formikRef.current && setFormValid) {
      const { errors, touched, values } = formikRef.current;
      const isNameValid = !errors.name && touched.name;
      const isCityValid = !errors.city && touched.city;
      const isPhoneValid = !errors.phoneNumber && touched.phoneNumber;
      // const isBusinessValid =
      //   !values.checked || (touched.businessName && !errors.businessName);
      const isValid =
        isNameValid && isCityValid && isPhoneValid 
        // && isBusinessValid;
      setFormValid(isValid);
    }
  }, [
    formikRef.current?.errors,
    formikRef.current?.touched,
    formikRef.current?.values,
  ]);

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss();
        if (isDropdownVisible || isDropdownVisible2) {
          setIsDropdownVisible(false);
          setIsDropdownVisible2(false);
        }
      }}
    >
      <View style={styles.container}>
        <Text style={styles.title}>Enter Your Personal Details</Text>

        <TouchableOpacity
          activeOpacity={0.8}
          onPress={pickImage}
          style={styles.profileContainer}
        >
          <View
            style={{
              width: RFPercentage(15),
              height: RFPercentage(15),
              borderRadius: RFPercentage(100),
              backgroundColor: '#ECECEC',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Image
              source={imageUri ? { uri: imageUri } : ICONS.gallery}
              resizeMode="cover"
              style={imageUri ? styles.profileImage : styles.defaultImg}
            />

            {imageUri ? (
              <>
                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={pickImage}
                  style={{ position: 'absolute', bottom: RFPercentage(-1.5) }}
                >
                  <Image
                    source={ICONS.edit}
                    resizeMode="contain"
                    style={styles.editIcon}
                  />
                </TouchableOpacity>
              </>
            ) : (
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={pickImage}
                style={{
                  position: 'absolute',
                  bottom: RFPercentage(-1),
                  width: RFPercentage(16),
                  height: RFPercentage(4),
                  borderRadius: RFPercentage(100),
                  backgroundColor: COLORS.primary,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Text
                  style={{
                    color: COLORS.white,
                    fontFamily: FONTS.medium,
                    fontSize: RFPercentage(1.4),
                  }}
                >
                  Add your Picture
                </Text>
              </TouchableOpacity>
            )}
          </View>
        </TouchableOpacity>

        <Formik
          innerRef={formikRef}
          initialValues={{
            name: '',
            businessName: '',
            city: '',
            phoneNumber: '',
            checked: false,
          }}
          validationSchema={validationSchema}
          onSubmit={values => {
            console.log('Form submitted:', values);
          }}
          validateOnBlur={true}
          validateOnChange={true}
        >
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            values,
            errors,
            touched,
            setFieldTouched,
            setFieldValue,
          }) => (
            <>
              <View style={{ marginTop: RFPercentage(2.5) }}>
                <InputField
                  placeholder="Full Name"
                  onChangeText={handleChange('name')}
                  handleBlur={handleBlur('name')}
                  value={values.name}
                  password={false}
                  hasError={touched.name && errors.name ? true : false}
                  defaultColor={COLORS.placeholder}
                  focusedColor={COLORS.focused}
                  errorColor={COLORS.red}
                  style={{
                    borderColor:
                      touched.name && errors.name
                        ? COLORS.red
                        : COLORS.fieldBorder,
                  }}
                />
                {touched.name && errors.name && (
                  <View style={{ marginTop: RFPercentage(0.6) }}>
                    <Text
                      style={{
                        color: COLORS.red,
                        fontFamily: FONTS.regular,
                        fontSize: RFPercentage(1.7),
                      }}
                    >
                      {errors?.name}
                    </Text>
                  </View>
                )}
              </View>

              <TouchableOpacity
                style={{
                  width: '100%',
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginTop: RFPercentage(3),
                }}
                activeOpacity={0.8}
                onPress={() => setFieldValue('checked', !values.checked)}
              >
                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={() => setFieldValue('checked', !values.checked)}
                >
                  <Image
                    source={values.checked ? ICONS.checked : ICONS.uncheck}
                    resizeMode="contain"
                    style={{ width: RFPercentage(3), height: RFPercentage(3) }}
                  />
                </TouchableOpacity>
                <Text
                  style={{
                    color: COLORS.inputColor,
                    fontSize: RFPercentage(1.9),
                    fontFamily: FONTS.regular,
                    marginLeft: RFPercentage(1),
                  }}
                >
                  I conduct business under a different name
                </Text>
              </TouchableOpacity>
              {values.checked && (
                <>
                  <InputField
                    placeholder="Enter Business Name"
                    value={values.businessName}
                    onChangeText={handleChange('businessName')}
                    handleBlur={handleBlur('businessName')}
                    password={false}
                    hasError={
                      touched.businessName && errors.businessName ? true : false
                    }
                    defaultColor={COLORS.placeholder}
                    focusedColor={COLORS.focused}
                    errorColor={COLORS.red}
                    style={{
                      borderColor:
                        touched.businessName && errors.businessName
                          ? COLORS.red
                          : COLORS.fieldBorder,
                    }}
                  />
                  {touched.businessName && errors.businessName && (
                    <View style={{ marginTop: RFPercentage(0.6) }}>
                      <Text
                        style={{
                          color: COLORS.red,
                          fontFamily: FONTS.regular,
                          fontSize: RFPercentage(1.7),
                        }}
                      >
                        {errors?.businessName}
                      </Text>
                    </View>
                  )}
                </>
              )}

              <View style={styles.bioWrapper}>
                <View style={styles.bioContainer}>
                  <View style={{ width: '90%', alignSelf: 'center' }}>
                    <View style={styles.bioHeader}>
                      <Text style={styles.bioLabel}>Add Bio</Text>
                      <Image
                        source={ICONS.user2}
                        resizeMode="contain"
                        style={{
                          width: RFPercentage(2),
                          height: RFPercentage(2),
                        }}
                      />
                    </View>
                    <TextInput
                      placeholder="Tell us about yourself..."
                      placeholderTextColor={COLORS.placeholder}
                      style={styles.bioInput}
                      multiline={true}
                      maxLength={MAX_LENGTH}
                      value={bio}
                      onChangeText={setBio}
                    />
                    <View
                      style={{
                        alignSelf: 'flex-end',
                        right: RFPercentage(-1),
                        bottom: RFPercentage(2),
                      }}
                    >
                      <Image
                        source={ICONS.bars}
                        resizeMode="contain"
                        style={{
                          width: RFPercentage(1.5),
                          height: RFPercentage(1.5),
                        }}
                      />
                    </View>
                  </View>
                </View>
              </View>
              <Text
                style={{
                  alignSelf: 'flex-end',
                  marginTop: RFPercentage(0.5),
                  color: COLORS.grey4,
                  fontSize: RFPercentage(1.5),
                  fontFamily: FONTS.regular2,
                }}
              >
                {MAX_LENGTH - bio.length} characters left
              </Text>
              <View style={{ marginTop: RFPercentage(3) }}>
                <Text
                  style={{
                    color: COLORS.primary,
                    fontFamily: FONTS.bold,
                    fontSize: RFPercentage(1.9),
                  }}
                >
                  Where do you conduct business
                </Text>
              </View>
              <View style={styles.dropdowns}>
                <View style={{ width: '48%' }}>
                  <InputField
                    placeholder="City"
                    value={values.city}
                    onChangeText={handleChange('city')}
                    handleBlur={handleBlur('city')}
                    hasError={touched.city && errors.city ? true : false}
                    defaultColor={COLORS.placeholder}
                    focusedColor={COLORS.focused}
                    errorColor={COLORS.red}
                    style={{
                      borderColor:
                        touched.city && errors.city
                          ? COLORS.red
                          : COLORS.fieldBorder,
                      paddingHorizontal: RFPercentage(0.7),
                    }}
                    password={false}
                  />
                  {touched.city && errors.city && (
                    <View style={{ marginTop: RFPercentage(0.6) }}>
                      <Text
                        style={{
                          color: COLORS.red,
                          fontFamily: FONTS.regular,
                          fontSize: RFPercentage(1.7),
                        }}
                      >
                        {errors?.city}
                      </Text>
                    </View>
                  )}
                  <TouchableOpacity
                    activeOpacity={0.8}
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      marginTop: RFPercentage(1.3),
                    }}
                  >
                    <Image
                      source={ICONS.plus5}
                      tintColor={COLORS.primary}
                      resizeMode="contain"
                      style={{
                        width: RFPercentage(2),
                        height: RFPercentage(2),
                      }}
                    />
                    <Text
                      style={{
                        color: COLORS.primary,
                        fontFamily: FONTS.bold,
                        marginLeft: RFPercentage(0.8),
                        fontSize: RFPercentage(1.8),
                      }}
                    >
                      Add Another Location
                    </Text>
                  </TouchableOpacity>
                </View>

                <View style={{ width: '48%' }}>
                  <DropdownField
                    placeholder="State"
                    data={['Beijing', 'Shanghai', 'Guangdong', 'Sichuan']}
                    selectedValue={state}
                    onValueChange={(val: any) => setState(val)}
                    isDropdownVisible={isDropdownVisible2}
                    setIsDropdownVisible={setIsDropdownVisible2}
                    style={{ paddingHorizontal: RFPercentage(1) }}
                  />
                </View>
              </View>

              <View style={{ marginTop: RFPercentage(4) }}>
                <Text
                  style={{
                    color: COLORS.primary,
                    fontFamily: FONTS.bold,
                    fontSize: RFPercentage(1.9),
                  }}
                >
                  Where can people find you
                </Text>
                <View>
                  <InputField
                    placeholder="Phone Number (Required)"
                    value={values.phoneNumber}
                    onChangeText={handleChange('phoneNumber')}
                    handleBlur={handleBlur('phoneNumber')}
                    hasError={
                      touched.phoneNumber && errors.phoneNumber ? true : false
                    }
                    defaultColor={COLORS.placeholder}
                    focusedColor={COLORS.focused}
                    errorColor={COLORS.red}
                    style={{
                      borderColor:
                        touched.phoneNumber && errors.phoneNumber
                          ? COLORS.red
                          : COLORS.fieldBorder,
                    }}
                    password={false}
                    type="phone-pad"
                    icon={
                      <Image
                        source={ICONS.phone}
                        resizeMode="contain"
                        style={{
                          width: RFPercentage(2.2),
                          height: RFPercentage(2.2),
                        }}
                      />
                    }
                  />

                  {touched.phoneNumber && errors.phoneNumber && (
                    <View style={{ marginTop: RFPercentage(0.6) }}>
                      <Text
                        style={{
                          color: COLORS.red,
                          fontFamily: FONTS.regular,
                          fontSize: RFPercentage(1.7),
                        }}
                      >
                        {errors?.phoneNumber}
                      </Text>
                    </View>
                  )}
                </View>

                <View>
                  <InputField
                    placeholder="Your Website URL"
                    value={website}
                    onChangeText={setWebsite}
                    password={false}
                    icon={
                      <Image
                        source={ICONS.globe}
                        resizeMode="contain"
                        style={{
                          width: RFPercentage(2.3),
                          height: RFPercentage(2.3),
                        }}
                      />
                    }
                  />
                </View>
              </View>
            </>
          )}
        </Formik>
        <View style={styles.inputContainer}>
          <FlatList
            data={data}
            scrollEnabled={false}
            keyExtractor={item => item.id.toString()}
            renderItem={({ item }) => (
              <SocialField
                icon={item.icon}
                name={item.name}
                navigation={item.navigationScreen}
                color={item.color}
                connected={item.connected}
              />
            )}
          />
        </View>

        <View style={styles.toggleRow}>
          <Text style={styles.toggleLabel}>Keep My Profile Private</Text>
          <ToggleSwitch
            isOn={isOn}
            onColor={COLORS.pink}
            offColor={COLORS.switch}
            size="small"
            onToggle={() => setIsOn(!isOn)}
          />
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
});

export default About;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontFamily: FONTS.headline,
    color: COLORS.primary,
    fontSize: RFPercentage(2.3),
  },
  profileContainer: {
    marginTop: RFPercentage(3),
    width: RFPercentage(16),
    alignItems: 'center',
  },
  profileImage: {
    width: RFPercentage(14.8),
    height: RFPercentage(14.8),
    borderRadius: RFPercentage(100),
  },
  defaultImg: {
    width: RFPercentage(5),
    height: RFPercentage(5),
  },
  dropdowns: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: RFPercentage(-0.5),
  },
  editIcon: {
    width: RFPercentage(3.8),
    height: RFPercentage(3.8),
    // bottom: RFPercentage(2),
  },
  bioWrapper: {
    marginTop: RFPercentage(3),
  },
  bioContainer: {
    backgroundColor: COLORS.fieldColor,
    borderWidth: RFPercentage(0.1),
    borderColor: COLORS.fieldBorder,
    borderRadius: RFPercentage(1.5),
    paddingVertical: RFPercentage(0.5),
  },
  bioHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    alignSelf: 'center',
    marginTop: RFPercentage(1),
  },
  bioLabel: {
    fontFamily: FONTS.medium2,
    color: COLORS.primary,
    fontSize: RFPercentage(1.7),
  },
  bioInput: {
    width: '100%',
    alignSelf: 'center',
    textAlignVertical: 'top',
    fontFamily: FONTS.regular,
    color: COLORS.inputColor,
    lineHeight: RFPercentage(2.5),
    fontSize: RFPercentage(1.8),
    height: RFPercentage(10),
    paddingHorizontal: 0,
    paddingVertical: 0,
    marginTop: RFPercentage(1.5),
  },
  toggleRow: {
    width: '100%',
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: RFPercentage(2),
  },
  toggleLabel: {
    textAlign: 'center',
    fontFamily: FONTS.medium,
    color: COLORS.inputColor,
    fontSize: RFPercentage(1.9),
  },
  inputContainer: {},
  bottomWrapper: {
    width: '100%',
    paddingVertical: RFPercentage(3),
    borderTopWidth: 1,
    borderTopColor: COLORS.lightWhite,
    backgroundColor: COLORS.white,
  },
  buttonContainer: {
    width: '90%',
    alignSelf: 'center',
  },
  skipText: {
    textAlign: 'center',
    fontFamily: FONTS.semiBold,
    color: COLORS.black,
    fontSize: RFPercentage(1.9),
  },
  skip: {
    alignSelf: 'center',
    paddingVertical: RFPercentage(1.5),
    backgroundColor: COLORS.white,
  },
});
