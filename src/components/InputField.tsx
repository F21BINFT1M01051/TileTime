import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { TextInput, Provider as PaperProvider } from 'react-native-paper';
import { COLORS, FONTS } from '../config/theme';
import { RFPercentage } from 'react-native-responsive-fontsize';

interface Props {
  value: string;
 changeText: (text: string) => void;
   placeholder: string;
  icon: boolean;
  iconName: string;
}
const InputField = (props: Props) => {
  return (
    <View style={{ marginTop: RFPercentage(2) }}>
      <TextInput
        label={props.placeholder}
        value={props.value}
        onChangeText={props.changeText}
        mode="flat"
        underlineColor="transparent"
        activeUnderlineColor="transparent" // Keep it transparent
        style={styles.input}
        contentStyle={styles.contentStyle}
        textColor={COLORS.inputColor}
        cursorColor={COLORS.inputColor}
        right={props.icon ? <TextInput.Icon icon={props.iconName} /> : null}
        theme={{
          colors: {
            primary: COLORS.fieldBorder, 
            onSurfaceVariant: '#999', 
            background: 'transparent',
            surfaceVariant: 'transparent',
          },
        }}
      />
    </View>
  );
};

export default InputField;

const styles = StyleSheet.create({
  input: {
    backgroundColor: COLORS.fieldColor,
    fontSize: RFPercentage(1.8),
    fontFamily: FONTS.regular,
    height: RFPercentage(8),
  },
  contentStyle: {
    backgroundColor: COLORS.fieldColor,
    // borderWidth: 1,
    // borderColor: COLORS.fieldBorder,
    borderRadius: 4,
  },
});
