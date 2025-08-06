import {
  ImageBackground,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import React from 'react';
import { COLORS, IMAGES, FONTS, ICONS } from '../../../../../config/theme';
import { RFPercentage } from 'react-native-responsive-fontsize';
import AntDesign from 'react-native-vector-icons/AntDesign';
import CustomButton from '../../../../../components/CustomButton';
import CommonGroup from '../../../../../components/CommonGroups';

const InstructorProfile = ({ navigation }: any) => {
  return (
    <View style={styles.safeArea}>
      <ScrollView>
        <View style={{ width: '100%' }}>
          <ImageBackground
            source={IMAGES.single}
            resizeMode="repeat"
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
                onPress={() => {}}
              />
            </View>
            <View style={styles.buttonHalf}>
              <CustomButton
                title="Send Message"
                icon={ICONS.message}
                style={styles.buttonRounded}
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
    marginTop: RFPercentage(5),
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
    height: RFPercentage(20),
  },
  mainContent: {
    width: '90%',
    alignSelf: 'center',
    bottom: RFPercentage(6),
  },
  nonMemberAvatarWrapper: {
    width: RFPercentage(9),
    height: RFPercentage(9),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.pink3,
    borderTopRightRadius: RFPercentage(5),
    borderTopLeftRadius: RFPercentage(5),
  },
  nonMemberAvatarImage: {
    width: RFPercentage(9),
    height: RFPercentage(9),
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
    marginTop: RFPercentage(4),
  },
  buttonHalf: {
    width: '48%',
  },
  buttonRounded: {
    borderRadius: RFPercentage(1.6),
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
