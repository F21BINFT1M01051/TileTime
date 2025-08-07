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
import { COLORS, FONTS, ICONS, IMAGES } from '../../../../config/theme';
import { RFPercentage } from 'react-native-responsive-fontsize';
import DropdownField from '../../../../components/DropDown';
import InputField from '../../../../components/InputField';
import SocialField from '../../../../components/SocialField';
import AuthHeader from '../../../../components/AuthHeader';
import CustomButton from '../../../../components/CustomButton';
import Search from '../../../../components/SearchExperience';

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
  const [phone, setPhone] = useState('0309-8454-670');
  const [business, setBusiness] = useState('');

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
        <ScrollView
          style={{ flex: 1, backgroundColor: COLORS.white }}
          contentContainerStyle={{ paddingBottom: RFPercentage(5) }}
        >
          <View
            style={{
              borderBottomWidth: RFPercentage(0.1),
              borderBottomColor: COLORS.lightWhite,
              height: RFPercentage(10),
              justifyContent: 'flex-end',
              paddingBottom: RFPercentage(1),
            }}
          >
            <View style={{ width: '90%', alignSelf: 'center' }}>
              <AuthHeader
                title="Edit Profile"
                style={{
                  fontFamily: FONTS.semiBold,
                  fontSize: RFPercentage(2),
                }}
              />
            </View>
          </View>
          <View style={styles.container}>
            <Text style={styles.title}>Basic Details</Text>
            <View style={{ marginTop: RFPercentage(1) }}>
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
              style={{
                width: '100%',
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: RFPercentage(3),
              }}
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
            {checked && (
              <>
                <InputField
                  placeholder="Enter Business Name"
                  value={business}
                  onChangeText={setBusiness}
                  password={false}
                />
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

            <View style={styles.dropdowns}>
              <View style={{ width: '48%' }}>
                <InputField
                  placeholder="City"
                  value={city}
                  onChangeText={setCity}
                  defaultColor={COLORS.focused}
                  focusedColor={COLORS.focused}
                  errorColor={COLORS.red}
                  password={false}
                />

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
                Experience and Credentials
              </Text>

              <View style={styles.inputContainer}>
                <Text style={styles.sectionLabel}>Your Experience</Text>
                <View style={{ marginTop: RFPercentage(1.5) }}>
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

                <Text
                  style={[styles.sectionLabel, { marginTop: RFPercentage(3) }]}
                >
                  Credentials
                </Text>
                <View style={{ marginTop: RFPercentage(1.5) }}>
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

            <View style={{ marginTop: RFPercentage(3) }}>
              <Text
                style={{
                  color: COLORS.primary,
                  fontFamily: FONTS.bold,
                  fontSize: RFPercentage(1.9),
                }}
              >
                Social Handles
              </Text>
              <View>
                <InputField
                  placeholder="Phone Number"
                  value={phone}
                  onChangeText={setPhone}
                  defaultColor={COLORS.focused}
                  focusedColor={COLORS.focused}
                  errorColor={COLORS.red}
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

            <View>
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
          </View>
        </ScrollView>
        {!keyboardIsVisible && (
          <View
            style={{
              width: '100%',
              borderTopWidth: RFPercentage(0.1),
              borderTopColor: COLORS.lightWhite,
              height: RFPercentage(10),
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: COLORS.white,
            }}
          >
            <CustomButton
              title="Save"
              style={{ width: '90%', alignSelf: 'center' }}
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
  container: {
    backgroundColor: COLORS.white,
    width: '90%',
    alignSelf: 'center',
    marginTop: RFPercentage(3),
  },
  title: {
    fontFamily: FONTS.bold,
    color: COLORS.primary,
    fontSize: RFPercentage(2),
  },
  profileContainer: {
    marginTop: RFPercentage(3),
    width: RFPercentage(16),
    alignItems: 'center',
  },
  sectionLabel: {
    fontFamily: FONTS.regular,
    color: COLORS.primary,
    fontSize: RFPercentage(1.6),
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
    marginTop: RFPercentage(0.8),
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
  inputContainer: { marginTop: RFPercentage(2) },
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
