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
import AntDesign from 'react-native-vector-icons/AntDesign';
import CustomButton from '../../../../../../components/CustomButton';
import CommonGroup from '../../../../../../components/CommonGroups';
import AddToGroupModal from '../../../../../../components/AddToGroup';
import LinearGradient from 'react-native-linear-gradient';

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

  const openModal = () => {
    setIsModalVisible(true);
  };

  const closeModal = () => {
    setIsModalVisible(false);
  };

  return (
    <View style={styles.safeArea}>
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
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{ width: '100%' }}>
          <ImageBackground
            source={IMAGES.single}
            resizeMode="cover"
            style={styles.backgroundImage}
          >
            <LinearGradient
              colors={['#F5FDFF', 'rgba(255, 255, 255, 0.6)']}
              style={{
                width: '100%',
                height: RFPercentage(28),
              }}
            >
              <View style={styles.nonMemberAvatarWrapper}>
                <Image
                  source={IMAGES.chatProfile}
                  resizeMode="cover"
                  style={styles.nonMemberAvatarImage}
                />
              </View>
            </LinearGradient>
          </ImageBackground>
        </View>
        <View style={styles.mainContent}>
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
                onPress={() => {
                  openModal();
                }}
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
    height: RFPercentage(28),
    top: RFPercentage(-6),
  },

  mainContent: {
    width: '90%',
    alignSelf: 'center',
    bottom: RFPercentage(10),
  },
  nonMemberAvatarWrapper: {
    width: RFPercentage(10),
    height: RFPercentage(10),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.pink3,
    borderTopRightRadius: RFPercentage(5),
    borderTopLeftRadius: RFPercentage(5),
    marginTop:RFPercentage(13),
    marginLeft:RFPercentage(2)
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
});
