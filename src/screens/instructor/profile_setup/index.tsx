import React, { useState, useEffect, useRef } from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Keyboard,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { COLORS, FONTS, ICONS } from '../../../config/theme';
import { RFPercentage } from 'react-native-responsive-fontsize';
import CustomButton from '../../../components/CustomButton';
import About from './about';
import ProffessionalInfo from './proffessional';
import { AboutFormRef } from './about';
import AuthHeader from '../../../components/AuthHeader';

const steps = ['about', 'professional'];

const InstructorProfileSetup = ({ navigation }: any) => {
  const [stepIndex, setStepIndex] = useState(0);
  const [keyboardIsVisible, setKeyboardIsVisible] = useState(false);
  const aboutFormRef = useRef<AboutFormRef>(null);
  const [isAboutValid, setIsAboutValid] = useState(false);
  const scrollViewRef = useRef<ScrollView>(null);

  useEffect(() => {
    const showSubscription = Keyboard.addListener('keyboardDidShow', () => {
      setKeyboardIsVisible(true);
    });
    const hideSubscription = Keyboard.addListener('keyboardDidHide', () => {
      setKeyboardIsVisible(false);
    });

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);

  const handleNext = async () => {
    try {
      if (stepIndex === 0 && aboutFormRef.current) {
        const errors = await aboutFormRef.current.validateForm();
        if (Object.keys(errors).length === 0) {
          setStepIndex(stepIndex + 1);
        }
      } else if (stepIndex < steps.length - 1) {
        setStepIndex(stepIndex + 1);
      } else {
        navigation.navigate('InstructorTabs');
      }
    } catch (error) {
      console.log('Validation error:', error);
    }
  };

  const getBarColor = (index: any) => {
    if (index < stepIndex) return COLORS.green;
    if (index === stepIndex) return COLORS.pink;
    return COLORS.fieldColor;
  };

  const renderStepContent = () => {
    switch (stepIndex) {
      case 0:
        return <About ref={aboutFormRef} setFormValid={setIsAboutValid} />;
      case 1:
        return <ProffessionalInfo />;
      default:
        return null;
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: COLORS.white }}>
      <AuthHeader
        title="Set Up Your Profile"
        onPress={() => {
          stepIndex === 0 ? navigation.goBack() : setStepIndex(stepIndex - 1);
        }}
      />
      <ScrollView
        style={{ flex: 1, backgroundColor: COLORS.white }}
        contentContainerStyle={{ flexGrow: 1, paddingBottom: RFPercentage(3) }}
        showsVerticalScrollIndicator={false}
      >
        {/* Step Bars */}
        {/* Progress Bar */}
        <View style={styles.progressBarBackground}>
          <View
            style={[
              styles.progressBarFill,
              { width: `${((stepIndex + 1) / steps.length) * 100}%` },
            ]}
          />
        </View>

        {/* Step Content */}
        <View style={styles.contentWrapper}>{renderStepContent()}</View>
      </ScrollView>

      {!keyboardIsVisible && (
        <>
          {stepIndex !== 0 && (
            <View style={{ width: '100%', backgroundColor: COLORS.white }}>
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => {
                  navigation.navigate('BottomTabs');
                }}
                style={styles.skip}
              >
                <Text style={styles.skipText}>Skip For Now</Text>
              </TouchableOpacity>
            </View>
          )}

          <View style={styles.bottomWrapper}>
            <View style={styles.buttonContainer}>
              <CustomButton
                title="Save And Next"
                onPress={handleNext}
                // disabled={stepIndex === 0 && !isAboutValid}
                style={{
                  backgroundColor:
                    stepIndex === 0 && !isAboutValid
                      ? COLORS.disabled
                      : COLORS.primary,
                }}
              />
            </View>
          </View>
        </>
      )}
    </View>
  );
};

export default InstructorProfileSetup;

const styles = StyleSheet.create({
  header: {
    width: '100%',
    borderBottomWidth: RFPercentage(0.1),
    paddingBottom: RFPercentage(1.5),
    borderColor: COLORS.fieldBorder,
    height: RFPercentage(12),
    justifyContent: 'flex-end',
  },
  progressBarBackground: {
    width: '90%',
    height: RFPercentage(0.8),
    backgroundColor: COLORS.fieldColor,
    borderRadius: RFPercentage(100),
    overflow: 'hidden',
    alignSelf: 'center',
    marginTop: RFPercentage(2),
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: COLORS.pink, // current progress color
    borderRadius: RFPercentage(100),
  },

  stepBar: {
    width: RFPercentage(7),
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
    width: '100%',
    paddingVertical: RFPercentage(2),
    borderTopWidth: 1,
    borderTopColor: COLORS.lightWhite,
    backgroundColor: COLORS.white,
    paddingBottom: RFPercentage(4),
  },
  buttonContainer: {
    width: '90%',
    alignSelf: 'center',
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
