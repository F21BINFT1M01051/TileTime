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
import InputField from '../../../components/InputField';

const share = [
  { id: 1, name: 'Share on Facebook', icon: ICONS.facebook },
  { id: 2, name: 'Share on Instagram', icon: ICONS.insta22 },
  { id: 3, name: 'Share in your TileTime groups', icon: ICONS.tab4 },
  { id: 4, name: 'Invite your contacts', icon: ICONS.ct22 },
  { id: 5, name: 'Invite Via Email', icon: ICONS.mail22 },
];

const ShareEvent = ({ visible, onClose, style }: any) => {
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
                      source={ICONS.eventShare}
                      resizeMode="contain"
                      style={styles.greenCheck}
                    />
                    <View style={styles.liveTextContainer}>
                      <Text style={styles.liveText}>Share Your Event</Text>
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
                <Text style={styles.subText}>
                  {`The Table Is Set - Time To Spread The Word And\nFill Those Seats.`}
                </Text>

                <Image
                  source={ICONS.gp2}
                  resizeMode="contain"
                  style={styles.gp2}
                />

                {/* InputField */}
                <View style={styles.inputWrapper}>
                  <InputField
                    placeholder="Event link"
                    icon={
                      <Image
                        source={ICONS.copy}
                        resizeMode="contain"
                        style={styles.copyIcon}
                      />
                    }
                    value="tiletime.com/events/1124-adde"
                    defaultColor={COLORS.focused}
                    copy={true}
                  />
                </View>

                {/* Share List */}
                <FlatList
                  data={share}
                  keyExtractor={item => item.id.toString()}
                  contentContainerStyle={styles.flatListContainer}
                  renderItem={({ item }) => (
                    <TouchableOpacity
                      activeOpacity={0.8}
                      style={styles.shareOption}
                    >
                      <Image
                        source={item.icon}
                        resizeMode="contain"
                        style={styles.shareIcon}
                      />
                      <Text style={styles.shareText}>{item.name}</Text>
                      <Image
                        source={ICONS.right}
                        resizeMode="contain"
                        style={{width:RFPercentage(1.5), height:RFPercentage(1.5), position:"absolute", right:RFPercentage(2)}}
                      />
                    </TouchableOpacity>
                  )}
                />
              </View>

              {/* Footer */}
              <View style={styles.modalFooter}>
                <View style={styles.modalFooterInner}>
                  <SocialField
                    name="Go Back"
                    onPress={() => {
                      onClose();
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

export default ShareEvent;

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
    height: '90%',
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
    marginTop: RFPercentage(1),
  },
  liveText: {
    textAlign: 'center',
    fontFamily: FONTS.headline,
    color: COLORS.primary,
    fontSize: RFPercentage(2.5),
  },
  stars: {
    width: RFPercentage(3.5),
    height: RFPercentage(3.5),
    position: 'absolute',
    right: RFPercentage(-3),
    bottom: 0,
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
    fontSize: RFPercentage(1.8),
    marginTop: RFPercentage(1),
  },
  gp2: {
    width: RFPercentage(8),
    height: RFPercentage(8),
    bottom: RFPercentage(5),
    alignSelf: 'flex-end',
  },
  inputWrapper: {
    marginTop: RFPercentage(-6.4),
  },
  copyIcon: {
    width: RFPercentage(2.5),
    height: RFPercentage(2.5),
  },
  qrSection: {
    flexDirection: 'row',
    marginTop: RFPercentage(5),
  },
  qrImage: {
    width: RFPercentage(9),
    height: RFPercentage(9),
  },
  qrTextWrapper: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    marginLeft: RFPercentage(1.3),
  },
  qrText: {
    fontFamily: FONTS.regular,
    color: COLORS.primary,
    fontSize: RFPercentage(1.7),
  },
  shareBtn: {
    width: RFPercentage(16.5),
    height: RFPercentage(4),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.primary,
    borderRadius: RFPercentage(100),
  },
  shareBtnText: {
    color: COLORS.white,
    fontFamily: FONTS.medium,
    fontSize: RFPercentage(1.4),
  },
  flatListContainer: {
    marginTop: RFPercentage(2),
  },
  flatListColumn: {
    justifyContent: 'space-between',
    gap: RFPercentage(1.4),
  },
  listItem: {
    flex: 1,
  },
  shareOption: {
    width: '100%',
    height: RFPercentage(6.2),
    backgroundColor: COLORS.white,
    alignItems: 'center',
    flexDirection: 'row',
    borderWidth: RFPercentage(0.1),
    borderColor: COLORS.lightWhite,
    borderRadius: RFPercentage(2.1),
    paddingHorizontal: RFPercentage(1.5),
    marginTop: RFPercentage(1.9),
  },
  shareIcon: {
    width: RFPercentage(2.2),
    height: RFPercentage(2.2),
  },
  shareText: {
    fontSize: RFPercentage(1.9),
    fontFamily: FONTS.bold,
    color: COLORS.primary,
    marginLeft: RFPercentage(1.8),
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
