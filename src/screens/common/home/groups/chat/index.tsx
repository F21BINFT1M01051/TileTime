import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  StyleSheet,
  ImageBackground,
  Text,
  Image,
  TouchableOpacity,
  Keyboard,
  TextInput,
  Platform,
  Modal,
  TouchableWithoutFeedback,
  FlatList,
  ScrollView,
  Share,
  KeyboardAvoidingView,
} from 'react-native';
import { GiftedChat, Bubble } from 'react-native-gifted-chat';
import { COLORS, FONTS, ICONS, IMAGES } from '../../../../../config/theme';
import { RFPercentage } from 'react-native-responsive-fontsize';
import moment from 'moment';
import { launchImageLibrary } from 'react-native-image-picker';
import { useNavigation } from '@react-navigation/native';
import CustomButton from '../../../../../components/CustomButton';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { pick } from '@react-native-documents/picker';
import CreateEvent from '../../../../../components/CreateEvent';
import { useDispatch, useSelector } from 'react-redux';
import { setEventType } from '../../../../../redux/event-type/Actions';

moment.updateLocale('en', {
  relativeTime: {
    future: 'in %s',
    past: '%s ago',
    s: '1 sec',
    ss: '%d sec',
    m: '1 min',
    mm: '%d min',
    h: '1 hr',
    hh: '%d hr',
    d: '1 day',
    dd: '%d days',
    M: '1 mo',
    MM: '%d mo',
    y: '1 yr',
    yy: '%d yr',
  },
});

const ChatScreen = ({ route, navigation }: any) => {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');
  const { isGroup, isNew } = route.params;
  const [attachmentModalVisible, setAttachmentModalVisible] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedType, setSelectedType] = useState('');
  const dispatch = useDispatch();
  const role = useSelector(state => state.userFlow.userFlow);

  const openModal = () => {
    setIsModalVisible(true);
  };

  const onShare = async () => {
    try {
      const result = await Share.share({
        message: 'Check out this awesome content! 🚀',
        url: 'https://example.com',
      });

      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          console.log('Shared with activity type: ', result.activityType);
        } else {
          console.log('Shared successfully');
        }
      } else if (result.action === Share.dismissedAction) {
        console.log('Dismissed');
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  // useEffect(() => {
  //   const testMessage = {
  //     _id: 999,
  //     text: 'Hello! This is a message from Sophie.',
  //     createdAt: new Date(),
  //     user: {
  //       _id: 2,
  //       name: 'Sophie Reynolds',
  //       avatar: 'https://placeimg.com/140/140/people',
  //     },
  //   };

  //   setMessages([testMessage]);
  // }, []);

  const renderBubble = (props: any) => (
    <Bubble
      {...props}
      textStyle={{
        right: {
          color: COLORS.white,
          fontFamily: FONTS.regular,
          fontSize: RFPercentage(1.8),
        },
        left: {
          color: COLORS.grey4,
          fontFamily: FONTS.regular,
          fontSize: RFPercentage(1.8),
        },
      }}
      wrapperStyle={{
        right: { backgroundColor: COLORS.pink },
        left: { backgroundColor: COLORS.white },
      }}
    />
  );

  const renderDay = (props: any) => {
    const { currentMessage } = props;
    const messageDate = moment(currentMessage.createdAt);

    let label = messageDate.calendar(null, {
      sameDay: '[Today]',
      lastDay: '[Yesterday]',
      lastWeek: 'dddd',
      sameElse: 'MMMM D, YYYY',
    });

    return (
      <View style={styles.todayBadge}>
        <Text style={styles.todayText}>{label}</Text>
      </View>
    );
  };

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

  const renderMessageImage = (props: any) => {
    const { currentMessage, containerStyle, imageStyle } = props;

    return (
      <View style={[containerStyle, { marginTop: RFPercentage(2) }]}>
        <Image
          resizeMode="cover"
          style={[styles.img, imageStyle]}
          source={{ uri: currentMessage.image }}
        />
      </View>
    );
  };

  const renderMessage = (props: any) => {
    const { currentMessage } = props;
    const isUser = currentMessage.user._id === 1;
    const index = messages.findIndex(msg => msg._id === currentMessage._id);
    const previousMessage = messages[index + 1];
    const showHeader =
      !previousMessage || previousMessage.user._id !== currentMessage.user._id;

    return (
      <View
        style={{
          marginHorizontal: RFPercentage(2),
          flexDirection: isUser ? 'row-reverse' : 'row',
          alignItems: 'flex-end',
          marginVertical: RFPercentage(1),
        }}
      >
        <View style={{ position: 'relative' }}>
          <View
            style={[
              styles.messageWrapper,
              {
                width: currentMessage.image ? '100%' : '90%',
              },
              isUser ? styles.rightBubble : styles.leftBubble,
            ]}
          >
            <View style={styles.bubbleHeader}>
              <Image
                source={isUser ? IMAGES.chatProfile : IMAGES.profile2}
                style={
                  isUser ? styles.bubbleAvatarRight : styles.bubbleAvatarLeft
                }
              />
              <View style={styles.messageMeta}>
                <Text
                  style={isUser ? styles.usernameRight : styles.usernameLeft}
                >
                  {currentMessage.user.name}
                </Text>
                <Text
                  style={isUser ? styles.timeTextRight : styles.timeTextLeft}
                >
                  {moment(currentMessage.createdAt).fromNow()}
                </Text>
              </View>
            </View>

            {currentMessage.image ? (
              renderMessageImage(props)
            ) : (
              <Text
                style={[
                  isUser ? styles.textRight : styles.textLeft,
                  { lineHeight: RFPercentage(2) },
                ]}
              >
                {currentMessage.text}
              </Text>
            )}
          </View>

          <Image
            source={isUser ? ICONS.corner : ICONS.corner2}
            resizeMode="contain"
            style={[
              styles.cornerStyle,
              isUser ? styles.rightCorner : styles.leftCorner,
            ]}
          />
        </View>
      </View>
    );
  };

  // Document picker
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
    <TouchableWithoutFeedback
      onPress={() => Keyboard.dismiss()}
      accessible={false}
    >
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.headerBorder}>
          <View style={styles.headerContainer}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Image
                source={ICONS.back}
                resizeMode="contain"
                style={{ width: RFPercentage(3), height: RFPercentage(2.5) }}
              />
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() =>
                navigation.navigate(isGroup ? 'GroupDetails' : 'UserDetails')
              }
            >
              {isGroup ? (
                <>
                  <View style={styles.groupIconContainer}>
                    <Image
                      source={IMAGES.customProfile}
                      resizeMode="cover"
                      style={styles.groupIcon}
                    />
                  </View>
                </>
              ) : (
                <>
                  <View style={styles.avatarOuterLayer}>
                    <View style={styles.avatarMiddleLayer}>
                      <View style={styles.avatarInnerLayer}>
                        <Image
                          source={IMAGES.profile2}
                          resizeMode="cover"
                          style={styles.avatarImage}
                        />
                      </View>
                    </View>
                  </View>
                </>
              )}
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() =>
                navigation.navigate(isGroup ? 'GroupDetails' : 'UserDetails')
              }
            >
              <Text style={styles.groupNameText}>
                {isGroup ? `Mahjong - Richie Rich Gr..` : `Sophie Reynolds`}
              </Text>
            </TouchableOpacity>

            {isGroup ? (
              <>
                <View
                  style={{
                    flexDirection: 'row',
                    position: 'absolute',
                    right: 0,
                  }}
                >
                  <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={() => {
                      openModal();
                    }}
                  >
                    <Image
                      source={ICONS.calender2}
                      resizeMode="contain"
                      style={styles.cal}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={() => navigation.navigate('AddMembers')}
                  >
                    <Image
                      source={ICONS.userAdd}
                      resizeMode="contain"
                      style={{
                        width: RFPercentage(2.6),
                        height: RFPercentage(2.6),
                      }}
                    />
                  </TouchableOpacity>
                </View>
              </>
            ) : (
              <>
                <TouchableOpacity
                  style={styles.dotsButton}
                  onPress={() => {
                    openModal();
                  }}
                >
                  <Image
                    source={ICONS.calender2}
                    resizeMode="contain"
                    style={{
                      width: RFPercentage(3),
                      height: RFPercentage(3),
                    }}
                  />
                </TouchableOpacity>
              </>
            )}
          </View>
        </View>
        <View style={styles.chatContainer}>
          <ImageBackground
            source={IMAGES.chat}
            resizeMode="cover"
            style={{ flex: 1 }}
          >
            <GiftedChat
              messages={messages}
              user={{
                _id: 1,
                name: 'You',
                avatar: 'https://placeimg.com/140/140/any',
              }}
              renderBubble={renderBubble}
              renderMessage={renderMessage}
              renderDay={renderDay}
              inverted={true}
              listViewProps={{
                ListHeaderComponent: () =>
                  messages.length === 0 && isNew && isGroup ? (
                    <View style={{ marginBottom: RFPercentage(20) }}>
                      <View style={styles.todayBadge}>
                        <Text style={styles.todayText}>Today</Text>
                      </View>

                      <View style={styles.groupInfoCard}>
                        <View style={styles.largeGroupIconContainer}>
                          <Image
                            source={IMAGES.customProfile}
                            resizeMode="cover"
                            style={styles.largeGroupIcon}
                          />
                        </View>
                        <Text style={styles.createdText}>
                          You created this group
                        </Text>
                        <Text style={styles.membersText}>
                          Group - 2 Members
                        </Text>
                        <View style={styles.buttonContainer}>
                          <CustomButton
                            title="Add Members"
                            icon={ICONS.plus}
                            onPress={() => navigation.navigate('AddMembers')}
                          />
                        </View>
                        <View style={styles.secondButtonContainer}>
                          <CustomButton
                            title="Share Group Link"
                            onPress={onShare}
                            icon={ICONS.link}
                          />
                        </View>
                      </View>

                      <View style={styles.conversationPrompt}>
                        <Text style={styles.conversationText}>
                          {`Start a conversation, ask a\nquestion, or just say hi.`}
                        </Text>
                      </View>
                    </View>
                  ) : null,
              }}
              renderMessageImage={renderMessageImage}
              renderInputToolbar={() => (
                <View style={styles.inputToolbarContainer}>
                  <View style={styles.inputBar}>
                    <TouchableOpacity
                      onPress={() => setAttachmentModalVisible(true)}
                      style={{
                        position: 'absolute',
                        left: 0,
                        bottom: RFPercentage(1.5),
                        marginHorizontal: RFPercentage(1),
                      }}
                    >
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
                      multiline={true}
                      scrollEnabled={true}
                      textAlignVertical="top"
                      cursorColor={COLORS.primary}
                      selectionColor={COLORS.primary}
                    />

                    <TouchableOpacity
                      style={{
                        position: 'absolute',
                        right: 0,
                        bottom: RFPercentage(1.5),
                        marginHorizontal: RFPercentage(2),
                      }}
                      onPress={() => {
                        if (message.trim()) {
                          const newMessage = {
                            _id: Date.now(),
                            text: message,
                            createdAt: new Date(),
                            user: {
                              _id: 1,
                              name: 'You',
                              avatar: 'https://placeimg.com/140/140/any',
                            },
                          };
                          setMessages(prev =>
                            GiftedChat.append(prev, [newMessage]),
                          );
                          setMessage('');
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
            />
          </ImageBackground>
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

        <CreateEvent
          visible={isModalVisible}
          onClose={() => setIsModalVisible(false)}
          title="Select Event Type"
          selectedValue={selectedType}
          onSelect={(value: any) => {
            setSelectedType(value);
            dispatch(setEventType(value));
          }}
          onConfirm={() => {
            setIsModalVisible(false);
            if (selectedType === 'Open Play') {
              navigation.navigate('InvitePlayer');
            } else if (
              selectedType === 'Mahjong Lessons' &&
              role === 'Instructor'
            ) {
              navigation.navigate('SelectPlayersInstructor');
            } else if (
              selectedType === 'Mahjong Lessons' &&
              role === 'Player'
            ) {
              navigation.navigate('CreateLessonPlayer');
            } else if (selectedType === 'Guided Play') {
              navigation.navigate('GuidedPlay', {
                players: false,
                groups: false,
                link: true,
              });
            } else {
              setIsModalVisible(false);
            }
          }}
        />
      </View>
    </TouchableWithoutFeedback>
  );
};

export default ChatScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
    paddingTop: Platform.OS === 'ios' ? RFPercentage(4) : 0,
  },
  headerBorder: {
    borderBottomWidth: 1,
    borderBottomColor: COLORS.fieldBorder,
    paddingBottom: RFPercentage(2),
  },
  groupIconContainer: {
    width: RFPercentage(5),
    height: RFPercentage(5),
    borderRadius: RFPercentage(100),
    backgroundColor: COLORS.yellow,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: RFPercentage(2),
  },
  groupIcon: {
    width: RFPercentage(5),
    height: RFPercentage(5),
    borderTopRightRadius: RFPercentage(100),
    right: RFPercentage(0.5),
    borderTopLeftRadius: RFPercentage(100),
    borderBottomRightRadius: RFPercentage(100),
    borderBottomLeftRadius: RFPercentage(1),
  },
  cal: {
    width: RFPercentage(2.6),
    height: RFPercentage(2.6),
    marginRight: RFPercentage(1.8),
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '90%',
    alignSelf: 'center',
    marginTop: RFPercentage(4),
  },
  avatarOuterLayer: {
    width: RFPercentage(5),
    height: RFPercentage(6),
    borderRadius: RFPercentage(2),
    backgroundColor: COLORS.purple,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: RFPercentage(1.5),
  },
  avatarMiddleLayer: {
    backgroundColor: COLORS.green2,
    width: RFPercentage(5),
    height: RFPercentage(6),
    borderRadius: RFPercentage(2),
    alignItems: 'center',
    justifyContent: 'center',
    right: RFPercentage(0.3),
  },
  avatarInnerLayer: {
    backgroundColor: COLORS.pink3,
    width: RFPercentage(5),
    height: RFPercentage(6),
    borderRadius: RFPercentage(2),
    alignItems: 'center',
    justifyContent: 'center',
    right: RFPercentage(0.3),
  },
  avatarImage: {
    width: RFPercentage(5),
    height: RFPercentage(6),
    borderRadius: RFPercentage(2),
    right: RFPercentage(0.3),
    bottom: RFPercentage(0.2),
  },
  groupNameText: {
    color: COLORS.primary,
    fontFamily: FONTS.semiBold,
    fontSize: RFPercentage(1.9),
    marginLeft: RFPercentage(1),
  },
  dotsButton: {
    position: 'absolute',
    right: 0,
    zIndex: 9999,
  },
  messagesList: {
    flex: 1,
  },
  messagesContent: {
    paddingBottom: RFPercentage(2),
  },
  todayBadge: {
    alignSelf: 'center',
    width: RFPercentage(10),
    height: RFPercentage(3.8),
    backgroundColor: COLORS.white,
    borderRadius: RFPercentage(0.7),
    marginTop: RFPercentage(3),
    alignItems: 'center',
    justifyContent: 'center',
  },
  chatContainer: {
    flex: 1,
  },
  todayText: {
    color: COLORS.primary,
    fontFamily: FONTS.medium,
    fontSize: RFPercentage(1.8),
  },
  groupInfoCard: {
    width: '90%',
    padding: RFPercentage(3),
    alignItems: 'center',
    backgroundColor: COLORS.white,
    borderWidth: RFPercentage(0.1),
    borderColor: COLORS.lightWhite,
    alignSelf: 'center',
    borderRadius: RFPercentage(1.5),
    marginTop: RFPercentage(3),
    paddingBottom: RFPercentage(4),
  },
  largeGroupIconContainer: {
    width: RFPercentage(8),
    height: RFPercentage(8),
    borderRadius: RFPercentage(100),
    backgroundColor: COLORS.yellow,
    alignItems: 'center',
    justifyContent: 'center',
  },
  largeGroupIcon: {
    width: RFPercentage(8),
    height: RFPercentage(8),
    borderTopRightRadius: RFPercentage(100),
    right: RFPercentage(0.5),
    borderTopLeftRadius: RFPercentage(100),
    borderBottomRightRadius: RFPercentage(100),
    borderBottomLeftRadius: RFPercentage(1),
  },
  createdText: {
    color: COLORS.primary,
    fontFamily: FONTS.semiBold,
    fontSize: RFPercentage(1.9),
    textAlign: 'center',
    marginTop: RFPercentage(1.8),
  },
  membersText: {
    color: COLORS.grey4,
    fontFamily: FONTS.regular,
    fontSize: RFPercentage(1.8),
    textAlign: 'center',
    marginTop: RFPercentage(0.6),
  },
  buttonContainer: {
    width: '100%',
    marginTop: RFPercentage(4),
  },
  secondButtonContainer: {
    width: '100%',
    marginTop: RFPercentage(1),
  },
  conversationPrompt: {
    alignSelf: 'center',
    height: RFPercentage(7),
    backgroundColor: COLORS.white,
    borderRadius: RFPercentage(1.5),
    marginTop: RFPercentage(3),
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: RFPercentage(1.3),
  },
  conversationText: {
    color: COLORS.primary,
    fontFamily: FONTS.medium,
    fontSize: RFPercentage(1.8),
    textAlign: 'center',
    lineHeight: RFPercentage(2),
  },
  sendContainer: {
    marginRight: RFPercentage(2),
    marginBottom: RFPercentage(1),
  },
  sendIcon: {
    width: RFPercentage(2.6),
    height: RFPercentage(2.6),
  },
  messageWrapper: {
    maxWidth: '100%',
    alignSelf: 'flex-start',
    padding: RFPercentage(2),
  },
  leftBubble: {
    backgroundColor: COLORS.white,
    left: RFPercentage(1),
    alignSelf: 'flex-start',
    borderTopRightRadius: RFPercentage(2.5),
    borderTopLeftRadius: RFPercentage(2.5),
    borderBottomRightRadius: RFPercentage(2.5),
    minWidth: RFPercentage(20),
  },
  rightBubble: {
    backgroundColor: COLORS.green2,
    alignSelf: 'flex-end',
    borderTopRightRadius: RFPercentage(2.5),
    borderBottomLeftRadius: RFPercentage(2.5),
    borderTopLeftRadius: RFPercentage(2.5),
    right: RFPercentage(1),
    minWidth: RFPercentage(20),
  },
  bubbleHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  bubbleAvatarRight: {
    width: RFPercentage(4),
    height: RFPercentage(4),
    borderTopRightRadius: RFPercentage(10),
    borderTopLeftRadius: RFPercentage(10),
    marginRight: RFPercentage(1),
  },
  bubbleAvatarLeft: {
    width: RFPercentage(4),
    height: RFPercentage(4.5),
    borderRadius: RFPercentage(1.5),
    marginRight: RFPercentage(1),
  },
  messageMeta: {
    flexDirection: 'column',
    marginRight: RFPercentage(2),
  },
  usernameLeft: {
    fontFamily: FONTS.semiBold,
    fontSize: RFPercentage(1.8),
    color: COLORS.primary,
  },
  usernameRight: {
    fontFamily: FONTS.semiBold,
    fontSize: RFPercentage(1.8),
    color: COLORS.white,
  },
  timeTextRight: {
    fontSize: RFPercentage(1.5),
    color: COLORS.offWhite,
    fontFamily: FONTS.regular,
  },
  timeTextLeft: {
    fontSize: RFPercentage(1.5),
    color: COLORS.search,
    fontFamily: FONTS.regular,
  },
  textLeft: {
    color: COLORS.grey4,
    fontFamily: FONTS.regular,
    marginTop: RFPercentage(2),
    fontSize: RFPercentage(1.8),
  },
  textRight: {
    color: COLORS.white,
    fontFamily: FONTS.regular,
    marginTop: RFPercentage(2),
    fontSize: RFPercentage(1.8),
  },
  imageMessage: {
    width: RFPercentage(20),
    height: RFPercentage(20),
    borderRadius: RFPercentage(1),
    marginTop: RFPercentage(1),
  },
  cornerStyle: {
    width: RFPercentage(2.2),
    height: RFPercentage(2.2),
    position: 'absolute',
    bottom: 0,
  },

  rightCorner: {
    right: -RFPercentage(0.5),
  },

  leftCorner: {
    left: -RFPercentage(0.5),
  },

  inputToolbarContainer: {
    backgroundColor: COLORS.white,
    minHeight: RFPercentage(10),
    alignItems: 'center',
    justifyContent: 'center',
    borderTopWidth: RFPercentage(0.1),
    borderTopColor: COLORS.lightWhite,
    paddingVertical: RFPercentage(2),
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
    bottom: RFPercentage(1),
    // paddingVertical:RFPercentage(1.3)
  },

  plusIcon: {
    width: RFPercentage(2.8),
    height: RFPercentage(2.8),
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
    paddingHorizontal: RFPercentage(2),
    // backgroundColor:"red"dskdhs
  },

  sendButtonIcon: {
    width: RFPercentage(2.8),
    height: RFPercentage(2.8),
    tintColor: COLORS.primary,
  },
  img: {
    borderWidth: 1,
    borderColor: COLORS.lightWhite,
    width: RFPercentage(32),
    height: RFPercentage(35),
    borderRadius: RFPercentage(1),
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
