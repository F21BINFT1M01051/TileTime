import React, { useState, useRef } from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Keyboard,
  TouchableWithoutFeedback,
} from 'react-native';
import { COLORS, FONTS } from '../../../config/theme';
import { RFPercentage } from 'react-native-responsive-fontsize';
import CustomButton from '../../../components/CustomButton';
import About, { AboutFormRef } from './about';
import ProffessionalInfo from './proffessional';
import AuthHeader from '../../../components/AuthHeader';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

const InstructorProfileSetup = ({ navigation }: any) => {
  const [stepIndex, setStepIndex] = useState(0);
  const aboutFormRef = useRef<AboutFormRef>(null);
  const [isAboutValid, setIsAboutValid] = useState(false);
  const [progress, setProgress] = useState(0);
  const [hasExperience, setHasExperience] = useState(false);

  const handleNext = async () => {
    try {
      if (stepIndex === 0 && aboutFormRef.current) {
        const errors = await aboutFormRef.current.validateForm();
        if (Object.keys(errors).length === 0) {
          setStepIndex(stepIndex + 1);
          setProgress(50);
        }
      } else if (stepIndex === 1) {
        if (hasExperience) setProgress(100);
        navigation.navigate('InstructorTabs');
      }
    } catch (error) {
      console.log('Validation error:', error);
    }
  };

  const renderStepContent = () => {
    switch (stepIndex) {
      case 0:
        return <About ref={aboutFormRef} setFormValid={setIsAboutValid} />;
      case 1:
        return <ProffessionalInfo setHasExperience={setHasExperience} />;
      default:
        return null;
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={{ flex: 1, backgroundColor: COLORS.white }}>
        <AuthHeader
          title="Set Up Your Profile"
          onPress={() =>
            stepIndex === 0 ? navigation.goBack() : setStepIndex(stepIndex - 1)
          }
        />

        {/* Scrollable content that automatically avoids keyboard */}
        <KeyboardAwareScrollView
          contentContainerStyle={{ paddingBottom: RFPercentage(7), flexGrow: 1 }}
          keyboardShouldPersistTaps="handled"
          enableOnAndroid
          extraScrollHeight={80}
        >
          <View style={styles.progressBarBackground}>
            <View style={[styles.progressBarFill, { width: `${progress}%` }]} />
          </View>

          {renderStepContent()}
        </KeyboardAwareScrollView>

        {/* Fixed bottom area */}
        {stepIndex !== 0 && (
          <View style={{ width: '100%', backgroundColor: COLORS.white }}>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => navigation.navigate('InstructorTabs')}
              style={styles.skip}
            >
              <Text style={styles.skipText}>Skip For Now</Text>
            </TouchableOpacity>
          </View>
        )}

        <View style={styles.bottomWrapper}>
          <CustomButton
            title="Save And Next"
            onPress={handleNext}
            style={{
              backgroundColor:
                stepIndex === 0 && !isAboutValid
                  ? COLORS.disabled
                  : COLORS.primary,
              width: '90%',
            }}
          />
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default InstructorProfileSetup;

const styles = StyleSheet.create({
  progressBarBackground: {
    width: '90%',
    height: RFPercentage(0.7),
    backgroundColor: COLORS.fieldColor,
    borderRadius: RFPercentage(100),
    overflow: 'hidden',
    alignSelf: 'center',
    marginTop: RFPercentage(2),
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: COLORS.pink,
    borderRadius: RFPercentage(100),
  },
  bottomWrapper: {
    width: '100%',
    paddingVertical: RFPercentage(2),
    borderTopWidth: 1,
    borderTopColor: COLORS.lightWhite,
    backgroundColor: COLORS.white,
    paddingBottom: RFPercentage(4),
    alignItems: 'center',
  },
  skipText: {
    textAlign: 'center',
    fontFamily: FONTS.semiBold,
    color: COLORS.black,
    fontSize: RFPercentage(1.9),
  },
  skip: {
    alignSelf: 'center',
    paddingVertical: RFPercentage(1.5),
    backgroundColor: COLORS.white,
  },
});
