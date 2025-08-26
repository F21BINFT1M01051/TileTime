import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Animated,
  StyleSheet,
  TouchableWithoutFeedback,
  Platform,
  Text,
} from 'react-native';
import { RFPercentage } from 'react-native-responsive-fontsize';
import { COLORS, FONTS } from '../config/theme';

interface Props {
  placeholder: string;
  selectedText: string;
  icon?: React.ReactNode;
  style?: object;
  defaultColor?: string;
  focusedColor?: string;
  errorColor?: string;
  hasError?: boolean;
  onPress: () => void;
}

const FocusedSelection: React.FC<Props> = ({
  placeholder,
  selectedText,
  style,
  defaultColor = COLORS.placeholder,
  focusedColor = COLORS.focused,
  errorColor = COLORS.red,
  hasError = false,
  icon,
  onPress,
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const hasValue = Boolean(selectedText);

  const getPlaceholderColor = () => {
    if (hasError) return errorColor;
    if (isFocused || hasValue) return focusedColor;
    return defaultColor;
  };

  const animatedIsFocused = useRef(
    new Animated.Value(hasValue ? 1 : 0),
  ).current;

  useEffect(() => {
    Animated.timing(animatedIsFocused, {
      toValue: isFocused || hasValue ? 1 : 0,
      duration: 150,
      useNativeDriver: false,
    }).start();
  }, [isFocused, hasValue]);

  const labelStyle = {
    ...styles.label,
    top: animatedIsFocused.interpolate({
      inputRange: [0, 1],
      outputRange: [RFPercentage(7) / 2.8, RFPercentage(0.8)],
    }),
    fontSize: animatedIsFocused.interpolate({
      inputRange: [0, 1],
      outputRange: [RFPercentage(1.8), RFPercentage(1.5)],
    }),
    color: getPlaceholderColor(),
    fontFamily: isFocused || hasValue ? FONTS.medium2 : FONTS.regular,
  };

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        setIsFocused(true);
        onPress();
      }}
      onBlur={() => setIsFocused(false)}
    >
      <View style={[styles.container, style]}>
        <View style={styles.wrap}>
          <Animated.Text style={labelStyle}>{placeholder}</Animated.Text>
          <Text style={styles.valueText}>{selectedText || ''}</Text>
          {icon && <View style={styles.iconContainer}>{icon}</View>}
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default FocusedSelection;

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
  valueText: {
    color: COLORS.inputColor,
    fontFamily: FONTS.regular,
    fontSize: RFPercentage(1.8),
    top: RFPercentage(1.2),
  },
  iconContainer: {
    right: 0,
    top: 0,
  },
});
