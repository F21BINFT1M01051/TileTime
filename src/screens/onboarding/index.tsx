import {
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import { COLORS, FONTS, ICONS, IMAGES } from '../../config/theme';
import { RFPercentage } from 'react-native-responsive-fontsize';
import SocialField from '../../components/SocialField';

const data = [
  {
    id: 1,
    name: 'Continue with Email/Username',
    navigationScreen: '',
    color: COLORS.black,
  },
  {
    id: 2,
    name: 'Continue with Google',
    navigationScreen: '',
    icon: ICONS.google,
    color: COLORS.black,
  },
  {
    id: 3,
    name: 'Continue with Apple',
    navigationScreen: '',
    icon: ICONS.apple,
    color: COLORS.black,
  },
  {
    id: 4,
    name: 'Continue with Facebook',
    navigationScreen: '',
    icon: ICONS.facebook,
    color: COLORS.skyBlue,
  },
];

const OnBoarding = ({ navigation }: any) => {
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <LinearGradient
        colors={[COLORS.gradient1, COLORS.gradient2]}
        style={styles.gradient}
      >
        <View style={styles.logoContainer}>
          <Image
            source={IMAGES.logo}
            resizeMode="contain"
            style={styles.logo}
          />
          <Image
            source={IMAGES.onBoarding}
            resizeMode="contain"
            style={styles.onBoardingImage}
          />
          <Image
            source={IMAGES.headline}
            resizeMode="contain"
            style={styles.headlineImage}
          />
        </View>

        <View style={styles.whiteContainer}>
          <View style={styles.contentWrapper}>
            <Text style={styles.getStartedText}>Get Started</Text>
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
                  />
                )}
              />
            </View>

            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => navigation.navigate('Login')}
              style={styles.skipButton}
            >
              <Text style={styles.skipText}>Skip For Now</Text>
            </TouchableOpacity>
          </View>
        </View>
      </LinearGradient>
    </ScrollView>
  );
};

export default OnBoarding;

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
    alignItems: 'center',
  },
  logoContainer: {
    width: '100%',
    alignItems: 'center',
    paddingTop: RFPercentage(6),
  },
  logo: {
    width: RFPercentage(10),
    height: RFPercentage(10),
  },
  onBoardingImage: {
    width: RFPercentage(36),
    height: RFPercentage(25),
    bottom: RFPercentage(1.5),
  },
  headlineImage: {
    width: RFPercentage(50),
    height: RFPercentage(10),
    bottom: RFPercentage(1.5),
  },
  whiteContainer: {
    width: '100%',
    backgroundColor: COLORS.white,
    borderTopRightRadius: RFPercentage(2.5),
    borderTopLeftRadius: RFPercentage(2.5),
    alignItems: 'center',
    marginTop: RFPercentage(2.1),
    paddingBottom: RFPercentage(5),
    justifyContent: 'center',
  },
  contentWrapper: {
    width: '90%',
    alignSelf: 'center',
    marginTop: RFPercentage(3.5),
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
    marginTop: RFPercentage(4),
  },
  skipText: {
    fontFamily: FONTS.semiBold,
    color: COLORS.black,
    textAlign: 'center',
    fontSize: RFPercentage(2),
  },
});
