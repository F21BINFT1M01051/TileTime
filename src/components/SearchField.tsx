import React, { useState } from 'react';
import {
  Platform,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { COLORS, FONTS } from '../config/theme';
import { RFPercentage } from 'react-native-responsive-fontsize';
import Feather from 'react-native-vector-icons/Feather';

interface Props {
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
}

const SearchField = (props: Props) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <View
      style={[
        styles.container,
        {
          borderColor: isFocused ? COLORS.pink : COLORS.fieldBorder,
          backgroundColor: isFocused ? COLORS.white : COLORS.fieldColor,
        },
      ]}
    >
      <View style={styles.inputContainer}>
        <TextInput
          placeholder={props.placeholder}
          placeholderTextColor={COLORS.placeholder}
          style={styles.textInput}
          value={props.value}
          onChangeText={props.onChangeText}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />
        <TouchableOpacity>
          <Feather
            name="search"
            color={COLORS.search}
            size={RFPercentage(2.8)}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SearchField;

const styles = StyleSheet.create({
  container: {
    borderWidth: RFPercentage(0.1),
    width: '100%',
    height: RFPercentage(6),
    backgroundColor: COLORS.fieldColor,
    borderColor: COLORS.fieldBorder,
    borderRadius: RFPercentage(1.3),
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputContainer: {
    width: '90%',
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  textInput: {
    color: COLORS.inputColor,
    fontFamily: FONTS.regular,
    width: '90%',
    fontSize: RFPercentage(1.7),
    marginVertical: 0,
    paddingVertical: 0,
    textAlignVertical: 'center',
    lineHeight: RFPercentage(2),
  },
});
