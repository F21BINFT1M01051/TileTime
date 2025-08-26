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
  ScrollView,
} from 'react-native';
import React, { useRef, useEffect } from 'react';
import { BlurView } from '@react-native-community/blur';
import { useNavigation } from '@react-navigation/native';
import { RFPercentage } from 'react-native-responsive-fontsize';
import { COLORS, FONTS, ICONS, IMAGES } from '../../../config/theme';

const data = [
  {
    id: 1,
    name: 'Basics',
    subtitle: 'Event Tittle, Type, Location, Date & Time',
    navigateTo: 'EditEventBasic',
  },
  {
    id: 2,
    name: 'Description',
    subtitle: 'Coaching Session',
    navigateTo: 'EditEventBasic',
  },
  {
    id: 3,
    name: 'Admission Details',
    subtitle: 'Event Type, Price, Seats and more',
    navigateTo: 'EditEventBasic',
  },
  {
    id: 4,
    name: 'Game Details',
    subtitle: 'Game variant, Tables, Groups and more',
    navigateTo: 'EditEventBasic',
  },
];

const attachments = [
  { id: 1, profile: ICONS.attach },
  { id: 2, profile: ICONS.attach },
  { id: 3, profile: ICONS.attach },
];

const cohosts = [
  { id: 1, profile: IMAGES.chatProfile },
  { id: 2, profile: IMAGES.customProfile },
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
              <ScrollView
                style={styles.modalInnerContent}
                showsVerticalScrollIndicator={false}
              >
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
                      fontSize: RFPercentage(2.4),
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
                      fontSize: RFPercentage(1.8),
                      marginTop: RFPercentage(1.7),
                    }}
                  >
                    Select Which Section You Want To Edit
                  </Text>
                  <View style={{ marginTop: RFPercentage(1.7) }}>
                    <FlatList
                      data={data}
                      keyExtractor={item => item.id.toString()}
                      scrollEnabled={false}
                      renderItem={({ item }) => {
                        return (
                          <TouchableOpacity
                            activeOpacity={0.8}
                            style={styles.insightBox}
                            onPress={() => {
                              onClose();
                              navigation.navigate(item.navigateTo);
                            }}
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
                <View style={styles.sectionSpacing}>
                  <TouchableOpacity
                    activeOpacity={0.8}
                    style={styles.attachmentCard}
                  >
                    <View style={styles.cardInner}>
                      <View>
                        <Text style={styles.cardTitle}>Attachments</Text>
                        <Text style={styles.attachmentCount}>
                          3 attachments
                        </Text>
                        <FlatList
                          horizontal
                          data={attachments}
                          keyExtractor={item => item.id.toString()}
                          contentContainerStyle={styles.attachmentList}
                          renderItem={({ item }) => (
                            <View style={styles.attachmentWrapper}>
                              <Image
                                source={item.profile}
                                resizeMode="cover"
                                style={styles.attachmentImage}
                              />
                            </View>
                          )}
                        />
                      </View>
                      <TouchableOpacity activeOpacity={0.8}>
                        <Image
                          source={ICONS.right}
                          resizeMode="contain"
                          style={styles.rightIcon}
                        />
                      </TouchableOpacity>
                    </View>
                  </TouchableOpacity>
                </View>

                <View style={{ marginTop: RFPercentage(2) }}>
                  <TouchableOpacity activeOpacity={0.8} style={styles.card}>
                    <View style={styles.cardInner}>
                      <View>
                        <Text style={styles.cardTitle}>Add ons and Extra</Text>
                        <Text
                          style={[
                            styles.insightSub,
                            { marginTop: RFPercentage(0.8) },
                          ]}
                        >
                          {`Event chats, Co - Hosts and Visibility.\nSamantha and Emily added as Co- Hosts `}
                        </Text>
                        <FlatList
                          horizontal
                          data={cohosts}
                          keyExtractor={item => item.id.toString()}
                          contentContainerStyle={styles.cohostList}
                          renderItem={({ item }) => (
                            <View style={styles.cohostImageWrapper}>
                              <Image
                                source={item.profile}
                                resizeMode="cover"
                                style={styles.cohostImage}
                              />
                            </View>
                          )}
                        />
                      </View>
                      <TouchableOpacity activeOpacity={0.8}>
                        <Image
                          source={ICONS.right}
                          resizeMode="contain"
                          style={styles.rightIcon}
                        />
                      </TouchableOpacity>
                    </View>
                  </TouchableOpacity>
                </View>
              </ScrollView>
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
    borderTopLeftRadius: RFPercentage(2.5),
    borderTopRightRadius: RFPercentage(2.5),
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
    height: RFPercentage(9),
    backgroundColor: COLORS.white,
    borderWidth: RFPercentage(0.1),
    borderColor: COLORS.lightWhite,
    borderBottomWidth: RFPercentage(0.5),
    borderRadius: RFPercentage(2),
    marginTop: RFPercentage(2),
    justifyContent: 'center',
    borderBottomColor: 'rgba(230, 247, 250, 0.6)',
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
  sectionSpacing: { marginTop: RFPercentage(2) },
  card: {
    width: '100%',
    height: RFPercentage(18),
    backgroundColor: COLORS.white,
    borderColor: COLORS.lightWhite,
    borderWidth: RFPercentage(0.1),
    borderBottomWidth: RFPercentage(0.5),
    borderRadius: RFPercentage(1.8),
    justifyContent: 'center',
    borderBottomColor: 'rgba(230, 247, 250, 0.6)',
  },
  attachmentCard: {
    width: '100%',
    height: RFPercentage(16),
    backgroundColor: COLORS.white,
    borderColor: COLORS.lightWhite,
    borderWidth: RFPercentage(0.1),
    borderBottomWidth: RFPercentage(0.5),
    borderRadius: RFPercentage(1.8),
    justifyContent: 'center',
    borderBottomColor: 'rgba(230, 247, 250, 0.6)',
  },
  locationCard: {
    width: '100%',
    height: RFPercentage(16),
    backgroundColor: COLORS.white,
    borderColor: COLORS.lightWhite,
    borderWidth: RFPercentage(0.1),
    borderBottomWidth: RFPercentage(0.5),
    borderRadius: RFPercentage(1.8),
    justifyContent: 'center',
  },
  cardInner: {
    width: '90%',
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  cardTitle: {
    color: COLORS.primary,
    fontFamily: FONTS.bold,
    fontSize: RFPercentage(1.8),
  },
  attachmentCount: {
    color: COLORS.lightGrey,
    fontFamily: FONTS.regular,
    fontSize: RFPercentage(1.6),
    marginTop: RFPercentage(0.5),
  },
  attachmentList: { marginTop: RFPercentage(1) },
  attachmentWrapper: {
    width: RFPercentage(7),
    height: RFPercentage(7.5),
    backgroundColor: COLORS.fieldColor,
    borderRadius: RFPercentage(1.3),
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: RFPercentage(1.5),
  },
  attachmentImage: {
    width: RFPercentage(5.5),
    height: RFPercentage(6.5),
    borderRadius: RFPercentage(1.3),
    alignSelf: 'center',
    top: RFPercentage(0.3),
  },
  cohostList: {
    marginTop: RFPercentage(1.8),
    paddingHorizontal: RFPercentage(0.5),
  },
  cohostImageWrapper: {
    width: RFPercentage(6),
    height: RFPercentage(6),
    backgroundColor: COLORS.pink6,
    borderTopRightRadius: RFPercentage(100),
    borderTopLeftRadius: RFPercentage(100),
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: RFPercentage(1.8),
  },
  cohostImage: {
    width: RFPercentage(6),
    height: RFPercentage(6),
    borderTopRightRadius: RFPercentage(100),
    borderTopLeftRadius: RFPercentage(100),
    right: RFPercentage(0.3),
    bottom: RFPercentage(0.2),
  },
});
