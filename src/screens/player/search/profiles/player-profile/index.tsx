import {
  ImageBackground,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
  Modal,
  TouchableWithoutFeedback,
} from 'react-native';
import React, { useState } from 'react';
import { COLORS, IMAGES, FONTS, ICONS } from '../../../../../config/theme';
import { RFPercentage } from 'react-native-responsive-fontsize';
import AntDesign from 'react-native-vector-icons/AntDesign';
import CustomButton from '../../../../../components/CustomButton';
import CommonGroup from '../../../../../components/CommonGroups';
import { BlurView } from '@react-native-community/blur';

const PlayerProfile = ({ navigation }: any) => {
  const [modalVisible, setModalVisible] = useState(true);
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

      <Modal visible={modalVisible} transparent animationType="fade">
        <TouchableWithoutFeedback>
          <View style={styles.modalWrapper}>
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
  avatarOuterLayer: {
    width: RFPercentage(11),
    height: RFPercentage(12),
    borderRadius: RFPercentage(4.6),
    backgroundColor: COLORS.purple,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarMiddleLayer: {
    backgroundColor: COLORS.green2,
    width: RFPercentage(11),
    height: RFPercentage(12),
    borderRadius: RFPercentage(4.6),
    alignItems: 'center',
    justifyContent: 'center',
    right: RFPercentage(0.3),
  },
  avatarInnerLayer: {
    backgroundColor: COLORS.pink3,
    width: RFPercentage(11),
    height: RFPercentage(12),
    borderRadius: RFPercentage(4.6),
    alignItems: 'center',
    justifyContent: 'center',
    right: RFPercentage(0.3),
  },
  avatarImage: {
    width: RFPercentage(11),
    height: RFPercentage(12),
    borderRadius: RFPercentage(4.6),
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
  },
});
