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
import { RFPercentage } from 'react-native-responsive-fontsize';
import { COLORS, FONTS, ICONS } from '../../../config/theme';

const data = [
  {
    id: 1,
    name: 'Basics',
    subtitle: 'Event Tittle, Type, Location, Date & Time',
  },
  {
    id: 2,
    name: 'Description',
    subtitle: 'Coaching Session',
  },
  {
    id: 3,
    name: 'Admission Details',
    subtitle: 'Event Type, Price, Seats and more',
  },
  {
    id: 4,
    name: 'Game Details',
    subtitle: 'Game variant, Tables, Groups and more',
  },
];

const EditEventDetails = ({ visible, onClose, style }: any) => {
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
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}
                >
                  <Text
                    style={{
                      color: COLORS.primary,
                      fontFamily: FONTS.headline,
                      fontSize: RFPercentage(2.2),
                    }}
                  >
                    Edit Event Details
                  </Text>
                  <TouchableOpacity
                    activeOpacity={0.8}
                    style={{ position: 'absolute', right: 0 }}
                    onPress={onClose}
                  >
                    <Image
                      source={ICONS.cross2}
                      resizeMode="contain"
                      style={{
                        width: RFPercentage(1.6),
                        height: RFPercentage(1.6),
                      }}
                    />
                  </TouchableOpacity>
                </View>
                <View>
                  <Text
                    style={{
                      color: COLORS.lightGrey,
                      fontFamily: FONTS.regular,
                      fontSize: RFPercentage(1.7),
                    }}
                  >
                    Select which section you want to edit
                  </Text>

                  <FlatList
                    data={data}
                    keyExtractor={item => item.id.toString()}
                    renderItem={({ item }) => {
                      return (
                        <TouchableOpacity
                          activeOpacity={0.8}
                          style={styles.insightBox}
                        >
                          <View style={styles.insightContent}>
                            <View>
                              <Text style={styles.insightTitle}>
                                {item.name}
                              </Text>
                              <Text style={styles.insightSub}>
                                {item.subtitle}
                              </Text>
                            </View>
                            <TouchableOpacity>
                              <Image
                                source={ICONS.right}
                                resizeMode="contain"
                                style={styles.rightIcon}
                              />
                            </TouchableOpacity>
                          </View>
                        </TouchableOpacity>
                      );
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

export default EditEventDetails;

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
  insightBox: {
    width: '100%',
    height: RFPercentage(8),
    backgroundColor: COLORS.white,
    borderWidth: RFPercentage(0.1),
    borderColor: COLORS.lightWhite,
    borderBottomWidth: RFPercentage(0.5),
    borderRadius: RFPercentage(2),
    marginTop: RFPercentage(2),
    justifyContent: 'center',
  },
  insightContent: {
    width: '90%',
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  insightTitle: {
    color: COLORS.primary,
    fontFamily: FONTS.bold,
    fontSize: RFPercentage(2),
  },
  insightSub: {
    color: COLORS.lightGrey,
    fontSize: RFPercentage(1.5),
    fontFamily: FONTS.regular,
    marginTop: RFPercentage(0.6),
  },
  rightIcon: {
    width: RFPercentage(1.6),
    height: RFPercentage(1.6),
  },
});
