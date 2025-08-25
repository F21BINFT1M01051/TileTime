// components/AddToGroupModal.js
import React, { useRef, useState, useEffect } from 'react';
import {
  Modal,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image,
  FlatList,
  Animated,
  Dimensions,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import { BlurView } from '@react-native-community/blur';
import { RFPercentage } from 'react-native-responsive-fontsize';
import { COLORS, ICONS, IMAGES, FONTS } from '../config/theme';
import SearchField from './SearchField';
import CustomButton from './CustomButton';
const AddToGroupModal = ({
  isVisible,
  onClose,
  query,
  setQuery,
  filteredData,
  selectedContacts,
  toggleContact,
}) => {
  const slideAnim = useRef(
    new Animated.Value(Dimensions.get('window').height),
  ).current;

  React.useEffect(() => {
    if (isVisible) {
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(slideAnim, {
        toValue: Dimensions.get('window').height,
        duration: 500,
        useNativeDriver: true,
      }).start();
    }
  }, [isVisible]);

  const [keyboardIsVisible, setKeyboardIsVisible] = useState(false);

  useEffect(() => {
    const showSubscription = Keyboard.addListener('keyboardDidShow', () => {
      setKeyboardIsVisible(true);
    });
    const hideSubscription = Keyboard.addListener('keyboardDidHide', () => {
      setKeyboardIsVisible(false);
    });

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);

  return (
    <Modal visible={isVisible} transparent animationType="none">
      <BlurView
        style={StyleSheet.absoluteFill}
        blurType="dark"
        blurAmount={5}
        reducedTransparencyFallbackColor="white"
      />
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.overlay}>
          <TouchableWithoutFeedback>
            <Animated.View
              style={[
                styles.modalContent,
                { transform: [{ translateY: slideAnim }] },
              ]}
            >
              <View style={styles.modalInnerContent}>
                {/* Header */}
                <View style={styles.modalHeader}>
                  <Text style={styles.modalTitle}>Add to Group</Text>
                  <TouchableOpacity activeOpacity={0.8} onPress={onClose}>
                    <Image
                      source={ICONS.cross}
                      resizeMode="contain"
                      tintColor={COLORS.lightGrey}
                      style={styles.crossIcon}
                    />
                  </TouchableOpacity>
                </View>

                {/* Search */}
                <View style={styles.searchContainer}>
                  <SearchField
                    placeholder="Search by name"
                    value={query}
                    onChangeText={setQuery}
                  />
                </View>

                {/* List */}
                <View style={styles.flatListContainer}>
                  <FlatList
                    data={filteredData}
                    keyExtractor={item => item.id.toString()}
                    ListEmptyComponent={
                      <Text style={styles.noResultText}>No results found</Text>
                    }
                    renderItem={({ item }) => {
                      const isSelected = selectedContacts.includes(item.id);
                      return (
                        <TouchableOpacity
                          activeOpacity={0.8}
                          onPress={() => toggleContact(item.id)}
                        >
                          <View style={styles.contactRow}>
                            <View style={styles.contactLeft}>
                              <View style={styles.contactAvatarWrapper}>
                                <Image
                                  source={IMAGES.customProfile}
                                  resizeMode="cover"
                                  style={styles.contactAvatar}
                                />
                              </View>
                              <View style={styles.contactInfo}>
                                <Text style={styles.contactName}>
                                  {item.name}
                                </Text>
                                <Text style={styles.contactMembers}>
                                  {item.members}
                                </Text>
                              </View>
                            </View>
                            <TouchableOpacity
                              onPress={() => toggleContact(item.id)}
                            >
                              <Image
                                resizeMode="contain"
                                source={
                                  isSelected ? ICONS.checked : ICONS.uncheck
                                }
                                style={styles.checkIcon}
                              />
                            </TouchableOpacity>
                          </View>
                        </TouchableOpacity>
                      );
                    }}
                  />
                </View>
              </View>

              {/* Footer */}
              {!keyboardIsVisible && (
                <View style={styles.modalFooter}>
                  <View style={styles.modalFooterInner}>
                    <CustomButton
                      title={
                        selectedContacts.length > 0
                          ? `Add Sophie To ${selectedContacts.length} Groups`
                          : `Add Sophie To Groups`
                      }
                      onPress={onClose}
                      disabled={selectedContacts.length === 0}
                      style={{
                        backgroundColor:
                          selectedContacts.length > 0
                            ? COLORS.primary
                            : COLORS.disabled,
                      }}
                    />
                  </View>
                </View>
              )}
            </Animated.View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default AddToGroupModal;

const styles = StyleSheet.create({
  overlay: { flex: 1, justifyContent: 'flex-end' },
  modalContent: {
    backgroundColor: COLORS.white,
    borderTopLeftRadius: RFPercentage(3),
    borderTopRightRadius: RFPercentage(3),
    paddingBottom: RFPercentage(4),
    height: '80%',
  },
  modalInnerContent: {
    width: '90%',
    alignSelf: 'center',
    marginTop: RFPercentage(3.5),
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  modalTitle: {
    fontFamily: FONTS.semiBold,
    color: COLORS.primary,
    fontSize: RFPercentage(2.2),
  },
  crossIcon: { width: RFPercentage(2.4), height: RFPercentage(2.4) },
  searchContainer: { marginTop: RFPercentage(3) },
  flatListContainer: { marginTop: RFPercentage(0.5) },
  noResultText: {
    textAlign: 'center',
    color: COLORS.lightGrey,
    fontFamily: FONTS.regular,
    fontSize: RFPercentage(1.9),
    marginTop: RFPercentage(5),
  },
  contactRow: {
    width: '100%',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: RFPercentage(3),
  },
  contactLeft: {
    marginLeft: RFPercentage(1),
    flexDirection: 'row',
    alignItems: 'center',
  },
  contactAvatarWrapper: {
    width: RFPercentage(7),
    height: RFPercentage(7),
    borderTopRightRadius: RFPercentage(100),
    borderTopLeftRadius: RFPercentage(100),
    borderBottomRightRadius: RFPercentage(100),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.yellow,
  },
  contactAvatar: {
    width: RFPercentage(7),
    height: RFPercentage(7),
    borderTopRightRadius: RFPercentage(100),
    borderTopLeftRadius: RFPercentage(100),
    borderBottomRightRadius: RFPercentage(100),
    right: RFPercentage(0.5),
  },
  contactInfo: { marginLeft: RFPercentage(1.5), width: '70%' },
  contactName: {
    fontFamily: FONTS.semiBold,
    color: COLORS.primary,
    fontSize: RFPercentage(2),
  },
  contactMembers: {
    fontFamily: FONTS.regular,
    color: COLORS.lightGrey,
    fontSize: RFPercentage(1.7),
    marginTop: RFPercentage(0.5),
  },
  checkIcon: { width: RFPercentage(3), height: RFPercentage(3) },
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
});
