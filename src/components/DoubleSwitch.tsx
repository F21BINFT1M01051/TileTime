import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';
import { RFPercentage } from 'react-native-responsive-fontsize';
import { COLORS, FONTS, ICONS } from '../config/theme';
import ToggleSwitch from 'toggle-switch-react-native';

const DoubleSwitch = () => {
  const [isOn, setIsOn] = useState(false);
  const [isOn2, setIsOn2] = useState(false);

  return (
    <View
      style={{
        width: '100%',
        height: RFPercentage(11),
        backgroundColor: COLORS.white,
        borderRadius: RFPercentage(2),
        borderWidth: RFPercentage(0.1),
        borderColor: COLORS.lightWhite,
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <View
        style={{
          width: '90%',
          alignSelf: 'center',
          flexDirection: 'row',
          alignItems: 'center',
          height: RFPercentage(4),
        }}
      >
        <Image
          source={ICONS.send2}
          resizeMode="contain"
          style={{ width: RFPercentage(2.5), height: RFPercentage(2.5) }}
        />
        <Text
          style={{
            fontFamily: FONTS.regular,
            color: COLORS.primary,
            fontSize: RFPercentage(1.8),
            marginLeft: RFPercentage(1.5),
          }}
        >
          Send messages
        </Text>

        <>
          <ToggleSwitch
            isOn={isOn}
            onColor={COLORS.pink}
            offColor={COLORS.switch}
            size="small"
            onToggle={() => setIsOn(!isOn)}
            style={{ position: 'absolute', right: 0 }}
          />
        </>
      </View>

      <View
        style={{
          width: '90%',
          alignSelf: 'center',
          flexDirection: 'row',
          alignItems: 'center',
          height: RFPercentage(4),
          marginTop: RFPercentage(0.5),
        }}
      >
        <Image
          source={ICONS.user5}
          resizeMode="contain"
          style={{ width: RFPercentage(2.5), height: RFPercentage(2.5) }}
        />
        <Text
          style={{
            fontFamily: FONTS.regular,
            color: COLORS.primary,
            fontSize: RFPercentage(1.8),
            marginLeft: RFPercentage(1.5),
          }}
        >
          Add other members
        </Text>

        <>
          <ToggleSwitch
            isOn={isOn2}
            onColor={COLORS.pink}
            offColor={COLORS.switch}
            size="small"
            onToggle={() => setIsOn2(!isOn2)}
            style={{ position: 'absolute', right: 0 }}
          />
        </>
      </View>
    </View>
  );
};

export default DoubleSwitch;

const styles = StyleSheet.create({});
