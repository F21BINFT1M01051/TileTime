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
  Modal,
  Animated,
  Easing,
  Dimensions,
  Platform,
} from 'react-native';
import React, { useState, useRef } from 'react';
import { COLORS, FONTS, ICONS, IMAGES } from '../../../../config/theme';
import { RFPercentage } from 'react-native-responsive-fontsize';
import DropdownField from '../../../../components/DropDown';
import { launchImageLibrary } from 'react-native-image-picker';
import InputField from '../../../../components/InputField';
import ToggleSwitch from 'toggle-switch-react-native';
import SocialField from '../../../../components/SocialField';

const data = [
  {
    id: 1,
    name: 'Connect With Facebook',
    navigationScreen: '',
    color: COLORS.skyBlue,
    icon: ICONS.facebook,
  },
  {
    id: 2,
    name: 'Connect With Instagram',
    navigationScreen: '',
    icon: ICONS.insta,
    color: COLORS.pink2,
  },
  {
    id: 3,
    name: 'Connect With TikTok',
    navigationScreen: '',
    icon: ICONS.tiktok,
    color: COLORS.black,
  },
];

const MAX_LENGTH = 200;
const About = ({ onPhoneNumberChange, onWebsiteChange }) => {
  const [city, setCity] = useState('');
  const [state, setState] = useState(null);
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const [isDropdownVisible2, setIsDropdownVisible2] = useState(false);
  const [imageUri, setImageUri] = useState(null);
  const [name, setName] = React.useState('');
  const [phoneNumber, setPhoneNumber] = React.useState('');
  const [checked, setChecked] = useState(false);
  const [businessName, setBusinessName] = useState('');
  const [bio, setBio] = useState('');
  const [isOn, setIsOn] = useState(false);
  const [website, setWebsite] = React.useState('');
 

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

  const handlePhoneChange = (val : any) => {
    setPhoneNumber(val);
    onPhoneNumberChange && onPhoneNumberChange(val);
  };

  const handleWebsiteChange = (val: any) => {
    setWebsite(val);
    onWebsiteChange && onWebsiteChange(val);
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
            <Image
              source={imageUri ? { uri: imageUri } : IMAGES.profile}
              resizeMode="cover"
              style={styles.profileImage}
            />
            <TouchableOpacity activeOpacity={0.8} onPress={pickImage}>
              <Image
                source={ICONS.edit}
                resizeMode="contain"
                style={styles.editIcon}
              />
            </TouchableOpacity>
          </TouchableOpacity>

          <View style={{ marginTop: RFPercentage(-1) }}>
            <InputField
              placeholder="Full Name"
              value={name}
              onChangeText={setName}
              password={false}
            />
          </View>

          <View
            style={{
              width: '100%',
              flexDirection: 'row',
              alignItems: 'center',
              marginTop: RFPercentage(3),
            }}
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
          </View>

          <View style={{ marginTop: RFPercentage(1) }}>
            <InputField
              placeholder="Enter Business Name"
              value={businessName}
              onChangeText={setBusinessName}
              password={false}
            />
          </View>

          <View style={styles.bioWrapper}>
            <View style={styles.bioContainer}>
              <View style={{ width: '90%', alignSelf: 'center' }}>
                <View style={styles.bioHeader}>
                  <Text style={styles.bioLabel}>Add Bio</Text>
                  <Image
                    source={ICONS.user2}
                    resizeMode="contain"
                    style={{ width: RFPercentage(2), height: RFPercentage(2) }}
                  />
                </View>
                <TextInput
                  placeholder="Add Your Bio..."
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
                    right: 0,
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
                password={false}
                style={{ paddingHorizontal: RFPercentage(0.7) }}
              />
              <TouchableOpacity
                activeOpacity={0.8}
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginTop: RFPercentage(1),
                }}
              >
                <Image
                  source={ICONS.plus}
                  tintColor={COLORS.primary}
                  resizeMode="contain"
                  style={{ width: RFPercentage(2), height: RFPercentage(2) }}
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
            <View style={{ marginTop: RFPercentage(0.5) }}>
              <InputField
                placeholder="Phone Number"
                value={phoneNumber}
                onChangeText={handlePhoneChange}
                password={false}
                type='phone-pad'
                icon={
                  <Image
                    source={ICONS.phone}
                    resizeMode="contain"
                    style={{
                      width: RFPercentage(2.5),
                      height: RFPercentage(2.5),
                    }}
                  />
                }
              />
            </View>

            <View style={{ marginTop: RFPercentage(1) }}>
              <InputField
                placeholder="Your Website URL"
                value={website}
                onChangeText={handleWebsiteChange}
                password={false}
                icon={
                  <Image
                    source={ICONS.globe}
                    resizeMode="contain"
                    style={{ width: RFPercentage(3), height: RFPercentage(3) }}
                  />
                }
              />
            </View>
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
                />
              )}
            />
          </View>
        </View>
    </TouchableWithoutFeedback>
  );
};

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
    marginTop: RFPercentage(4),
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: RFPercentage(13.5),
  },
  profileImage: {
    width: RFPercentage(13.5),
    height: RFPercentage(13.5),
    borderRadius: RFPercentage(100),
  },
  dropdowns: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: RFPercentage(1),
  },
  editIcon: {
    width: RFPercentage(3.8),
    height: RFPercentage(3.8),
    bottom: RFPercentage(2),
  },
  bioWrapper: {
    marginTop: RFPercentage(3),
  },
  bioContainer: {
    backgroundColor: COLORS.fieldColor,
    borderWidth: RFPercentage(0.1),
    borderColor: COLORS.fieldBorder,
    borderRadius: RFPercentage(1.5),
    paddingVertical: RFPercentage(1),
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
    height: RFPercentage(12),
    paddingHorizontal: 0,
    paddingVertical: 0,
    top: RFPercentage(2),
  },
  toggleRow: {
    width: '100%',
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: RFPercentage(4),
  },
  toggleLabel: {
    textAlign: 'center',
    fontFamily: FONTS.medium,
    color: COLORS.inputColor,
    fontSize: RFPercentage(1.9),
  },
  inputContainer: {
    marginTop: RFPercentage(1),
  },
});
