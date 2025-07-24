import { StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
import { COLORS, FONTS } from '../../../config/theme';
import { RFPercentage } from 'react-native-responsive-fontsize';
import AntDesign from 'react-native-vector-icons/AntDesign';
import PersonalInfo from './personal_info';
import CustomButton from '../../../components/CustomButton';
import About from './about';
import ProffessionalInfo from './proffessional';
import Address from './address';

const steps = ['personal', 'about', 'professional', 'address'];

const ProfileSetup = () => {
  const [stepIndex, setStepIndex] = useState(0);

  const handleNext = () => {
    if (stepIndex < steps.length - 1) {
      setStepIndex(stepIndex + 1);
    }
  };

  const getBarColor = (index: any) => {
    if (index < stepIndex) return '#0A8B65'; // completed
    if (index === stepIndex) return '#B14088'; // active
    return '#F2F2F2'; // default
  };

  const renderStepContent = () => {
    switch (stepIndex) {
      case 0:
        return <PersonalInfo />;
      case 1:
        return <About />;
      case 2:
        return <ProffessionalInfo />;
      case 3:
        return <Address />;
      default:
        return null;
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: COLORS.white }}>
      {/* Header */}
      <View style={styles.header}>
        <AntDesign name="arrowleft" size={RFPercentage(2.6)} color={'#1D1D1D'} />
        <Text style={styles.headerText}>Set Up Your Profile</Text>
      </View>

      {/* Step Bars */}
      <View style={styles.stepBarContainer}>
        {steps.map((_, index) => (
          <View
            key={index}
            style={[
              styles.stepBar,
              { backgroundColor: getBarColor(index), marginLeft: index === 0 ? 0 : RFPercentage(0.7) },
            ]}
          />
        ))}
      </View>

      {/* Step Content */}
      <View style={styles.contentWrapper}>{renderStepContent()}</View>

      {/* Bottom Button */}
      <View style={styles.bottomWrapper}>
        <View style={styles.buttonContainer}>
          <CustomButton title="Save and Next" onPress={handleNext} />
        </View>
      </View>
    </View>
  );
};

export default ProfileSetup;

const styles = StyleSheet.create({
  header: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    paddingBottom: RFPercentage(2.3),
    borderColor: '#DEDEDE',
    paddingHorizontal: RFPercentage(3.5),
    marginTop: RFPercentage(6),
  },
  headerText: {
    fontFamily: FONTS.headline,
    color: COLORS.primary,
    fontSize: RFPercentage(2.6),
    marginLeft: RFPercentage(1.2),
  },
  stepBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '90%',
    alignSelf: 'center',
    marginTop: RFPercentage(2),
  },
  stepBar: {
    width: RFPercentage(9),
    height: RFPercentage(0.8),
    borderRadius: RFPercentage(100),
  },
  contentWrapper: {
    width: '90%',
    alignSelf: 'center',
    marginTop: RFPercentage(4),
    flex: 1,
  },
  bottomWrapper: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: RFPercentage(13),
    borderTopWidth: 1,
    borderTopColor: '#EEEEEE',
  },
  buttonContainer: {
    width: '90%',
    alignSelf: 'center',
    top: RFPercentage(2),
  },
});
