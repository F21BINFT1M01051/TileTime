import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  KeyboardAvoidingView,
  FlatList,
  Keyboard,
  Animated,
  Dimensions,
  Modal,
  TouchableWithoutFeedback,
} from 'react-native';
import React, { useState, useEffect, useRef, useMemo } from 'react';
import { COLORS, FONTS, ICONS, IMAGES } from '../../../../../../config/theme';
import AuthHeader from '../../../../../../components/AuthHeader';
import { RFPercentage } from 'react-native-responsive-fontsize';
import CustomButton from '../../../../../../components/CustomButton';
import GuidedPlayBasic from './basic';
import { useNavigation } from '@react-navigation/native';
import GuidedPlayExtras from './extras';
import { BlurView } from '@react-native-community/blur';
import SearchField from '../../../../../../components/SearchField';
import GuidedPlayAttachments from './attachments';
import GuidedPlayPublish from './publish';
import EventLive from '../../../../../instructor/components/EventLive';
import { useSelector } from 'react-redux';
import InstructorSelection from './instructor-selection';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

const coHosts = [
  {
    id: 1,
    name: 'Emily Carter',
    member: '2 common groups | Birmingham, AL',
    profile: IMAGES.profile1,
  },
  {
    id: 2,
    name: 'James Smith',
    member: 'Member since 4 months',
    profile: IMAGES.profile1,
  },
  {
    id: 3,
    name: 'Emily Carter',
    member: '2 common groups | Birmingham, AL',
    profile: IMAGES.profile1,
  },
  {
    id: 4,
    name: 'James Smith',
    member: 'Member since 4 months',
    profile: IMAGES.profile1,
  },
];

const { height } = Dimensions.get('window');

const GuidedPlay = ({ route }: any) => {
  const { players, groups, link } = route.params;
  const [stepIndex, setStepIndex] = useState(0);
  const [keyboardIsVisible, setKeyboardIsVisible] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalVisible2, setModalVisible2] = useState(false);
  const navigation = useNavigation();
  const [query, setQuery] = useState('');
  const [selectedContacts, setSelectedContacts] = useState<number[]>([]);
  const role = useSelector(state => state.userFlow.userFlow);
  const eventType = useSelector(state => state.eventType.type);
  const [progress, setProgress] = useState(0);

  const steps = ['basics', 'extras', 'attachments', 'publish'];
  const steps2 = [
    'basics',
    'extras',
    'attachments',
    'instuctorSelection',
    'publish',
  ];

  const finalSteps =
    role === 'Player' && eventType === 'Guided Play' ? steps2 : steps;

  const toggleContact = (id: number) => {
    setSelectedContacts(prev =>
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id],
    );
  };

  const filteredHosts = useMemo(() => {
    if (!query.trim()) return coHosts;
    return coHosts.filter(
      (item: any) =>
        (item.name?.toLowerCase() || '').includes(query.toLowerCase()) ||
        (item.common?.toLowerCase() || '').includes(query.toLowerCase()),
    );
  }, [query]);

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

  const slideAnim = useRef(
    new Animated.Value(Dimensions.get('window').height),
  ).current;

  React.useEffect(() => {
    if (modalVisible2) {
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(slideAnim, {
        toValue: Dimensions.get('window').height,
        duration: 500,
        useNativeDriver: true,
      }).start();
    }
  }, [modalVisible2]);

  const handleSelectedContacts = (contacts: any[]) => {
    setSelectedContacts(contacts.map(c => c.id));
  };
  const removeContact = (id: number) => {
    setSelectedContacts(prev => prev.filter(contactId => contactId !== id));
  };

  const handleNext = async () => {
    try {
      if (stepIndex < finalSteps.length - 1) {
        setStepIndex(stepIndex + 1);
        setProgress(((stepIndex + 1) / finalSteps.length) * 100);
      } else {
        setProgress(100);
        setModalVisible(true);
      }
    } catch (error) {
      console.log('Validation error:', error);
    }
  };

  const renderStepContent = () => {
    switch (stepIndex) {
      case 0:
        return <GuidedPlayBasic />;
      case 1:
        return (
          <GuidedPlayExtras
            onAddCoHost={() => setModalVisible2(true)}
            selectedContacts={selectedContacts}
            removeContact={removeContact}
          />
        );
      case 2:
        return <GuidedPlayAttachments />;
      case 3:
        if (finalSteps.includes('instuctorSelection')) {
          return <InstructorSelection />;
        }
        return <GuidedPlayPublish onPreviewNow={() => setStepIndex(0)} />;
      case 4:
        return <GuidedPlayPublish onPreviewNow={() => setStepIndex(0)} />;
      default:
        return null;
    }
  };

  const handleBack = () => {
    if (stepIndex > 0) {
      setStepIndex(stepIndex - 1);
      setProgress(((stepIndex - 1) / finalSteps.length) * 100);
    } else {
      navigation.goBack();
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={styles.mainContainer}>
        {/* Header */}
        <AuthHeader
          title={role === 'Instructor' ? 'Create Guided Play' : 'Create Event'}
          right={true}
          rightText="Save Draft"
          onPress={() => {
            stepIndex === 0 ? navigation.goBack() : setStepIndex(stepIndex - 1);
          }}
        />
        <KeyboardAwareScrollView
          contentContainerStyle={{
            paddingBottom: RFPercentage(30),
            flexGrow: 1,
          }}
          keyboardShouldPersistTaps="handled"
          enableOnAndroid
          extraScrollHeight={80}
        >
          <View style={styles.progressBarBackground}>
            <View style={[styles.progressBarFill, { width: `${progress}%` }]} />
          </View>

          <View style={styles.innerWrapper}>
            <View style={styles.contentWrapper}>{renderStepContent()}</View>
          </View>
        </KeyboardAwareScrollView>
        {stepIndex === 0 ? (
          <View style={styles.footer}>
            <View style={styles.footerButtonWrapper}>
              <CustomButton title="Save And Next" onPress={handleNext} />
            </View>
          </View>
        ) : (
          <View style={styles.bottomBar}>
            <View style={styles.bottomContent}>
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => {
                  stepIndex === 0
                    ? navigation.goBack()
                    : setStepIndex(stepIndex - 1);
                }}
                style={styles.backButton}
              >
                <Text style={styles.backButtonText}>Back</Text>
              </TouchableOpacity>
              <CustomButton
                title={
                  stepIndex === finalSteps.length - 1
                    ? 'Publish Event'
                    : finalSteps[stepIndex] === 'instuctorSelection'
                    ? 'Send Requests and Publish'
                    : 'Save And Next'
                }
                style={styles.saveButton}
                onPress={handleNext}
              />
            </View>
          </View>
        )}
        <EventLive
          visible={modalVisible}
          onClose={() => setModalVisible(false)}
        />

        <Modal visible={modalVisible2} transparent animationType="none">
          <BlurView
            style={StyleSheet.absoluteFill}
            blurType="dark"
            blurAmount={5}
            reducedTransparencyFallbackColor="white"
          />
          <TouchableWithoutFeedback onPress={() => setModalVisible2(false)}>
            <View style={styles.overlay}>
              <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <Animated.View
                  style={[
                    styles.modalContent,
                    { transform: [{ translateY: slideAnim }] },
                  ]}
                >
                  <View style={styles.modalInnerContent}>
                    {/* Header */}
                    <View style={styles.modalHeader}>
                      <Text style={styles.modalTitle}>Add Co-Hosts</Text>
                      <TouchableOpacity
                        activeOpacity={0.8}
                        onPress={() => setModalVisible2(false)}
                      >
                        <Image
                          source={ICONS.cross}
                          resizeMode="contain"
                          tintColor={COLORS.lightGrey}
                          style={styles.crossIcon}
                        />
                      </TouchableOpacity>
                    </View>

                    {/* Search */}
                    <View style={styles.searchContainer}>
                      <SearchField
                        placeholder="Search by name"
                        value={query}
                        onChangeText={setQuery}
                      />
                    </View>

                    {/* List */}
                    <View style={styles.flatListContainer}>
                      <FlatList
                        data={filteredHosts}
                        keyExtractor={item => item.id.toString()}
                        keyboardShouldPersistTaps="always"
                        ListEmptyComponent={
                          <Text style={styles.noResultText}>
                            No results found
                          </Text>
                        }
                        renderItem={({ item }) => {
                          const isSelected = selectedContacts.includes(item.id);
                          return (
                            <TouchableOpacity
                              activeOpacity={0.8}
                              onPress={() => toggleContact(item.id)}
                            >
                              <View style={styles.contactRow}>
                                <View style={styles.contactLeft}>
                                  <View style={styles.avatarOuterLayer}>
                                    <View style={styles.avatarMiddleLayer}>
                                      <View style={styles.avatarInnerLayer}>
                                        <Image
                                          source={item.profile}
                                          resizeMode="cover"
                                          style={styles.avatarImage}
                                        />
                                      </View>
                                    </View>
                                  </View>
                                  <View style={styles.contactInfo}>
                                    <Text style={styles.contactName}>
                                      {item.name}
                                    </Text>
                                    <Text style={styles.contactMembers}>
                                      {item.member}
                                    </Text>
                                  </View>
                                </View>
                                <TouchableOpacity
                                  onPress={() => toggleContact(item.id)}
                                >
                                  <Image
                                    resizeMode="contain"
                                    source={
                                      isSelected ? ICONS.checked : ICONS.uncheck
                                    }
                                    style={styles.checkIcon}
                                  />
                                </TouchableOpacity>
                              </View>
                            </TouchableOpacity>
                          );
                        }}
                      />
                    </View>
                  </View>

                  {/* Footer */}
                  {!keyboardIsVisible && (
                    <View style={styles.modalFooter}>
                      <View style={styles.modalFooterInner}>
                        <CustomButton
                          title={
                            selectedContacts.length > 0
                              ? `Add ${selectedContacts.length} Co-Hosts`
                              : `Add Co-Hosts`
                          }
                          onPress={() => {
                            handleSelectedContacts(
                              coHosts.filter(c =>
                                selectedContacts.includes(c.id),
                              ),
                            );
                            setModalVisible2(false);
                          }}
                          disabled={selectedContacts.length === 0}
                          style={{
                            backgroundColor:
                              selectedContacts.length > 0
                                ? COLORS.primary
                                : COLORS.disabled,
                          }}
                        />
                      </View>
                    </View>
                  )}
                </Animated.View>
              </TouchableWithoutFeedback>
            </View>
          </TouchableWithoutFeedback>
        </Modal>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default GuidedPlay;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  scrollViewContent: {
    paddingBottom: RFPercentage(13),
    flexGrow: 1,
  },
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
    backgroundColor: COLORS.pink, // current progress color
    borderRadius: RFPercentage(100),
  },
  innerWrapper: {
    width: '90%',
    alignSelf: 'center',
  },
  stepBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  stepBar: {
    width: RFPercentage(6.5),
    height: RFPercentage(0.7),
    borderRadius: RFPercentage(100),
  },

  footer: {
    width: '100%',
    borderTopWidth: RFPercentage(0.1),
    borderTopColor: COLORS.lightWhite,
    paddingTop: RFPercentage(2),
    paddingBottom: RFPercentage(4),
    backgroundColor: COLORS.white,
  },
  footerButtonWrapper: {
    width: '90%',
    alignSelf: 'center',
  },
  contentWrapper: {
    width: '100%',
    alignSelf: 'center',
    flex: 1,
  },
  overlay: { flex: 1, justifyContent: 'flex-end' },
  modalContent: {
    backgroundColor: COLORS.white,
    borderTopLeftRadius: RFPercentage(3),
    borderTopRightRadius: RFPercentage(3),
    paddingBottom: RFPercentage(4),
    height: '80%',
  },
  modalInnerContent: {
    width: '90%',
    alignSelf: 'center',
    marginTop: RFPercentage(3.5),
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  modalTitle: {
    fontFamily: FONTS.semiBold,
    color: COLORS.primary,
    fontSize: RFPercentage(2),
  },
  crossIcon: { width: RFPercentage(2.4), height: RFPercentage(2.4) },
  searchContainer: { marginTop: RFPercentage(3) },
  flatListContainer: { marginTop: RFPercentage(0.5) },
  noResultText: {
    textAlign: 'center',
    color: COLORS.lightGrey,
    fontFamily: FONTS.regular,
    fontSize: RFPercentage(1.8),
    marginTop: RFPercentage(5),
  },
  contactRow: {
    width: '100%',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: RFPercentage(3),
  },
  contactLeft: {
    marginLeft: RFPercentage(1),
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatarOuterLayer: {
    width: RFPercentage(6),
    height: RFPercentage(7),
    borderRadius: RFPercentage(2.5),
    backgroundColor: COLORS.purple,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarMiddleLayer: {
    backgroundColor: COLORS.green2,
    width: RFPercentage(6),
    height: RFPercentage(7),
    borderRadius: RFPercentage(2.5),
    alignItems: 'center',
    justifyContent: 'center',
    right: RFPercentage(0.2),
  },
  avatarInnerLayer: {
    backgroundColor: COLORS.pink3,
    width: RFPercentage(6),
    height: RFPercentage(7),
    borderRadius: RFPercentage(2.5),
    alignItems: 'center',
    justifyContent: 'center',
    right: RFPercentage(0.2),
  },
  avatarImage: {
    width: RFPercentage(6),
    height: RFPercentage(7),
    borderRadius: RFPercentage(2.5),
    right: RFPercentage(0.2),
    bottom: RFPercentage(0.2),
  },
  contactInfo: { marginLeft: RFPercentage(1.5), width: '70%' },
  contactName: {
    fontFamily: FONTS.semiBold,
    color: COLORS.primary,
    fontSize: RFPercentage(2),
  },
  contactMembers: {
    fontFamily: FONTS.regular,
    color: COLORS.lightGrey,
    fontSize: RFPercentage(1.7),
    marginTop: RFPercentage(0.5),
  },
  checkIcon: { width: RFPercentage(3), height: RFPercentage(3) },
  modalFooter: {
    borderTopWidth: RFPercentage(0.1),
    borderTopColor: COLORS.lightWhite,
    position: 'absolute',
    bottom: 0,
    width: '100%',
    paddingBottom: RFPercentage(4),
    backgroundColor: COLORS.white,
  },
  modalFooterInner: {
    width: '90%',
    alignSelf: 'center',
    marginTop: RFPercentage(2),
  },
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
    width: '85%',
    alignSelf: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  backButton: {
    width: '30%',
    height: RFPercentage(5.5),
    borderWidth: RFPercentage(0.1),
    borderColor: COLORS.primary,
    borderRadius: RFPercentage(2),
    alignItems: 'center',
    justifyContent: 'center',
  },
  backButtonText: {
    color: COLORS.primary,
    fontSize: RFPercentage(2),
    fontFamily: FONTS.bold,
    lineHeight: RFPercentage(2),
  },
  saveButton: {
    width: '60%',
  },
});
