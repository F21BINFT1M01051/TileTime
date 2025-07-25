import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  TextInput,
  Animated,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { RFPercentage } from 'react-native-responsive-fontsize';
import { COLORS, FONTS } from '../config/theme';
import Feather from 'react-native-vector-icons/Feather';

interface Props {
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
  password?: boolean;
  icon?: any;
}

const InputField = (props: Props) => {
  const [isFocused, setIsFocused] = useState(false);
  const [secureText, setSecureText] = useState(props.password);

  const animatedIsFocused = useRef(
    new Animated.Value(props.value ? 1 : 0),
  ).current;

  useEffect(() => {
    Animated.timing(animatedIsFocused, {
      toValue: isFocused || props.value ? 1 : 0,
      duration: 150,
      useNativeDriver: false,
    }).start();
  }, [isFocused, props.value]);

  const labelStyle = {
    ...styles.label,
    top: animatedIsFocused.interpolate({
      inputRange: [0, 1],
      outputRange: [RFPercentage(2.7), RFPercentage(1.1)],
    }),
    fontSize: animatedIsFocused.interpolate({
      inputRange: [0, 1],
      outputRange: [RFPercentage(1.8), RFPercentage(1.5)],
    }),
    color: animatedIsFocused.interpolate({
      inputRange: [0, 1],
      outputRange: [COLORS.placeholder, COLORS.focused],
    }),
    fontFamily: isFocused || props.value ? FONTS.medium2 : FONTS.regular,
  };

  return (
    <View style={styles.container}>
      <Animated.Text style={labelStyle}>{props.placeholder}</Animated.Text>

      <TextInput
        style={styles.input}
        value={props.value}
        onChangeText={props.onChangeText}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        blurOnSubmit
        secureTextEntry={props.password ? secureText : false}
      />

      {props.password && (
        <TouchableOpacity
          style={styles.eyeIcon}
          onPress={() => setSecureText(prev => !prev)}
        >
          <Feather
            name={secureText ? 'eye-off' : 'eye'}
            color={COLORS.icon}
            size={RFPercentage(2.3)}
          />
        </TouchableOpacity>
      )}

      {props.icon && <View style={styles.iconContainer}>{props.icon}</View>}
    </View>
  );
};

export default InputField;

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    width: '100%',
    height: RFPercentage(8),
    paddingVertical: RFPercentage(1),
    backgroundColor: COLORS.fieldColor,
    borderColor: COLORS.fieldBorder,
    borderRadius: RFPercentage(1.5),
    marginTop: RFPercentage(2),
    paddingHorizontal: RFPercentage(1.6),
  },
  label: {
    position: 'absolute',
    left: RFPercentage(2),
  },
  input: {
    height: RFPercentage(6),
    color: COLORS.inputColor,
    fontFamily: FONTS.regular,
    width: '90%',
    marginTop: RFPercentage(1.2),
  },
  iconContainer: {
    position: 'absolute',
    right: RFPercentage(2),
    top: RFPercentage(2.6),
  },
  eyeIcon: {
    position: 'absolute',
    right: RFPercentage(2),
    top: RFPercentage(2.6),
  },
});
