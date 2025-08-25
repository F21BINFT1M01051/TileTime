import {
  Image,
  Keyboard,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
  FlatList,
  ScrollView,
  Animated,
  Easing,
  Dimensions,
  Modal,
  ImageBackground,
} from 'react-native';
import React, { useState, useRef, useEffect } from 'react';
import { COLORS, FONTS, ICONS, IMAGES } from '../../../../config/theme';
import { RFPercentage } from 'react-native-responsive-fontsize';
import DropdownField from '../../../../components/DropDown';
import InputField from '../../../../components/InputField';
import AuthHeader from '../../../../components/AuthHeader';
import Search from '../../../../components/SearchExperience';
import CustomButton from '../../../../components/CustomButton';

const CreateInstructorProfile = ({ navigation }: any) => {
  const [state, setState] = useState(null);
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const [isDropdownVisible2, setIsDropdownVisible2] = useState(false);
  const [checked, setChecked] = useState(false);
  const [website, setWebsite] = React.useState('');
  const [Experience, setExperience] = useState('');
  const [Credential, setCredential] = useState('');
  const [keyboardIsVisible, setKeyboardIsVisible] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [name, setName] = useState('');
  const [city, setCity] = useState('');
  const [business, setBusiness] = useState('');
  const [anotherCity, setAnotherCity] = useState(false);
  const [otherCity, setOtherCity] = useState('');
  const [state2, setState2] = useState(null);
  const [isDropdownVisible3, setIsDropdownVisible3] = useState(false);

  const slideAnim = useRef(
    new Animated.Value(Dimensions.get('window').height),
  ).current;

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

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss();
        if (isDropdownVisible || isDropdownVisible2) {
          setIsDropdownVisible(false);
          setIsDropdownVisible2(false);
        }
      }}
    >
      <>
        <AuthHeader title="Aditional Details" />
        <ScrollView
          contentContainerStyle={styles.scrollViewContent}
          style={styles.scrollView}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.container}>
            <Text style={styles.title}>Build Your Instructor Profile</Text>

            <View style={styles.marginTop1}>
              <InputField
                placeholder="Full Name"
                password={false}
                value={name}
                onChangeText={setName}
              />
            </View>

            <TouchableOpacity
              style={styles.checkboxRow}
              activeOpacity={0.8}
              onPress={() => setChecked(!checked)}
            >
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => setChecked(!checked)}
              >
                <Image
                  source={checked ? ICONS.checked : ICONS.uncheck}
                  resizeMode="contain"
                  style={styles.checkboxIcon}
                />
              </TouchableOpacity>
              <Text style={styles.checkboxText}>
                I conduct business under a different name
              </Text>
            </TouchableOpacity>

            {checked && (
              <InputField
                placeholder="Enter Business Name"
                password={false}
                value={business}
                onChangeText={setBusiness}
              />
            )}

            <View style={styles.marginTop3}>
              <Text style={styles.sectionHeading}>
                Where do you conduct business
              </Text>
            </View>

            <View style={styles.dropdowns}>
              <View style={styles.dropdownHalf}>
                <InputField
                  placeholder="City"
                  defaultColor={COLORS.placeholder}
                  focusedColor={COLORS.focused}
                  password={false}
                  value={city}
                  onChangeText={setCity}
                  style={{
                    paddingHorizontal: RFPercentage(0.7),
                  }}
                />

                {!anotherCity && (
                  <TouchableOpacity
                    activeOpacity={0.8}
                    style={styles.addLocationRow}
                    onPress={() => setAnotherCity(true)}
                  >
                    <Image
                      source={ICONS.plus5}
                      tintColor={COLORS.primary}
                      resizeMode="contain"
                      style={styles.plusIcon}
                    />
                    <Text style={styles.addLocationText}>
                      Add Another Location
                    </Text>
                  </TouchableOpacity>
                )}
              </View>
              <View style={styles.dropdownHalf}>
                <DropdownField
                  placeholder="State"
                  data={['Beijing', 'Shanghai', 'Guangdong', 'Sichuan']}
                  selectedValue={state}
                  onValueChange={(val: any) => setState(val)}
                  isDropdownVisible={isDropdownVisible2}
                  setIsDropdownVisible={setIsDropdownVisible2}
                  style={styles.dropdownField}
                />
              </View>
            </View>
            {anotherCity && (
              <>
                <View style={styles.dropdowns}>
                  <View style={{ width: '48%' }}>
                    <InputField
                      placeholder="Another City"
                      value={otherCity}
                      onChangeText={setOtherCity}
                      style={{
                        paddingHorizontal: RFPercentage(0.7),
                      }}
                      password={false}
                    />
                  </View>

                  <View style={{ width: '48%' }}>
                    <DropdownField
                      placeholder="State"
                      data={['Beijing', 'Shanghai', 'Guangdong', 'Sichuan']}
                      selectedValue={state2}
                      onValueChange={(val: any) => setState2(val)}
                      isDropdownVisible={isDropdownVisible3}
                      setIsDropdownVisible={setIsDropdownVisible3}
                      style={{ paddingHorizontal: RFPercentage(1) }}
                    />
                  </View>
                </View>
              </>
            )}

            <View style={styles.marginTop4}>
              <Text style={styles.sectionHeading}>Add your website</Text>
              <InputField
                placeholder="Your Website URL"
                value={website}
                onChangeText={setWebsite}
                password={false}
                icon={
                  <Image
                    source={ICONS.globe}
                    resizeMode="contain"
                    style={styles.globeIcon}
                  />
                }
              />
            </View>

            <View style={styles.marginTop4}>
              <Text style={styles.sectionHeading}>
                Share your coaching style and experience
              </Text>

              <View style={styles.inputContainer}>
                <Text style={styles.sectionLabel}>Your Experience</Text>
                <View style={styles.marginTop1_5}>
                  <Search
                    placeholder="Search And Add Experience"
                    value={Experience}
                    onChangeText={setExperience}
                    data={[
                      'Beginner-Friendly',
                      'Fast Paced',
                      'Ender Friendly',
                      'Free',
                    ]}
                  />
                </View>

                <Text style={[styles.sectionLabel, styles.marginTop3]}>
                  Credentials
                </Text>
                <View style={styles.marginTop1_5}>
                  <Search
                    placeholder="Search And Add Credentials"
                    value={Credential}
                    onChangeText={setCredential}
                    data={[
                      'OMM Certified',
                      'MahjongLine Certified',
                      'Gaming Industry Approved',
                    ]}
                  />
                </View>
              </View>
            </View>
          </View>
        </ScrollView>

        {!keyboardIsVisible && (
          <View style={styles.bottomBtnWrapper}>
            <CustomButton
              title="Save and Next"
              style={styles.customBtn}
              onPress={openModal}
            />
          </View>
        )}

        <Modal
          visible={isModalVisible}
          transparent
          animationType="none"
          onRequestClose={closeModal}
        >
          <TouchableWithoutFeedback onPress={closeModal}>
            <View style={styles.overLay}>
              <TouchableWithoutFeedback>
                <Animated.View
                  style={[
                    styles.modalContent,
                    { transform: [{ translateY: slideAnim }] },
                  ]}
                >
                  <ImageBackground
                    source={ICONS.group33}
                    resizeMode="contain"
                    style={styles.modalBackground}
                  >
                    <View style={styles.modalProfileWrapper}>
                      <View>
                        <View style={styles.modalProfileImageWrapper}>
                          <Image
                            source={IMAGES.chatProfile}
                            style={styles.modalProfileImage}
                          />
                          <Image
                            source={ICONS.star}
                            resizeMode="contain"
                            style={styles.modalStar}
                          />
                        </View>

                        <View style={styles.instructorTag}>
                          <Text style={styles.instructorTagText}>
                            Instructor
                          </Text>
                        </View>
                      </View>

                      <View style={styles.modalStarContainer}>
                        <Image
                          source={ICONS.stars2}
                          resizeMode="contain"
                          style={styles.modalStar2}
                        />
                      </View>
                    </View>

                    <Text style={styles.modalText}>You're all set!</Text>
                    <Text style={styles.subTitle}>
                      {`Your instructor profile is now live.\nStart creating events, invite players,\nand share your expertise.`}
                    </Text>

                    <View style={styles.modalBtnWrapper}>
                      <View style={styles.modalBtnInner}>
                        <CustomButton
                          title="Go To Home"
                          style={styles.transparentBtn}
                          textStyle={styles.transparentBtnText}
                          onPress={() => {
                            closeModal();
                            navigation.navigate('CreateInstructorProfile');
                          }}
                        />
                      </View>
                    </View>
                  </ImageBackground>
                </Animated.View>
              </TouchableWithoutFeedback>
            </View>
          </TouchableWithoutFeedback>
        </Modal>
      </>
    </TouchableWithoutFeedback>
  );
};

export default CreateInstructorProfile;

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
    width: '90%',
    alignSelf: 'center',
    marginTop: RFPercentage(3),
  },
  title: {
    fontFamily: FONTS.headline,
    color: COLORS.primary,
    fontSize: RFPercentage(2.3),
  },
  profileContainer: {
    marginTop: RFPercentage(3),
    width: RFPercentage(16),
    alignItems: 'center',
  },
  profileImage: {
    width: RFPercentage(14.8),
    height: RFPercentage(14.8),
    borderRadius: RFPercentage(100),
  },
  defaultImg: {
    width: RFPercentage(5),
    height: RFPercentage(5),
  },
  dropdowns: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: RFPercentage(-0.5),
  },
  editIcon: {
    width: RFPercentage(3.8),
    height: RFPercentage(3.8),
    // bottom: RFPercentage(2),
  },
  bioWrapper: {
    marginTop: RFPercentage(3),
  },
  bioContainer: {
    backgroundColor: COLORS.fieldColor,
    borderWidth: RFPercentage(0.1),
    borderColor: COLORS.fieldBorder,
    borderRadius: RFPercentage(1.5),
    paddingVertical: RFPercentage(0.5),
  },
  bioHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    alignSelf: 'center',
    marginTop: RFPercentage(1),
  },
  bioLabel: {
    fontFamily: FONTS.medium2,
    color: COLORS.primary,
    fontSize: RFPercentage(1.7),
  },
  bioInput: {
    width: '100%',
    alignSelf: 'center',
    textAlignVertical: 'top',
    fontFamily: FONTS.regular,
    color: COLORS.inputColor,
    lineHeight: RFPercentage(2.5),
    fontSize: RFPercentage(1.8),
    height: RFPercentage(10),
    paddingHorizontal: 0,
    paddingVertical: 0,
    marginTop: RFPercentage(1.5),
  },
  toggleRow: {
    width: '100%',
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: RFPercentage(2),
  },
  toggleLabel: {
    textAlign: 'center',
    fontFamily: FONTS.medium,
    color: COLORS.inputColor,
    fontSize: RFPercentage(1.9),
  },
  inputContainer: { marginTop: RFPercentage(1.5) },
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
  sectionLabel: {
    fontFamily: FONTS.regular,
    color: COLORS.primary,
    fontSize: RFPercentage(1.6),
  },
  tagWrapper: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: RFPercentage(1.8),
    marginTop: RFPercentage(2),
  },
  overLay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.7)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: COLORS.white,
    borderTopLeftRadius: RFPercentage(3),
    borderTopRightRadius: RFPercentage(3),
    paddingBottom: RFPercentage(4),
  },
  modalText: {
    fontSize: RFPercentage(2.3),
    fontFamily: FONTS.headline,
    color: COLORS.primary,
    textAlign: 'center',
    marginTop: RFPercentage(5),
  },
  subTitle: {
    fontFamily: FONTS.regular,
    color: COLORS.lightGrey,
    fontSize: RFPercentage(1.8),
    marginTop: RFPercentage(1.3),
    textAlign: 'center',
  },
  scrollView: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  scrollViewContent: {
    flexGrow: 1,
    paddingBottom: RFPercentage(6),
  },
  headerWrapper: {
    borderBottomWidth: RFPercentage(0.1),
    borderBottomColor: COLORS.lightWhite,
    height: RFPercentage(12),
    justifyContent: 'flex-end',
    paddingBottom: RFPercentage(1),
  },
  authHeaderContainer: {
    width: '90%',
    alignSelf: 'center',
  },
  marginTop1: {
    marginTop: RFPercentage(1),
  },
  marginTop3: {
    marginTop: RFPercentage(3),
  },
  marginTop4: {
    marginTop: RFPercentage(4),
  },
  marginTop1_5: {
    marginTop: RFPercentage(1.5),
  },
  checkboxRow: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: RFPercentage(3),
  },
  checkboxIcon: {
    width: RFPercentage(3),
    height: RFPercentage(3),
  },
  checkboxText: {
    color: COLORS.inputColor,
    fontSize: RFPercentage(1.9),
    fontFamily: FONTS.regular,
    marginLeft: RFPercentage(1),
  },
  sectionHeading: {
    color: COLORS.primary,
    fontFamily: FONTS.bold,
    fontSize: RFPercentage(1.9),
  },
  dropdownHalf: {
    width: '48%',
  },
  addLocationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: RFPercentage(1.3),
  },
  plusIcon: {
    width: RFPercentage(2),
    height: RFPercentage(2),
  },
  addLocationText: {
    color: COLORS.primary,
    fontFamily: FONTS.bold,
    marginLeft: RFPercentage(0.8),
    fontSize: RFPercentage(1.8),
  },
  dropdownField: {
    paddingHorizontal: RFPercentage(1),
  },
  globeIcon: {
    width: RFPercentage(2.3),
    height: RFPercentage(2.3),
  },
  bottomBtnWrapper: {
    width: '100%',
    borderTopWidth: RFPercentage(0.1),
    borderTopColor: COLORS.lightWhite,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.white,
    paddingVertical: RFPercentage(2),
    paddingBottom: RFPercentage(4),
  },
  customBtn: {
    width: '90%',
    alignSelf: 'center',
  },
  modalBackground: {
    width: '100%',
    height: RFPercentage(60),
    alignItems: 'center',
  },
  modalProfileWrapper: {
    width: '90%',
    alignSelf: 'center',
    marginTop: RFPercentage(15),
    alignItems: 'center',
  },
  modalProfileImageWrapper: {
    width: RFPercentage(14),
    height: RFPercentage(14),
    backgroundColor: COLORS.pink6,
    borderTopLeftRadius: RFPercentage(100),
    borderTopRightRadius: RFPercentage(100),
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalProfileImage: {
    width: RFPercentage(14),
    height: RFPercentage(14),
    backgroundColor: COLORS.pink4,
    borderTopLeftRadius: RFPercentage(100),
    borderTopRightRadius: RFPercentage(100),
    right: RFPercentage(0.9),
    bottom: RFPercentage(0.7),
  },
  modalStar: {
    position: 'absolute',
    right: RFPercentage(-2),
    width: RFPercentage(5),
    height: RFPercentage(5),
    bottom: RFPercentage(-0.6),
  },
  instructorTag: {
    width: RFPercentage(8),
    height: RFPercentage(2.5),
    backgroundColor: COLORS.light,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: RFPercentage(2),
    borderRadius: RFPercentage(100),
    left: RFPercentage(-6),
  },
  instructorTagText: {
    color: COLORS.primary,
    fontFamily: FONTS.medium,
    fontSize: RFPercentage(1.2),
  },
  modalStarContainer: {
    width: RFPercentage(22),
  },
  modalStar2: {
    width: RFPercentage(3.5),
    height: RFPercentage(3.5),
    position: 'absolute',
    right: 0,
    top: RFPercentage(-1.3),
  },
  modalBtnWrapper: {
    marginTop: RFPercentage(5),
    borderTopWidth: RFPercentage(0.1),
    borderTopColor: COLORS.lightWhite,
    position: 'absolute',
    bottom: 0,
    width: '100%',
  },
  modalBtnInner: {
    width: '90%',
    alignSelf: 'center',
    marginTop: RFPercentage(2),
  },
  transparentBtn: {
    backgroundColor: 'transparent',
    borderWidth: RFPercentage(0.1),
    borderColor: COLORS.primary,
  },
  transparentBtnText: {
    color: COLORS.primary,
  },
});
