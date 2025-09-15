import {
  StyleSheet,
  Image,
  View,
  Platform,
  ScrollView,
  TouchableOpacity,
  Text,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import React, { useState } from 'react';
import { COLORS, FONTS, ICONS } from '../../../../config/theme';
import AuthHeader from '../../../../components/AuthHeader';
import { RFPercentage } from 'react-native-responsive-fontsize';
import DropdownField from '../../../../components/DropDown';
import InputField from '../../../../components/InputField';
import CustomButton from '../../../../components/CustomButton';
import ToggleSwitch from 'toggle-switch-react-native';

const EditEventAdmissionDetails = () => {
  const [price, setPrice] = useState('$ 24.99');
  const [seats, setSeats] = useState('20');
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const [type, setType] = useState('24 hours before event');
  const [isOn2, setIsOn2] = useState(false);
  const [isOn3, setIsOn3] = useState(false);
  const [isOn4, setIsOn4] = useState(false);

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={{ flex: 1, backgroundColor: COLORS.white }}>
        <AuthHeader
          title="Edit Admission Details"
          style={{ fontFamily: FONTS.semiBold, fontSize: RFPercentage(2) }}
        />
        <ScrollView
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="always"
        >
          <View style={{ width: '90%', alignSelf: 'center' }}>
            <InputField
              placeholder="Set Admission price"
              value={price}
              onChangeText={setPrice}
              type="numeric"
              defaultColor={COLORS.primary}
            />
            <InputField
              placeholder="Total Seats Available"
              value={seats}
              onChangeText={setSeats}
              type="numeric"
              defaultColor={COLORS.primary}
            />

            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => setIsOn2(!isOn2)}
              style={styles.toggleRow}
            >
              <Text style={styles.toggleLabel}>Enable Waitlist</Text>
              <ToggleSwitch
                isOn={isOn2}
                onColor={COLORS.pink}
                offColor={COLORS.switch}
                size="small"
                onToggle={() => setIsOn2(!isOn2)}
              />
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => setIsOn3(!isOn3)}
              style={styles.toggleRow}
            >
              <Text style={styles.toggleLabel}>
                Payment Required to confirm seat
              </Text>
              <ToggleSwitch
                isOn={isOn3}
                onColor={COLORS.pink}
                offColor={COLORS.switch}
                size="small"
                onToggle={() => setIsOn3(!isOn3)}
              />
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => setIsOn4(!isOn4)}
              style={styles.toggleRow}
            >
              <Text style={styles.toggleLabel}>Enable Refunds</Text>
              <ToggleSwitch
                isOn={isOn4}
                onColor={COLORS.pink}
                offColor={COLORS.switch}
                size="small"
                onToggle={() => setIsOn4(!isOn4)}
              />
            </TouchableOpacity>
            <DropdownField
              placeholder="Refund Eligibility"
              data={[
                '24 hours before event',
                '16 hours before event',
                '8 hours before event',
                '4 hours before event',
              ]}
              selectedValue={type}
              onValueChange={(val: any) => setType(val)}
              isDropdownVisible={isDropdownVisible}
              setIsDropdownVisible={setIsDropdownVisible}
              style={{marginTop:RFPercentage(4)}}
            />
          </View>
        </ScrollView>
        <View style={styles.bottomBar}>
          <View style={styles.bottomContent}>
            <CustomButton title="Save" onPress={() => {}} />
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default EditEventAdmissionDetails;

const styles = StyleSheet.create({
  locationIcon: {
    width: RFPercentage(2.5),
    height: RFPercentage(2.5),
  },
  dateIcon: {
    width: RFPercentage(2),
    height: RFPercentage(2),
  },
  bottomBar: {
    width: '100%',
    borderTopWidth: RFPercentage(0.1),
    borderTopColor: COLORS.lightWhite,
    position: 'absolute',
    bottom: 0,
    paddingTop: RFPercentage(2),
    paddingBottom: RFPercentage(4),
    backgroundColor: COLORS.white,
  },
  bottomContent: {
    width: '90%',
    alignSelf: 'center',
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
    fontFamily: FONTS.regular,
    color: COLORS.inputColor,
    fontSize: RFPercentage(1.9),
  },
});
