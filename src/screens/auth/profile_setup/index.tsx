import React, { useState, useEffect, useRef } from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Keyboard,
  ScrollView,
  KeyboardAvoidingView,
  Modal,
  Animated,
  Easing,
  Dimensions,
  Platform,
  TouchableWithoutFeedback,
  FlatList,
  Image,
} from 'react-native';
import { COLORS, FONTS, ICONS } from '../../../config/theme';
import { RFPercentage } from 'react-native-responsive-fontsize';
import AntDesign from 'react-native-vector-icons/AntDesign';
import CustomButton from '../../../components/CustomButton';
import About from './about';
import ProffessionalInfo from './proffessional';
import InputField from '../../../components/InputField';
import SocialField from '../../../components/SocialField';
// import { BlurView } from '@react-native-community/blur';

const steps = ['about', 'professional'];
const data = [
  {
    id: 1,
    name: 'Connect With Facebook',
    navigationScreen: '',
    color: COLORS.skyBlue,
    icon: ICONS.facebook,
  },
  {
    id: 2,
    name: 'Connect With Instagram',
    navigationScreen: '',
    icon: ICONS.insta,
    color: COLORS.pink2,
  },
  {
    id: 3,
    name: 'Connect With TikTok',
    navigationScreen: '',
    icon: ICONS.tiktok,
    color: COLORS.black,
  },
];

const ProfileSetup = ({ navigation }: any) => {
  const [stepIndex, setStepIndex] = useState(0);
  const [keyboardIsVisible, setKeyboardIsVisible] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const slideAnim = useRef(
    new Animated.Value(Dimensions.get('window').height),
  ).current;
  const [website, setWebsite] = React.useState('');
  const [phoneNumber, setPhoneNumber] = React.useState('');

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
    if (stepIndex === 0) {
      if (!phoneNumber.trim()) {
        openModal();
        return;
      }
    }

    if (stepIndex < steps.length - 1) {
      setStepIndex(stepIndex + 1);
    } else {
      navigation.navigate('BottomTabs');
    }
  };

  const getBarColor = (index: any) => {
    if (index < stepIndex) return COLORS.green;
    if (index === stepIndex) return COLORS.pink;
    return COLORS.fieldColor;
  };

  const openModal = () => {
    setIsModalVisible(true);
    Animated.timing(slideAnim, {
      toValue: 0,
      duration: 600,
      easing: Easing.out(Easing.ease),
      useNativeDriver: true,
    }).start();
  };

  const closeModal = () => {
    Animated.timing(slideAnim, {
      toValue: Dimensions.get('window').height,
      duration: 600,
      easing: Easing.in(Easing.ease),
      useNativeDriver: true,
    }).start(() => {
      setIsModalVisible(false);
    });
  };

  const renderStepContent = () => {
    switch (stepIndex) {
      case 0:
        return (
          <About
            onPhoneNumberChange={setPhoneNumber}
            onWebsiteChange={setWebsite}
          />
        );
      case 1:
        return <ProffessionalInfo />;
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
        contentContainerStyle={{ flexGrow: 1, paddingBottom: RFPercentage(2) }}
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

      {!keyboardIsVisible && (
        <>
          <View>
            {stepIndex !== 0 && (
              <View style={{ width: '100%', backgroundColor: COLORS.white }}>
                <TouchableOpacity style={styles.skip}>
                  <Text style={styles.skipText}>Skip For Now</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
          <View style={styles.bottomWrapper}>
            <View style={styles.buttonContainer}>
              <CustomButton title="Save And Next" onPress={handleNext} />
            </View>
          </View>
        </>
      )}

      <Modal
        visible={isModalVisible}
        transparent
        animationType="none"
        onRequestClose={closeModal}
      >
        <TouchableWithoutFeedback onPress={closeModal}>
          <View style={styles.overLay}>
            <Animated.View
              style={[
                styles.modalContent,
                {
                  transform: [{ translateY: slideAnim }],
                },
              ]}
            >
              <Text style={styles.modalText}>
                We need atleast one way to reach you
              </Text>
              <Text style={styles.subTitle}>
                {`Add at least one contact method so people can\nfind or connect with you.`}
              </Text>
              <View style={{ marginTop: RFPercentage(3) }}>
                <InputField
                  placeholder="Phone Number"
                  value={phoneNumber}
                  onChangeText={setPhoneNumber}
                  password={false}
                  type="phone-pad"
                  icon={
                    <Image
                      source={ICONS.phone}
                      resizeMode="contain"
                      style={{
                        width: RFPercentage(2.2),
                        height: RFPercentage(2.2),
                      }}
                    />
                  }
                />
                <InputField
                  placeholder="Website URL"
                  value={website}
                  onChangeText={setWebsite}
                  password={false}
                  style={{ marginTop: RFPercentage(2) }}
                  icon={
                    <Image
                      source={ICONS.globe}
                      resizeMode="contain"
                      style={{
                        width: RFPercentage(2.5),
                        height: RFPercentage(2.5),
                      }}
                    />
                  }
                />

                <FlatList
                  data={data}
                  scrollEnabled={false}
                  keyExtractor={item => item.id.toString()}
                  style={{ marginTop: RFPercentage(1) }}
                  renderItem={({ item }) => (
                    <SocialField
                      icon={item.icon}
                      name={item.name}
                      navigation={item.navigationScreen}
                      color={item.color}
                    />
                  )}
                />
              </View>
              <View style={{ marginTop: RFPercentage(4) }}>
                <CustomButton title="Save" onPress={closeModal} />
              </View>
            </Animated.View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
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
  overLay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: COLORS.white,
    padding: RFPercentage(3),
    borderTopLeftRadius: RFPercentage(3),
    borderTopRightRadius: RFPercentage(3),
  },
  modalText: {
    fontSize: RFPercentage(2),
    fontFamily: FONTS.medium,
    color: COLORS.primary,
    marginBottom: RFPercentage(1),
  },
  subTitle: {
    fontFamily: FONTS.regular,
    color: COLORS.lightGrey,
    fontSize: RFPercentage(1.8),
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
    marginTop: RFPercentage(4),
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
