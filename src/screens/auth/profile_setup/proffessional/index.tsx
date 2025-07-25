import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { COLORS, FONTS } from '../../../../config/theme';
import { RFPercentage } from 'react-native-responsive-fontsize';
import InputField from '../../../../components/InputField';
import DropdownField from '../../../../components/DropDown';
import ToggleSwitch from 'toggle-switch-react-native';

const ProffessionalInfo = () => {
  const [experience, setExperience] = useState('');
  const [credentials, setCredentials] = useState('');
  const [selectedItem, setSelectedItem] = useState(null);
  const [selectedItem2, setSelectedItem2] = useState(null);
  const [isOn, setIsOn] = useState(false);

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>
        Share your coaching style and experience
      </Text>

      <View style={styles.inputContainer}>
        <DropdownField
          placeholder="Speciality"
          data={['Beginner', 'Intermediate', 'Expert']}
          selectedValue={selectedItem}
          onValueChange={(val: any) => setSelectedItem(val)}
        />

        <InputField
          placeholder="Years of Experience"
          value={experience}
          onChangeText={setExperience}
          password={false}
        />

        <DropdownField
          placeholder="Teaching Formats"
          data={['Beginner', 'Intermediate', 'Expert']}
          selectedValue={selectedItem2}
          onValueChange={(val: any) => setSelectedItem2(val)}
        />

        <InputField
          placeholder="Add Credentials"
          value={credentials}
          onChangeText={setCredentials}
          password={false}
        />
      </View>

      <View style={styles.toggleRow}>
        <Text style={styles.toggleLabel}>Keep my profile private</Text>
        <ToggleSwitch
          isOn={isOn}
          onColor={COLORS.pink}
          offColor={COLORS.switch}
          size="small"
          onToggle={() => setIsOn(!isOn)}
        />
      </View>
    </View>
  );
};

export default ProffessionalInfo;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerText: {
    fontFamily: FONTS.headline,
    color: COLORS.primary,
    fontSize: RFPercentage(2.2),
    lineHeight: RFPercentage(2.8),
  },
  inputContainer: {
    marginTop: RFPercentage(2),
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
    fontSize: RFPercentage(2),
  },
});
