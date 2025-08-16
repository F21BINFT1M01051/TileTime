import React, { useRef, useEffect } from 'react';
import {
  Modal,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
  Animated,
  Dimensions,
  Text,
  FlatList,
} from 'react-native';
import { BlurView } from '@react-native-community/blur';
import { RFPercentage } from 'react-native-responsive-fontsize';
import { COLORS, FONTS, ICONS } from '../config/theme';
import CustomButton from './CustomButton';
import Selection from './Selection';

const { height } = Dimensions.get('window');


const eventTypes = [
  {
    id: 1,
    name: 'Open Play',
    subTitle:
      'Let players join freely - perfect for casual games, meetups, or impromptu tiles with friends.',
  },
  {
    id: 2,
    name: 'Guided Play',
    subTitle:
      'Lead focused sessions for small groups and teach them how to play with confidence.',
  },
  {
    id: 3,
    name: 'Mahjong Lessons',
    subTitle:
      'Lead hands - on lessons, explain rules and help players build confidence step by step.',
  },
];

const CreateEvent = ({
  visible,
  onClose,
  title,
  selectedValue,
  onSelect,
  onConfirm,
}) => {
  const slideAnim = useRef(new Animated.Value(height)).current;

  useEffect(() => {
    if (visible) {
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 400,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(slideAnim, {
        toValue: height,
        duration: 400,
        useNativeDriver: true,
      }).start();
    }
  }, [visible]);

  return (
    <Modal visible={visible} transparent animationType="none" onRequestClose={onClose}>
      <BlurView
        style={StyleSheet.absoluteFill}
        blurType="dark"
        blurAmount={5}
        reducedTransparencyFallbackColor="white"
      />
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.overLay}>
          <TouchableWithoutFeedback>
            <Animated.View style={[styles.modalContent, { transform: [{ translateY: slideAnim }] }]}>
              <View style={styles.modalInnerContent}>
                <Text style={styles.title}>{title}</Text>
                <FlatList
                  data={eventTypes}
                  keyExtractor={(item) => item.id.toString()}
                  scrollEnabled={false}
                  renderItem={({ item }) => (
                    <Selection
                      title={item.name}
                      subTitle={item.subTitle}
                      icon={ICONS.user}
                      onSelect={() => onSelect(item.name)}
                      isSelected={selectedValue === item.name}
                    />
                  )}
                />
              </View>

              <View style={styles.modalFooter}>
                <View style={styles.modalFooterInner}>
                  <CustomButton title="Confirm & Continue" onPress={onConfirm}  disabled={!selectedValue} style={{backgroundColor : selectedValue ? COLORS.primary: COLORS.disabled}} />
                </View>
              </View>
            </Animated.View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default CreateEvent;

const styles = StyleSheet.create({
  overLay: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: COLORS.white,
    borderTopLeftRadius: RFPercentage(3),
    borderTopRightRadius: RFPercentage(3),
    paddingBottom: RFPercentage(4),
    height: '84%',
  },
  modalInnerContent: {
    width: '90%',
    alignSelf: 'center',
    marginTop: RFPercentage(3.5),
  },
  modalFooter: {
    borderTopWidth: RFPercentage(0.1),
    borderTopColor: COLORS.lightWhite,
    position: 'absolute',
    bottom: 0,
    width: '100%',
    paddingBottom: RFPercentage(4),
  },
  modalFooterInner: {
    width: '90%',
    alignSelf: 'center',
    marginTop: RFPercentage(2),
  },
  title: {
    fontFamily: FONTS.headline,
    color: COLORS.primary,
    fontSize: RFPercentage(2.6),
  },
});
