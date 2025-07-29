import {
  Image,
  Keyboard,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import React, { useState } from 'react';
import { COLORS, FONTS, ICONS, IMAGES } from '../../../../config/theme';
import { RFPercentage } from 'react-native-responsive-fontsize';
import DropdownField from '../../../../components/DropDown';
import { launchImageLibrary } from 'react-native-image-picker';
import InputField from '../../../../components/InputField';

const About = () => {
  const [city, setCity] = useState(null);
  const [state, setState] = useState(null);
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const [isDropdownVisible2, setIsDropdownVisible2] = useState(false);
  const [imageUri, setImageUri] = useState(null);
  const [name, setName] = React.useState('');
  const [userName, setUserName] = React.useState('');
  const [phoneNumber, setPhoneNumber] = React.useState('');

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
                maxLength={170}
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

        <View style={{ marginTop: RFPercentage(1) }}>
          <InputField
            placeholder="Create A Username"
            value={userName}
            onChangeText={setUserName}
            password={false}
          />
        </View>

        <View style={{ marginTop: RFPercentage(1) }}>
          <InputField
            placeholder="Phone Number"
            value={phoneNumber}
            onChangeText={setPhoneNumber}
            password={false}
            icon={
              <Image
                source={ICONS.phone}
                resizeMode="contain"
                style={{ width: RFPercentage(2.5), height: RFPercentage(2.5) }}
              />
            }
          />
        </View>

        <View style={styles.dropdowns}>
          <View style={{ width: '48%' }}>
            <DropdownField
              placeholder="City"
              data={['Beijing', 'Shanghai', 'Shenzhen', 'Chongqing']}
              selectedValue={city}
              onValueChange={(val: any) => setCity(val)}
              isDropdownVisible={isDropdownVisible}
              setIsDropdownVisible={setIsDropdownVisible}
              style={{ paddingHorizontal: RFPercentage(1) }}
            />
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
});
