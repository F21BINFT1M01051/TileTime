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
import TopNavigation from '../../../../routers/TopBar';
import { COLORS, FONTS, ICONS, IMAGES } from '../../../../config/theme';
import { RFPercentage } from 'react-native-responsive-fontsize';
import CustomButton from '../../../../components/CustomButton';

import All from './all';

const Groups = ({ navigation }: any) => {
  const chats = [];
  const hasChats = chats.length > 0;

  return (
    <LinearGradient
      colors={[chats.length > 0 ?  COLORS.white : COLORS.white4, COLORS.white]}
      style={styles.gradientContainer}
    >
      <TopNavigation
        title="Groups & Chats"
        right={chats.length > 0 ? true : false}
        onPress={() => navigation.navigate('CreateGroup')}
        text="+ New group"
      />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View
          style={{
            width: '90%',
            alignSelf: 'center',
          }}
        >
          {chats.length === 0 && (
            <>
              <View style={styles.titleContainer}>
                <Text style={styles.mainTitle}>
                  {`Start a Group and\nInvite Others`}
                </Text>
                <Image
                  source={IMAGES.home66}
                  resizeMode="contain"
                  style={{
                    width: RFPercentage(10),
                    height: RFPercentage(13),
                    bottom: RFPercentage(1),
                  }}
                />
              </View>
              <View style={styles.subtitleContainer}>
                <Text style={styles.subtitleText}>
                  {`Groups are a great way to connect with others\nwho share your interests.`}
                </Text>
                <Image
                  source={ICONS.border}
                  resizeMode="contain"
                  style={[
                    styles.borderIcon,
                    {
                      left: RFPercentage(13),
                    },
                  ]}
                />
              </View>

              <Image
                source={IMAGES.group}
                resizeMode="contain"
                style={styles.groupImage}
              />
              <View style={styles.buttonWrapper}>
                <CustomButton
                  title={'Create Your First Group'}
                  onPress={() => {
                    navigation.navigate('CreateGroup');
                  }}
                />
                <View style={{ marginTop: RFPercentage(1.3) }}>
                  <CustomButton
                    title={'Start A Direct Message'}
                    onPress={() =>
                      navigation.navigate('DirectChatSelection')
                    }
                  />
                </View>
              </View>
            </>
          )}
        </View>

        <View
          style={[
            styles.contentContainer,
            { width: '100%',marginTop:RFPercentage(2)  },
          ]}
        >
          {hasChats ? <All /> : null}
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
    height: RFPercentage(22),
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
    height: RFPercentage(6),
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
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  mainTitle: {
    color: COLORS.primary,
    fontFamily: FONTS.headline,
    fontSize: RFPercentage(3),
  },
  subtitleContainer: {
    marginTop: RFPercentage(-1.5),
  },
  subtitleText: {
    color: COLORS.icon,
    fontFamily: FONTS.regular,
    fontSize: RFPercentage(2.1),
  },
  borderIcon: {
    width: RFPercentage(10),
    height: RFPercentage(2),
  },
  groupImage: {
    width: RFPercentage(50),
    height: RFPercentage(30),
    alignSelf:"center",
    marginTop:RFPercentage(3)
  },
  buttonWrapper: {
    width: '100%',
    alignSelf: 'center',
    alignContent: 'center',
    marginTop: RFPercentage(7.8),
  },
});
