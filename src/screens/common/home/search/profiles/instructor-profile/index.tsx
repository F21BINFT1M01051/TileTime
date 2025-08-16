import {
  ImageBackground,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
  Platform,
  Animated,
  Easing,
  Dimensions,
  Modal,
  FlatList,
  TouchableWithoutFeedback,
} from 'react-native';
import React,{useRef, useState} from 'react';
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

const InstructorProfile = ({ navigation }: any) => {

   const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectedContacts, setSelectedContacts] = useState([]);
    const [query, setQuery] = useState('');
  
    const filteredData = players.filter(item =>
      item.name.toLowerCase().includes(query.toLowerCase()),
    );
  
    const toggleContact = (id: any) => {
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
      <ScrollView showsVerticalScrollIndicator={false}>
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
          <View style={styles.nonMemberAvatarWrapper}>
            <Image
              source={IMAGES.chatProfile}
              resizeMode="cover"
              style={styles.nonMemberAvatarImage}
            />
          </View>

          <Text style={styles.userName}>Emily Carter</Text>
          <Text style={styles.groupDesc}>
            Passionate mahjong player who loves a good challenge and friendly
            matches. Always up for a game!
          </Text>

          <View style={styles.buttonRow}>
            <View style={styles.buttonHalf}>
              <CustomButton
                title="Add to group"
                icon={ICONS.add}
                style={styles.buttonRounded}
                onPress={() => {openModal()}}
                textStyle={{ fontFamily: FONTS.semiBold }}
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
      </ScrollView>


        <Modal
        visible={isModalVisible}
        transparent
        animationType="none"
        onRequestClose={closeModal}
      >
        <BlurView
          style={StyleSheet.absoluteFill}
          blurType="dark"
          blurAmount={5}
          reducedTransparencyFallbackColor="white"
        />
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
                    <Text style={styles.modalTitle}>Add to Group</Text>
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
                    <SearchField
                      placeholder="Search by name"
                      value={query}
                      onChangeText={setQuery}
                    />
                  </View>
                  <View style={styles.flatListContainer}>
                    <FlatList
                      data={filteredData}
                      keyExtractor={item => item.id.toString()}
                      ListEmptyComponent={
                        <Text
                          style={{
                            textAlign: 'center',
                            color: COLORS.lightGrey,
                            fontFamily: FONTS.regular,
                            fontSize: RFPercentage(1.8),
                            marginTop: RFPercentage(5),
                          }}
                        >
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
                                <View style={styles.contactAvatarWrapper}>
                                  <Image
                                    source={IMAGES.customProfile}
                                    resizeMode="cover"
                                    style={styles.contactAvatar}
                                  />
                                </View>
                                <View style={styles.contactInfo}>
                                  <Text style={styles.contactName}>
                                    {item.name}
                                  </Text>
                                  <Text style={styles.contactMembers}>
                                    {item.members}
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

                <View style={styles.modalFooter}>
                  <View style={styles.modalFooterInner}>
                    <CustomButton
                      title="Add Sophie To 2 Groups"
                      onPress={() => {
                        closeModal();
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
              </Animated.View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  );
};

export default InstructorProfile;

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
  backgroundImage: {
    width: '100%',
    height: RFPercentage(26),
  },
  mainContent: {
    width: '90%',
    alignSelf: 'center',
    bottom: RFPercentage(8),
  },
  nonMemberAvatarWrapper: {
    width: RFPercentage(10),
    height: RFPercentage(10),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.pink3,
    borderTopRightRadius: RFPercentage(5),
    borderTopLeftRadius: RFPercentage(5),
  },
  nonMemberAvatarImage: {
    width: RFPercentage(10),
    height: RFPercentage(10),
    right: RFPercentage(0.2),
    bottom: RFPercentage(0.1),
    borderTopRightRadius: RFPercentage(5),
    borderTopLeftRadius: RFPercentage(5),
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
    marginTop: RFPercentage(3.5),
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
    overLay2: {
    flex: 1,
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
