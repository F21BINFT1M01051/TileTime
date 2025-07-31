import {
  Image,
  ImageBackground,
  ScrollView,
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
import Group from './create-groups/group';
import Chat from './chat';

const Groups = ({ navigation }: any) => {
  const [activeTab, setActiveTab] = useState('groups');

  const groups = [];
  const chats = ['1'];

  const isGroupsTab = activeTab === 'groups';
  const isChatsTab = activeTab === 'chats';
  const hasGroups = groups.length > 0;
  const hasChats = chats.length > 0;

  return (
    <LinearGradient
      colors={[COLORS.white, COLORS.white]}
      style={styles.gradientContainer}
    >
      <ScrollView contentContainerStyle={{ paddingBottom: RFPercentage(8) }}>
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
                  isGroupsTab && styles.activeTabButton,
                ]}
              >
                <Text
                  style={[
                    styles.tabButtonText,
                    isGroupsTab && styles.activeTabButtonText,
                  ]}
                >
                  Groups
                </Text>
              </TouchableOpacity>

              {/* Chats Button */}
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => setActiveTab('chats')}
                style={[styles.tabButton, isChatsTab && styles.activeTabButton]}
              >
                <Text
                  style={[
                    styles.tabButtonText,
                    isChatsTab && styles.activeTabButtonText,
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
            { bottom: RFPercentage(9), width: '100%' },
          ]}
        >
          {isGroupsTab && hasGroups ? (
            <Group />
          ) : isChatsTab && hasChats ? (
            <Chat />
          ) : (
            <>
              <View style={styles.titleContainer}>
                <Text style={styles.mainTitle}>
                  {isGroupsTab
                    ? `Start a Group and\nInvite Others`
                    : `Start a Chat and\nStay Connected`}
                </Text>
              </View>
              <View style={styles.subtitleContainer}>
                <Text style={styles.subtitleText}>
                  {isGroupsTab
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
                    isGroupsTab
                      ? 'Create Your First Group'
                      : 'Start Your First Chat'
                  }
                  onPress={() => {
                    if (activeTab === 'chats') {
                      console.log('chat');
                    } else {
                      navigation.navigate('CreateGroup');
                    }
                  }}
                />
              </View>
            </>
          )}
        </View>
      </ScrollView>
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
    width: '90%',
    alignSelf: 'center',
  },
  subtitleContainer: {
    marginTop: RFPercentage(1),
    width: '90%',
    alignSelf: 'center',
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
  groupImage: {
    width: RFPercentage(50),
    height: RFPercentage(30),
  },
  buttonWrapper: {
    width: '90%',
    alignSelf: 'center',
    alignContent: 'center',
    marginTop: RFPercentage(5),
  },
});
