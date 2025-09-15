import {
  StyleSheet,
  Image,
  View,
  Platform,
  ScrollView,
  TouchableOpacity,
  Text,
  TouchableWithoutFeedback,
  Keyboard,
  TextInput,
} from 'react-native';
import React, { useState } from 'react';
import { COLORS, FONTS, ICONS } from '../../../../config/theme';
import AuthHeader from '../../../../components/AuthHeader';
import { RFPercentage } from 'react-native-responsive-fontsize';
import CustomButton from '../../../../components/CustomButton';

const EditEventDescription = () => {
  const [description, setDescription] = useState(
    'Join fellow Mahjong enthusiasts for an evening of friendly matches and lively conversation',
  );

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={{ flex: 1, backgroundColor: COLORS.white }}>
        <AuthHeader
          title="Edit Description"
          style={{ fontFamily: FONTS.semiBold, fontSize: RFPercentage(2) }}
        />
        <ScrollView
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="always"
        >
          <View style={{ width: '90%', alignSelf: 'center' }}>
            <View style={styles.bioWrapper}>
              <View style={styles.bioContainer}>
                <View style={styles.bioInputWrapper}>
                  <Text
                    style={{
                      color: COLORS.primary,
                      fontFamily: FONTS.medium,
                      fontSize: RFPercentage(1.8),
                    }}
                  >
                    Event Description
                  </Text>
                  <TextInput
                    style={styles.bioInput}
                    multiline={true}
                    maxLength={170}
                    cursorColor={COLORS.primary}
                    selectionColor={COLORS.primary}
                    value={description}
                    onChangeText={setDescription}
                  />
                </View>
                <View style={styles.bioIconWrapper}>
                  <Image
                    source={ICONS.bars}
                    resizeMode="contain"
                    style={styles.bioIcon}
                  />
                </View>
              </View>
            </View>
          </View>
        </ScrollView>
        <View style={styles.bottomBar}>
          <View style={styles.bottomContent}>
            <CustomButton title="Save" onPress={() => {}} />
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default EditEventDescription;

const styles = StyleSheet.create({
  bottomBar: {
    width: '100%',
    borderTopWidth: RFPercentage(0.1),
    borderTopColor: COLORS.lightWhite,
    position: 'absolute',
    bottom: 0,
    paddingTop: RFPercentage(2),
    paddingBottom: RFPercentage(4),
    backgroundColor: COLORS.white,
  },
  bottomContent: {
    width: '90%',
    alignSelf: 'center',
  },
  bioWrapper: {
    marginTop: RFPercentage(3),
  },
  bioContainer: {
    backgroundColor: COLORS.white,
    borderWidth: RFPercentage(0.1),
    borderColor: COLORS.fieldBorder,
    borderRadius: RFPercentage(1.5),
  },
  bioInputWrapper: {
    width: '92%',
    alignSelf: 'center',
    marginTop: RFPercentage(1),
  },
  bioInput: {
    width: '100%',
    alignSelf: 'center',
    textAlignVertical: 'top',
    fontFamily: FONTS.regular,
    color: COLORS.inputColor,
    lineHeight: RFPercentage(2.2),
    fontSize: RFPercentage(1.8),
    height: RFPercentage(12),
    paddingHorizontal: 0,
    paddingVertical: 0,
    marginTop: RFPercentage(0.5),
  },
  bioIconWrapper: {
    alignSelf: 'flex-end',
    right: RFPercentage(0.5),
    bottom: RFPercentage(0.5),
  },
  bioIcon: {
    width: RFPercentage(1.5),
    height: RFPercentage(1.5),
  },
});
