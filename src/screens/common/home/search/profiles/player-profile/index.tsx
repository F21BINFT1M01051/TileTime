import {
  ImageBackground,
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

const PlayerProfile = ({ navigation }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedContacts, setSelectedContacts] = useState([]);

  const toggleContact = (id) => {
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
        <View style={styles.fullWidth}>
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
                  style={styles.zIndexHigh}
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
          <Text style={styles.locationText}>
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
                textStyle={styles.buttonText}
                onPress={openModal}
              />
            </View>
            <View style={styles.buttonHalf}>
              <CustomButton
                title="Send Message"
                icon={ICONS.message}
                style={styles.buttonRounded}
                textStyle={styles.buttonText}
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
        {/* <View style={styles.privateOverlay}>
            <View style={styles.overLayContent}>
              <Image
                source={ICONS.eye}
                resizeMode="contain"
                style={styles.eyeIcon}
              />
              <Text style={styles.privateText}>
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
                  <View style={styles.modalHeader}>
                    <Text style={styles.modalTitle}>
                      Add to Group
                    </Text>
                    <TouchableOpacity activeOpacity={0.8} onPress={closeModal}>
                      <Image
                        source={ICONS.cross}
                        resizeMode="contain"
                        tintColor={COLORS.lightGrey}
                        style={styles.crossIcon}
                      />
                    </TouchableOpacity>
                  </View>
                  <View style={styles.searchContainer}>
                    <SearchField placeholder="Search by name" />
                  </View>
                  <View style={styles.flatListContainer}>
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
                              <View style={styles.contactLeft}>
                                <View style={styles.contactAvatarWrapper}>
                                  <Image
                                    source={IMAGES.customProfile}
                                    resizeMode="cover"
                                    style={styles.contactAvatar}
                                  />
                                </View>
                                <View style={styles.contactInfo}>
                                  <Text style={styles.contactName}>{item.name}</Text>
                                  <Text style={styles.contactMembers}>{item.members}</Text>
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
  safeArea: { backgroundColor: COLORS.white, flex: 1 },
  fullWidth: { width: '100%' },
  zIndexHigh: { zIndex: 999999 },
  backgroundImage: { width: '100%', height: RFPercentage(26) },
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
  mainContent: { width: '90%', alignSelf: 'center', bottom: RFPercentage(8) },
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
  locationText: {
    color: COLORS.lightGrey,
    fontSize: RFPercentage(1.7),
    fontFamily: FONTS.regular,
    marginTop: RFPercentage(1),
  },
  groupDesc: {
    fontFamily: FONTS.regular2,
    color: COLORS.primary,
    fontSize: RFPercentage(1.8),
    marginTop: RFPercentage(1),
  },
  buttonRow: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: RFPercentage(3.4),
  },
  buttonHalf: { width: '48%' },
  buttonRounded: { borderRadius: RFPercentage(1.4) },
  buttonText: { fontFamily: FONTS.semiBold },
  sectionMargin: { marginTop: RFPercentage(3) },
  privateOverlay: {
    backgroundColor: 'rgba(245, 245, 245, 0.8)',
    width: '100%',
    zIndex: 999,
    height: '100%',
    position: 'absolute',
    top: RFPercentage(58),
    alignItems: 'center',
  },
  eyeIcon: { width: RFPercentage(7), height: RFPercentage(7) },
  privateText: {
    color: COLORS.primary,
    fontFamily: FONTS.semiBold,
    fontSize: RFPercentage(1.8),
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
  contactAvatarWrapper: {
    width: RFPercentage(7),
    height: RFPercentage(7),
    borderRadius: RFPercentage(100),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.yellow,
  },
  contactAvatar: {
    width: RFPercentage(7),
    height: RFPercentage(7),
    borderRadius: RFPercentage(100),
    right: RFPercentage(0.5),
  },
  contactInfo: { marginLeft: RFPercentage(1.5), width: '70%' },
  contactName: {
    fontFamily: FONTS.semiBold,
    color: COLORS.primary,
    fontSize: RFPercentage(1.9),
  },
  contactMembers: {
    fontFamily: FONTS.regular,
    color: COLORS.lightGrey,
    fontSize: RFPercentage(1.6),
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
  },
  modalFooterInner: {
    width: '90%',
    alignSelf: 'center',
    marginTop: RFPercentage(2),
  },
});
