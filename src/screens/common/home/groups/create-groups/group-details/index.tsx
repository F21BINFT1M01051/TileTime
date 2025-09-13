import {
  ImageBackground,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
  Platform,
  Modal,
  TouchableWithoutFeedback,
} from 'react-native';
import React, { useState } from 'react';
import { COLORS, IMAGES, FONTS, ICONS } from '../../../../../../config/theme';
import { RFPercentage } from 'react-native-responsive-fontsize';
import AntDesign from 'react-native-vector-icons/AntDesign';
import CustomButton from '../../../../../../components/CustomButton';
import DetailComponent from '../../../../../../components/DetailComponent';
import AdminCard from '../../../../../../components/AdminCard';
import SettingsButton from '../../../../../../components/SettingsButton';
import SocialField from '../../../../../../components/SocialField';
import CreateEvent from '../../../../../../components/CreateEvent';
import LinearGradient from 'react-native-linear-gradient';
import { useDispatch, useSelector } from 'react-redux';
import { setEventType } from '../../../../../../redux/event-type/Actions';
import { BlurView } from '@react-native-community/blur';

const GroupDetails = ({ navigation }: any) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedType, setSelectedType] = useState('');
  const dispatch = useDispatch();
  const role = useSelector(state => state.userFlow.userFlow);
  const [modalVisible, setModalVisible] = useState(false);

  const openModal = () => {
    setIsModalVisible(true);
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
              size={RFPercentage(2.5)}
            />
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.8}
            style={styles.dotsButton}
            onPress={() => {
              navigation.navigate('GroupDetails');
            }}
          >
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => navigation.navigate('CreateGroup')}
              style={styles.editButton}
            >
              <Image
                source={ICONS.pen}
                resizeMode="contain"
                style={{
                  width: RFPercentage(2.5),
                  height: RFPercentage(2.5),
                  marginRight: RFPercentage(0.7),
                }}
              />
              <Text style={styles.editText}>Edit</Text>
            </TouchableOpacity>
          </TouchableOpacity>
        </View>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <ImageBackground
          source={IMAGES.groupDetail}
          resizeMode="cover"
          style={styles.groupImage}
        >
          <LinearGradient
            colors={['rgba(255, 255, 255, 0.5)', 'rgba(255, 255, 255, 0.9)']}
            style={{
              width: '100%',
              height: RFPercentage(22),
            }}
          >
            <View style={styles.largeGroupIconContainer}>
              <Image
                source={IMAGES.customProfile}
                resizeMode="cover"
                style={styles.largeGroupIcon}
              />
            </View>
          </LinearGradient>
        </ImageBackground>
        <View style={styles.contentContainer}>
          <View>
            <Text style={styles.groupName}>Mahjong - Richie Rich Group</Text>
            <Text style={styles.groupDesc}>
              Join Fellow Mahjong Enthusiasts For An Evening Of Friendly Matches
              And Lively Conversa
            </Text>
          </View>

          <View style={styles.buttonRow}>
            <View style={styles.buttonWrapper}>
              <CustomButton
                title="Add Member"
                icon={ICONS.add}
                style={styles.customButton}
                onPress={() => navigation.navigate('AddMembers')}
              />
            </View>
            <View style={styles.buttonWrapper}>
              <CustomButton
                title="Create Event"
                icon={ICONS.calender}
                style={styles.customButton}
                onPress={openModal}
              />
            </View>
          </View>

          <View style={styles.sectionMarginTop1}>
            <DetailComponent
              title="Group Members"
              onPress={() => navigation.navigate('GroupMembers')}
            />
          </View>
          <View style={{ marginTop: RFPercentage(0.5) }}>
            <DetailComponent
              title="Media and Documents"
              media={true}
              onPress={() => {
                navigation.navigate('ChatMedia');
              }}
            />
          </View>
          <View style={styles.sectionMarginTop3}>
            <AdminCard
              title="Samantha Lewis (You)"
              subTitle="Group Admin"
              profile={true}
              userId={1}
              visibleTooltipId={null}
              setVisibleTooltipId={() => {}}
            />
          </View>
          <View style={{ marginTop: RFPercentage(1.5) }}>
            <SettingsButton
              title="Permissions & Settings"
              icon={ICONS.settings}
              onPress={() => navigation.navigate('GroupSettings')}
            />
          </View>
          <View style={{ marginTop: RFPercentage(2) }}>
            <SocialField
              name="Mute Group"
              color={COLORS.primary}
              icon={ICONS.mute2}
              borderColor={COLORS.primary}
              navigation=""
            />
          </View>
          <SocialField
            name="Delete Group"
            color={COLORS.red}
            icon={ICONS.trash}
            borderColor={COLORS.red}
            onPress={() => setModalVisible(true)}
          />
        </View>
      </ScrollView>

      <CreateEvent
        visible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
        title="Select Event Type"
        selectedValue={selectedType}
        onSelect={(value: any) => {
          setSelectedType(value);
          dispatch(setEventType(value));
        }}
        onConfirm={() => {
          setIsModalVisible(false);
          if (selectedType === 'Open Play') {
            navigation.navigate('InvitePlayer');
          } else if (
            selectedType === 'Mahjong Lessons' &&
            role === 'Instructor'
          ) {
            navigation.navigate('SelectPlayersInstructor');
          } else if (selectedType === 'Mahjong Lessons' && role === 'Player') {
            navigation.navigate('CreateLessonPlayer');
          } else if (selectedType === 'Guided Play') {
            navigation.navigate('GuidedPlay', {
              players: false,
              groups: false,
              link: true,
            });
          } else {
            setIsModalVisible(false);
          }
        }}
      />

      <Modal
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
        animationType="fade"
        transparent
      >
        <BlurView
          style={StyleSheet.absoluteFill}
          blurType="dark"
          blurAmount={5}
          reducedTransparencyFallbackColor="white"
        />
        <TouchableWithoutFeedback>
          <View
            style={{
              width: '90%',
              alignSelf: 'center',
              alignItems: 'center',
              justifyContent: 'center',
              height: '100%',
            }}
          >
            <View
              style={{
                width: '90%',
                borderRadius: RFPercentage(3),
                backgroundColor: COLORS.white,
                alignItems: 'center',
                justifyContent: 'center',
                paddingVertical: RFPercentage(4),
                paddingBottom:RFPercentage(3)
              }}
            >
              <Text
                style={{
                  color: COLORS.primary,
                  fontFamily: FONTS.medium,
                  textAlign: 'center',
                  fontSize: RFPercentage(2.1),
                }}
              >
                Delete this Group?
              </Text>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginTop: RFPercentage(3.4),
                }}
              >
                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={() => setModalVisible(false)}
                  style={{
                    width: '38%',
                    height: RFPercentage(5),
                    borderWidth: 1,
                    borderColor: COLORS.primary,
                    borderRadius: RFPercentage(2),
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginRight: RFPercentage(3),
                  }}
                >
                  <Text
                    style={{
                      color: COLORS.primary,
                      fontFamily: FONTS.bold,
                      textAlign: 'center',
                      fontSize: RFPercentage(2),
                    }}
                  >
                    Don’t Delete
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={() => setModalVisible(false)}
                  style={{
                    width: '38%',
                    height: RFPercentage(5),
                    borderWidth: 1,
                    borderColor: COLORS.red,
                    borderRadius: RFPercentage(2),
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Text
                    style={{
                      color: COLORS.red,
                      fontFamily: FONTS.bold,
                      textAlign: 'center',
                      fontSize: RFPercentage(2.1),
                    }}
                  >
                    Delete
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  );
};

export default GroupDetails;

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
    marginTop: Platform.OS === 'ios' ? RFPercentage(8) : RFPercentage(6),
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
  editIcon: {
    marginRight: RFPercentage(0.6),
  },
  editText: {
    color: COLORS.black,
    fontFamily: FONTS.semiBold,
    fontSize: RFPercentage(1.8),
  },
  groupImage: {
    width: '100%',
    height: RFPercentage(22),
  },
  contentContainer: {
    width: '90%',
    alignSelf: 'center',
    bottom: RFPercentage(5),
  },
  largeGroupIconContainer: {
    width: RFPercentage(12),
    height: RFPercentage(12),
    backgroundColor: COLORS.yellow,
    alignItems: 'center',
    justifyContent: 'center',
    borderTopLeftRadius: RFPercentage(100),
    borderBottomRightRadius: RFPercentage(100),
    borderTopRightRadius: RFPercentage(100),
    marginTop: RFPercentage(5),
    marginLeft: RFPercentage(2.5),
  },
  largeGroupIcon: {
    width: RFPercentage(11.9),
    height: RFPercentage(11.9),
    borderTopRightRadius: RFPercentage(100),
    right: RFPercentage(0.6),
    borderTopLeftRadius: RFPercentage(100),
    borderBottomRightRadius: RFPercentage(100),
    borderBottomLeftRadius: RFPercentage(2),
  },
  groupName: {
    fontFamily: FONTS.extraBold,
    color: COLORS.primary,
    fontSize: RFPercentage(2.7),
    marginTop: RFPercentage(3),
  },
  groupDesc: {
    fontFamily: FONTS.regular,
    color: COLORS.primary,
    fontSize: RFPercentage(1.9),
    marginTop: RFPercentage(1),
    lineHeight: RFPercentage(2.1),
  },
  buttonRow: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: RFPercentage(3.5),
  },
  buttonWrapper: {
    width: '48%',
  },
  customButton: {
    borderRadius: RFPercentage(1.4),
    height: RFPercentage(5.3),
  },
  sectionMarginTop1: {
    marginTop: RFPercentage(1),
  },
  sectionMarginTop3: {
    marginTop: RFPercentage(3.5),
  },
});
