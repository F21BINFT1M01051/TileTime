import React, { useState, useEffect } from 'react';
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
import { COLORS, FONTS } from '../../../config/theme';
import { RFPercentage } from 'react-native-responsive-fontsize';
import AntDesign from 'react-native-vector-icons/AntDesign';
import PersonalInfo from './personal_info';
import CustomButton from '../../../components/CustomButton';
import About from './about';
import ProffessionalInfo from './proffessional';
import Address from './address';

const steps = ['personal', 'about', 'professional', 'address'];

const ProfileSetup = ({ navigation }: any) => {
  const [stepIndex, setStepIndex] = useState(0);
  const [keyboardIsVisible, setKeyboardIsVisible] = useState(false);

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

  const handleNext = () => {
    if (stepIndex < steps.length - 1) {
      setStepIndex(stepIndex + 1);
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
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={{ flex: 1 }}
    >
      <ScrollView
        style={{ flex: 1, backgroundColor: COLORS.white }}
        contentContainerStyle={{ flexGrow: 1, paddingBottom: RFPercentage(10) }}
        keyboardShouldPersistTaps="handled"
      >
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => {
              stepIndex === 0
                ? navigation.goBack()
                : setStepIndex(stepIndex - 1);
            }}
          >
            <AntDesign
              name="arrowleft"
              size={RFPercentage(2.6)}
              color={COLORS.grey}
            />
          </TouchableOpacity>

          <Text style={styles.headerText}>Set Up Your Profile</Text>
        </View>

        {/* Step Bars */}
        <View style={styles.stepBarContainer}>
          {steps.map((_, index) => (
            <View
              key={index}
              style={[
                styles.stepBar,
                {
                  backgroundColor: getBarColor(index),
                  marginLeft: index === 0 ? 0 : RFPercentage(0.7),
                },
              ]}
            />
          ))}
        </View>

        {/* Step Content */}
        <View style={styles.contentWrapper}>{renderStepContent()}</View>
      </ScrollView>

      {/* Bottom Button (Hidden when keyboard is visible) */}
      {!keyboardIsVisible && (
        <>
          <View>
            {stepIndex !== 0 && (
              <TouchableOpacity style={styles.skip}>
                <Text style={styles.skipText}>Skip For Now</Text>
              </TouchableOpacity>
            )}
          </View>
          <View style={styles.bottomWrapper}>
            <View style={styles.buttonContainer}>
              <CustomButton title="Save And Next" onPress={handleNext} />
            </View>
          </View>
        </>
      )}
    </KeyboardAvoidingView>
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
    borderColor: COLORS.fieldBorder,
    paddingHorizontal: RFPercentage(2),
    marginTop: RFPercentage(7),
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
    width: RFPercentage(7),
    height: RFPercentage(0.8),
    borderRadius: RFPercentage(100),
  },
  contentWrapper: {
    width: '90%',
    alignSelf: 'center',
    marginTop: RFPercentage(4.5),
    flex: 1,
  },
  bottomWrapper: {
    width: '100%',
    paddingVertical: RFPercentage(3),
    borderTopWidth: 1,
    borderTopColor: COLORS.lightWhite,
    backgroundColor: COLORS.white,
  },
  buttonContainer: {
    width: '90%',
    alignSelf: 'center',
  },
  skipText: {
    textAlign: 'center',
    fontFamily: FONTS.medium,
    color: COLORS.black,
    fontSize: RFPercentage(1.9),
  },
  skip: {
    alignSelf: 'center',
    paddingVertical: RFPercentage(1.5),
    backgroundColor: COLORS.white,
    width: '100%',
  },
});
