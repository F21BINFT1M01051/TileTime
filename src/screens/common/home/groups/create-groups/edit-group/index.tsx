import {
  Image,
  Keyboard,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import React, { useState, useRef } from 'react';
import { COLORS, FONTS, ICONS, IMAGES } from '../../../../../../config/theme';
import { RFPercentage } from 'react-native-responsive-fontsize';
import { launchImageLibrary } from 'react-native-image-picker';
import InputField from '../../../../../../components/InputField';
import AuthHeader from '../../../../../../components/AuthHeader';
import CustomButton from '../../../../../../components/CustomButton';

const EditGroup = ({ navigation }: any) => {
  const [imageUri, setImageUri] = useState(null);
  const [groupName, setGroupName] = useState('Mahjong Power Rangers Community');
  const [desc, setDesc] = useState(
    'Join fellow Mahjong enthusiasts for an evening of friendly matches and lively conversation',
  );

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

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <>
        <AuthHeader
          title="Edit Group Details"
          style={{ fontSize: RFPercentage(2), fontFamily: FONTS.semiBold }}
        />
        <ScrollView
          style={{
            flex: 1,
            backgroundColor: COLORS.white,
            width: '100%',
            alignSelf: 'center',
          }}
        >
          <View style={styles.container}>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={pickImage}
              style={styles.profileContainer}
            >
              <View style={styles.profileCircle}>
                <Image
                  source={imageUri ? { uri: imageUri } : IMAGES.customProfile}
                  resizeMode="cover"
                  style={styles.profileImage}
                />

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
              </View>
            </TouchableOpacity>

            <View style={styles.inputWrapper}>
              <InputField
                placeholder="Group Name"
                value={groupName}
                onChangeText={text => setGroupName(text)}
                password={false}
                defaultColor={COLORS.focused}
              />
            </View>

            <View style={styles.bioWrapper}>
              <View style={styles.bioContainer}>
                <View style={styles.bioInputWrapper}>
                  <Text
                    style={{
                      color: COLORS.primary,
                      fontFamily: FONTS.medium,
                      fontSize: RFPercentage(1.7),
                    }}
                  >
                    Group Description
                  </Text>
                  <TextInput
                    style={styles.bioInput}
                    value={desc}
                    onChangeText={setDesc}
                    multiline
                    maxLength={170}
                    cursorColor={COLORS.primary}
                    selectionColor={COLORS.primary}
                  />
                </View>
                <View style={styles.bioIconWrapper}>
                  <Image
                    source={ICONS.bars}
                    resizeMode="contain"
                    style={styles.bioIcon}
                  />
                </View>
              </View>
            </View>
          </View>
        </ScrollView>
        <View style={[styles.bottomWrapper]}>
          <View style={styles.buttonContainer}>
            <CustomButton
              title={'Save'}
              onPress={() =>
                navigation.navigate('ChatScreen', {
                  isGroup: true,
                  isNew: false,
                })
              }
            />
          </View>
        </View>
      </>
    </TouchableWithoutFeedback>
  );
};

export default EditGroup;

const styles = StyleSheet.create({
  container: { flex: 1, width: '90%', alignSelf: 'center' },
  title: {
    fontFamily: FONTS.bold,
    color: COLORS.primary,
    fontSize: RFPercentage(2.5),
  },
  profileContainer: {
    marginTop: RFPercentage(3),
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
  editIconContainer: {
    position: 'absolute',
    bottom: RFPercentage(-1.5),
  },
  editIcon: {
    width: RFPercentage(3.8),
    height: RFPercentage(3.8),
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
    fontSize: RFPercentage(1.5),
  },
  inputWrapper: { marginTop: RFPercentage(2) },
  bioWrapper: { marginTop: RFPercentage(3) },
  bioContainer: {
    backgroundColor: COLORS.white,
    borderWidth: RFPercentage(0.1),
    borderColor: COLORS.fieldBorder,
    borderRadius: RFPercentage(1.5),
  },
  bioInputWrapper: {
    width: '92%',
    alignSelf: 'center',
    marginTop: RFPercentage(1),
  },
  bioInput: {
    width: '100%',
    alignSelf: 'center',
    textAlignVertical: 'top',
    fontFamily: FONTS.regular,
    color: COLORS.inputColor,
    lineHeight: RFPercentage(2),
    fontSize: RFPercentage(1.9),
    height: RFPercentage(12),
    paddingHorizontal: 0,
    paddingVertical: 0,
    marginTop: RFPercentage(0.5),
  },
  bioIconWrapper: {
    alignSelf: 'flex-end',
    right: RFPercentage(0.5),
    bottom: RFPercentage(0.5),
  },
  bioIcon: {
    width: RFPercentage(1.5),
    height: RFPercentage(1.5),
  },
  error: {
    color: COLORS.red,
    fontFamily: FONTS.regular,
    fontSize: RFPercentage(1.7),
  },
  bottomWrapper: {
    width: '100%',
    paddingVertical: RFPercentage(2),
    borderTopWidth: 1,
    borderTopColor: COLORS.lightWhite,
    backgroundColor: COLORS.white,
    paddingBottom: RFPercentage(4),
  },
  buttonContainer: {
    width: '90%',
    alignSelf: 'center',
  },
});
