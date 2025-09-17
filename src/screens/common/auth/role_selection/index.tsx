import { StyleSheet, Text, View, Image, ImageBackground } from 'react-native';
import React, { useState } from 'react';
import LinearGradient from 'react-native-linear-gradient';
import { COLORS, FONTS, IMAGES, ICONS } from '../../../../config/theme';
import { RFPercentage } from 'react-native-responsive-fontsize';
import CustomButton from '../../../../components/CustomButton';
import Selection from '../../../../components/Selection';
import { useDispatch } from 'react-redux';
import { setUserFlow } from '../../../../redux/userRole-slice/Actions';

const RoleSelection = ({ navigation }: any) => {
  const [selected, setSelected] = useState('');
  const dispatch = useDispatch();

  return (
    <View style={styles.gradient}>
      <ImageBackground
        source={IMAGES.auth}
        resizeMode="cover"
        style={{ width: '100%', height: RFPercentage(22) }}
      >
        <LinearGradient
          colors={[COLORS.authGradient1, COLORS.authGradient2]}
          style={styles.logoContainer}
        >
          <Image
            source={IMAGES.logo}
            resizeMode="contain"
            style={styles.logo}
          />
        </LinearGradient>
      </ImageBackground>

      <View style={styles.whiteContainer}>
        <View style={styles.contentWrapper}>
          <Text style={styles.getStartedText}>Welcome to TileTime</Text>
          <Text style={styles.subText}>Tell us how you'd like to join</Text>

          <View style={styles.selectionWrapper}>
            <Selection
              title="As Instructor"
              subTitle="Share your expertise, connect with players, and grow your teaching presence in the TileTime community."
              isSelected={selected === 'Instructor'}
              onSelect={() => {
                setSelected('Instructor');
                dispatch(setUserFlow('Instructor'));
              }}
              icon={ICONS.teacher}
              showWarning={true}
              warning={`Choosing Instructor doesn’t limit you, you can\nstill register and play in events as a Player.`}
            />
            <Selection
              title="As Player"
              subTitle="Join exciting games, improve your skills, and connect with instructors and fellow players."
              isSelected={selected === 'Player'}
              onSelect={() => {
                setSelected('Player');
                dispatch(setUserFlow('Player'));
              }}
              icon={ICONS.user6}
              showWarning={true}
              warning={`Choosing Player doesn’t limit you, you can\nstill register and play in events as a Instructor.`}
            />
          </View>
        </View>

        <View style={styles.footer}>
          <View style={styles.buttonWrapper}>
            <CustomButton
              title={`Continue`}
              onPress={() => {
                if (selected === 'Player') {
                  navigation.navigate('PlayerProfileSetup');
                } else {
                  navigation.navigate('InstructorProfileSetup');
                }
              }}
              disabled={selected === '' ? true : false}
              style={{
                backgroundColor: selected ? COLORS.primary : COLORS.disabled,
              }}
            />
          </View>
        </View>
      </View>
    </View>
  );
};

export default RoleSelection;

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: COLORS.white,
  },
  logoContainer: {
    width: '100%',
    alignItems: 'center',
    height: '100%',
  },
  logo: {
    width: RFPercentage(18),
    height: RFPercentage(18),
    marginTop: RFPercentage(2),
  },
  whiteContainer: {
    width: '100%',
    backgroundColor: COLORS.white,
    borderTopRightRadius: RFPercentage(2.5),
    borderTopLeftRadius: RFPercentage(2.5),
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.lightWhite,
    flex: 1,
    marginTop: RFPercentage(-1.5),
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
    paddingBottom: RFPercentage(4),
    paddingTop: RFPercentage(2),
  },
  buttonWrapper: {
    width: '90%',
    alignSelf: 'center',
  },
});
