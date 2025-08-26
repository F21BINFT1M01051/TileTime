import {
  StyleSheet,
  View,
  Modal,
  TouchableWithoutFeedback,
  Animated,
  Easing,
  Dimensions,
  Image,
  Text,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import React, { useRef, useEffect } from 'react';
import { BlurView } from '@react-native-community/blur';
import { useNavigation } from '@react-navigation/native';
import SocialField from '../../../components/SocialField';
import { RFPercentage } from 'react-native-responsive-fontsize';
import { COLORS, FONTS, ICONS } from '../../../config/theme';

const EventLiveLessons = ({ visible, onClose, title, subtitle }: any) => {
  const navigation = useNavigation();
  const slideAnim = useRef(
    new Animated.Value(Dimensions.get('window').height),
  ).current;

  useEffect(() => {
    if (visible) {
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 500,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(slideAnim, {
        toValue: Dimensions.get('window').height,
        duration: 500,
        easing: Easing.in(Easing.ease),
        useNativeDriver: true,
      }).start();
    }
  }, [visible]);

  return (
    <Modal
      visible={visible}
      transparent
      animationType="none"
      onRequestClose={onClose}
    >
      <BlurView
        style={StyleSheet.absoluteFill}
        blurType="dark"
        blurAmount={5}
        reducedTransparencyFallbackColor="white"
      />
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.overLay2}>
          <TouchableWithoutFeedback>
            <Animated.View
              style={[
                styles.modalContent,
                { transform: [{ translateY: slideAnim }] },
              ]}
            >
              <View style={styles.modalInnerContent}>
                {/* Header */}
                <View style={styles.headerRow}>
                  <Image
                    source={ICONS.gp3}
                    resizeMode="contain"
                    style={styles.gpImage}
                  />
                  <View style={styles.centerContent}>
                    <Image
                      source={ICONS.greenCheck}
                      resizeMode="contain"
                      style={styles.greenCheck}
                    />
                    <View style={styles.liveTextContainer}>
                      <Text style={styles.liveText}>{title}</Text>
                      <Image
                        source={ICONS.stars2}
                        resizeMode="contain"
                        style={styles.stars}
                      />
                    </View>
                  </View>
                  <Image
                    source={ICONS.gp1}
                    resizeMode="contain"
                    style={styles.gpImageRight}
                  />
                </View>

                {/* Subtext */}
                <Text style={styles.subText}>{subtitle}</Text>

                <Image
                  source={ICONS.gp2}
                  resizeMode="contain"
                  style={styles.gp2}
                />
              </View>

              {/* Footer */}
              <View style={styles.modalFooter}>
                <View style={styles.modalFooterInner}>
                  <SocialField
                    name="Go to Dashboard"
                    onPress={() => {
                      onClose();
                      navigation.navigate('Dashboard');
                    }}
                  />
                </View>
              </View>
            </Animated.View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default EventLiveLessons;

const styles = StyleSheet.create({
  overLay2: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: COLORS.white,
    borderTopLeftRadius: RFPercentage(2),
    borderTopRightRadius: RFPercentage(2),
    paddingBottom: RFPercentage(4),
    height: '50%',
  },
  modalInnerContent: {
    width: '90%',
    alignSelf: 'center',
    marginTop: RFPercentage(3.5),
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: RFPercentage(2),
    paddingHorizontal: RFPercentage(2),
  },
  gpImage: {
    width: RFPercentage(8),
    height: RFPercentage(8),
  },
  centerContent: {
    alignItems: 'center',
  },
  greenCheck: {
    width: RFPercentage(8.5),
    height: RFPercentage(8.5),
  },
  liveTextContainer: {
    marginTop: RFPercentage(3),
  },
  liveText: {
    textAlign: 'center',
    fontFamily: FONTS.extraBold,
    color: COLORS.primary,
    fontSize: RFPercentage(2.5),
  },
  stars: {
    width: RFPercentage(3.5),
    height: RFPercentage(3.5),
    position: 'absolute',
    right: RFPercentage(-2),
    bottom: RFPercentage(-1),
  },
  gpImageRight: {
    width: RFPercentage(8),
    height: RFPercentage(8),
    bottom: RFPercentage(2),
  },
  subText: {
    textAlign: 'center',
    fontFamily: FONTS.regular,
    color: COLORS.lightGrey,
    fontSize: RFPercentage(1.9),
    marginTop: RFPercentage(2),
    lineHeight:RFPercentage(2.1)
  },
  gp2: {
    width: RFPercentage(8),
    height: RFPercentage(8),
    alignSelf: 'center',
    left: RFPercentage(5),
    bottom: RFPercentage(2),
  },

  modalFooter: {
    borderTopWidth: RFPercentage(0.1),
    borderTopColor: COLORS.lightWhite,
    position: 'absolute',
    bottom: 0,
    width: '100%',
    paddingBottom: RFPercentage(4),
    backgroundColor: COLORS.white,
  },
  modalFooterInner: {
    width: '90%',
    alignSelf: 'center',
  },
});
