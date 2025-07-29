import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useState } from 'react';
import { COLORS, FONTS, ICONS } from '../../../../../config/theme';
import { RFPercentage } from 'react-native-responsive-fontsize';
import { launchImageLibrary } from 'react-native-image-picker';
import InputField from '../../../../../components/InputField';

const About = () => {
  const [imageUri, setImageUri] = useState(null);
  const [name, setName] = React.useState('');

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
    <View style={styles.container}>
      <Text style={styles.title}>Tell us about your group</Text>

      <TouchableOpacity
        activeOpacity={0.8}
        onPress={pickImage}
        style={styles.profileContainer}
      >
        <Image
          source={imageUri ? { uri: imageUri } : ICONS.group}
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
          placeholder="Group Name"
          value={name}
          onChangeText={setName}
          password={false}
        />
      </View>

      <View style={styles.bioWrapper}>
        <View style={styles.bioContainer}>
          <View style={{ width: '90%', alignSelf: 'center' }}>
            <TextInput
              placeholder="Group Description"
              placeholderTextColor={COLORS.placeholder}
              style={styles.bioInput}
              multiline={true}
              maxLength={170}
            />
          </View>
          <View
            style={{
              alignSelf: 'flex-end',
              right: RFPercentage(0.5),
              bottom: RFPercentage(0.5),
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
