import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  TextInput,
  Animated,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Platform,
  KeyboardTypeOptions,
} from 'react-native';
import { RFPercentage } from 'react-native-responsive-fontsize';
import { COLORS, FONTS } from '../config/theme';
import Feather from 'react-native-vector-icons/Feather';
import Clipboard from '@react-native-clipboard/clipboard';

interface Props {
  placeholder: string;
  value: any;
  onChangeText?: (text: string) => void;
  password?: boolean;
  icon?: any;
  style?: object;
  type?: KeyboardTypeOptions;
  autoFocus?: boolean;
  handleBlur?: (event: any) => void;
  copy?: boolean;
  defaultColor?: string;
  focusedColor?: string;
  errorColor?: string;
  hasError?: boolean;
  length?: number;
  disabled?: boolean;
  editable?: boolean;
}

const InputField: React.FC<Props> = ({
  placeholder,
  value,
  onChangeText,
  password = false,
  icon,
  style,
  type,
  autoFocus,
  handleBlur,
  copy,
  defaultColor = COLORS.placeholder,
  focusedColor = COLORS.primary,
  errorColor = COLORS.red,
  hasError = false,
  length,
  disabled,
  editable,
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [secureText, setSecureText] = useState(password);
  const inputRef = useRef<TextInput>(null);

  const getPlaceholderColor = () => {
    if (hasError) return errorColor || COLORS.red;
    if (isFocused) return focusedColor || COLORS.primary;
    return defaultColor || COLORS.fieldBorder;
  };

  const animatedIsFocused = useRef(new Animated.Value(value ? 1 : 0)).current;

  const copyToClipboard = (value: string) => {
    if (value) {
      Clipboard.setString(value);
      console.log('Copied:', value);
    }
  };

  useEffect(() => {
    Animated.timing(animatedIsFocused, {
      toValue: isFocused || value ? 1 : 0,
      duration: 150,
      useNativeDriver: false,
    }).start();
  }, [isFocused, value]);

  const labelStyle = {
    ...styles.label,
    top: animatedIsFocused.interpolate({
      inputRange: [0, 1],
      outputRange: [
        Platform.OS === 'ios' ? RFPercentage(7) / 2.7 : RFPercentage(7) / 3.8,
        Platform.OS === 'ios' ? RFPercentage(1) : RFPercentage(0.5),
      ],
    }),
    fontSize: animatedIsFocused.interpolate({
      inputRange: [0, 1],
      outputRange: [RFPercentage(1.9), RFPercentage(1.6)],
    }),
    color: getPlaceholderColor(),
    fontFamily: isFocused || value ? FONTS.medium : FONTS.regular,
  };

  return (
    <TouchableWithoutFeedback
      onPress={() => inputRef.current?.focus()}
      disabled={disabled}
    >
      <View style={[styles.container, style]}>
        <View style={styles.wrap}>
          <Animated.Text style={[labelStyle]}>{placeholder}</Animated.Text>

          <TextInput
            ref={inputRef}
            style={styles.input}
            value={value}
            onChangeText={onChangeText}
            onFocus={() => setIsFocused(true)}
            keyboardType={type}
            maxLength={length}
            onBlur={event => {
              if (!value) {
                setIsFocused(false);
              }
              handleBlur?.(event);
            }}
            blurOnSubmit
            secureTextEntry={password ? secureText : false}
            autoFocus={autoFocus}
            cursorColor={COLORS.primary}
            selectionColor={COLORS.primary}
            editable={editable}
            autoCorrect={false}
            autoComplete="off"
            textContentType="none"
          />

          {password && (
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

          {icon && (
            <TouchableWithoutFeedback
              onPress={() => {
                if (copy) {
                  copyToClipboard(value);
                } else {
                }
              }}
              style={styles.iconContainer}
            >
              {icon}
            </TouchableWithoutFeedback>
          )}
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
    backgroundColor: COLORS.white,
    borderColor: COLORS.fieldBorder,
    borderRadius: RFPercentage(1.3),
    marginTop: RFPercentage(2),
  },
  label: {
    position: 'absolute',
  },
  wrap: {
    width: '92%',
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
    fontSize: RFPercentage(2.1),
    top: RFPercentage(1.1),
  },
  iconContainer: {
    right: 0,
    top: 0,
  },
  eyeIcon: {
    right: 0,
    top: RFPercentage(0.1),
  },
});
