import React, { useState, useEffect, useRef } from 'react';
import {
  StyleSheet,
  View,
  Keyboard,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { RFPercentage } from 'react-native-responsive-fontsize';
import CustomButton from '../../../../../components/CustomButton';
import Members from './members';
import About from './about';
import { COLORS, FONTS } from '../../../../../config/theme';
import Nav from '../../../../../components/Nav';
import { AboutFormRef } from './about';

const steps = ['about', 'members'];

const CreateGroup = ({ navigation }: any) => {
  const [stepIndex, setStepIndex] = useState(0);
  const [keyboardIsVisible, setKeyboardIsVisible] = useState(false);
  const aboutFormRef = useRef<AboutFormRef>(null);
  const [isAboutValid, setIsAboutValid] = useState(false);
  const [progress, setProgress] = useState(0); // track progress explicitly
  const [selectedContacts, setSelectedContacts] = useState<number[]>([]);

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
          setStepIndex(1);
          setProgress(50);
        }
      } else if (stepIndex === 1) {
        setProgress(100);
        navigation.navigate('ChatScreen', { isGroup: true, isNew: true });
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
        return (
          <Members
            selectedContacts={selectedContacts}
            setSelectedContacts={setSelectedContacts}
          />
        );
      default:
        return null;
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={{ flex: 1, backgroundColor: COLORS.white }}
    >
      <Nav
        title="Create Group"
        onPress={() => {
          stepIndex === 0 ? navigation.goBack() : setStepIndex(stepIndex - 1);
        }}
      />
      <ScrollView
        style={{ flex: 1, backgroundColor: COLORS.white }}
        contentContainerStyle={{ flexGrow: 1, paddingBottom: RFPercentage(5) }}
        keyboardShouldPersistTaps="always"
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.progressBarBackground}>
          <View style={[styles.progressBarFill, { width: `${progress}%` }]} />
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
                style={{
                  backgroundColor:
                    (stepIndex === 0 && !isAboutValid) ||
                    (stepIndex === 1 && selectedContacts.length === 0)
                      ? COLORS.disabled
                      : COLORS.primary,
                }}
                disabled={
                  (stepIndex === 0 && !isAboutValid) ||
                  (stepIndex === 1 && selectedContacts.length === 0)
                }
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
    marginTop: RFPercentage(3.5),
    flex: 1,
  },
  bottomWrapper: {
    width: '100%',
    paddingVertical: RFPercentage(2),
    borderTopWidth: 1,
    borderTopColor: COLORS.lightWhite,
    backgroundColor: COLORS.white,
    paddingBottom: RFPercentage(4),
    position: 'absolute',
    bottom: 0,
  },
  buttonContainer: {
    width: '90%',
    alignSelf: 'center',
  },
});
