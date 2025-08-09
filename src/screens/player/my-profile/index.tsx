import {
  FlatList,
  Image,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TouchableWithoutFeedback,
  Modal,
  ImageBackground,
  ScrollView,
  Animated,
  Easing,
  Dimensions,
} from 'react-native';
import React, { useState, useRef } from 'react';
import { COLORS, FONTS, ICONS, IMAGES } from '../../../config/theme';
import { RFPercentage } from 'react-native-responsive-fontsize';
import CustomButton from '../../../components/CustomButton';
import ToggleSwitch from 'toggle-switch-react-native';
import TopNavigation from '../../../routers/TopBar';

const connects = [
  {
    id: 1,
    icon: ICONS.phone2,
    connected: true,
    connection: '(909) 934 6677',
  },
  {
    id: 2,
    icon: ICONS.insta,
    connected: true,
    connection: '@adam11kiwi__',
  },
  {
    id: 3,
    icon: ICONS.facebook,
    connected: true,
    connection: '@adam11kiwi__',
  },
  {
    id: 4,
    icon: ICONS.tiktok,
    connected: false,
  },
];

const premiumDetails = [
  {
    id: 1,
    title: 'Host your own events',
    subTile: 'Create, schedule, and manage games your way.',
    icon: ICONS.star,
  },
  {
    id: 2,
    title: 'Build your community',
    subTile: 'Grow your community and your player network.',
    icon: ICONS.pinkArrow,
  },
  {
    id: 3,
    title: 'Get featured and discovered',
    subTile: 'Stand out to players looking for guidance and fun sessions.',
    icon: ICONS.blueTick,
  },
];

const MyProfilePlayer = ({ navigation }: any) => {
  const [isOn, setIsOn] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
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
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContent} showsVerticalScrollIndicator={false}>
        <TopNavigation title="My Profile" />

        <View style={styles.profileContainer}>
          <View style={styles.profileHeader}>
            <Image
              source={IMAGES.customProfile}
              resizeMode="cover"
              style={styles.profileImage}
            />
            <View style={styles.profileInfo}>
              <Text style={styles.nameText}>Samantha Lewis</Text>
              <Text style={styles.locationText}>Seattle, WA</Text>
              <CustomButton
                title="Edit Profile"
                icon={ICONS.pen22}
                onPress={() => navigation.navigate('EditProfile')}
                style={styles.editButton}
                textStyle={{ fontFamily: FONTS.semiBold }}
              />
            </View>
          </View>

          <Text style={styles.bioText}>
            Mahjong instrucsdsdstor focused on strategy, community, and fun.
            Open to all skill levels - join the table and play your way.
          </Text>

          <FlatList
            data={connects}
            scrollEnabled={false}
            keyExtractor={item => item.id.toString()}
            contentContainerStyle={styles.connectList}
            renderItem={({ item }) => (
              <View style={styles.connectItem}>
                <Image
                  source={item.icon}
                  resizeMode="contain"
                  style={styles.connectIcon}
                />
                {item.connected ? (
                  <Text style={styles.connectedText}>{item.connection}</Text>
                ) : (
                  <>
                    <Text style={styles.notConnectedText}>Not Connected</Text>
                    <TouchableOpacity
                      style={styles.connectButton}
                      activeOpacity={0.8}
                    >
                      <Text style={styles.connectButtonText}>Connect Now</Text>
                    </TouchableOpacity>
                  </>
                )}
              </View>
            )}
          />

          <View style={styles.toggleRow}>
            <Text style={styles.toggleLabel}>Keep My Profile Private</Text>
            <ToggleSwitch
              isOn={isOn}
              onColor={COLORS.pink}
              offColor={COLORS.switch}
              size="small"
              onToggle={() => setIsOn(!isOn)}
            />
          </View>

          <View style={styles.premiumBox}>
            <ImageBackground
              source={ICONS.modal}
              resizeMode="cover"
              style={styles.premiumBackground}
            >
              <View>
                <View style={styles.nonMemberAvatarWrapper}>
                  <Image
                    source={IMAGES.chatProfile}
                    resizeMode="cover"
                    style={styles.nonMemberAvatarImage}
                  />
                  <Image
                    source={ICONS.premium}
                    resizeMode="contain"
                    style={styles.premiumBadge}
                  />
                </View>
              </View>

              <View style={styles.upgradeHeader}>
                <Image
                  source={ICONS.stars2}
                  resizeMode="contain"
                  style={styles.starsIcon}
                />
                <Text style={styles.upgradeText}>Upgrade to Instructor</Text>
                <Image
                  source={ICONS.border}
                  resizeMode="contain"
                  style={styles.borderIcon}
                />
              </View>

              <Text style={styles.upgradeDescription}>
                Host games, grow your audience, and get discovered by players
                near you.
              </Text>

              <CustomButton
                title="Upgrade Now"
                style={styles.upgradeBtn}
                onPress={openModal}
              />
            </ImageBackground>
          </View>
        </View>
      </ScrollView>

      <Modal
        visible={isModalVisible}
        transparent
        animationType="none"
        onRequestClose={closeModal}
      >
        <TouchableWithoutFeedback onPress={closeModal}>
          <View style={styles.overLay}>
            <TouchableWithoutFeedback>
              <Animated.View
                style={[
                  styles.modalContent,
                  { transform: [{ translateY: slideAnim }] },
                ]}
              >
                <Image
                  source={ICONS.premium22}
                  resizeMode="contain"
                  style={styles.modalBanner}
                />

                <View style={styles.modalInnerContent}>
                  <Text style={styles.modalText}>
                    Join Our Instructor Network
                  </Text>
                  <Image
                    source={ICONS.qoutes}
                    resizeMode="contain"
                    style={styles.modalQuote}
                  />

                  <Text style={styles.subTitle}>
                    {`Become an Instructor to unlock exclusive\ntools and grow your Mahjong presence.`}
                  </Text>

                  <FlatList
                    data={premiumDetails}
                    keyExtractor={item => item.id.toString()}
                    renderItem={({ item }) => (
                      <View style={styles.premiumFeature}>
                        <View style={styles.premiumFeatureRow}>
                          <Image
                            source={item.icon}
                            resizeMode="contain"
                            style={styles.featureIcon}
                          />
                          <View style={styles.featureTextWrapper}>
                            <Text style={styles.featureTitle}>
                              {item.title}
                            </Text>
                            <Text style={styles.featureSub}>
                              {item.subTile}
                            </Text>
                          </View>
                        </View>
                      </View>
                    )}
                  />
                </View>

                <View style={styles.modalFooter}>
                  <View style={styles.modalFooterInner}>
                    <CustomButton
                      title="Understood"
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

export default MyProfilePlayer;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  scrollViewContent: {
    paddingBottom: RFPercentage(2),
  },
  profileContainer: {
    width: '90%',
    alignSelf: 'center',
    marginTop: RFPercentage(3),
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  profileImage: {
    width: RFPercentage(13.5),
    height: RFPercentage(13.5),
    borderRadius: RFPercentage(100),
  },
  profileInfo: {
    marginLeft: RFPercentage(2),
  },
  nameText: {
    fontFamily: FONTS.headline,
    color: COLORS.primary,
    fontSize: RFPercentage(2.5),
  },
  locationText: {
    fontFamily: FONTS.regular,
    color: COLORS.black,
    fontSize: RFPercentage(1.8),
    marginTop: RFPercentage(0.5),
  },
  editButton: {
    borderRadius: RFPercentage(1.4),
    marginTop: RFPercentage(1.8),
    height: RFPercentage(5.2),
  },
  bioText: {
    color: COLORS.primary,
    fontFamily: FONTS.regular,
    fontSize: RFPercentage(1.7),
    marginTop: RFPercentage(3),
  },
  connectList: {
    paddingBottom: RFPercentage(2),
  },
  connectItem: {
    width: '100%',
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: RFPercentage(3.5),
  },
  connectIcon: {
    width: RFPercentage(2.5),
    height: RFPercentage(2.5),
  },
  connectedText: {
    color: COLORS.primary,
    fontSize: RFPercentage(1.8),
    fontFamily: FONTS.regular,
    marginLeft: RFPercentage(1.6),
  },
  notConnectedText: {
    color: COLORS.lightGrey,
    fontSize: RFPercentage(1.8),
    fontFamily: FONTS.regular,
    marginLeft: RFPercentage(1.6),
  },
  connectButton: {
    width: RFPercentage(13.4),
    height: RFPercentage(3.5),
    borderRadius: RFPercentage(100),
    backgroundColor: COLORS.primary,
    position: 'absolute',
    right: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  connectButtonText: {
    color: COLORS.white,
    fontSize: RFPercentage(1.6),
    fontFamily: FONTS.medium,
  },
  toggleRow: {
    width: '100%',
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: RFPercentage(2),
  },
  toggleLabel: {
    textAlign: 'center',
    fontFamily: FONTS.medium,
    color: COLORS.inputColor,
    fontSize: RFPercentage(1.9),
  },
  premiumBox: {
    width: '100%',
    borderRadius: RFPercentage(3),
    height: RFPercentage(36.5),
    borderWidth: RFPercentage(0.1),
    borderColor: COLORS.lightWhite,
    marginTop: RFPercentage(2),
  },
  premiumBackground: {
    // width: RFPercentage,
    height: RFPercentage(36.5),
    alignItems: 'center',
    padding: RFPercentage(2.5),
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
    bottom: RFPercentage(0.2),
    borderTopRightRadius: RFPercentage(5),
    borderTopLeftRadius: RFPercentage(5),
  },
  premiumBadge: {
    width: RFPercentage(2),
    height: RFPercentage(2),
    position: 'absolute',
    bottom: RFPercentage(0.5),
    right: RFPercentage(-0.8),
  },
  upgradeHeader: {
    marginTop: RFPercentage(2),
    flexDirection: 'row',
    alignItems: 'center',
  },
  starsIcon: {
    width: RFPercentage(4.5),
    height: RFPercentage(4.5),
    position: 'absolute',
    left: RFPercentage(-4.5),
  },
  upgradeText: {
    color: COLORS.primary,
    fontFamily: FONTS.semiBold,
    fontSize: RFPercentage(1.8),
  },
  borderIcon: {
    width: RFPercentage(8),
    height: RFPercentage(5),
    position: 'absolute',
    right: 0,
    top: RFPercentage(0.5),
  },
  upgradeDescription: {
    textAlign: 'center',
    fontSize: RFPercentage(1.8),
    color: COLORS.lightGrey,
    fontFamily: FONTS.regular,
    marginTop: RFPercentage(3.4),
    marginHorizontal: RFPercentage(4),
  },
  upgradeBtn: {
    marginTop: RFPercentage(3.5),
  },
  overLay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.7)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: COLORS.white,
    borderTopLeftRadius: RFPercentage(3),
    borderTopRightRadius: RFPercentage(3),
    paddingVertical: RFPercentage(4),
  },
  modalBanner: {
    width: RFPercentage(40),
    height: RFPercentage(14),
    alignSelf: 'center',
  },
  modalInnerContent: {
    width: '90%',
    alignSelf: 'center',
    marginTop: RFPercentage(2),
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
  premiumFeature: {
    marginTop: RFPercentage(3),
  },
  premiumFeatureRow: {
    flexDirection: 'row',
  },
  featureIcon: {
    width: RFPercentage(3),
    height: RFPercentage(3),
  },
  featureTextWrapper: {
    marginLeft: RFPercentage(1),
    width: '90%',
  },
  featureTitle: {
    color: COLORS.primary,
    fontSize: RFPercentage(2),
    fontFamily: FONTS.bold,
  },
  featureSub: {
    color: COLORS.lightGrey,
    fontSize: RFPercentage(1.8),
    fontFamily: FONTS.regular,
    marginTop: RFPercentage(0.5),
  },
  modalFooter: {
    marginTop: RFPercentage(5),
    borderTopWidth: RFPercentage(0.1),
    borderTopColor: COLORS.lightWhite,
  },
  modalFooterInner: {
    width: '90%',
    alignSelf: 'center',
    marginTop: RFPercentage(2),
  },
});
