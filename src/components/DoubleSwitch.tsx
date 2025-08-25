import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';
import { RFPercentage } from 'react-native-responsive-fontsize';
import { COLORS, FONTS, ICONS } from '../config/theme';
import ToggleSwitch from 'toggle-switch-react-native';

const DoubleSwitch = () => {
  const [isOn, setIsOn] = useState(false);
  const [isOn2, setIsOn2] = useState(false);

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <Image
          source={ICONS.send2}
          resizeMode="contain"
          style={styles.icon}
        />
        <Text style={styles.label}>Send messages</Text>
        <ToggleSwitch
          isOn={isOn}
          onColor={COLORS.pink}
          offColor={COLORS.switch}
          size="small"
          onToggle={() => setIsOn(!isOn)}
          style={styles.toggle}
        />
      </View>

      <View style={styles.rowWithMargin}>
        <Image
          source={ICONS.user5}
          resizeMode="contain"
          style={styles.icon}
        />
        <Text style={styles.label}>Add other members</Text>
        <ToggleSwitch
          isOn={isOn2}
          onColor={COLORS.pink}
          offColor={COLORS.switch}
          size="small"
          onToggle={() => setIsOn2(!isOn2)}
          style={styles.toggle}
        />
      </View>
    </View>
  );
};

export default DoubleSwitch;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: RFPercentage(11),
    backgroundColor: COLORS.white,
    borderRadius: RFPercentage(2),
    borderWidth: RFPercentage(0.1),
    borderColor: COLORS.lightWhite,
    alignItems: 'center',
    justifyContent: 'center',
  },
  row: {
    width: '90%',
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    height: RFPercentage(4),
  },
  rowWithMargin: {
    width: '90%',
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    height: RFPercentage(4),
    marginTop: RFPercentage(0.5),
  },
  icon: {
    width: RFPercentage(2.5),
    height: RFPercentage(2.5),
  },
  label: {
    fontFamily: FONTS.regular,
    color: COLORS.primary,
    fontSize: RFPercentage(2),
    marginLeft: RFPercentage(1.5),
  },
  toggle: {
    position: 'absolute',
    right: 0,
  },
});
