import {
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useState } from 'react';
import LinearGradient from 'react-native-linear-gradient';
import TopNavigation from '../../../routers/TopBar';
import { COLORS, FONTS, ICONS, IMAGES } from '../../../config/theme';
import { RFPercentage } from 'react-native-responsive-fontsize';
import CustomButton from '../../../components/CustomButton';
import Group from './group';
import Chat from './chat';

const Groups = ({ navigation }: any) => {
  const [activeTab, setActiveTab] = useState('groups');
  const groups = ['1', '2'];
  const chats = ['5', '6'];

  return (
    <LinearGradient
      colors={[COLORS.white, COLORS.offWhite2]}
      style={styles.gradientContainer}
    >
      <View>
        <ImageBackground
          source={IMAGES.background}
          resizeMode="cover"
          style={styles.imageBackground}
        >
          <TopNavigation />
          <View style={styles.contentContainer}>
            <View style={styles.tabContainer}>
              {/* Groups Button */}
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => setActiveTab('groups')}
                style={[
                  styles.tabButton,
                  activeTab === 'groups' && styles.activeTabButton,
                ]}
              >
                <Text
                  style={[
                    styles.tabButtonText,
                    activeTab === 'groups' && styles.activeTabButtonText,
                  ]}
                >
                  Groups
                </Text>
              </TouchableOpacity>

              {/* Chats Button */}
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => setActiveTab('chats')}
                style={[
                  styles.tabButton,
                  activeTab === 'chats' && styles.activeTabButton,
                ]}
              >
                <Text
                  style={[
                    styles.tabButtonText,
                    activeTab === 'chats' && styles.activeTabButtonText,
                  ]}
                >
                  Chats
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ImageBackground>

        <View
          style={[
            styles.contentContainer,
            {bottom: RFPercentage(9) },
          ]}
        >
          {activeTab === 'groups' && groups.length > 0 ? (
            <>
              <Group />
            </>
          ) : activeTab === 'chat' && chats.length > 0 ? (
            <Chat />
          ) : (
            <>
              <View style={styles.titleContainer}>
                <Text style={styles.mainTitle}>
                  {activeTab === 'groups'
                    ? `Start a Group and\nInvite Others`
                    : `Start a Chat and\nStay Connected`}
                </Text>
              </View>
              <View style={styles.subtitleContainer}>
                <Text style={styles.subtitleText}>
                  {activeTab === 'groups'
                    ? `Groups are a great way to connect with others\nwho share your interests.`
                    : `Chats are a great way to keep in touch with your group, share updates, and enjoy the game together.`}
                </Text>
                <Image
                  source={ICONS.border}
                  resizeMode="contain"
                  style={styles.borderIcon}
                />
              </View>

              <Image
                source={IMAGES.group}
                resizeMode="contain"
                style={styles.groupImage}
              />
              <View style={styles.buttonWrapper}>
                <CustomButton
                  title={
                    activeTab === 'groups'
                      ? 'Create Your First Group'
                      : 'Start Your First Chat'
                  }
                  onPress={() => {
                    navigation.navigate('CreateGroup');
                  }}
                />
              </View>
            </>
          )}
        </View>
      </View>
    </LinearGradient>
  );
};

export default Groups;

const styles = StyleSheet.create({
  gradientContainer: {
    flex: 1,
  },
  imageBackground: {
    width: '100%',
    height: RFPercentage(35),
  },
  contentContainer: {
    width: '90%',
    alignSelf: 'center',
    alignItems: 'center',
  },
  tabContainer: {
    width: '100%',
    backgroundColor: COLORS.white,
    borderWidth: RFPercentage(0.1),
    borderColor: COLORS.lightWhite,
    borderRadius: RFPercentage(2.5),
    height: RFPercentage(6.5),
    marginTop: RFPercentage(4),
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: RFPercentage(0.5),
  },
  tabButton: {
    width: '50%',
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    borderRadius: RFPercentage(2),
  },
  activeTabButton: {
    backgroundColor: COLORS.pink,
  },
  tabButtonText: {
    color: COLORS.grey5,
    fontFamily: FONTS.regular,
  },
  activeTabButtonText: {
    color: COLORS.white,
    fontFamily: FONTS.medium,
  },
  titleContainer: {},
  mainTitle: {
    color: COLORS.primary,
    fontFamily: FONTS.headline,
    fontSize: RFPercentage(3),
    textAlign: 'center',
  },
  subtitleContainer: {
    marginTop: RFPercentage(1),
  },
  subtitleText: {
    color: COLORS.primary,
    fontFamily: FONTS.stylish,
    fontSize: RFPercentage(2),
    textAlign: 'center',
  },
  borderIcon: {
    width: RFPercentage(10),
    height: RFPercentage(2),
    alignSelf: 'flex-end',
    right: RFPercentage(7),
  },
  bottomContainer: {
    width: '90%',
    alignSelf: 'center',
    marginTop: RFPercentage(8),
    alignItems: 'center',
  },
  groupImage: {
    width: RFPercentage(50),
    height: RFPercentage(30),
  },
  buttonWrapper: {
    width: '100%',
    alignSelf: 'center',
    alignContent: 'center',
    marginTop: RFPercentage(5),
  },
});
