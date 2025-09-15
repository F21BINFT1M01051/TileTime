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
import DropdownField from '../../../../components/DropDown';

const experience = [
  {
    id: 1,
    name: 'Beginner-friendly',
  },
  {
    id: 2,
    name: 'Fast Paced',
  },
  {
    id: 3,
    name: 'Elder Friendly',
  },
];

const EditEventGameDetails = () => {
  const [applies, setApplies] = useState([experience[0].id]);
  const [varient, setVarient] = useState(null);
  const [isDropdownVisible3, setIsDropdownVisible3] = useState(false);

  const toggleSelection = (id: any) => {
    if (applies.includes(id)) {
      setApplies(applies.filter(item => item !== id));
    } else {
      setApplies([...applies, id]);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={{ flex: 1, backgroundColor: COLORS.white }}>
        <AuthHeader
          title="Edit Game Details"
          style={{ fontFamily: FONTS.semiBold, fontSize: RFPercentage(2) }}
        />
        <ScrollView
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="always"
        >
          <View style={{ width: '90%', alignSelf: 'center' }}>
            <Text style={styles.sectionTitle}>Select What Applies</Text>

            <ScrollView
              horizontal
              style={styles.badgeWrapper}
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.badgeContent}
            >
              {experience.map(item => {
                const isSelected = applies.includes(item.id);
                return (
                  <TouchableOpacity
                    activeOpacity={0.8}
                    key={item.id}
                    style={[
                      styles.experienceBadge,
                      isSelected && { backgroundColor: COLORS.primary },
                    ]}
                    onPress={() => toggleSelection(item.id)}
                  >
                    <Text
                      style={[
                        styles.badgeText,
                        isSelected && { color: COLORS.white },
                        isSelected && { fontFamily: FONTS.semiBold },
                      ]}
                    >
                      {item.name}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </ScrollView>

            {/* Game Varient */}
            <View style={styles.dropdownWrapper}>
              <DropdownField
                placeholder="Choose Game Variant"
                data={[
                  'American (NMJL)',
                  'Chinese',
                  'Riichi',
                  'Wright-Patterson',
                ]}
                selectedValue={varient}
                onValueChange={(val: any) => setVarient(val)}
                isDropdownVisible={isDropdownVisible3}
                setIsDropdownVisible={setIsDropdownVisible3}
              />
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

export default EditEventGameDetails;

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
  badgeWrapper: {
    marginTop: RFPercentage(1.5),
    flexDirection: 'row',
  },
  badgeContent: {
    // paddingHorizontal: RFPercentage(2),
  },
  experienceBadge: {
    height: RFPercentage(4.5),
    paddingHorizontal: RFPercentage(1.8),
    backgroundColor: COLORS.white,
    borderRadius: RFPercentage(100),
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: RFPercentage(1.5),
    marginBottom: RFPercentage(1.5),
  },
  badgeText: {
    color: COLORS.grey3,
    fontSize: RFPercentage(1.7),
    fontFamily: FONTS.medium,
  },
  // Dropdown wrapper for game variant
  dropdownWrapper: {
    width: '100%',
    alignSelf: 'center',
    marginTop: RFPercentage(-0.5),
  },
  sectionTitle: {
    color: COLORS.primary,
    fontSize: RFPercentage(1.7),
    fontFamily: FONTS.medium,
    marginTop: RFPercentage(3),
  },
});
