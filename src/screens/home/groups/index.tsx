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

import All from './all';

const Groups = ({ navigation }: any) => {
  const chats = ['9'];
  const hasChats = chats.length > 0;

  return (
    <LinearGradient
      colors={[COLORS.white, COLORS.white]}
      style={styles.gradientContainer}
    >
      <ScrollView>
        <ImageBackground
          source={IMAGES.background}
          resizeMode="cover"
          style={styles.imageBackground}
        >
          <TopNavigation
            title="Groups & Chats"
            right={chats.length > 0 ? true : false}
            onPress={() => navigation.navigate('CreateGroup')}
            text="+ New group"
          />

          {chats.length === 0 && (
            <>
              <View style={styles.titleContainer}>
                <Text style={styles.mainTitle}>
                  {`Start a Group and\nInvite Others`}
                </Text>
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
                      right: RFPercentage(10),
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
                    onPress={() => {}}
                  />
                </View>
              </View>
            </>
          )}
        </ImageBackground>

        <View
          style={[
            styles.contentContainer,
            { width: '100%', marginTop: RFPercentage(-18) },
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
  titleContainer: {},
  mainTitle: {
    color: COLORS.primary,
    fontFamily: FONTS.headline,
    fontSize: RFPercentage(3),
    textAlign: 'center',
    width: '90%',
    alignSelf: 'center',
    marginTop: RFPercentage(5),
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
  },
  groupImage: {
    width: RFPercentage(50),
    height: RFPercentage(30),
    marginTop: RFPercentage(4),
  },
  buttonWrapper: {
    width: '90%',
    alignSelf: 'center',
    alignContent: 'center',
    marginTop: RFPercentage(5.8),
  },
});
