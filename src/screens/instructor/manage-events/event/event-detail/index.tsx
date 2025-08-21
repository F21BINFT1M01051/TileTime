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

const InstructorEventDetail = ({ navigation, route }: any) => {
  const { type } = route.params;
  const [tab, setTab] = useState('Details');
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');
  const [isOn, setIsOn] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);

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
        quality: 0.7,
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
        }
      },
    );
  };

  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: tab === 'Details' ? RFPercentage(4) : 0,
        }}
      >
        {/* Header */}
        <ImageBackground
          source={IMAGES.detail22}
          resizeMode="cover"
          style={styles.groupImage}
        >
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

          {/* Badge */}
          {type === 'Guided Play' && (
            <View
              style={{
                width: '90%',
                alignSelf: 'center',
                position: 'absolute',
                top: RFPercentage(10),
              }}
            >
              <Image
                source={ICONS.badge2}
                style={{
                  width: RFPercentage(16),
                  height: RFPercentage(10),
                }}
                resizeMode="contain"
              />
            </View>
          )}

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
                        <Text style={styles.chipText}>{'April 30, 2025'}</Text>
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
              style={styles.backButton}
            >
              <Text style={styles.backButtonText}>Edit</Text>
            </TouchableOpacity>
            <CustomButton
              title={'Share Event'}
              style={styles.saveButton}
              onPress={openModal2}
            />
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
                <Text style={styles.insightSub}>56% drop offs, 1.1k views</Text>
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
              style={[styles.tabButton, tab === 'Details' && styles.activeTab]}
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
            <TouchableOpacity onPress={handleImagePick}>
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
    marginTop: RFPercentage(8),
  },
  chatEmpty: {
    color: COLORS.primary,
    fontFamily: FONTS.semiBold,
    fontSize: RFPercentage(1.8),
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
    height: RFPercentage(36),
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
    marginTop: RFPercentage(3.5),
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
    fontSize: RFPercentage(1.6),
    textAlign: 'center',
    marginTop: RFPercentage(2),
  },
  imageWrapper: {
    width: RFPercentage(15),
    height: RFPercentage(14),
    borderRadius: RFPercentage(5),
    backgroundColor: COLORS.pink4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  eventImage: {
    width: RFPercentage(15),
    height: RFPercentage(14),
    bottom: RFPercentage(0.5),
    borderRadius: RFPercentage(5),
  },
  contentContainer: {
    flex: 1,
    marginLeft: RFPercentage(2),
  },
  title: {
    fontSize: RFPercentage(2),
    color: COLORS.primary,
    fontFamily: FONTS.bold,
    lineHeight: RFPercentage(2.1),
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
    marginTop: RFPercentage(1),
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
    fontSize: RFPercentage(1.7),
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
    paddingVertical: RFPercentage(1),
    borderTopWidth: RFPercentage(0.1),
    borderTopColor: COLORS.lightWhite,
    height: RFPercentage(15),
  },
  inputBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.fieldColor,
    borderRadius: RFPercentage(100),
    paddingHorizontal: RFPercentage(2),
    height: RFPercentage(6),
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
    fontSize: RFPercentage(1.8),
    fontFamily: FONTS.regular,
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
    fontFamily: FONTS.regular,
    color: COLORS.inputColor,
    fontSize: RFPercentage(1.7),
  },
  messageRow: {
    alignSelf: 'flex-start', // all messages on left side
    width: '100%',
    paddingVertical: RFPercentage(1),
    marginTop: RFPercentage(1),
    borderBottomWidth: RFPercentage(0.1),
    borderBottomColor: COLORS.lightWhite,
  },
  messageBubble: {
    maxWidth: '100%',
  },
  messageText: {
    fontSize: RFPercentage(1.7),
    color: COLORS.lightGrey,
    fontFamily: FONTS.regular,
    marginTop: RFPercentage(1),
  },
  messageImage: {
    width: RFPercentage(20),
    height: RFPercentage(20),
    borderRadius: RFPercentage(1.5),
    marginTop: RFPercentage(1),
  },
});
