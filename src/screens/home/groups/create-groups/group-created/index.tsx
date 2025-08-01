import React, { useState, useCallback } from 'react';
import {
  View,
  StyleSheet,
  ImageBackground,
  Text,
  Image,
  TouchableOpacity,
  Keyboard,
  Platform,
  TextInput,
  ScrollView,
  SafeAreaView,
  FlatList,
} from 'react-native';
import {
  GiftedChat,
  Send,
  Bubble,
  MessageImage,
  MessageText,
  Message,
  InputToolbar,
  Composer,
  Day,
} from 'react-native-gifted-chat';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import { COLORS, FONTS, ICONS, IMAGES } from '../../../../../config/theme';
import { RFPercentage } from 'react-native-responsive-fontsize';
import CustomButton from '../../../../../components/CustomButton';
import moment from 'moment';
import { useNavigation } from '@react-navigation/native';

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

const GroupCreated = ({ route }: any) => {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');
  const [isToolTip, setToolTip] = useState(false);
  const { isNew } = route.params;
  const navigation = useNavigation();

  const renderBubble = (props: any) => (
    <Bubble
      {...props}
      textStyle={{
        right: {
          color: COLORS.white,
          fontFamily: FONTS.regular,
        },
        left: {
          color: COLORS.grey4,
          fontFamily: FONTS.regular,
        },
      }}
      wrapperStyle={{
        right: {
          backgroundColor: COLORS.pink,
        },
        left: {
          backgroundColor: COLORS.white,
        },
      }}
    />
  );

  const renderMessage = (props: any) => {
    const { currentMessage } = props;
    const isUser = currentMessage.user._id === 1;

    return (
      <View
        style={[
          styles.messageRow,
          { flexDirection: isUser ? 'row-reverse' : 'row' },
        ]}
      >
        <View style={{ position: 'relative' }}>
          <View
            style={[
              styles.messageWrapper,
              isUser ? styles.rightBubble : styles.leftBubble,
            ]}
          >
            <View style={styles.bubbleHeader}>
              <Image source={IMAGES.chatProfile} style={styles.bubbleAvatar} />
              <View style={styles.messageMeta}>
                <Text
                  style={isUser ? styles.usernameRight : styles.usernameLeft}
                >
                  {currentMessage.user.name}
                </Text>
                <Text style={styles.timeText}>
                  {moment(currentMessage.createdAt).fromNow()}
                </Text>
              </View>
            </View>

            {currentMessage.image ? (
              <Image
                source={{ uri: currentMessage.image }}
                style={styles.imageMessage}
              />
            ) : (
              <Text style={isUser ? styles.textRight : styles.textLeft}>
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

  const renderDay = (props: any) => {
    const { currentMessage } = props;
    const messageDate = moment(currentMessage.createdAt);
    const label = messageDate.calendar(null, {
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

  const toolTip = [
    { id: 1, name: 'Add Member' },
    { id: 2, name: 'Create Event' },
    { id: 3, name: 'Copy Group Link' },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerBorder}>
        <View style={styles.headerContainer}>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => navigation.goBack()}
          >
            <AntDesign
              name="arrowleft"
              color={COLORS.grey}
              size={RFPercentage(3)}
            />
          </TouchableOpacity>

          <View style={styles.groupIconContainer}>
            <Image
              source={IMAGES.customProfile}
              resizeMode="cover"
              style={styles.groupIcon}
            />
          </View>

          <Text style={styles.groupNameText}>Mahjong - Richie Rich Group</Text>

          <TouchableOpacity
            activeOpacity={0.8}
            style={styles.dotsButton}
            onPress={() => setToolTip(!isToolTip)}
          >
            <Entypo
              name="dots-three-vertical"
              size={RFPercentage(3)}
              color={COLORS.grey}
            />
          </TouchableOpacity>

          {isToolTip && (
            <View style={styles.tooltipContainer}>
              <FlatList
                data={toolTip}
                keyExtractor={item => item.id.toString()}
                renderItem={({ item, index }) => {
                  const last = index === toolTip.length - 1;
                  return (
                    <TouchableOpacity
                      activeOpacity={0.8}
                      onPress={() => navigation.navigate('GroupDetails')}
                      style={[
                        styles.tooltipOption,
                        !last && { borderBottomWidth: RFPercentage(0.1) },
                      ]}
                    >
                      <Text style={styles.tooltipText}>{item.name}</Text>
                    </TouchableOpacity>
                  );
                }}
              />
            </View>
          )}
        </View>
      </View>

      <ImageBackground
        source={IMAGES.chat}
        resizeMode="cover"
        style={{ flex: 1 }}
      >
        {messages.length === 0 && (
          <>
            <View style={styles.todayBadge}>
              <Text style={styles.todayText}>Today</Text>
            </View>
            {isNew && (
              <View style={styles.groupInfoCard}>
                <View style={styles.largeGroupIconContainer}>
                  <Image
                    source={IMAGES.customProfile}
                    resizeMode="cover"
                    style={styles.largeGroupIcon}
                  />
                </View>
                <Text style={styles.createdText}>You created this group</Text>
                <Text style={styles.membersText}>Group - 2 members</Text>
                <View style={styles.buttonContainer}>
                  <CustomButton
                    title="Add members"
                    onPress={() => {}}
                    icon={ICONS.plus}
                  />
                </View>
                <View style={styles.secondButtonContainer}>
                  <CustomButton
                    title="Share group Link"
                    onPress={() => {}}
                    icon={ICONS.link}
                  />
                </View>
              </View>
            )}

            <View style={styles.conversationPrompt}>
              <Text style={styles.conversationText}>
                Start a conversation, ask a question, or just say hi.
              </Text>
            </View>
          </>
        )}

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
          renderInputToolbar={() => (
            <View style={styles.customInputToolbar}>
              <View style={styles.inputContainer}>
                <TouchableOpacity onPress={() => {}}>
                  <Image
                    source={ICONS.plus}
                    style={styles.plusIcon}
                    resizeMode="contain"
                  />
                </TouchableOpacity>
                <TextInput
                  style={styles.inputText}
                  placeholder="Type your message here"
                  placeholderTextColor={COLORS.search}
                  value={message}
                  onChangeText={setMessage}
                />
                <TouchableOpacity
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
                      Keyboard.dismiss();
                    }
                  }}
                >
                  <Image
                    source={ICONS.send}
                    style={styles.sendIconContainer}
                    resizeMode="contain"
                  />
                </TouchableOpacity>
              </View>
            </View>
          )}
        />
      </ImageBackground>
    </SafeAreaView>
  );
};

export default GroupCreated;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  headerBorder: {
    borderBottomWidth: 1,
    borderBottomColor: COLORS.fieldBorder,
    paddingBottom: RFPercentage(2.5),
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '90%',
    alignSelf: 'center',
    marginTop: RFPercentage(4),
  },
  groupIconContainer: {
    width: RFPercentage(5.5),
    height: RFPercentage(5.5),
    borderRadius: RFPercentage(100),
    backgroundColor: COLORS.yellow,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: RFPercentage(2),
  },
  groupIcon: {
    width: RFPercentage(5.5),
    height: RFPercentage(5.5),
    borderTopRightRadius: RFPercentage(100),
    right: RFPercentage(0.5),
    borderTopLeftRadius: RFPercentage(100),
    borderBottomRightRadius: RFPercentage(100),
    borderBottomLeftRadius: RFPercentage(1),
  },
  groupNameText: {
    color: COLORS.primary,
    fontFamily: FONTS.medium,
    fontSize: RFPercentage(2),
    marginLeft: RFPercentage(1),
  },
  dotsButton: {
    position: 'absolute',
    right: 0,
    zIndex: 9999,
  },
  todayBadge: {
    alignSelf: 'center',
    width: RFPercentage(10),
    height: RFPercentage(3.8),
    backgroundColor: COLORS.offWhite,
    borderRadius: RFPercentage(0.7),
    marginTop: RFPercentage(3),
    alignItems: 'center',
    justifyContent: 'center',
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
    backgroundColor: COLORS.offWhite,
    borderRadius: RFPercentage(1.5),
    marginTop: RFPercentage(3),
    alignItems: 'center',
    justifyContent: 'center',
    width: RFPercentage(28),
  },
  conversationText: {
    color: COLORS.primary,
    fontFamily: FONTS.medium,
    fontSize: RFPercentage(1.8),
    textAlign: 'center',
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
    maxWidth: '90%',
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
  },
  rightBubble: {
    backgroundColor: COLORS.pink,
    alignSelf: 'flex-end',
    borderTopRightRadius: RFPercentage(2.5),
    borderBottomLeftRadius: RFPercentage(2.5),
    borderTopLeftRadius: RFPercentage(2.5),
    right: RFPercentage(1),
  },
  bubbleHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  bubbleAvatar: {
    width: RFPercentage(4),
    height: RFPercentage(4),
    borderTopRightRadius: RFPercentage(10),
    borderTopLeftRadius: RFPercentage(10),
    marginRight: RFPercentage(1),
  },
  messageMeta: {
    flexDirection: 'column',
    marginRight: RFPercentage(2),
  },
  usernameLeft: {
    fontFamily: FONTS.medium,
    fontSize: RFPercentage(1.8),
    color: COLORS.primary,
  },
  usernameRight: {
    fontFamily: FONTS.medium,
    fontSize: RFPercentage(1.8),
    color: COLORS.white,
  },
  timeText: {
    fontSize: RFPercentage(1.5),
    color: COLORS.offWhite,
    fontFamily: FONTS.regular,
  },
  textLeft: {
    color: COLORS.primary,
    fontFamily: FONTS.regular,
    marginTop: RFPercentage(1),
  },
  textRight: {
    color: COLORS.white,
    fontFamily: FONTS.regular,
    marginTop: RFPercentage(2),
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
  messageRow: {
    marginHorizontal: RFPercentage(2),
    alignItems: 'flex-end',
    marginVertical: RFPercentage(1),
  },
  customInputToolbar: {
    backgroundColor: COLORS.white,
    height: RFPercentage(12),
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.fieldColor,
    borderRadius: RFPercentage(100),
    paddingHorizontal: RFPercentage(2),
    height: RFPercentage(6),
    width: '90%',
    alignSelf: 'center',
  },
  plusIcon: {
    width: RFPercentage(3),
    height: RFPercentage(3),
    tintColor: COLORS.pink,
  },
  inputText: {
    flex: 1,
    marginHorizontal: RFPercentage(1),
    color: COLORS.inputColor,
  },
  sendIconContainer: {
    width: RFPercentage(3),
    height: RFPercentage(3),
    tintColor: COLORS.primary,
  },
  tooltipContainer: {
    width: RFPercentage(30),
    height: RFPercentage(20),
    paddingHorizontal: RFPercentage(2),
    backgroundColor: COLORS.white,
    borderWidth: RFPercentage(0.1),
    borderColor: COLORS.lightWhite,
    position: 'absolute',
    right: 0,
    zIndex: 999,
    borderRadius: RFPercentage(2),
    top: RFPercentage(5),
    borderBottomWidth: RFPercentage(0.5),
    paddingVertical: RFPercentage(1),
  },
  tooltipOption: {
    paddingBottom: RFPercentage(1),
    marginTop: RFPercentage(2),
    borderBottomColor: COLORS.lightWhite,
  },
  tooltipText: {
    color: COLORS.primary,
    fontSize: RFPercentage(1.7),
    fontFamily: FONTS.medium,
    left: RFPercentage(1),
  },
});
