import {
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  TouchableOpacity,
  Platform,
  ImageBackground,
} from 'react-native';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import { COLORS, FONTS, ICONS, IMAGES } from '../../../config/theme';
import { RFPercentage } from 'react-native-responsive-fontsize';
import SocialField from '../../../components/SocialField';

const data = [
  {
    id: 1,
    name: 'Continue With Email Address',
    navigationScreen: '',
    color: COLORS.black,
    navigateTo: 'LoginSignUp',
  },
  {
    id: 2,
    name: 'Continue With Google',
    navigationScreen: '',
    icon: ICONS.google,
    color: COLORS.black,
    navigateTo: '',
  },
  {
    id: 3,
    name: 'Continue With Apple',
    navigationScreen: '',
    icon: ICONS.apple,
    color: COLORS.black,
    navigateTo: '',
  },
  {
    id: 4,
    name: 'Continue With Facebook',
    navigationScreen: '',
    icon: ICONS.facebook,
    color: COLORS.skyBlue,
    navigateTo: '',
  },
];

const OnBoarding = ({ navigation }: any) => {
  return (
    <View style={styles.gradient}>
      <View style={styles.logoContainer}>
        <ImageBackground
          source={IMAGES.onBoarding22}
          resizeMode="repeat"
          style={{
            width: '100%',
            height: RFPercentage(50),
            alignItems: 'center',
          }}
        >
          <Image
            source={IMAGES.logo}
            resizeMode="contain"
            style={styles.logo}
          />
          <LinearGradient
            style={{ width: '100%', height: RFPercentage(40) }}
            colors={['rgba(255, 255, 255, 0.1)', COLORS.white]}
          >
            <Image
              source={IMAGES.onBoarding}
              resizeMode="cover"
              style={styles.onBoardingImage}
            />

            <View style={{ width: '95%', alignSelf: 'center' }}>
              <Text
                style={{
                  textAlign: 'center',
                  fontSize: RFPercentage(4.7),
                  color: COLORS.primary,
                  fontFamily: FONTS.extraBold,
                  marginTop: RFPercentage(3),
                }}
              >
                PLAY.LEARN.GROW
              </Text>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Text
                  style={{
                    textAlign: 'center',
                    fontSize: RFPercentage(1.9),
                    color: COLORS.primary,
                    fontFamily: FONTS.regular,
                  }}
                >
                  Your Mahjong home, made by those who play
                </Text>
                <Image
                  source={ICONS.stars2}
                  resizeMode="contain"
                  style={{ width: RFPercentage(4), height: RFPercentage(4) }}
                />
              </View>
              <Image
                source={IMAGES.lines}
                resizeMode="contain"
                style={{
                  width: RFPercentage(25),
                  height: RFPercentage(3),
                  alignSelf: 'flex-end',
                  right: RFPercentage(5),
                }}
              />
            </View>
          </LinearGradient>
        </ImageBackground>
      </View>

      <View style={styles.whiteContainer}>
        <View style={styles.contentWrapper}>
          <View style={styles.listContainer}>
            <FlatList
              data={data}
              scrollEnabled={false}
              keyExtractor={item => item.id.toString()}
              renderItem={({ item }) => (
                <SocialField
                  icon={item.icon}
                  name={item.name}
                  navigation={item.navigationScreen}
                  color={item.color}
                  onPress={() => navigation.navigate(item.navigateTo)}
                />
              )}
            />
          </View>

          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => navigation.navigate('LoginSignUp')}
            style={styles.skipButton}
          >
            <Text style={styles.skipText}>Skip For Now</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default OnBoarding;

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: COLORS.white,
  },
  logoContainer: {
    width: '100%',
    alignItems: 'center',
  },
  logo: {
    width: RFPercentage(20),
    height: RFPercentage(8),
    marginTop: RFPercentage(8),
  },
  onBoardingImage: {
    width: '100%',
    height: RFPercentage(22),
    marginTop: RFPercentage(2),
  },
  headlineImage: {
    width: RFPercentage(50),
    height: RFPercentage(8),
  },
  whiteContainer: {
    width: '100%',
    alignItems: 'center',
    marginTop: Platform.OS === 'ios' ? RFPercentage(4) : RFPercentage(8),
    paddingBottom: RFPercentage(5),
    justifyContent: 'center',
    flex: 1,
  },
  contentWrapper: {
    width: '90%',
    alignSelf: 'center',
  },
  getStartedText: {
    color: COLORS.primary,
    fontFamily: FONTS.headline,
    fontSize: RFPercentage(2.8),
  },
  listContainer: {
    width: '100%',
    marginTop: RFPercentage(1),
    alignSelf: 'center',
  },
  skipButton: {
    width: RFPercentage(20),
    alignSelf: 'center',
    marginTop: RFPercentage(2),
  },
  skipText: {
    fontFamily: FONTS.semiBold,
    color: COLORS.black,
    textAlign: 'center',
    fontSize: RFPercentage(2.1),
  },
});
