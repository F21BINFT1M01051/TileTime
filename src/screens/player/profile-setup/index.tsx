import React, { useState, useRef } from 'react';
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
  Dimensions,
} from 'react-native';
import { COLORS, FONTS, ICONS } from '../../../config/theme';
import { RFPercentage } from 'react-native-responsive-fontsize';
import DropdownField from '../../../components/DropDown';
import { launchImageLibrary } from 'react-native-image-picker';
import InputField from '../../../components/InputField';
import ToggleSwitch from 'toggle-switch-react-native';
import SocialField from '../../../components/SocialField';
import * as yup from 'yup';
import { Formik } from 'formik';
import CustomButton from '../../../components/CustomButton';
import AuthHeader from '../../../components/AuthHeader';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

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
    color: COLORS.black,
    icon: ICONS.facebook,
    connected: false,
  },
  {
    id: 2,
    name: 'Connect With Instagram',
    color: COLORS.black,
    icon: ICONS.insta,
    connected: false,
  },
  {
    id: 3,
    name: 'Connect With TikTok',
    color: COLORS.black,
    icon: ICONS.tiktok,
    connected: false,
  },
];

const MAX_LENGTH = 500;
const { height } = Dimensions.get('window');

const PlayerProfileSetup = ({ navigation }: any) => {
  const [state, setState] = useState(null);
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const [isDropdownVisible2, setIsDropdownVisible2] = useState(false);
  const [imageUri, setImageUri] = useState<string | null>(null);
  const [bio, setBio] = useState('');
  const [isOn, setIsOn] = useState(false);
  const formikRef = useRef<any>(null);

  const pickImage = () => {
    const options = { mediaType: 'photo', quality: 1, includeBase64: false };
    launchImageLibrary(options, response => {
      if (response.assets && response.assets.length > 0) {
        setImageUri(response.assets[0].uri || null);
      }
    });
  };

  const handleNext = (values: any) => {
    if (values.name && values.city && values.phoneNumber) {
      navigation.navigate('PlayerTabs');
    }
  };

  const formatPhoneNumber = (raw = '') => {
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
      <View style={{ flex: 1, backgroundColor: COLORS.white }}>
        <Formik
          innerRef={formikRef}
          initialValues={{ name: '', city: '', phoneNumber: '' }}
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
              <AuthHeader title="Set Up Your Profile" />

              <KeyboardAwareScrollView
                style={{ flex: 1, backgroundColor: COLORS.white }}
                contentContainerStyle={{ paddingBottom: RFPercentage(8) }}
                showsVerticalScrollIndicator={false}
                keyboardShouldPersistTaps="handled"
                enableOnAndroid
                extraScrollHeight={80}
              >
                <View style={styles.container}>
                  <Text style={styles.title}>Enter Your Personal Details</Text>

                  {/* Image Picker */}
                  <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={pickImage}
                    style={styles.profileContainer}
                  >
                    <View style={styles.imgInner}>
                      <Image
                        source={imageUri ? { uri: imageUri } : ICONS.gallery}
                        resizeMode="cover"
                        style={
                          imageUri ? styles.profileImage : styles.defaultImg
                        }
                      />
                      {imageUri ? (
                        <TouchableOpacity
                          activeOpacity={0.8}
                          onPress={pickImage}
                          style={styles.imgPicker}
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
                          style={styles.imgButton}
                        >
                          <Text style={styles.imgText}>Add your Picture</Text>
                        </TouchableOpacity>
                      )}
                    </View>
                  </TouchableOpacity>

                  {/* Name Field */}
                  <View style={{ marginTop: RFPercentage(2.5) }}>
                    <InputField
                      placeholder="Full Name"
                      onChangeText={handleChange('name')}
                      handleBlur={handleBlur('name')}
                      value={values.name}
                      password={false}
                      hasError={touched.name && !!errors.name}
                      style={{
                        borderColor:
                          touched.name && errors.name
                            ? COLORS.red
                            : COLORS.fieldBorder,
                      }}
                    />
                    {touched.name && errors.name && (
                      <Text style={styles.error}>{errors.name}</Text>
                    )}
                  </View>

                  {/* Bio */}
                  <View style={styles.bioWrapper}>
                    <View style={styles.bioContainer}>
                      <View style={{ width: '92%', alignSelf: 'center' }}>
                        <View style={styles.bioHeader}>
                          <Text style={styles.bioLabel}>Add Bio</Text>
                          <Image
                            source={ICONS.user2}
                            resizeMode="contain"
                            style={styles.user}
                          />
                        </View>
                        <TextInput
                          placeholder="Tell us about yourself..."
                          placeholderTextColor={COLORS.placeholder}
                          style={styles.bioInput}
                          multiline
                          maxLength={MAX_LENGTH}
                          value={bio}
                          onChangeText={setBio}
                          cursorColor={COLORS.primary}
                          selectionColor={COLORS.primary}
                        />
                        <View style={styles.bars}>
                          <Image
                            source={ICONS.bars}
                            resizeMode="contain"
                            style={styles.imgBars}
                          />
                        </View>
                      </View>
                    </View>
                  </View>
                  <Text style={styles.bottom}>
                    {MAX_LENGTH - bio.length} characters left
                  </Text>

                  {/* City & State */}
                  <View style={{ marginTop: RFPercentage(3) }}>
                    <Text style={styles.city}>Which city do you live in</Text>
                  </View>
                  <View style={styles.dropdowns}>
                    <View style={{ width: '48%' }}>
                      <InputField
                        placeholder="City"
                        value={values.city}
                        onChangeText={handleChange('city')}
                        handleBlur={handleBlur('city')}
                        hasError={touched.city && !!errors.city}
                        style={{
                          borderColor:
                            touched.city && errors.city
                              ? COLORS.red
                              : COLORS.fieldBorder,
                          paddingHorizontal: RFPercentage(0.7),
                        }}
                      />
                      {touched.city && errors.city && (
                        <Text style={styles.error}>{errors.city}</Text>
                      )}
                    </View>

                    <View style={{ width: '48%' }}>
                      <DropdownField
                        placeholder="State"
                        data={['Beijing', 'Shanghai', 'Guangdong', 'Sichuan']}
                        selectedValue={state}
                        onValueChange={val => setState(val)}
                        isDropdownVisible={isDropdownVisible2}
                        setIsDropdownVisible={setIsDropdownVisible2}
                        style={{ paddingHorizontal: RFPercentage(1) }}
                      />
                    </View>
                  </View>

                  {/* Phone */}
                  <View style={{ marginTop: RFPercentage(4) }}>
                    <Text style={styles.place}>Where can people find you</Text>
                    <InputField
                      placeholder="Phone Number (Required)"
                      value={values.phoneNumber}
                      onChangeText={text =>
                        handleChange('phoneNumber')(formatPhoneNumber(text))
                      }
                      handleBlur={handleBlur('phoneNumber')}
                      hasError={touched.phoneNumber && !!errors.phoneNumber}
                      style={{
                        borderColor:
                          touched.phoneNumber && errors.phoneNumber
                            ? COLORS.red
                            : COLORS.fieldBorder,
                      }}
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
                  </View>

                  {/* Social links */}
                  <View style={styles.inputContainer}>
                    <FlatList
                      data={data}
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
                      scrollEnabled={false}
                    />
                  </View>

                  {/* Toggle */}
                  <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={() => setIsOn(!isOn)}
                    style={styles.toggleRow}
                  >
                    <Text style={styles.toggleLabel}>
                      Keep My Profile Private
                    </Text>
                    <ToggleSwitch
                      isOn={isOn}
                      onColor={COLORS.pink}
                      offColor={COLORS.switch}
                      size="small"
                      onToggle={() => setIsOn(!isOn)}
                    />
                  </TouchableOpacity>
                </View>
              </KeyboardAwareScrollView>

              {/* Bottom Save Button */}
              <View style={styles.button}>
                <CustomButton
                  title="Save"
                  style={{
                    width: '90%',
                    alignSelf: 'center',
                    bottom: RFPercentage(2),
                    backgroundColor:
                      values.name || values.city || values.phoneNumber
                        ? COLORS.primary
                        : COLORS.disabled,
                  }}
                  onPress={handleSubmit}
                />
              </View>
            </>
          )}
        </Formik>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default PlayerProfileSetup;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '90%',
    alignSelf: 'center',
    backgroundColor: COLORS.white,
    marginTop: RFPercentage(3),
  },
  title: {
    fontFamily: FONTS.headline,
    color: COLORS.primary,
    fontSize: RFPercentage(2.4),
  },
  profileContainer: {
    marginTop: RFPercentage(3),
    width: RFPercentage(16),
    alignItems: 'center',
  },
  imgButton: {
    position: 'absolute',
    bottom: RFPercentage(-1),
    width: RFPercentage(16),
    height: RFPercentage(4),
    borderRadius: RFPercentage(100),
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileImage: {
    width: RFPercentage(14.8),
    height: RFPercentage(14.8),
    borderRadius: RFPercentage(100),
  },
  imgText: {
    color: COLORS.white,
    fontFamily: FONTS.medium,
    fontSize: RFPercentage(1.5),
  },
  user: {
    width: RFPercentage(2),
    height: RFPercentage(2),
  },
  bars: {
    alignSelf: 'flex-end',
    right: RFPercentage(-1),
    bottom: RFPercentage(2),
  },
  imgBars: {
    width: RFPercentage(1.5),
    height: RFPercentage(1.5),
  },
  city: {
    color: COLORS.primary,
    fontFamily: FONTS.bold,
    fontSize: RFPercentage(2),
  },
  place: {
    color: COLORS.primary,
    fontFamily: FONTS.bold,
    fontSize: RFPercentage(2),
  },
  bottom: {
    alignSelf: 'flex-end',
    marginTop: RFPercentage(0.5),
    color: COLORS.grey4,
    fontSize: RFPercentage(1.5),
    fontFamily: FONTS.regular2,
  },
  imgPicker: {
    position: 'absolute',
    bottom: RFPercentage(-1.5),
  },
  defaultImg: {
    width: RFPercentage(5),
    height: RFPercentage(5),
  },
  header: {
    width: '100%',
    borderBottomWidth: RFPercentage(0.1),
    borderBottomColor: COLORS.lightWhite,
    paddingBottom: RFPercentage(1),
    height: RFPercentage(12),
    justifyContent: 'flex-end',
  },
  error: {
    color: COLORS.red,
    fontFamily: FONTS.regular,
    fontSize: RFPercentage(1.6),
  },
  dropdowns: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: RFPercentage(-0.5),
  },
  editIcon: {
    width: RFPercentage(3.8),
    height: RFPercentage(3.8),
  },
  imgInner: {
    width: RFPercentage(15),
    height: RFPercentage(15),
    borderRadius: RFPercentage(100),
    backgroundColor: COLORS.lightWhite3,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    width: '100%',
    borderTopWidth: RFPercentage(0.1),
    borderTopColor: COLORS.lightWhite,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.white,
    paddingVertical: RFPercentage(3),
    paddingTop: RFPercentage(4),
  },
  bioWrapper: {
    marginTop: RFPercentage(3),
  },
  bioContainer: {
    backgroundColor: COLORS.white,
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
    fontSize: RFPercentage(1.9),
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
