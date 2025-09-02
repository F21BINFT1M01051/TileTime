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
import { launchImageLibrary } from 'react-native-image-picker';
import InputField from '../../../../components/InputField';
import SocialField from '../../../../components/SocialField';
import AuthHeader from '../../../../components/AuthHeader';
import CustomButton from '../../../../components/CustomButton';

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

const EditProfile = () => {
  const [state, setState] = useState(null);
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const [isDropdownVisible2, setIsDropdownVisible2] = useState(false);
  const [imageUri, setImageUri] = useState(null);
  const [bio, setBio] = useState(
    'Passionate coach with a love for helping players unlock their full potential. Let’s grow your game,  one step at a time.',
  );
  const [keyboardIsVisible, setKeyboardIsVisible] = useState(false);
  const [name, setName] = useState('Alexender');
  const [city, setCity] = useState('Paris');
  const [phone, setPhone] = useState('+1-343-433-6370');

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
        setImageUri(response.assets[0].uri);
      }
    });
  };

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
        <AuthHeader title="Edit Profile" style={styles.headerTitle} />
        <ScrollView
          style={styles.scrollContainer}
          contentContainerStyle={styles.scrollContent}
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
                    style={styles.editIconWrapper}
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
                    style={styles.addPicBtn}
                  >
                    <Text style={styles.addPicText}>Add your Picture</Text>
                  </TouchableOpacity>
                )}
              </View>
            </TouchableOpacity>
            <Text style={styles.title}>Basic Details</Text>

            <View style={styles.fullNameWrapper}>
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
                    cursorColor={COLORS.primary}
                    selectionColor={COLORS.primary}
                  />
                  <View style={styles.bioBars}>
                    <Image
                      source={ICONS.bars}
                      resizeMode="contain"
                      style={styles.barsIcon}
                    />
                  </View>
                </View>
              </View>
            </View>

            <Text style={styles.charCount}>
              {MAX_LENGTH - bio.length} characters left
            </Text>

            <View style={styles.dropdowns}>
              <View style={styles.halfWidth}>
                <InputField
                  placeholder="City"
                  value={city}
                  onChangeText={setCity}
                  defaultColor={COLORS.focused}
                  focusedColor={COLORS.focused}
                  errorColor={COLORS.red}
                  password={false}
                  style={{ paddingHorizontal: RFPercentage(1) }}
                />
              </View>

              <View style={styles.halfWidth}>
                <DropdownField
                  placeholder="State"
                  data={['Beijing', 'Shanghai', 'Guangdong', 'Sichuan']}
                  selectedValue={state}
                  onValueChange={(val: any) => setState(val)}
                  isDropdownVisible={isDropdownVisible2}
                  setIsDropdownVisible={setIsDropdownVisible2}
                  style={styles.dropdownInner}
                />
              </View>
            </View>

            <View style={styles.socialHandlesWrapper}>
              <Text style={styles.socialHandlesTitle}>Social Handles</Text>
              <InputField
                placeholder="Phone Number"
                password={false}
                defaultColor={COLORS.focused}
                focusedColor={COLORS.focused}
                errorColor={COLORS.red}
                value={phone}
                onChangeText={text => {
                  const formatted = formatPhoneNumber(text);
                  setPhone(formatted);
                }}
                type="phone-pad"
                icon={
                  <Image
                    source={ICONS.phone}
                    resizeMode="contain"
                    style={styles.phoneIcon}
                  />
                }
              />
            </View>

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
          </View>
        </ScrollView>

        {!keyboardIsVisible && (
          <View style={styles.bottomWrapper}>
            <CustomButton
              title="Save"
              style={styles.buttonContainer}
              onPress={() => {}}
            />
          </View>
        )}
      </>
    </TouchableWithoutFeedback>
  );
};

export default EditProfile;

const styles = StyleSheet.create({
  scrollContainer: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  scrollContent: {
    paddingBottom: RFPercentage(5),
  },
  headerWrapper: {
    borderBottomWidth: RFPercentage(0.1),
    borderBottomColor: COLORS.lightWhite,
    height: RFPercentage(12),
    justifyContent: 'flex-end',
    paddingBottom: RFPercentage(1),
  },
  headerInner: {
    width: '90%',
    alignSelf: 'center',
  },
  headerTitle: {
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
    fontSize: RFPercentage(2),
    marginTop: RFPercentage(5),
  },
  profileContainer: {
    marginTop: RFPercentage(1),
    width: RFPercentage(16),
    alignItems: 'center',
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
  editIconWrapper: {
    position: 'absolute',
    bottom: RFPercentage(-1.5),
  },
  editIcon: {
    width: RFPercentage(3.8),
    height: RFPercentage(3.8),
  },
  addPicBtn: {
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
    fontSize: RFPercentage(1.4),
  },
  fullNameWrapper: {},
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
    width: '100%',
    alignSelf: 'center',
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
    alignSelf: 'center',
    textAlignVertical: 'top',
    fontFamily: FONTS.regular,
    color: COLORS.inputColor,
    lineHeight: RFPercentage(2.2),
    fontSize: RFPercentage(1.9),
    height: RFPercentage(10),
    paddingHorizontal: 0,
    paddingVertical: 0,
    marginTop: RFPercentage(1.5),
  },
  bioBars: {
    alignSelf: 'flex-end',
    right: RFPercentage(-1),
    bottom: RFPercentage(2),
  },
  barsIcon: {
    width: RFPercentage(1.5),
    height: RFPercentage(1.5),
  },
  charCount: {
    alignSelf: 'flex-end',
    marginTop: RFPercentage(0.5),
    color: COLORS.grey4,
    fontSize: RFPercentage(1.5),
    fontFamily: FONTS.regular2,
  },
  dropdowns: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: RFPercentage(0.8),
  },
  halfWidth: {
    width: '48%',
  },
  dropdownInner: {
    paddingHorizontal: RFPercentage(1),
  },
  socialHandlesWrapper: {
    marginTop: RFPercentage(3),
  },
  socialHandlesTitle: {
    color: COLORS.primary,
    fontFamily: FONTS.bold,
    fontSize: RFPercentage(1.9),
  },
  phoneIcon: {
    width: RFPercentage(2.2),
    height: RFPercentage(2.2),
  },
  inputContainer: {},
  bottomWrapper: {
    width: '100%',
    borderTopWidth: RFPercentage(0.1),
    borderTopColor: COLORS.lightWhite,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.white,
    paddingVertical: RFPercentage(2),
    paddingBottom: RFPercentage(4),
  },
  buttonContainer: {
    width: '90%',
    alignSelf: 'center',
  },
});
