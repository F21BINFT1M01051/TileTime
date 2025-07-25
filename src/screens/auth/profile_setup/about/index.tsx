import { Image, StyleSheet, Text, TextInput, View } from 'react-native';
import React from 'react';
import { COLORS, FONTS, ICONS, IMAGES } from '../../../../config/theme';
import { RFPercentage } from 'react-native-responsive-fontsize';
import DropdownField from '../../../../components/DropDown';

const About = () => {
  const [selectedItem, setSelectedItem] = React.useState(null);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Help others get to know you</Text>

      <View style={styles.profileContainer}>
        <Image
          source={IMAGES.profile}
          resizeMode="contain"
          style={styles.profileImage}
        />
        <Image
          source={ICONS.edit}
          resizeMode="contain"
          style={styles.editIcon}
        />
      </View>

      <View style={styles.bioWrapper}>
        <View style={styles.bioContainer}>
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
          />
          <View
            style={{
              alignSelf: 'flex-end',
              right: RFPercentage(2),
              bottom: RFPercentage(1),
            }}
          >
            <Image
              source={ICONS.bars}
              resizeMode="contain"
              style={{ width: RFPercentage(2), height: RFPercentage(2) }}
            />
          </View>
        </View>
      </View>

      <View>
        <DropdownField
          placeholder="Skill Level"
          data={['Beginner', 'Intermediate', 'Expert']}
          selectedValue={selectedItem}
          onValueChange={(val: any) => setSelectedItem(val)}
        />
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
    fontSize: RFPercentage(2.2),
  },
  profileContainer: {
    marginTop: RFPercentage(3),
  },
  profileImage: {
    width: RFPercentage(13),
    height: RFPercentage(13),
    borderRadius: RFPercentage(100),
  },
  editIcon: {
    width: RFPercentage(4),
    height: RFPercentage(4),
    left: RFPercentage(4),
    bottom: RFPercentage(2),
  },
  bioWrapper: {
    marginTop: RFPercentage(1.5),
  },
  bioContainer: {
    backgroundColor: COLORS.fieldColor,
    borderWidth: 1,
    borderColor: COLORS.fieldBorder,
    borderRadius: RFPercentage(1.5),
    paddingVertical: RFPercentage(2),
  },
  bioHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '90%',
    alignSelf: 'center',
  },
  bioLabel: {
    fontFamily: FONTS.medium2,
    color: COLORS.primary,
    fontSize: RFPercentage(1.7),
  },
  bioInput: {
    width: '92%',
    marginTop: RFPercentage(0.8),
    alignSelf: 'center',
    textAlignVertical: 'top',
    fontFamily: FONTS.regular,
    color: COLORS.inputColor,
    lineHeight: RFPercentage(2.5),
    fontSize: RFPercentage(1.8),
    height: RFPercentage(10),
  },
});
