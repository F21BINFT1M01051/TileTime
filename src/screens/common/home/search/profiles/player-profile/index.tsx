import {
  ImageBackground,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Platform,
  ScrollView,
} from 'react-native';
import React, { useState } from 'react';
import { COLORS, IMAGES, FONTS, ICONS } from '../../../../../../config/theme';
import { RFPercentage } from 'react-native-responsive-fontsize';
import AntDesign from 'react-native-vector-icons/AntDesign';
import CustomButton from '../../../../../../components/CustomButton';
import CommonGroup from '../../../../../../components/CommonGroups';
import AddToGroupModal from '../../../../../../components/AddToGroup';

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
  const [selectedContacts, setSelectedContacts] = useState([]);
  const [query, setQuery] = useState('');

  const filteredData = players.filter(item =>
    item.name.toLowerCase().includes(query.toLowerCase()),
  );

  const toggleContact = id => {
    setSelectedContacts(prev =>
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id],
    );
  };

  const openModal = () => {
    setIsModalVisible(true);
  };

  const closeModal = () => {
    setIsModalVisible(false);
  };

  return (
    <View style={styles.safeArea}>
      <ScrollView showsVerticalScrollIndicator={false}>
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

        {/* User Info */}
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
          <Text style={styles.locationText}>Seattle, WA</Text>
          <Text style={styles.groupDesc}>
            Mahjong lover always up for a good game! Here to learn, have fun,
            and meet fellow tile-heads along the way.
          </Text>

          {/* Buttons */}
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

          {/* Common Info */}
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

      <AddToGroupModal
        isVisible={isModalVisible}
        onClose={closeModal}
        query={query}
        setQuery={setQuery}
        filteredData={filteredData}
        selectedContacts={selectedContacts}
        toggleContact={toggleContact}
      />
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
});
