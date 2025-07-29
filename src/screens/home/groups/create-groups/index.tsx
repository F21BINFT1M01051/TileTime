import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Keyboard,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { RFPercentage } from 'react-native-responsive-fontsize';
import CustomButton from '../../../../components/CustomButton';
import Members from './members';
import About from './about';
import { COLORS, FONTS } from '../../../../config/theme';
import Nav from '../../../../components/Nav';

const steps = ['about', 'members'];

const CreateGroup = ({ navigation }: any) => {
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
    } else {
      navigation.navigate('GroupCreated');
    }
  };

  const getBarColor = (index: any) => {
    if (index < stepIndex) return COLORS.pink;
    if (index === stepIndex) return COLORS.pink;
    return COLORS.fieldColor;
  };

  const renderStepContent = () => {
    switch (stepIndex) {
      case 0:
        return <About />;
      case 1:
        return <Members />;
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
        <Nav title="Create Group" />

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

        <View style={styles.contentWrapper}>{renderStepContent()}</View>
      </ScrollView>

      {!keyboardIsVisible && (
        <>
          <View style={styles.bottomWrapper}>
            <View style={styles.buttonContainer}>
              <CustomButton
                title={
                  stepIndex === 0 ? 'Save And Next' : 'Send Invites & Next'
                }
                onPress={handleNext}
              />
            </View>
          </View>
        </>
      )}
    </KeyboardAvoidingView>
  );
};

export default CreateGroup;

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
    fontSize: RFPercentage(2.7),
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
});
