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

const Home = ({ navigation }: any) => {
  const chats = [];
  const hasChats = chats.length > 0;

  return (
    <LinearGradient
      colors={[COLORS.offWhite2, COLORS.white]}
      style={styles.gradientContainer}
    >
      <ScrollView>
        <ImageBackground
          source={IMAGES.background}
          resizeMode="cover"
          style={styles.imageBackground}
        >
          <TopNavigation
            title="Home"
            right={true}
            home={true}
            onPress={() => navigation.navigate('CreateGroup')}
          />

          {chats.length === 0 && (
            <>
              <View style={styles.titleContainer}>
                <Text style={styles.mainTitle}>
                  {`Let’s get your Mahjong\njourney started`}
                </Text>
              </View>
            </>
          )}
        </ImageBackground>
      </ScrollView>
    </LinearGradient>
  );
};

export default Home;

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
