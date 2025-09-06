import React, { useState, useEffect, useRef } from 'react';
import {
  StyleSheet,
  View,
  Keyboard,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Dimensions,
} from 'react-native';
import { RFPercentage } from 'react-native-responsive-fontsize';
import CustomButton from '../../../../../components/CustomButton';
import Members from './members';
import About from './about';
import { COLORS, FONTS } from '../../../../../config/theme';
import Nav from '../../../../../components/Nav';
import { AboutFormRef } from './about';


const { height } = Dimensions.get('window');

const CreateGroup = ({ navigation }: any) => {
  const [stepIndex, setStepIndex] = useState(0);
  const [keyboardHeight, setKeyboardHeight] = useState(0);
  const aboutFormRef = useRef<AboutFormRef>(null);
  const [isAboutValid, setIsAboutValid] = useState(false);
  const [progress, setProgress] = useState(0);
  const [selectedContacts, setSelectedContacts] = useState<number[]>([]);

  useEffect(() => {
    const showSubscription = Keyboard.addListener('keyboardDidShow', e => {
      setKeyboardHeight(e.endCoordinates.height);
    });
    const hideSubscription = Keyboard.addListener('keyboardDidHide', () => {
      setKeyboardHeight(0);
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
    <View style={{ flex: 1, backgroundColor: COLORS.white }}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        keyboardVerticalOffset={-height}
      >
        <Nav
          title="Create Group"
          onPress={() => {
            stepIndex === 0 ? navigation.goBack() : setStepIndex(stepIndex - 1);
          }}
        />
        <ScrollView
          style={{ flex: 1, backgroundColor: COLORS.white }}
          contentContainerStyle={{
            flexGrow: 1,
            paddingBottom: keyboardHeight + RFPercentage(10),
          }}
          keyboardShouldPersistTaps="always"
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.progressBarBackground}>
            <View style={[styles.progressBarFill, { width: `${progress}%` }]} />
          </View>

          <View style={styles.contentWrapper}>{renderStepContent()}</View>
        </ScrollView>

        <View style={[styles.bottomWrapper]}>
          <View style={styles.buttonContainer}>
            <CustomButton
              title={stepIndex === 0 ? 'Save And Next' : 'Send Invites & Next'}
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
      </KeyboardAvoidingView>
    </View>
  );
};

export default CreateGroup;

const styles = StyleSheet.create({
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
    backgroundColor: COLORS.pink,
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
  },
  buttonContainer: {
    width: '90%',
    alignSelf: 'center',
  },
});
