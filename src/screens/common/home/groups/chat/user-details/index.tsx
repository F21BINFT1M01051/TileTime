import {
  ImageBackground,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
  Platform,
} from 'react-native';
import React, { useState } from 'react';
import { COLORS, IMAGES, FONTS, ICONS } from '../../../../../../config/theme';
import { RFPercentage } from 'react-native-responsive-fontsize';
import CustomButton from '../../../../../../components/CustomButton';
import DetailComponent from '../../../../../../components/DetailComponent';
import SettingsButton from '../../../../../../components/SettingsButton';
import SocialField from '../../../../../../components/SocialField';
import CommonGroup from '../../../../../../components/CommonGroups';
import LinearGradient from 'react-native-linear-gradient';
import CreateEvent from '../../../../../../components/CreateEvent';
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

const UserDetails = ({ navigation }: any) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedType, setSelectedType] = useState('');

  const openModal = () => {
    setIsModalVisible(true);
  };

  const [isModalVisible2, setIsModalVisible2] = useState(false);
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

  const openModal2 = () => {
    setIsModalVisible2(true);
  };

  const closeModal2 = () => {
    setIsModalVisible2(false);
  };

  return (
    <View style={styles.safeArea}>
      <View style={styles.headerBorder}>
        <View style={styles.headerContainer}>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => navigation.goBack()}
            style={styles.zIndexHigh}
          >
            <Image
              source={ICONS.back}
              resizeMode="contain"
              style={{ width: RFPercentage(3), height: RFPercentage(3) }}
            />
          </TouchableOpacity>
        </View>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.fullWidth}>
          <ImageBackground
            source={IMAGES.single}
            resizeMode="repeat"
            style={styles.backgroundImage}
          >
            <LinearGradient
              colors={['rgba(255, 255, 255, 0.3)', 'rgba(255, 255, 255, 0.8)']}
              style={{
                width: '100%',
                height: RFPercentage(25),
              }}
            >
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
            </LinearGradient>
          </ImageBackground>
        </View>
        <View style={styles.mainContent}>
          <Text style={styles.userName}>Sophie Reynolds</Text>

          <View style={styles.buttonRow}>
            <View style={styles.buttonHalf}>
              <CustomButton
                title="Add to group"
                icon={ICONS.add}
                style={styles.buttonRounded}
                onPress={openModal2}
              />
            </View>
            <View style={styles.buttonHalf}>
              <CustomButton
                title="Create Event"
                icon={ICONS.calender}
                style={styles.buttonRounded}
                onPress={openModal}
              />
            </View>
          </View>

          <View style={styles.viewProfile}>
            <SettingsButton
              title="View Profile"
              icon={ICONS.user4}
              onPress={() => navigation.navigate('PlayerProfile')}
              style={{ borderBottomColor: COLORS.lightWhite }}
            />
          </View>

          <View>
            <DetailComponent
              title="Media and Documents"
              media={true}
              onPress={() => {
                navigation.navigate('ChatMedia');
              }}
              style={{ borderBottomColor: COLORS.lightWhite }}
            />
          </View>

          <View style={styles.sectionMargin}>
            <CommonGroup onPress={() => navigation.navigate('CommonGroups')} />
          </View>

          <View style={styles.sectionMargin}>
            <SettingsButton
              title="Download to Gallery"
              icon={ICONS.download}
              switch={true}
              style={{ borderBottomColor: COLORS.lightWhite }}
            />
            <Text style={styles.galleryText}>
              Automatically save photos you receive to Gallery.
            </Text>
          </View>

          <View style={styles.sectionMargin}>
            <SocialField
              name="Unmute Group"
              color={COLORS.primary}
              icon={ICONS.mute2}
              borderColor={COLORS.primary}
              navigation=""
            />
          </View>
        </View>
      </ScrollView>

      <CreateEvent
        visible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
        title="Select Event Type"
        selectedValue={selectedType}
        onSelect={setSelectedType}
        onConfirm={() => {
          setIsModalVisible(false);
          navigation.navigate('InvitePlayer');
        }}
      />
      <AddToGroupModal
        isVisible={isModalVisible2}
        onClose={closeModal2}
        query={query}
        setQuery={setQuery}
        filteredData={filteredData}
        selectedContacts={selectedContacts}
        toggleContact={toggleContact}
      />
    </View>
  );
};

export default UserDetails;

const styles = StyleSheet.create({
  safeArea: { backgroundColor: COLORS.white, flex: 1 },
  fullWidth: { width: '100%', marginTop: RFPercentage(10) },
  zIndexHigh: { zIndex: 999999 },
  backgroundImage: {
    width: '100%',
    height: RFPercentage(24),
    top: RFPercentage(-14),
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
    marginTop: Platform.OS === 'android' ? RFPercentage(7) : RFPercentage(7.6),
  },
  mainContent: { width: '90%', alignSelf: 'center', bottom: RFPercentage(17) },
  avatarOuterLayer: {
    width: RFPercentage(10),
    height: RFPercentage(11.5),
    borderRadius: RFPercentage(4.2),
    backgroundColor: COLORS.purple,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: RFPercentage(8),
    marginLeft: RFPercentage(2.5),
  },
  avatarMiddleLayer: {
    backgroundColor: COLORS.green2,
    width: RFPercentage(10),
    height: RFPercentage(11.5),
    borderRadius: RFPercentage(4.2),
    alignItems: 'center',
    justifyContent: 'center',
    right: RFPercentage(0.3),
  },
  avatarInnerLayer: {
    backgroundColor: COLORS.pink3,
    width: RFPercentage(10),
    height: RFPercentage(11.5),
    borderRadius: RFPercentage(4.2),
    alignItems: 'center',
    justifyContent: 'center',
    right: RFPercentage(0.3),
  },
  avatarImage: {
    width: RFPercentage(10),
    height: RFPercentage(11.5),
    borderRadius: RFPercentage(4.2),
    right: RFPercentage(0.3),
    bottom: RFPercentage(0.2),
  },
  userName: {
    fontFamily: FONTS.extraBold,
    color: COLORS.primary,
    fontSize: RFPercentage(3),
    marginTop: RFPercentage(3),
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

  buttonRow: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: RFPercentage(4),
  },
  buttonHalf: {
    width: '48%',
  },
  buttonRounded: {
    borderRadius: RFPercentage(1.6),
    height: RFPercentage(5.6),
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
    marginTop: RFPercentage(0.6),
  },
});
