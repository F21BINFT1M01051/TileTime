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
  city: yup.string().required('City is required'),
  phoneNumber: yup
    .string()
    .transform(value => {
      if (!value) return value;
      let digits = value.replace(/\D/g, '');
      if (digits.startsWith('1')) digits = digits.slice(1);
      if (digits.startsWith('0')) digits = digits.slice(1);
      digits = digits.slice(-10);
      if (digits.length < 10) return value;
      const area = digits.slice(0, 3);
      const prefix = digits.slice(3, 6);
      const line = digits.slice(6, 10);
      return `+1-${area}-${prefix}-${line}`;
    })
    .required('Phone number is required')
    .matches(/^\+1-\d{3}-\d{3}-\d{4}$/, 'Enter a valid phone number'),
});

const data = [
  {
    id: 1,
    name: 'Connect With Facebook',
    navigationScreen: '',
    color: COLORS.black,
    icon: ICONS.facebook,
    connected: false,
  },
  {
    id: 2,
    name: 'Connect With Instagram',
    navigationScreen: '',
    icon: ICONS.insta,
    color: COLORS.black,
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
  const [checked, setChecked] = useState(false);
  const formikRef = useRef<any>(null);
  const [businessName, setBusinessName] = useState('');
  const [anotherCity, setAnotherCity] = useState(false);
  const [otherCity, setOtherCity] = useState('');
  const [state2, setState2] = useState(null);
  const [isDropdownVisible3, setIsDropdownVisible3] = useState(false);

  useImperativeHandle(ref, () => ({
    validateForm: () => {
      if (formikRef.current) {
        formikRef.current.setTouched({
          name: true,
          city: true,
          phoneNumber: true,
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
      includeBase64: false,
      maxWidth: 9999,
      maxHeight: 9999,
    };

    launchImageLibrary(options, response => {
      if (response.assets && response.assets.length > 0) {
        setImageUri(response?.assets[0].uri);
      }
    });
  };

  const formatPhoneNumber = (raw: string = ''): string => {
    let digits = raw.replace(/\D/g, '');
    if (digits.startsWith('1')) digits = digits.slice(1);
    if (digits.startsWith('0')) digits = digits.slice(1);
    digits = digits.slice(-10);
    if (digits.length < 10) return `+1-${digits}`;
    const area = digits.slice(0, 3);
    const prefix = digits.slice(3, 6);
    const line = digits.slice(6, 10);
    return `+1-${area}-${prefix}-${line}`;
  };

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
          <View style={styles.profileCircle}>
            <Image
              source={imageUri ? { uri: imageUri } : ICONS.gallery}
              resizeMode="cover"
              style={imageUri ? styles.profileImage : styles.defaultImg}
            />

            {imageUri ? (
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={pickImage}
                style={styles.editIconContainer}
              >
                <Image
                  source={ICONS.edit}
                  resizeMode="contain"
                  style={styles.editIcon}
                />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={pickImage}
                style={styles.addPicButton}
              >
                <Text style={styles.addPicText}>Add your Picture</Text>
              </TouchableOpacity>
            )}
          </View>
        </TouchableOpacity>

        <Formik
          innerRef={formikRef}
          initialValues={{
            name: '',
            city: '',
            phoneNumber: '',
          }}
          validationSchema={validationSchema}
          onSubmit={values => {}}
          validateOnBlur={true}
          validateOnChange={true}
          validateOnMount={true}
        >
          {({
            handleChange,
            handleBlur,
            values,
            errors,
            touched,
            setFieldValue,
            isValid,
          }) => {
            useEffect(() => {
              if (setFormValid) {
                setFormValid(isValid);
              }
            }, [isValid]);

            return (
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
                      <Text style={styles.error}>{errors?.name}</Text>
                    </View>
                  )}
                </View>

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
                      style={{
                        width: RFPercentage(3),
                        height: RFPercentage(3),
                      }}
                    />
                  </TouchableOpacity>
                  <Text style={styles.business}>Doing business as</Text>
                </TouchableOpacity>
                {checked && (
                  <>
                    <InputField
                      placeholder="Enter Business Name"
                      value={businessName}
                      onChangeText={setBusinessName}
                      password={false}
                      defaultColor={COLORS.placeholder}
                      focusedColor={COLORS.focused}
                      errorColor={COLORS.red}
                    />
                  </>
                )}

                <View style={styles.bioWrapper}>
                  <View style={styles.bioContainer}>
                    <View style={{ width: '92%', alignSelf: 'center' }}>
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
                        cursorColor={COLORS.primary}
                        selectionColor={COLORS.primary}
                      />
                      <View style={styles.end}>
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
                <Text style={styles.bottom}>
                  {MAX_LENGTH - bio.length} characters left
                </Text>

                <View style={{ marginTop: RFPercentage(2) }}>
                  <Text style={styles.conduct}>Cities you serve</Text>
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
                        <Text style={styles.error}>{errors?.city}</Text>
                      </View>
                    )}
                    {!anotherCity && (
                      <>
                        <TouchableOpacity
                          activeOpacity={0.8}
                          onPress={() => setAnotherCity(true)}
                          style={styles.add}
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
                          <Text style={styles.another}>Add Another City</Text>
                        </TouchableOpacity>
                      </>
                    )}
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
                {anotherCity && (
                  <>
                    <View style={styles.dropdowns}>
                      <View style={{ width: '48%' }}>
                        <InputField
                          placeholder="Another City"
                          value={otherCity}
                          onChangeText={setOtherCity}
                          style={{
                            paddingHorizontal: RFPercentage(0.7),
                          }}
                          password={false}
                        />
                        {touched.city && errors.city && (
                          <View style={{ marginTop: RFPercentage(0.6) }}>
                            <Text style={styles.error}>{errors?.city}</Text>
                          </View>
                        )}
                      </View>

                      <View style={{ width: '48%' }}>
                        <DropdownField
                          placeholder="State"
                          data={['Beijing', 'Shanghai', 'Guangdong', 'Sichuan']}
                          selectedValue={state2}
                          onValueChange={(val: any) => setState2(val)}
                          isDropdownVisible={isDropdownVisible3}
                          setIsDropdownVisible={setIsDropdownVisible3}
                          style={{ paddingHorizontal: RFPercentage(1) }}
                        />
                      </View>
                    </View>
                  </>
                )}

                <View
                  style={{ marginTop: anotherCity ? 0 : RFPercentage(1.5) }}
                >
                  <View>
                    <InputField
                      placeholder="Phone Number (Required)"
                      value={values.phoneNumber}
                      onChangeText={text => {
                        const formatted = formatPhoneNumber(text);
                        handleChange('phoneNumber')(formatted);
                        const digits = formatted.replace(/\D/g, '');
                        if (digits.length === 11) {
                          setTimeout(() => Keyboard.dismiss(), 50);
                        }
                      }}
                      handleBlur={handleBlur('phoneNumber')}
                      length={15}
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
                    {/* {touched.phoneNumber && errors.phoneNumber && (
                      <View style={{ marginTop: RFPercentage(0.6) }}>
                        <Text style={styles.error}>{errors?.phoneNumber}</Text>
                      </View>
                    )} */}
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
            );
          }}
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

        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => setIsOn(!isOn)}
          style={styles.toggleRow}
        >
          <Text style={styles.toggleLabel}>Keep My Profile Private</Text>
          <ToggleSwitch
            isOn={isOn}
            onColor={COLORS.pink}
            offColor={COLORS.switch}
            size="small"
            onToggle={() => setIsOn(!isOn)}
          />
        </TouchableOpacity>
      </View>
    </TouchableWithoutFeedback>
  );
});

export default About;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '90%',
    alignSelf: 'center',
    marginTop: RFPercentage(3),
  },
  title: {
    fontFamily: FONTS.headline,
    color: COLORS.primary,
    fontSize: RFPercentage(2.3),
  },
  profileContainer: {
    marginTop: RFPercentage(3),
    width: RFPercentage(16),
  },
  profileCircle: {
    width: RFPercentage(15),
    height: RFPercentage(15),
    borderRadius: RFPercentage(100),
    backgroundColor: COLORS.lightWhite3,
    alignItems: 'center',
    justifyContent: 'center',
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
  editIconContainer: {
    position: 'absolute',
    bottom: RFPercentage(-1.5),
  },
  editIcon: {
    width: RFPercentage(3.8),
    height: RFPercentage(3.8),
  },
  conduct: {
    color: COLORS.primary,
    fontFamily: FONTS.bold,
    fontSize: RFPercentage(2),
  },
  addPicButton: {
    position: 'absolute',
    bottom: RFPercentage(-1),
    width: RFPercentage(16),
    height: RFPercentage(4),
    borderRadius: RFPercentage(100),
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addPicText: {
    color: COLORS.white,
    fontFamily: FONTS.medium,
    fontSize: RFPercentage(1.6),
    lineHeight: RFPercentage(1.6),
  },
  bioWrapper: {
    marginTop: RFPercentage(3),
  },
  bottom: {
    alignSelf: 'flex-end',
    marginTop: RFPercentage(0.5),
    color: COLORS.grey4,
    fontSize: RFPercentage(1.5),
    fontFamily: FONTS.regular2,
  },
  checkWrap: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: RFPercentage(3),
  },
  business: {
    color: COLORS.inputColor,
    fontSize: RFPercentage(2),
    fontFamily: FONTS.regular,
    marginLeft: RFPercentage(1),
  },
  bioContainer: {
    backgroundColor: COLORS.white,
    borderWidth: RFPercentage(0.1),
    borderColor: COLORS.fieldBorder,
    borderRadius: RFPercentage(1.5),
    paddingVertical: RFPercentage(0.5),
  },
  add: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: RFPercentage(1.3),
  },
  another: {
    color: COLORS.primary,
    fontFamily: FONTS.bold,
    marginLeft: RFPercentage(0.8),
    fontSize: RFPercentage(1.8),
  },
  bioHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    alignSelf: 'center',
    marginTop: RFPercentage(1),
  },
  error: {
    color: COLORS.red,
    fontFamily: FONTS.regular,
    fontSize: RFPercentage(1.8),
  },
  end: {
    alignSelf: 'flex-end',
    right: RFPercentage(-1),
    bottom: RFPercentage(2),
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
    fontSize: RFPercentage(1.9),
    height: RFPercentage(10),
    paddingHorizontal: 0,
    paddingVertical: 0,
    marginTop: RFPercentage(1.5),
  },
  dropdowns: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: RFPercentage(-0.5),
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
  inputContainer: {
    marginTop: RFPercentage(0),
  },
});
