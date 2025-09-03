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
import { GiftedChat, Bubble } from 'react-native-gifted-chat';
import ToggleSwitch from 'toggle-switch-react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import EditEventDetails from '../../../components/EditEventDetails';
import ShareEvent from '../../../components/ShareEvent';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { pick } from '@react-native-documents/picker';
// import Contacts from 'react-native-contacts';

const InstructorEventDetail = ({ navigation, route }: any) => {
  const { type } = route.params;
  const [tab, setTab] = useState('Details');
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');
  const [isOn, setIsOn] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [attachmentModalVisible, setAttachmentModalVisible] = useState(false);

  const openModal = () => {
    setIsModalVisible(true);
  };

  const [isModalVisible2, setIsModalVisible2] = useState(false);

  const openModal2 = () => {
    setIsModalVisible2(true);
  };

  const scrollViewRef = useRef(null);

  useEffect(() => {
    if (messages.length > 0) {
      scrollViewRef.current?.scrollToEnd({ animated: true });
    }
  }, [messages]);

  // Image Picker
  const handleImagePick = () => {
    launchImageLibrary(
      {
        mediaType: 'photo',
        quality: 1,
        includeBase64: false,
        maxWidth: 9999,
        maxHeight: 9999,
      },
      response => {
        if (
          !response.didCancel &&
          !response.errorCode &&
          response.assets?.length
        ) {
          const image = response.assets[0];

          const newMessage = {
            _id: Date.now(),
            createdAt: new Date(),
            user: {
              _id: 1,
              name: 'You',
              avatar: 'https://placeimg.com/140/140/any',
            },
            image: image.uri,
          };

          setMessages(prev => GiftedChat.append(prev, [newMessage]));
          setAttachmentModalVisible(false);
        }
      },
    );
  };

  const pickDocument = async () => {
    try {
      const res = await pick({
        type: ['application/pdf', 'public.item'],
        allowMultiSelection: false,
        copyTo: 'cachesDirectory',
      });

      if (res && res[0]) {
        const newMessage = {
          _id: Date.now(),
          createdAt: new Date(),
          user: {
            _id: 1,
            name: 'You',
            avatar: 'https://placeimg.com/140/140/any',
          },
          text: `📄 Document: ${res[0].name}`,
        };
        setMessages(prev => GiftedChat.append(prev, [newMessage]));
        setAttachmentModalVisible(false);
      }
    } catch (err) {
      if (err?.message?.includes('cancelled')) {
        console.log('User cancelled');
      } else {
        console.log('Error picking doc: ', err);
      }
    }
  };

  // Contact picker
  // const pickContact = async () => {
  //   try {
  //     const granted = await Contacts.requestPermission();
  //     if (granted === 'authorized') {
  //       const contacts = await Contacts.getAll();
  //       if (contacts.length > 0) {
  //         const contact = contacts[0];
  //         const newMessage = {
  //           _id: Date.now(),
  //           createdAt: new Date(),
  //           user: {
  //             _id: 1,
  //             name: 'You',
  //             avatar: 'https://placeimg.com/140/140/any',
  //           },
  //           text: `👤 Contact: ${contact.givenName} ${contact.familyName}`,
  //         };
  //         setMessages(prev => GiftedChat.append(prev, [newMessage]));
  //         setAttachmentModalVisible(false);
  //       }
  //     }
  //   } catch (err) {
  //     console.log('Error picking contact: ', err);
  //   }
  // };

  const ShareOptions = [
    {
      id: 1,
      name: 'Gallery',
      icon: 'images',
      color: COLORS.pink3,
      onPress: () => handleImagePick(),
    },
    {
      id: 2,
      name: 'Documents',
      icon: 'documents',
      color: COLORS.green2,
      onPress: () => pickDocument(),
    },
    {
      id: 3,
      name: 'Contacts',
      icon: 'contacts',
      color: COLORS.yellow,
      // onPress: () => pickContact(),
    },
  ];

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
                <TouchableOpacity activeOpacity={0.8}>
                  <Image
                    source={ICONS.Eye}
                    resizeMode="contain"
                    style={styles.iconSmall}
                  />
                </TouchableOpacity>
                <TouchableOpacity activeOpacity={0.8}>
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
          contentContainerStyle={{
            paddingBottom: tab === 'Details' ? RFPercentage(4) : 0,
          }}
        >
          {/* Header */}
          <ImageBackground
            source={IMAGES.event10}
            resizeMode="cover"
            style={styles.groupImage}
          >
            {/* Badge */}

            <View
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
            </View>

            {/* Event Info */}
            <LinearGradient
              colors={['rgba(255, 255, 255, 0.5)', COLORS.white]}
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
              {type === 'Guided Play' ? (
                <>
                  <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={openModal}
                    style={[styles.backButton, { width: RFPercentage(12) }]}
                  >
                    <Text style={styles.backButtonText}>Edit</Text>
                  </TouchableOpacity>
                  <CustomButton
                    title={'Share'}
                    style={{ width: RFPercentage(13) }}
                    onPress={openModal2}
                  />
                  <CustomButton
                    title={'Broadcast'}
                    style={{ width: RFPercentage(14) }}
                    onPress={openModal2}
                  />
                </>
              ) : (
                <>
                  <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={openModal}
                    style={styles.backButton}
                  >
                    <Text style={styles.backButtonText}>Edit</Text>
                  </TouchableOpacity>
                  <CustomButton
                    title={'Share Event'}
                    style={styles.saveButton}
                    onPress={openModal2}
                  />
                </>
              )}
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

          {/* Tabs */}
          <View style={styles.tabBar}>
            <View style={styles.tabRow}>
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => setTab('Details')}
                style={[
                  styles.tabButton,
                  tab === 'Details' && styles.activeTab,
                ]}
              >
                <Text
                  style={[
                    styles.tabText,
                    tab === 'Details' && styles.activeTabText,
                  ]}
                >
                  Event Details
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => setTab('Discussion')}
                style={[
                  styles.tabButton,
                  styles.tabMargin,
                  tab === 'Discussion' && styles.activeTab,
                ]}
              >
                <Text
                  style={[
                    styles.tabText,
                    tab === 'Discussion' && styles.activeTabText,
                  ]}
                >
                  Discussion
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Tab Content */}
          <View style={{ width: '100%', alignSelf: 'center' }}>
            {tab === 'Details' ? (
              <Details type={type} />
            ) : isOn ? (
              <ImageBackground
                source={ICONS.eventChat}
                resizeMode="cover"
                style={{
                  maxHeight: RFPercentage(60),
                  minHeight: RFPercentage(40),
                }}
              >
                <View>
                  {/* Messages Scroll */}
                  <ScrollView
                    ref={scrollViewRef}
                    contentContainerStyle={{
                      padding: RFPercentage(2),
                    }}
                    showsVerticalScrollIndicator={false}
                  >
                    {messages.map((msg, index) => (
                      <View key={index} style={styles.messageRow}>
                        <View style={styles.messageBubble}>
                          <View
                            style={{
                              flexDirection: 'row',
                              alignItems: 'center',
                            }}
                          >
                            <Image
                              source={IMAGES.chatProfile}
                              resizeMode="contain"
                              style={{
                                width: RFPercentage(4),
                                height: RFPercentage(4),
                              }}
                            />
                            <Text style={styles.name}>You</Text>
                            <Text style={styles.time}>
                              {moment(msg.createdAt).fromNow()}
                            </Text>
                          </View>
                          {msg.image ? (
                            <Image
                              source={{ uri: msg.image }}
                              style={styles.messageImage}
                            />
                          ) : (
                            <Text style={styles.messageText}>{msg.text}</Text>
                          )}
                        </View>
                      </View>
                    ))}
                  </ScrollView>
                </View>
              </ImageBackground>
            ) : (
              <View style={styles.wrap2}>
                <Image
                  source={ICONS.locked}
                  resizeMode="contain"
                  style={{
                    width: RFPercentage(10),
                    height: RFPercentage(10),
                  }}
                />
                <Text style={styles.chatEmpty}>
                  Discussion is Off for This Event
                </Text>
                <Text style={styles.detail}>
                  Once enabled, you and your attendees can chat, ask questions,
                  and stay updated, all in one place.
                </Text>
              </View>
            )}
          </View>
        </ScrollView>
        {tab === 'Discussion' && (
          <View style={styles.inputToolbarContainer}>
            <View style={styles.toggleRow}>
              <Text style={styles.toggleLabel}>
                Turn On Discussion for This Event
              </Text>
              <ToggleSwitch
                isOn={isOn}
                onColor={COLORS.pink}
                offColor={COLORS.switch}
                size="small"
                onToggle={() => setIsOn(!isOn)}
              />
            </View>

            <View style={styles.inputBar}>
              <TouchableOpacity onPress={() => setAttachmentModalVisible(true)}>
                <Image
                  source={ICONS.plus6}
                  style={styles.plusIcon}
                  resizeMode="contain"
                />
              </TouchableOpacity>

              <TextInput
                style={styles.messageInput}
                placeholder="Type your message here"
                placeholderTextColor={COLORS.search}
                value={message}
                onChangeText={setMessage}
                editable={isOn}
                multiline={true}
                scrollEnabled={true}
                textAlignVertical="top"
                cursorColor={COLORS.primary}
                selectionColor={COLORS.primary}
              />

              <TouchableOpacity
                onPress={() => {
                  if (message.trim()) {
                    const newMessage = {
                      _id: Date.now(),
                      text: message,
                    };
                    setMessages(prev => [...prev, newMessage]);
                    setMessage('');
                    Keyboard.dismiss();
                  }
                }}
              >
                <Image
                  source={ICONS.send}
                  style={styles.sendButtonIcon}
                  resizeMode="contain"
                />
              </TouchableOpacity>
            </View>
          </View>
        )}

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
        visible={attachmentModalVisible}
        animationType="fade"
        transparent
        onRequestClose={() => setAttachmentModalVisible(false)}
      >
        <TouchableWithoutFeedback
          onPress={() => setAttachmentModalVisible(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContainer}>
              <Text style={styles.modalTitle}>Share</Text>

              <View
                style={{
                  width: '100%',
                  alignItems: 'center',
                  marginTop: RFPercentage(1),
                }}
              >
                <FlatList
                  data={ShareOptions}
                  keyExtractor={item => item.id.toString()}
                  horizontal
                  renderItem={({ item }) => {
                    return (
                      <TouchableOpacity
                        onPress={item.onPress}
                        activeOpacity={0.8}
                        style={{
                          marginHorizontal: RFPercentage(3),
                          alignItems: 'center',
                        }}
                      >
                        <View
                          style={{
                            width: RFPercentage(7),
                            height: RFPercentage(7),
                            borderRadius: RFPercentage(100),
                            backgroundColor: item.color,
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}
                        >
                          {item.name === 'Contacts' ? (
                            <View>
                              <MaterialIcons
                                name={item.icon}
                                size={RFPercentage(2.8)}
                                color={COLORS.white}
                              />
                            </View>
                          ) : (
                            <View>
                              <Ionicons
                                name={item.icon}
                                size={RFPercentage(2.8)}
                                color={COLORS.white}
                              />
                            </View>
                          )}
                        </View>
                        <Text
                          style={{
                            color: COLORS.grey3,
                            fontFamily: FONTS.medium,
                            fontSize: RFPercentage(1.7),
                            marginTop: RFPercentage(1),
                          }}
                        >
                          {item.name}
                        </Text>
                      </TouchableOpacity>
                    );
                  }}
                />
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
    height: RFPercentage(28),
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
    marginTop: RFPercentage(5.5),
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
    maxWidth: RFPercentage(14),
  },
  locationChip: {
    backgroundColor: COLORS.location,
    flexDirection: 'row',
    alignItems: 'center',
    height: RFPercentage(3.3),
    paddingHorizontal: RFPercentage(1),
    borderRadius: RFPercentage(100),
    width: RFPercentage(17),
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
    width: RFPercentage(14),
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
