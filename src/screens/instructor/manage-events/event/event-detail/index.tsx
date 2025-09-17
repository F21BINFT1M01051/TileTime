import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  ImageBackground,
  TouchableOpacity,
  Image,
  TextInput,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Modal,
  TouchableWithoutFeedback,
  FlatList,
} from 'react-native';
import moment from 'moment';
import React, { useState, useRef, useEffect } from 'react';
import { COLORS, IMAGES, FONTS, ICONS } from '../../../../../config/theme';
import { RFPercentage } from 'react-native-responsive-fontsize';
import AntDesign from 'react-native-vector-icons/AntDesign';
import LinearGradient from 'react-native-linear-gradient';
import CustomButton from '../../../../../components/CustomButton';
import DetailComponent from '../../../../../components/DetailComponent';
import Details from '../details-tab';
import EditEventDetails from '../../../components/EditEventDetails';
import ShareEvent from '../../../components/ShareEvent';
import { BlurView } from '@react-native-community/blur';

const InstructorEventDetail = ({ navigation, route }: any) => {
  const { type } = route.params;
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  const openModal = () => {
    setIsModalVisible(true);
  };

  const [isModalVisible2, setIsModalVisible2] = useState(false);

  const openModal2 = () => {
    setIsModalVisible2(true);
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <View style={styles.container}>
        <View style={styles.headerBorder}>
          <View style={styles.headerContainer}>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => navigation.goBack()}
            >
              <AntDesign
                name="arrowleft"
                color={COLORS.grey}
                size={RFPercentage(2.5)}
              />
            </TouchableOpacity>

            <View style={styles.dotsButton}>
              <View style={styles.editButton}>
                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={() =>
                    navigation.navigate('EventDetails', { preview: true })
                  }
                >
                  <Image
                    source={ICONS.Eye}
                    resizeMode="contain"
                    style={styles.iconSmall}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={() => setModalVisible(true)}
                >
                  <Image
                    source={ICONS.copy2}
                    resizeMode="contain"
                    style={styles.iconSmall}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
        <ScrollView
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={{ paddingBottom: RFPercentage(5) }}
        >
          {/* Header */}
          <ImageBackground
            source={IMAGES.event10}
            resizeMode="cover"
            style={styles.groupImage}
          >
            {/* Badge */}

            {/* <View
              style={{
                width: '90%',
                alignSelf: 'center',
                position: 'absolute',
                top: RFPercentage(-2),
              }}
            >
              <Image
                source={ICONS.badge2}
                style={{
                  width: RFPercentage(17),
                  height: RFPercentage(10),
                }}
                resizeMode="contain"
              />
            </View> */}

            {/* Event Info */}
            <LinearGradient
              colors={['rgba(255, 255, 255, 0)', COLORS.white]}
              style={styles.linearGradient}
            >
              <View style={styles.innerWrapper}>
                <View style={styles.rowCenter}>
                  <View style={styles.imageWrapper}>
                    <Image
                      source={ICONS.event33}
                      style={styles.eventImage}
                      resizeMode="cover"
                    />
                  </View>
                  <View style={styles.contentContainer}>
                    <Text style={styles.title}>
                      {'Four Winds: Community Mahjong Session'}
                    </Text>

                    <View style={styles.topMargin}>
                      <View style={styles.chipRow}>
                        <View style={styles.dateChip}>
                          <Image
                            source={ICONS.calender3}
                            resizeMode="contain"
                            style={styles.chipIconImg}
                          />
                          <Text style={styles.chipText}>
                            {'April 30, 2025'}
                          </Text>
                        </View>
                      </View>

                      <View style={styles.chipRow}>
                        <View style={styles.locationChip}>
                          <Image
                            source={ICONS.map2}
                            resizeMode="contain"
                            style={styles.chipIconImg}
                          />
                          <Text style={styles.chipText}>
                            {'Community Center'}
                          </Text>
                        </View>
                      </View>
                    </View>
                  </View>
                </View>
              </View>
            </LinearGradient>
          </ImageBackground>

          {/* Buttons */}
          <View style={styles.wrapper90}>
            <View style={styles.bottomContent}>
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={openModal}
                style={[styles.backButton, { width: '35%' }]}
              >
                <Text style={styles.backButtonText}>Edit</Text>
              </TouchableOpacity>
              <CustomButton
                title={'Broadcast'}
                style={{ width: '45%' }}
                onPress={() =>
                  navigation.navigate('EventBroadCast', { isNew: true })
                }
              />
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={openModal2}
                style={{
                  width: '12%',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Image
                  source={ICONS.share33}
                  resizeMode="contain"
                  style={{
                    width: RFPercentage(2.8),
                    height: RFPercentage(2.8),
                  }}
                />
              </TouchableOpacity>
            </View>

            {/* Attendees */}
            <DetailComponent
              title="Attendees"
              subTitle="26 confirmed attendees, 2 cancelled"
              onPress={() => {
                navigation.navigate('EventAttendees');
              }}
            />

            {/* Insights */}
            <TouchableOpacity
              activeOpacity={0.8}
              style={styles.insightBox}
              onPress={() => navigation.navigate('EventInsights')}
            >
              <View style={styles.insightContent}>
                <View>
                  <Text style={styles.insightTitle}>Event Insights</Text>
                  <Text style={styles.insightSub}>
                    56% drop offs, 1.1k views
                  </Text>
                </View>
                <TouchableOpacity>
                  <Image
                    source={ICONS.right}
                    resizeMode="contain"
                    style={styles.rightIcon}
                  />
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          </View>

          {/* Tab Content */}
          <View style={{ width: '100%', alignSelf: 'center' }}>
            <Details type={type} />
          </View>
        </ScrollView>

        {/* Edit Modal */}
        <EditEventDetails
          visible={isModalVisible}
          onClose={() => setIsModalVisible(false)}
        />

        {/* Share Modal */}
        <ShareEvent
          visible={isModalVisible2}
          onClose={() => setIsModalVisible2(false)}
        />
      </View>

      <Modal
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
        animationType="fade"
        transparent
      >
        <BlurView
          style={StyleSheet.absoluteFill}
          blurType="dark"
          blurAmount={5}
          reducedTransparencyFallbackColor="white"
        />
        <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
          <View
            style={{
              width: '90%',
              alignSelf: 'center',
              alignItems: 'center',
              justifyContent: 'center',
              height: '100%',
            }}
          >
            <View
              style={{
                width: '90%',
                borderRadius: RFPercentage(3),
                backgroundColor: COLORS.white,
                alignItems: 'center',
                justifyContent: 'center',
                paddingVertical: RFPercentage(4),
                paddingBottom: RFPercentage(3),
              }}
            >
              <Text
                style={{
                  color: COLORS.primary,
                  fontFamily: FONTS.medium,
                  textAlign: 'center',
                  fontSize: RFPercentage(2.1),
                }}
              >
                You want to duplicate this event?
              </Text>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginTop: RFPercentage(3.4),
                }}
              >
                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={() => setModalVisible(false)}
                  style={{
                    width: '38%',
                    height: RFPercentage(5),
                    borderWidth: 1,
                    borderColor: COLORS.primary,
                    borderRadius: RFPercentage(2),
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginRight: RFPercentage(3),
                  }}
                >
                  <Text
                    style={{
                      color: COLORS.primary,
                      fontFamily: FONTS.bold,
                      textAlign: 'center',
                      fontSize: RFPercentage(2),
                      lineHeight: RFPercentage(2),
                    }}
                  >
                    Cancel
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={() => setModalVisible(false)}
                  style={{
                    width: '38%',
                    height: RFPercentage(5),
                    borderWidth: 1,
                    borderColor: COLORS.primary,
                    borderRadius: RFPercentage(2),
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: COLORS.primary,
                  }}
                >
                  <Text
                    style={{
                      color: COLORS.white,
                      fontFamily: FONTS.bold,
                      textAlign: 'center',
                      fontSize: RFPercentage(2.1),
                      lineHeight: RFPercentage(2),
                    }}
                  >
                    Yes
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </KeyboardAvoidingView>
  );
};

export default InstructorEventDetail;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  headerBorder: {
    borderBottomWidth: 1,
    borderBottomColor: COLORS.fieldBorder,
    paddingBottom: RFPercentage(2),
    backgroundColor: COLORS.white,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '90%',
    alignSelf: 'center',
    marginTop: RFPercentage(7),
  },
  chatEmpty: {
    color: COLORS.primary,
    fontFamily: FONTS.bold,
    fontSize: RFPercentage(2),
    textAlign: 'center',
    marginTop: RFPercentage(2),
  },
  dotsButton: {
    position: 'absolute',
    right: 0,
    zIndex: 9999,
  },
  editButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  groupImage: {
    width: '100%',
    height: RFPercentage(23.6),
  },
  wrap2: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: RFPercentage(3),
    width: '80%',
    alignSelf: 'center',
  },
  linearGradient: {
    width: '100%',
    marginTop: RFPercentage(1),
    paddingVertical: RFPercentage(2),
    height: '100%',
  },
  innerWrapper: {
    width: '90%',
    alignSelf: 'center',
  },
  rowCenter: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  name: {
    fontFamily: FONTS.semiBold,
    color: COLORS.primary,
    fontSize: RFPercentage(1.8),
    marginLeft: RFPercentage(1),
    lineHeight: RFPercentage(2),
  },
  time: {
    fontFamily: FONTS.regular,
    color: COLORS.lightGrey,
    fontSize: RFPercentage(1.7),
    marginLeft: RFPercentage(1),
  },
  detail: {
    color: COLORS.lightGrey,
    fontFamily: FONTS.regular,
    fontSize: RFPercentage(1.7),
    textAlign: 'center',
    marginTop: RFPercentage(1.5),
  },
  imageWrapper: {
    width: RFPercentage(13),
    height: RFPercentage(15),
    borderRadius: RFPercentage(2),
    backgroundColor: COLORS.yellow,
    alignItems: 'center',
    justifyContent: 'center',
  },
  eventImage: {
    width: RFPercentage(13),
    height: RFPercentage(15),
    borderRadius: RFPercentage(2),
    bottom: RFPercentage(0.5),
    right: RFPercentage(0.5),
  },
  contentContainer: {
    flex: 1,
    marginLeft: RFPercentage(2.5),
  },
  title: {
    fontSize: RFPercentage(2),
    color: COLORS.primary,
    fontFamily: FONTS.bold,
    lineHeight: RFPercentage(2.3),
  },
  topMargin: {
    marginTop: RFPercentage(0.6),
  },
  chipRow: {
    marginTop: RFPercentage(1),
  },
  dateChip: {
    backgroundColor: COLORS.date,
    flexDirection: 'row',
    alignItems: 'center',
    height: RFPercentage(3.3),
    paddingHorizontal: RFPercentage(1),
    borderRadius: RFPercentage(100),
    maxWidth: RFPercentage(15),
  },
  locationChip: {
    backgroundColor: COLORS.location,
    flexDirection: 'row',
    alignItems: 'center',
    height: RFPercentage(3.3),
    paddingHorizontal: RFPercentage(1),
    borderRadius: RFPercentage(100),
    width: RFPercentage(18),
  },
  chipIconImg: {
    width: RFPercentage(2),
    height: RFPercentage(2),
  },
  chipText: {
    fontSize: RFPercentage(1.4),
    color: COLORS.primary,
    fontFamily: FONTS.medium2,
    marginLeft: RFPercentage(0.6),
  },
  iconSmall: {
    width: RFPercentage(2.5),
    height: RFPercentage(2.5),
    marginRight: RFPercentage(0.7),
  },
  wrapper90: {
    width: '90%',
    alignSelf: 'center',
    marginTop: RFPercentage(0),
  },
  bottomContent: {
    width: '100%',
    alignSelf: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  backButton: {
    width: '40%',
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
  },
  saveButton: {
    width: RFPercentage(25),
  },
  insightBox: {
    width: '100%',
    height: RFPercentage(8),
    backgroundColor: COLORS.white,
    borderWidth: RFPercentage(0.1),
    borderColor: COLORS.lightWhite,
    borderBottomWidth: RFPercentage(0.5),
    borderRadius: RFPercentage(2),
    marginTop: RFPercentage(2),
    justifyContent: 'center',
    borderBottomColor: 'rgba(230, 247, 250, 0.6)',
  },
  insightContent: {
    width: '90%',
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  insightTitle: {
    color: COLORS.primary,
    fontFamily: FONTS.bold,
    fontSize: RFPercentage(2),
  },
  insightSub: {
    color: COLORS.lightGrey,
    fontSize: RFPercentage(1.5),
    fontFamily: FONTS.regular,
    marginTop: RFPercentage(0.6),
  },
  rightIcon: {
    width: RFPercentage(1.6),
    height: RFPercentage(1.6),
  },
  tabBar: {
    width: '100%',
    borderBottomWidth: RFPercentage(0.1),
    borderBottomColor: COLORS.line,
    height: RFPercentage(7),
    justifyContent: 'flex-end',
    paddingBottom: RFPercentage(0.3),
  },
  tabRow: {
    width: '90%',
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
  },
  tabButton: {
    width: RFPercentage(11),
    alignItems: 'center',
  },
  activeTab: {
    borderBottomWidth: RFPercentage(0.5),
    borderBottomColor: COLORS.pink,
  },
  tabText: {
    color: COLORS.grey5,
    fontFamily: FONTS.regular,
    fontSize: RFPercentage(1.7),
    bottom: RFPercentage(0.5),
  },
  activeTabText: {
    color: COLORS.primary,
    fontFamily: FONTS.semiBold,
  },
  tabMargin: {
    marginLeft: RFPercentage(0.5),
  },
  inputToolbarContainer: {
    backgroundColor: COLORS.white,
    paddingVertical: RFPercentage(1.5),
    borderTopWidth: RFPercentage(0.1),
    borderTopColor: COLORS.lightWhite,
    minHeight: RFPercentage(15),
  },
  inputBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.fieldColor,
    borderRadius: RFPercentage(3),
    paddingHorizontal: RFPercentage(2),
    minHeight: RFPercentage(6),
    maxHeight: RFPercentage(18),
    width: '90%',
    alignSelf: 'center',
    marginTop: RFPercentage(1.6),
  },
  plusIcon: {
    width: RFPercentage(3),
    height: RFPercentage(3),
    tintColor: COLORS.pink,
  },
  messageInput: {
    flex: 1,
    marginHorizontal: RFPercentage(1),
    color: COLORS.inputColor,
    fontSize: RFPercentage(1.9),
    fontFamily: FONTS.regular,
    textAlignVertical: 'top',
    paddingVertical: RFPercentage(1),
    lineHeight: RFPercentage(2.2),
  },
  sendButtonIcon: {
    width: RFPercentage(2.5),
    height: RFPercentage(2.5),
    tintColor: COLORS.primary,
  },
  toggleRow: {
    width: '90%',
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: RFPercentage(0.5),
  },
  toggleLabel: {
    textAlign: 'center',
    fontFamily: FONTS.medium,
    color: COLORS.inputColor,
    fontSize: RFPercentage(1.8),
  },
  messageRow: {
    alignSelf: 'flex-start', // all messages on left side
    width: '100%',
    paddingVertical: RFPercentage(1),
    marginTop: RFPercentage(1),
    borderBottomWidth: RFPercentage(0.1),
    borderBottomColor: COLORS.grey7,
  },
  messageBubble: {
    maxWidth: '100%',
  },
  messageText: {
    fontSize: RFPercentage(1.9),
    color: COLORS.lightGrey,
    fontFamily: FONTS.regular,
    marginTop: RFPercentage(2),
  },
  messageImage: {
    width: RFPercentage(20),
    height: RFPercentage(20),
    borderRadius: RFPercentage(1.5),
    marginTop: RFPercentage(1),
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'flex-end',
  },
  modalContainer: {
    backgroundColor: COLORS.white,
    borderTopLeftRadius: RFPercentage(2.5),
    borderTopRightRadius: RFPercentage(2.5),
    padding: RFPercentage(3),
    height: '25%',
  },
  modalTitle: {
    fontFamily: FONTS.bold,
    fontSize: RFPercentage(2.4),
    marginBottom: RFPercentage(2),
    color: COLORS.primary,
  },
  modalOption: {
    paddingVertical: RFPercentage(2),
    borderBottomWidth: 1,
    borderBottomColor: COLORS.lightWhite,
  },
});
