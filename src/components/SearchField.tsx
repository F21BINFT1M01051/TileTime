import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import { COLORS, FONTS } from '../config/theme';
import { RFPercentage } from 'react-native-responsive-fontsize';
import Feather from 'react-native-vector-icons/Feather';

interface Props {
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
}

const SearchField = (props: Props) => {
  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          placeholder={props.placeholder}
          placeholderTextColor={COLORS.placeholder}
          style={styles.textInput}
          value={props.value}
          onChangeText={props.onChangeText}
        />
        <TouchableOpacity>
          <Feather name="search" color={'#9C9EA6'} size={RFPercentage(2.8)} />
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
    height: RFPercentage(6.6),
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
  },
});
