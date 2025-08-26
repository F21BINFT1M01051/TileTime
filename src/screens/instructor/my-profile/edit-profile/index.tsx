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
  ScrollView,
} from 'react-native';
import React, { useState, useEffect } from 'react';
import { COLORS, FONTS, ICONS } from '../../../../config/theme';
import { RFPercentage } from 'react-native-responsive-fontsize';
import DropdownField from '../../../../components/DropDown';
import InputField from '../../../../components/InputField';
import SocialField from '../../../../components/SocialField';
import AuthHeader from '../../../../components/AuthHeader';
import CustomButton from '../../../../components/CustomButton';
import Search from '../../../../components/SearchExperience';
import { launchImageLibrary } from 'react-native-image-picker';

const data = [
  {
    id: 1,
    name: 'Connect With Facebook',
    navigationScreen: '',
    color: COLORS.skyBlue,
    icon: ICONS.facebook,
    connected: true,
  },
  {
    id: 2,
    name: 'Connect With Instagram',
    navigationScreen: '',
    icon: ICONS.insta,
    color: COLORS.pink2,
    connected: true,
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

const MAX_LENGTH = 230;

const EditProfileInstructor = () => {
  const [state, setState] = useState(null);
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const [isDropdownVisible2, setIsDropdownVisible2] = useState(false);
  const [checked, setChecked] = useState(false);
  const [bio, setBio] = useState('');
  const [keyboardIsVisible, setKeyboardIsVisible] = useState(false);
  const [website, setWebsite] = React.useState('');
  const [Experience, setExperience] = useState('');
  const [Credential, setCredential] = useState('');
  const [name, setName] = useState('Alexender');
  const [city, setCity] = useState('Paris');
  const [phone, setPhone] = useState('+1-343-433-6370');
  const [business, setBusiness] = useState('');
  const [anotherCity, setAnotherCity] = useState(false);
  const [otherCity, setOtherCity] = useState('');
  const [state2, setState2] = useState(null);
  const [isDropdownVisible3, setIsDropdownVisible3] = useState(false);
  const [imageUri, setImageUri] = useState(null);

  useEffect(() => {
    const showSubscription = Keyboard.addListener('keyboardDidShow', () => {
      setKeyboardIsVisible(true);
    });
    const hideSubscription = Keyboard.addListener('keyboardDidHide', () => {
      setKeyboardIsVisible(false);
    });

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);

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
      <>
        <AuthHeader title="Edit Profile" style={styles.authHeaderText} />
        <ScrollView
          style={styles.mainWrapper}
          contentContainerStyle={styles.scrollWrapper}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.container}>
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

            <Text style={styles.title}>Basic Details</Text>
            <View style={styles.inputSpacing}>
              <InputField
                placeholder="Full Name"
                value={name}
                onChangeText={setName}
                password={false}
                defaultColor={COLORS.focused}
                focusedColor={COLORS.focused}
                errorColor={COLORS.red}
              />
            </View>

            <TouchableOpacity
              style={styles.checkboxRow}
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
                  style={styles.checkboxIcon}
                />
              </TouchableOpacity>
              <Text style={styles.checkboxText}>Doing business as</Text>
            </TouchableOpacity>

            {checked && (
              <InputField
                placeholder="Enter Business Name"
                value={business}
                onChangeText={setBusiness}
                password={false}
              />
            )}

            <View style={styles.bioWrapper}>
              <View style={styles.bioContainer}>
                <View style={styles.bioInner}>
                  <View style={styles.bioHeader}>
                    <Text style={styles.bioLabel}>Add Bio</Text>
                    <Image
                      source={ICONS.user2}
                      resizeMode="contain"
                      style={styles.bioIcon}
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
                  <View style={styles.barsWrapper}>
                    <Image
                      source={ICONS.bars}
                      resizeMode="contain"
                      style={styles.barsIcon}
                    />
                  </View>
                </View>
              </View>
            </View>

            <Text style={styles.remainingChars}>
              {MAX_LENGTH - bio.length} characters left
            </Text>

            <View style={{ marginTop: RFPercentage(2) }}>
              <Text style={styles.conduct}>Cities you serve</Text>
            </View>
            <View style={styles.dropdowns}>
              <View style={styles.dropdownHalf}>
                <InputField
                  placeholder="City"
                  value={city}
                  onChangeText={setCity}
                  defaultColor={COLORS.focused}
                  focusedColor={COLORS.focused}
                  errorColor={COLORS.red}
                  password={false}
                  style={{ paddingHorizontal: RFPercentage(0.7) }}
                />
                {!anotherCity && (
                  <TouchableOpacity
                    activeOpacity={0.8}
                    style={styles.addLocation}
                    onPress={() => setAnotherCity(true)}
                  >
                    <Image
                      source={ICONS.plus5}
                      tintColor={COLORS.primary}
                      resizeMode="contain"
                      style={styles.plusIcon}
                    />
                    <Text style={styles.addLocationText}>
                      Add Another Location
                    </Text>
                  </TouchableOpacity>
                )}
              </View>
              <View style={styles.dropdownHalf}>
                <DropdownField
                  placeholder="State"
                  data={['Beijing', 'Shanghai', 'Guangdong', 'Sichuan']}
                  selectedValue={state}
                  onValueChange={(val: any) => setState(val)}
                  isDropdownVisible={isDropdownVisible2}
                  setIsDropdownVisible={setIsDropdownVisible2}
                  style={styles.dropdownInput}
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

            <View style={styles.sectionWrapper}>
              <Text style={styles.sectionTitle}>
                Experience and Credentials
              </Text>

              <View style={styles.inputContainer}>
                <Text style={styles.sectionLabel}>Your Experience</Text>
                <View style={styles.searchSpacing}>
                  <Search
                    placeholder="Search And Add Experience"
                    value={Experience}
                    onChangeText={setExperience}
                    data={[
                      'Beginner-Friendly',
                      'Fast Paced',
                      'Ender Friendly',
                      'Free',
                    ]}
                  />
                </View>

                <Text style={styles.credentialLabel}>Credentials</Text>
                <View style={styles.searchSpacing}>
                  <Search
                    placeholder="Search And Add Credentials"
                    value={Credential}
                    onChangeText={setCredential}
                    data={[
                      'OMM Certified',
                      'MahjongLine Certified',
                      'Gaming Industry Approved',
                    ]}
                  />
                </View>
              </View>
            </View>

            <View style={styles.sectionWrapper}>
              <Text style={styles.sectionTitle}>Social Handles</Text>
              <InputField
                placeholder="Phone Number"
                value={phone}
                onChangeText={text => {
                  const formatted = formatPhoneNumber(text);
                  setPhone(formatted);
                }}
                defaultColor={COLORS.focused}
                focusedColor={COLORS.focused}
                errorColor={COLORS.red}
                password={false}
                type="phone-pad"
                icon={
                  <Image
                    source={ICONS.phone}
                    resizeMode="contain"
                    style={styles.phoneIcon}
                  />
                }
              />

              <InputField
                placeholder="Your Website URL"
                value={website}
                onChangeText={setWebsite}
                password={false}
                icon={
                  <Image
                    source={ICONS.globe}
                    resizeMode="contain"
                    style={styles.globeIcon}
                  />
                }
              />
            </View>

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
        </ScrollView>

        {!keyboardIsVisible && (
          <View style={styles.footer}>
            <CustomButton
              title="Save"
              style={styles.saveButton}
              onPress={() => {}}
            />
          </View>
        )}
      </>
    </TouchableWithoutFeedback>
  );
};

export default EditProfileInstructor;

const styles = StyleSheet.create({
  mainWrapper: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  scrollWrapper: {
    paddingBottom: RFPercentage(5),
  },
  header: {
    borderBottomWidth: RFPercentage(0.1),
    borderBottomColor: COLORS.lightWhite,
    height: RFPercentage(12),
    justifyContent: 'flex-end',
    paddingBottom: RFPercentage(1),
  },
  innerHeader: {
    width: '90%',
    alignSelf: 'center',
  },
  authHeaderText: {
    fontFamily: FONTS.semiBold,
    fontSize: RFPercentage(2),
  },
  container: {
    backgroundColor: COLORS.white,
    width: '90%',
    alignSelf: 'center',
    marginTop: RFPercentage(2),
  },
  title: {
    fontFamily: FONTS.bold,
    color: COLORS.primary,
    fontSize: RFPercentage(2.2),
    marginTop: RFPercentage(5),
  },
  inputSpacing: {
    marginTop: RFPercentage(0.5),
  },
  checkboxRow: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: RFPercentage(3),
  },
  checkboxIcon: {
    width: RFPercentage(3),
    height: RFPercentage(3),
  },
  checkboxText: {
    color: COLORS.inputColor,
    fontSize: RFPercentage(1.9),
    fontFamily: FONTS.regular,
    marginLeft: RFPercentage(1),
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
  bioInner: {
    width: '92%',
    alignSelf: 'center',
  },
  bioHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: RFPercentage(1),
  },
  bioLabel: {
    fontFamily: FONTS.medium2,
    color: COLORS.primary,
    fontSize: RFPercentage(1.7),
  },
  bioIcon: {
    width: RFPercentage(2),
    height: RFPercentage(2),
  },
  bioInput: {
    width: '100%',
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
  barsWrapper: {
    alignSelf: 'flex-end',
    right: RFPercentage(-1),
    bottom: RFPercentage(2),
  },
  barsIcon: {
    width: RFPercentage(1.5),
    height: RFPercentage(1.5),
  },
  remainingChars: {
    alignSelf: 'flex-end',
    marginTop: RFPercentage(0.5),
    color: COLORS.grey4,
    fontSize: RFPercentage(1.5),
    fontFamily: FONTS.regular2,
  },
  dropdowns: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  dropdownHalf: {
    width: '48%',
  },
  addLocation: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: RFPercentage(1.3),
  },
  plusIcon: {
    width: RFPercentage(2),
    height: RFPercentage(2),
  },
  addLocationText: {
    color: COLORS.primary,
    fontFamily: FONTS.bold,
    marginLeft: RFPercentage(0.8),
    fontSize: RFPercentage(1.8),
  },
  dropdownInput: {
    paddingHorizontal: RFPercentage(1),
  },
  sectionWrapper: {
    marginTop: RFPercentage(4),
  },
  sectionTitle: {
    color: COLORS.primary,
    fontFamily: FONTS.bold,
    fontSize: RFPercentage(2),
  },
  inputContainer: {
    marginTop: RFPercentage(2),
  },
  sectionLabel: {
    fontFamily: FONTS.regular,
    color: COLORS.primary,
    fontSize: RFPercentage(1.7),
  },
  searchSpacing: {
    marginTop: RFPercentage(1.5),
  },
  credentialLabel: {
    fontFamily: FONTS.regular,
    color: COLORS.primary,
    fontSize: RFPercentage(1.7),
    marginTop: RFPercentage(2.5),
  },
  phoneIcon: {
    width: RFPercentage(2.2),
    height: RFPercentage(2.2),
  },
  globeIcon: {
    width: RFPercentage(2.3),
    height: RFPercentage(2.3),
  },
  footer: {
    width: '100%',
    borderTopWidth: RFPercentage(0.1),
    borderTopColor: COLORS.lightWhite,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.white,
    paddingVertical: RFPercentage(2),
    paddingBottom: RFPercentage(4),
  },
  saveButton: {
    width: '90%',
    alignSelf: 'center',
  },
  profileContainer: {
    marginTop: RFPercentage(1),
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
    fontFamily: FONTS.semiBold,
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
  },
});
