import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  TextInput,
  Animated,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
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
  style?: object;
  type?: string;
}

const InputField = (props: Props) => {
  const [isFocused, setIsFocused] = useState(false);
  const [secureText, setSecureText] = useState(props.password);
  const inputRef = useRef<TextInput>(null); // Reference for focusing

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
      outputRange: [RFPercentage(7) / 3.2, RFPercentage(0.6)],
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
    <TouchableWithoutFeedback onPress={() => inputRef.current?.focus()}>
      <View style={[styles.container, props.style]}>
        <View style={styles.wrap}>
          <Animated.Text style={labelStyle}>{props.placeholder}</Animated.Text>

          <TextInput
            ref={inputRef}
            style={styles.input}
            value={props.value}
            onChangeText={props.onChangeText}
            onFocus={() => setIsFocused(true)}
            keyboardType={props.type}
            onBlur={() => {
              if (!props.value) {
                setIsFocused(false);
              }
            }}
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
                size={RFPercentage(2)}
              />
            </TouchableOpacity>
          )}

          {props.icon && <View style={styles.iconContainer}>{props.icon}</View>}
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default InputField;

const styles = StyleSheet.create({
  container: {
    borderWidth: RFPercentage(0.1),
    width: '100%',
    height: RFPercentage(7),
    backgroundColor: COLORS.fieldColor,
    borderColor: COLORS.fieldBorder,
    borderRadius: RFPercentage(1.3),
    marginTop: RFPercentage(2),
  },
  label: {
    position: 'absolute',
  },
  wrap: {
    width: '90%',
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: RFPercentage(7),
  },
  input: {
    color: COLORS.inputColor,
    fontFamily: FONTS.regular,
    width: '90%',
    paddingVertical: 0,
    paddingHorizontal: 0,
    fontSize: RFPercentage(2),
    top: RFPercentage(1),
  },
  iconContainer: {
    right: 0,
    top: 0,
  },
  eyeIcon: {
    right: 0,
    top: 0,
  },
});
