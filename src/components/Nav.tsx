import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React from 'react';
import { RFPercentage } from 'react-native-responsive-fontsize';
import { COLORS, FONTS } from '../config/theme';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { useNavigation } from '@react-navigation/native';

interface Props {
  title: string;
  style?: object;
  onPress? : ()=> void
}

const Nav = (props: Props) => {
  const navigation = useNavigation();
  return (
    <View style={styles.auth}>
      <View style={styles.content}>
        <TouchableOpacity
          onPress={props.onPress}
        >
          <AntDesign
            name="arrowleft"
            size={RFPercentage(2.6)}
            color={COLORS.grey}
          />
        </TouchableOpacity>
        <Text style={[styles.headerText, props.style]}>{props.title}</Text>
      </View>
    </View>
  );
};

export default Nav;

const styles = StyleSheet.create({
  headerText: {
    fontFamily: FONTS.headline,
    color: COLORS.primary,
    fontSize: RFPercentage(2.7),
    marginLeft: RFPercentage(1.2),
  },
  auth: {
    width: '100%',
    height: RFPercentage(11),
    justifyContent: 'flex-end',
    borderBottomWidth: RFPercentage(0.1),
    borderBottomColor: COLORS.fieldBorder,
    marginTop: RFPercentage(2),
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '90%',
    alignSelf: 'center',
    paddingBottom: RFPercentage(2),
  },
});
