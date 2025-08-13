import {
  ImageBackground,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Platform,
  Animated,
  Easing,
  Dimensions,
  Modal,
  FlatList,
  ScrollView,
  TouchableWithoutFeedback,
} from 'react-native';
import React, { useState, useRef } from 'react';
import { COLORS, IMAGES, FONTS, ICONS } from '../../../../../../config/theme';
import { RFPercentage } from 'react-native-responsive-fontsize';
import AntDesign from 'react-native-vector-icons/AntDesign';
import CustomButton from '../../../../../../components/CustomButton';
import CommonGroup from '../../../../../../components/CommonGroups';
import { BlurView } from '@react-native-community/blur';
import SearchField from '../../../../../../components/SearchField';

const players = [
  {
    id: 1,
    name: 'Mahjong - Richie Rich Group',
    profile: IMAGES.profile3,
    members: 'Sophie, Ava and 29 more',
  },
  {
    id: 2,
    name: 'The Tile Society',
    profile: IMAGES.profile3,
    members: 'Sophie, Ava and 29 more',
  },
  {
    id: 3,
    name: 'Mahjong Masters Circle',
    profile: IMAGES.customProfile,
    members: 'Sophie, Ava and 29 more',
  },
];

const PlayerProfile = ({ navigation }: any) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedContacts, setSelectedContacts] = useState<number[]>([]);

  const toggleContact = (id: number) => {
    setSelectedContacts(prev =>
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id],
    );
  };

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

  return (
    <View style={styles.safeArea}>
      <ScrollView>
        <View style={{ width: '100%' }}>
          <ImageBackground
            source={IMAGES.single}
            resizeMode="contain"
            style={styles.backgroundImage}
          >
            <View style={styles.headerBorder}>
              <View style={styles.headerContainer}>
                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={() => navigation.goBack()}
                  style={{ zIndex: 999999 }}
                >
                  <AntDesign
                    name="arrowleft"
                    color={COLORS.grey}
                    size={RFPercentage(3)}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </ImageBackground>
        </View>
        <View style={styles.mainContent}>
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

          <Text style={styles.userName}>Sophie Reynolds</Text>
          <Text
            style={{
              color: COLORS.lightGrey,
              fontSize: RFPercentage(1.7),
              fontFamily: FONTS.regular,
              marginTop: RFPercentage(1),
            }}
          >
            Seattle, WA
          </Text>
          <Text style={styles.groupDesc}>
            Mahjong lover always up for a good game! Here to learn, have fun,
            and meet fellow tile-heads along the way.
          </Text>

          <View style={styles.buttonRow}>
            <View style={styles.buttonHalf}>
              <CustomButton
                title="Add to group"
                icon={ICONS.add}
                style={styles.buttonRounded}
                textStyle={{ fontFamily: FONTS.semiBold }}
                onPress={openModal}
              />
            </View>
            <View style={styles.buttonHalf}>
              <CustomButton
                title="Send Message"
                icon={ICONS.message}
                style={styles.buttonRounded}
                textStyle={{ fontFamily: FONTS.semiBold }}
                onPress={() => {
                  navigation.navigate('ChatScreen', {
                    isGroup: false,
                    isNew: false,
                  });
                }}
              />
            </View>
          </View>

          <View style={styles.sectionMargin}>
            <CommonGroup />
          </View>

          <View style={styles.sectionMargin}>
            <CommonGroup futureEvents />
          </View>
          <View style={styles.sectionMargin}>
            <CommonGroup pastEvents />
          </View>
        </View>

        {/* ........................if profile is private.......................... */}
        {/* <View
        style={{
          backgroundColor: 'rgba(245, 245, 245, 0.8)',
          width: '100%',
          zIndex: 999,
          height: '100%',
          position: 'absolute',
          top: RFPercentage(58),
          alignItems: 'center',
        }}
      >
        <View style={styles.overLayContent}>
          <Image
            source={ICONS.eye}
            resizeMode="contain"
            style={{ width: RFPercentage(7), height: RFPercentage(7) }}
          />
          <Text
            style={{
              color: COLORS.primary,
              fontFamily: FONTS.semiBold,
              fontSize: RFPercentage(1.8),
            }}
          >
            This Profile is Private
          </Text>
        </View>
      </View> */}
      </ScrollView>

      <Modal
        visible={isModalVisible}
        transparent
        animationType="none"
        onRequestClose={closeModal}
      >
        <TouchableWithoutFeedback onPress={closeModal}>
          <View style={styles.overLay2}>
            <TouchableWithoutFeedback>
              <Animated.View
                style={[
                  styles.modalContent,
                  { transform: [{ translateY: slideAnim }] },
                ]}
              >
                <View style={styles.modalInnerContent}>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}
                  >
                    <Text
                      style={{
                        fontFamily: FONTS.semiBold,
                        color: COLORS.primary,
                        fontSize: RFPercentage(2),
                      }}
                    >
                      Add to Group
                    </Text>
                    <TouchableOpacity activeOpacity={0.8} onPress={closeModal}>
                      <Image
                        source={ICONS.cross}
                        resizeMode="contain"
                        tintColor={COLORS.lightGrey}
                        style={{
                          width: RFPercentage(2.4),
                          height: RFPercentage(2.4),
                        }}
                      />
                    </TouchableOpacity>
                  </View>
                  <View style={{ marginTop: RFPercentage(3) }}>
                    <SearchField placeholder="Search by name" />
                  </View>
                  <View style={{marginTop:RFPercentage(0.5)}}>
                    <FlatList
                      data={players}
                      keyExtractor={item => item.id.toString()}
                      renderItem={({ item }) => {
                        const isSelected = selectedContacts.includes(item.id);
                        return (
                          <TouchableOpacity
                            activeOpacity={0.8}
                            onPress={() => toggleContact(item.id)}
                          >
                            <View style={styles.contactRow}>
                              <View style={{marginLeft:RFPercentage(1), flexDirection:"row", alignItems:"center"}}>
                                <View
                                  style={{
                                    width: RFPercentage(7),
                                    height: RFPercentage(7),
                                    borderTopRightRadius: RFPercentage(100),
                                    borderTopLeftRadius: RFPercentage(100),
                                    borderBottomRightRadius: RFPercentage(100),
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    backgroundColor: COLORS.yellow,
                                  }}
                                >
                                  <Image
                                    source={IMAGES.customProfile}
                                    resizeMode="cover"
                                    style={{
                                      width: RFPercentage(7),
                                      height: RFPercentage(7),
                                      borderTopRightRadius: RFPercentage(100),
                                      borderTopLeftRadius: RFPercentage(100),
                                      borderBottomRightRadius:
                                        RFPercentage(100),
                                      right: RFPercentage(0.5),
                                    }}
                                  />
                                </View>
                                <View style={{marginLeft:RFPercentage(1.5), width:"70%"}}>
                                  <Text style={{fontFamily:FONTS.semiBold, color:COLORS.primary, fontSize:RFPercentage(1.9)}}>{item.name}</Text>
                                  <Text style={{fontFamily:FONTS.regular, color:COLORS.lightGrey, fontSize:RFPercentage(1.6), marginTop:RFPercentage(0.5)}}>{item.members}</Text>
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

                <View style={styles.modalFooter}>
                  <View style={styles.modalFooterInner}>
                    <CustomButton
                      title="Add Sophie To 2 Groups"
                      onPress={() => {
                        closeModal();
                        navigation.navigate('CreateInstructorProfile');
                      }}
                    />
                  </View>
                </View>
              </Animated.View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  );
};

export default PlayerProfile;

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: COLORS.white,
    flex: 1,
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
    marginTop: Platform.OS === 'android' ? RFPercentage(5) : RFPercentage(7.6),
  },
  groupDesc: {
    fontFamily: FONTS.regular2,
    color: COLORS.primary,
    fontSize: RFPercentage(1.8),
    marginTop: RFPercentage(1),
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
  penIcon: {
    marginRight: RFPercentage(0.6),
  },
  editText: {
    color: COLORS.black,
    fontFamily: FONTS.semiBold,
    fontSize: RFPercentage(1.8),
  },
  contactRow: {
    width: '100%',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: RFPercentage(3),
  },
  backgroundImage: {
    width: '100%',
    height: RFPercentage(26),
  },
  mainContent: {
    width: '90%',
    alignSelf: 'center',
    bottom: RFPercentage(8),
  },
  avatarOuterLayer: {
    width: RFPercentage(11),
    height: RFPercentage(12.5),
    borderRadius: RFPercentage(4.8),
    backgroundColor: COLORS.purple,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarMiddleLayer: {
    backgroundColor: COLORS.green2,
    width: RFPercentage(11),
    height: RFPercentage(12.5),
    borderRadius: RFPercentage(4.8),
    alignItems: 'center',
    justifyContent: 'center',
    right: RFPercentage(0.3),
  },
  avatarInnerLayer: {
    backgroundColor: COLORS.pink3,
    width: RFPercentage(11),
    height: RFPercentage(12.5),
    borderRadius: RFPercentage(4.8),
    alignItems: 'center',
    justifyContent: 'center',
    right: RFPercentage(0.3),
  },
  avatarImage: {
    width: RFPercentage(11),
    height: RFPercentage(12.5),
    borderRadius: RFPercentage(4.8),
    right: RFPercentage(0.3),
    bottom: RFPercentage(0.2),
  },
  userName: {
    fontFamily: FONTS.headline,
    color: COLORS.primary,
    fontSize: RFPercentage(3),
    marginTop: RFPercentage(3),
  },
  buttonRow: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: RFPercentage(3.4),
  },
  buttonHalf: {
    width: '48%',
  },
  buttonRounded: {
    borderRadius: RFPercentage(1.4),
  },
  viewProfile: {
    marginTop: RFPercentage(4),
  },
  sectionMargin: {
    marginTop: RFPercentage(3),
  },
  galleryText: {
    fontSize: RFPercentage(1.5),
    color: COLORS.lightGrey,
    fontFamily: FONTS.regular2,
    marginTop: RFPercentage(0.3),
  },
  overLay: {
    flex: 1,
    backgroundColor: 'rgba(243, 243, 243, 0.8)',
    alignItems: 'center',
    top: RFPercentage(55),
  },

  modalWrapper: {
    flex: 1,
    backgroundColor: 'rgba(243, 243, 243, 0.8)',
    alignItems: 'center',
    justifyContent: 'center',
    pointerEvents: 'box-none',
    marginTop: RFPercentage(55),
  },
  overLayContent: {
    width: RFPercentage(30),
    height: RFPercentage(20),
    backgroundColor: COLORS.white,
    borderRadius: RFPercentage(2),
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000,
    marginTop: RFPercentage(11),
  },

  overLay2: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.7)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: COLORS.white,
    borderTopLeftRadius: RFPercentage(3),
    borderTopRightRadius: RFPercentage(3),
    paddingBottom: RFPercentage(4),
    height:"80%"
  },
  modalBanner: {
    width: RFPercentage(40),
    height: RFPercentage(14),
    alignSelf: 'center',
  },
  modalInnerContent: {
    width: '90%',
    alignSelf: 'center',
    marginTop: RFPercentage(3.5),
  },
  modalText: {
    fontSize: RFPercentage(2.3),
    fontFamily: FONTS.headline,
    color: COLORS.primary,
    textAlign: 'center',
  },
  modalQuote: {
    width: RFPercentage(4),
    height: RFPercentage(4),
    position: 'absolute',
    right: RFPercentage(-0.5),
    top: RFPercentage(-2),
  },
  subTitle: {
    fontFamily: FONTS.regular,
    color: COLORS.lightGrey,
    fontSize: RFPercentage(1.8),
    marginTop: RFPercentage(1.3),
    textAlign: 'center',
  },
  modalFooter: {
    borderTopWidth: RFPercentage(0.1),
    borderTopColor: COLORS.lightWhite,
    position:"absolute",
    bottom:0,
    width:"100%",
    paddingBottom:RFPercentage(4)
  },
  modalFooterInner: {
    width: '90%',
    alignSelf: 'center',
    marginTop: RFPercentage(2),
  },
  checkIcon: {
    width: RFPercentage(3),
    height: RFPercentage(3),
  },
});
