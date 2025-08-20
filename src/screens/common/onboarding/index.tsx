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
import { COLORS, FONTS, ICONS, IMAGES } from '../../../config/theme';
import { RFPercentage } from 'react-native-responsive-fontsize';
import SocialField from '../../../components/SocialField';

const data = [
  {
    id: 1,
    name: 'Continue With Email Address',
    navigationScreen: '',
    color: COLORS.black,
    navigateTo : "LoginSignUp"
  },
  {
    id: 2,
    name: 'Continue With Google',
    navigationScreen: '',
    icon: ICONS.google,
    color: COLORS.black,
     navigateTo : ""
  },
  {
    id: 3,
    name: 'Continue With Apple',
    navigationScreen: '',
    icon: ICONS.apple,
    color: COLORS.black,
     navigateTo : ""
  },
  {
    id: 4,
    name: 'Continue With Facebook',
    navigationScreen: '',
    icon: ICONS.facebook,
    color: COLORS.skyBlue,
     navigateTo : ""
  },
];

const OnBoarding = ({ navigation }: any) => {
  return (
    <LinearGradient
      colors={[COLORS.gradient1, COLORS.gradient2]}
      style={styles.gradient}
    >
      <View style={styles.logoContainer}>
        <Image source={IMAGES.logo} resizeMode="contain" style={styles.logo} />
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
                  onPress={()=> navigation.navigate(item.navigateTo)}
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
    </LinearGradient>
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
    paddingTop: RFPercentage(8),
  },
  logo: {
    width: RFPercentage(8),
    height: RFPercentage(8),
  },
  onBoardingImage: {
    width: RFPercentage(32),
    height: RFPercentage(22),
    bottom: RFPercentage(1.5),
  },
  headlineImage: {
    width: RFPercentage(50),
    height: RFPercentage(8),
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
    flex:1
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
    marginTop: RFPercentage(4),
  },
  skipText: {
    fontFamily: FONTS.semiBold,
    color: COLORS.black,
    textAlign: 'center',
    fontSize: RFPercentage(2),
  },
});
