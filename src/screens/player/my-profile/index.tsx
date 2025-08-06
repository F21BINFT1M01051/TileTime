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

const MyProfile = ({ navigation }: any) => {
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
    <View style={{ flex: 1, backgroundColor: COLORS.white }}>
      <ScrollView contentContainerStyle={{ paddingBottom: RFPercentage(2) }} >
        <View
          style={{
            marginTop: Platform.OS == 'ios' ? RFPercentage(6) : RFPercentage(5),
            paddingBottom: RFPercentage(1.5),
            borderBottomWidth: RFPercentage(0.1),
            borderBottomColor: '#D8D8D8',
          }}
        >
          <View
            style={{
              width: '90%',
              alignSelf: 'center',
              alignItems: 'center',
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}
          >
            <Text
              style={{
                color: COLORS.primary,
                fontFamily: FONTS.semiBold,
                fontSize: RFPercentage(1.9),
              }}
            >
              My Profile
            </Text>
            <TouchableOpacity>
              <Image
                source={ICONS.cross}
                tintColor={'#8C8C8C'}
                resizeMode="contain"
                style={{ width: RFPercentage(2.8), height: RFPercentage(2.8) }}
              />
            </TouchableOpacity>
          </View>
        </View>
        <View
          style={{
            width: '90%',
            alignSelf: 'center',
            marginTop: RFPercentage(2.6),
          }}
        >
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}
          >
            <Image
              source={IMAGES.customProfile}
              resizeMode="cover"
              style={{
                width: RFPercentage(15),
                height: RFPercentage(15),
                borderRadius: RFPercentage(100),
              }}
            />
            <View style={{ marginLeft: RFPercentage(2.5) }}>
              <Text
                style={{
                  fontFamily: FONTS.headline,
                  color: COLORS.primary,
                  fontSize: RFPercentage(2.5),
                }}
              >
                Samantha Lewis
              </Text>
              <Text
                style={{
                  fontFamily: FONTS.regular,
                  color: COLORS.black,
                  fontSize: RFPercentage(1.8),
                  marginTop: RFPercentage(0.5),
                }}
              >
                Seattle, WA
              </Text>
              <CustomButton
                title="Edit Profile"
                icon={ICONS.pen22}
                onPress={()=> navigation.navigate("EditProfile")}
                style={{
                  borderRadius: RFPercentage(1.6),
                  marginTop: RFPercentage(1.8),
                  height: RFPercentage(5.8),
                }}
              />
            </View>
          </View>
          <Text
            style={{
              color: COLORS.primary,
              fontFamily: FONTS.regular,
              fontSize: RFPercentage(1.8),
              marginTop: RFPercentage(3),
            }}
          >
            Mahjong instructor focused on strategy, community, and fun. Open to
            all skill levels - join the table and play your way.
          </Text>

          <View style={{ marginTop: RFPercentage(0.5) }}>
            <FlatList
              data={connects}
              scrollEnabled={false}
              keyExtractor={item => item.id.toString()}
              contentContainerStyle={{ paddingBottom: RFPercentage(2) }}
              renderItem={({ item }) => {
                return (
                  <View
                    style={{
                      width: '100%',
                      alignItems: 'center',
                      flexDirection: 'row',
                      marginTop: RFPercentage(2.8),
                    }}
                  >
                    <Image
                      source={item.icon}
                      resizeMode="contain"
                      style={{
                        width: RFPercentage(3),
                        height: RFPercentage(3),
                      }}
                    />
                    {item.connected ? (
                      <>
                        <Text
                          style={{
                            color: COLORS.primary,
                            fontSize: RFPercentage(1.8),
                            fontFamily: FONTS.regular,
                            marginLeft: RFPercentage(1.6),
                          }}
                        >
                          {item.connection}
                        </Text>
                      </>
                    ) : (
                      <>
                        <Text
                          style={{
                            color: COLORS.lightGrey,
                            fontSize: RFPercentage(1.8),
                            fontFamily: FONTS.regular,
                            marginLeft: RFPercentage(1.6),
                          }}
                        >
                          Not Connected
                        </Text>
                        <TouchableOpacity
                          style={{
                            width: RFPercentage(13),
                            height: RFPercentage(3.5),
                            borderRadius: RFPercentage(100),
                            backgroundColor: COLORS.primary,
                            position: 'absolute',
                            right: 0,
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}
                        >
                          <Text
                            style={{
                              color: COLORS.white,
                              fontSize: RFPercentage(1.6),
                              fontFamily: FONTS.medium,
                            }}
                          >
                            Connect Now
                          </Text>
                        </TouchableOpacity>
                      </>
                    )}
                  </View>
                );
              }}
            />
          </View>
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

          <View
            style={{
              width: '100%',
              borderRadius: RFPercentage(3),
              height: RFPercentage(36.5),
              borderWidth: RFPercentage(0.1),
              borderColor: COLORS.lightWhite,
              marginTop: RFPercentage(2),
            }}
          >
            <ImageBackground
              source={IMAGES.background}
              resizeMode="cover"
              style={{
                width: '100%',
                height: '100%',
                alignItems: 'center',
                padding: RFPercentage(2.5),
              }}
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
                    style={{
                      width: RFPercentage(2),
                      height: RFPercentage(2),
                      position: 'absolute',
                      bottom: RFPercentage(0.5),
                      right: RFPercentage(-0.8),
                    }}
                  />
                </View>
              </View>
              <View
                style={{
                  marginTop: RFPercentage(2),
                  flexDirection: 'row',
                  alignItems: 'center',
                }}
              >
                <Image
                  source={ICONS.stars2}
                  resizeMode="contain"
                  style={{
                    width: RFPercentage(4.5),
                    height: RFPercentage(4.5),
                    position: 'absolute',
                    left: RFPercentage(-4.5),
                  }}
                />
                <Text
                  style={{
                    color: COLORS.primary,
                    fontFamily: FONTS.semiBold,
                    fontSize: RFPercentage(1.8),
                  }}
                >
                  Upgrade to Instructor
                </Text>

                <Image
                  source={ICONS.border}
                  resizeMode="contain"
                  style={{
                    width: RFPercentage(8),
                    height: RFPercentage(5),
                    position: 'absolute',
                    right: 0,
                    top: RFPercentage(0.5),
                  }}
                />
              </View>
              <Text
                style={{
                  textAlign: 'center',
                  fontSize: RFPercentage(1.8),
                  color: COLORS.lightGrey,
                  fontFamily: FONTS.regular,
                  marginTop: RFPercentage(3.4),
                  marginHorizontal: RFPercentage(4),
                }}
              >
                Host games, grow your audience, and get discovered by players
                near you.
              </Text>
              <CustomButton
                title="Upgrade Now"
                style={{ marginTop: RFPercentage(3.5) }}
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
            <Animated.View
              style={[
                styles.modalContent,
                {
                  transform: [{ translateY: slideAnim }],
                },
              ]}
            >
              <Image
                source={ICONS.premium22}
                resizeMode="contain"
                style={{ width: RFPercentage(40), height: RFPercentage(14), alignSelf:"center" }}
              />
              <View style={{ width: '90%', alignSelf: 'center' , marginTop:RFPercentage(2)}}>
                <Text style={styles.modalText}>
                  Join Our Instructor Network
                </Text>
                <Image
                  source={ICONS.qoutes}
                  resizeMode="contain"
                  style={{
                    width: RFPercentage(4),
                    height: RFPercentage(4),
                    position: 'absolute',
                    right: 0,
                    top:RFPercentage(-1)
                  }}
                />

                <Text style={styles.subTitle}>
                  {`Become an Instructor to unlock exclusive\ntools and grow your Mahjong presence.`}
                </Text>
                <View style={{ marginTop: RFPercentage(1) }}>
                  <FlatList
                    data={premiumDetails}
                    keyExtractor={item => item.id.toString()}
                    renderItem={({ item }) => {
                      return (
                        <View style={{ marginTop: RFPercentage(3) }}>
                          <View style={{ flexDirection: 'row' }}>
                            <Image
                              source={item.icon}
                              resizeMode="contain"
                              style={{
                                width: RFPercentage(3),
                                height: RFPercentage(3),
                              }}
                            />
                            <View
                              style={{
                                marginLeft: RFPercentage(1),
                                width: '90%',
                              }}
                            >
                              <Text
                                style={{
                                  color: COLORS.primary,
                                  fontSize: RFPercentage(2),
                                  fontFamily: FONTS.bold,
                                }}
                              >
                                {item.title}
                              </Text>
                              <Text
                                style={{
                                  color: COLORS.lightGrey,
                                  fontSize: RFPercentage(1.9),
                                  fontFamily: FONTS.regular,
                                  marginTop: RFPercentage(0.5),
                                }}
                              >
                                {item.subTile}
                              </Text>
                            </View>
                          </View>
                        </View>
                      );
                    }}
                  />
                </View>
              </View>
              <View
                style={{
                  marginTop: RFPercentage(5),
                  borderTopWidth: RFPercentage(0.1),
                  borderTopColor: COLORS.lightWhite,
                }}
              >
                <View
                  style={{
                    width: '90%',
                    alignSelf: 'center',
                    marginTop: RFPercentage(2),
                  }}
                >
                  <CustomButton title="Understood" onPress={closeModal} />
                </View>
              </View>
            </Animated.View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  );
};

export default MyProfile;

const styles = StyleSheet.create({
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
  modalText: {
    fontSize: RFPercentage(2.3),
    fontFamily: FONTS.headline,
    color: COLORS.primary,
    textAlign: 'center',
  },
  subTitle: {
    fontFamily: FONTS.regular,
    color: COLORS.lightGrey,
    fontSize: RFPercentage(1.8),
    marginTop: RFPercentage(1.3),
    textAlign: 'center',
  },
});
