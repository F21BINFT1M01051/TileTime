import { StyleSheet, Text, View, Image } from 'react-native';
import React, { useState } from 'react';
import LinearGradient from 'react-native-linear-gradient';
import { COLORS, FONTS, IMAGES } from '../../../config/theme';
import { RFPercentage } from 'react-native-responsive-fontsize';
import CustomButton from '../../../components/CustomButton';
import Selection from '../../../components/Selection';

const RoleSelection = ({ navigation }: any) => {
  const [selected, setSelected] = useState('option1');
  const role = selected === 'option1' ? 'Instructor' : 'Player';
  return (
    <LinearGradient
      colors={[COLORS.gradient1, COLORS.gradient2]}
      style={styles.gradient}
    >
      <View style={styles.logoContainer}>
        <Image source={IMAGES.logo} resizeMode="contain" style={styles.logo} />
      </View>

      <View style={styles.whiteContainer}>
        <View style={styles.contentWrapper}>
          <Text style={styles.getStartedText}>Welcome to Tile Time</Text>
          <Text style={styles.subText}>Tell us how you'd like to join</Text>

          <View style={styles.selectionWrapper}>
            <Selection
              title="As Instructor"
              subTitle="Share your expertise, connect with players, and grow your teaching presence in the Tile Time community."
              isSelected={selected === 'option1'}
              onSelect={() => setSelected('option1')}
            />
            <Selection
              title="As Player"
              subTitle="Join exciting games, improve your skills, and connect with instructors and fellow players."
              isSelected={selected === 'option2'}
              onSelect={() => setSelected('option2')}
            />
          </View>
        </View>

        <View style={styles.footer}>
          <View style={styles.buttonWrapper}>
            <CustomButton
              title={`Proceed As ${role}`}
              onPress={() => {
                navigation.navigate('ProfileSetup');
              }}
            />
          </View>
        </View>
      </View>
    </LinearGradient>
  );
};

export default RoleSelection;

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
    alignItems: 'center',
  },
  logoContainer: {
    alignItems: 'center',
    paddingTop: RFPercentage(6),
  },
  logo: {
    width: RFPercentage(10),
    height: RFPercentage(10),
  },
  whiteContainer: {
    width: '100%',
    backgroundColor: COLORS.white,
    borderTopRightRadius: RFPercentage(2.5),
    borderTopLeftRadius: RFPercentage(2.5),
    alignItems: 'center',
    marginTop: RFPercentage(4),
    paddingBottom: RFPercentage(5),
    flex: 1,
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
  subText: {
    fontFamily: FONTS.regular,
    color: COLORS.primary,
    fontSize: RFPercentage(2),
    marginTop: RFPercentage(1),
  },
  selectionWrapper: {
    marginTop: RFPercentage(1.8),
  },
  footer: {
    width: '100%',
    position: 'absolute',
    bottom: 0,
    borderTopWidth: 1,
    borderTopColor: COLORS.lightWhite,
    alignItems: 'center',
    paddingVertical: RFPercentage(3),
  },
  buttonWrapper: {
    width: '90%',
    alignSelf: 'center',
  },
});
