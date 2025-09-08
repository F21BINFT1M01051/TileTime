import {
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Animated,
} from 'react-native';
import React, { useEffect, useRef } from 'react';
import LinearGradient from 'react-native-linear-gradient';
import { COLORS, FONTS, ICONS, IMAGES } from '../config/theme';
import { RFPercentage } from 'react-native-responsive-fontsize';

interface Props {
  title: string;
  subTitle: string;
  isSelected: boolean;
  onSelect: () => void;
  icon: any;
  showWarning?: boolean;
}

const Selection = ({
  title,
  subTitle,
  isSelected,
  onSelect,
  icon,
  showWarning,
}: Props) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (isSelected && showWarning) {
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800, // fade duration
        useNativeDriver: true,
      }).start();
    } else {
      fadeAnim.setValue(0); // reset when not selected
    }
  }, [isSelected, showWarning]);

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onSelect}
      style={[
        styles.container,
        { borderColor: isSelected ? COLORS.pink : COLORS.lightWhite },
      ]}
    >
      {isSelected ? (
        <ImageBackground
          source={IMAGES.selection}
          resizeMode="cover"
          style={styles.bgImage}
          imageStyle={styles.bgImageStyle}
        >
          {/* Gradient overlay only on left side */}
          <LinearGradient
            colors={['rgba(255,255,255,1)', 'rgba(255,255,255,0.1)']}
            start={{ x: 0.4, y: 0 }}
            end={{ x: 0.8, y: 0 }} // only left side gradient
            style={styles.gradientOverlay}
          />

          <View style={styles.innerWrapper}>
            <View style={styles.header}>
              <Image source={icon} resizeMode="contain" style={styles.icon} />
              <TouchableOpacity
                onPress={onSelect}
                style={[
                  styles.radioButton,
                  {
                    borderColor: isSelected ? COLORS.pink : COLORS.radio,
                    backgroundColor: isSelected ? 'transparent' : COLORS.radio2,
                  },
                ]}
              >
                {isSelected && <View style={styles.radioDot} />}
              </TouchableOpacity>
            </View>
            <View style={styles.textWrapper}>
              <Text style={styles.title}>{title}</Text>
              <Text style={styles.subTitle}>{subTitle}</Text>
            </View>
            {showWarning && (
              <Animated.View
                style={{
                  opacity: fadeAnim,
                  width: '100%',
                  backgroundColor: '#FFF4D1',
                  paddingHorizontal: RFPercentage(1.5),
                  height: RFPercentage(6),
                  borderRadius: RFPercentage(1.3),
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginTop: RFPercentage(2),
                }}
              >
                <Image
                  source={ICONS.warn}
                  resizeMode="contain"
                  style={{
                    width: RFPercentage(2.3),
                    height: RFPercentage(2.3),
                  }}
                />
                <Text
                  style={{
                    color: COLORS.primary,
                    fontFamily: FONTS.regular,
                    fontSize: RFPercentage(1.6),
                    marginLeft: RFPercentage(1),
                    lineHeight: RFPercentage(1.7),
                  }}
                >
                  {`Choosing Instructor doesn’t limit you, you can\nstill register and play in events as a Player.`}
                </Text>
              </Animated.View>
            )}
          </View>
        </ImageBackground>
      ) : (
        <View style={styles.innerWrapper}>
          <View style={styles.header}>
            <Image source={icon} resizeMode="contain" style={styles.icon} />
            <TouchableOpacity
              onPress={onSelect}
              style={[
                styles.radioButton,
                {
                  borderColor: COLORS.radio,
                  backgroundColor: COLORS.radio2,
                },
              ]}
            />
          </View>
          <View style={styles.textWrapper}>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.subTitle}>{subTitle}</Text>
          </View>
        </View>
      )}
    </TouchableOpacity>
  );
};

export default Selection;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: COLORS.white,
    borderWidth: 1,
    alignItems: 'center',
    borderRadius: RFPercentage(1.7),
    marginTop: RFPercentage(2),
    overflow: 'hidden',
  },
  bgImage: {
    width: '100%',
  },
  bgImageStyle: {
    borderRadius: RFPercentage(1.7),
  },
  gradientOverlay: {
    ...StyleSheet.absoluteFillObject,
  },
  innerWrapper: {
    width: '90%',
    alignSelf: 'center',
    paddingVertical: RFPercentage(2),
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  icon: {
    width: RFPercentage(3.5),
    height: RFPercentage(3.5),
  },
  textWrapper: {
    marginTop: RFPercentage(1.8),
  },
  title: {
    fontFamily: FONTS.bold,
    color: COLORS.primary,
    fontSize: RFPercentage(2.1),
  },
  subTitle: {
    fontFamily: FONTS.regular,
    color: COLORS.lightGrey,
    fontSize: RFPercentage(1.9),
    marginTop: RFPercentage(1.4),
    lineHeight: RFPercentage(2),
  },
  radioButton: {
    width: RFPercentage(3),
    height: RFPercentage(3),
    borderRadius: RFPercentage(100),
    borderWidth: RFPercentage(0.1),
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioDot: {
    width: RFPercentage(2),
    height: RFPercentage(2),
    borderRadius: RFPercentage(100),
    backgroundColor: COLORS.pink,
  },
});
