import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  Image,
  Modal,
  TouchableWithoutFeedback,
  Animated,
  Dimensions,
  ScrollView,
  Platform,
} from 'react-native';
import React, { useState, useRef } from 'react';
import { COLORS, ICONS, FONTS, IMAGES } from '../../../../config/theme';
import AuthHeader from '../../../../components/AuthHeader';
import { RFPercentage } from 'react-native-responsive-fontsize';
import SearchField from '../../../../components/SearchField';
import { BlurView } from '@react-native-community/blur';
import SocialField from '../../../../components/SocialField';
import * as RNHTMLtoPDF from 'react-native-html-to-pdf';
import Share from 'react-native-share';

const { height } = Dimensions.get('window');

const Filters = [
  { id: 1, name: 'All' },
  { id: 2, name: 'Confirmed' },
  { id: 3, name: 'Waitlist' },
  { id: 4, name: 'Canceled' },
];

const attendees = [
  {
    id: 1,
    name: 'Samantha Lewis',
    since: '4 Sep 2021',
    profile: IMAGES.chatProfile,
    status: 'Confirmed',
  },
  {
    id: 2,
    name: 'James Smith',
    since: '4 Sep 2021',
    profile: IMAGES.chatProfile,
    status: 'Canceled',
  },
  {
    id: 3,
    name: 'Sophia Lee',
    since: '4 Sep 2021',
    profile: IMAGES.chatProfile,
    status: 'Waitlist',
  },
  {
    id: 4,
    name: 'Emily Carter',
    since: '4 Sep 2021',
    profile: IMAGES.chatProfile,
    status: 'Confirmed',
  },
];

const buttons = [
  {
    id: 1,
    name: 'Resend Invite',
    icon: ICONS.share22,
    color: COLORS.primary,
  },
  {
    id: 2,
    name: 'Send Message',
    icon: ICONS.msg,
    color: COLORS.primary,
  },
  {
    id: 3,
    name: 'Remove Attendee',
    icon: ICONS.trash,
    color: COLORS.red,
  },
];

const EventAttendees = () => {
  const [activeFilter, setActiveFilter] = useState('All');
  const [query, setQuery] = useState('');

  const [selectedUser, setSelectedUser] = useState(null);
  const [isModalVisible, setModalVisible] = useState(false);
  console.log('RNHTMLtoPDF =>', RNHTMLtoPDF);

  const translateY = useRef(new Animated.Value(height)).current;

  const openModal = (user: any) => {
    setSelectedUser(user);
    setModalVisible(true);
    Animated.timing(translateY, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const closeModal = () => {
    Animated.timing(translateY, {
      toValue: height,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      setModalVisible(false);
      setSelectedUser(null);
    });
  };

  // 🔎 Filtering Logic
  const filteredAttendees = attendees.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(query.toLowerCase());
    const matchesFilter =
      activeFilter === 'All' ||
      item.status.toLowerCase() === activeFilter.toLowerCase();
    return matchesSearch && matchesFilter;
  });

  const exportAttendeesPDF = async () => {
    try {
      const rows = filteredAttendees
        .map(
          a => `
            <tr>
              <td style="border:1px solid #ccc; padding:6px;">${a.name}</td>
              <td style="border:1px solid #ccc; padding:6px;">${a.status}</td>
              <td style="border:1px solid #ccc; padding:6px;">${a.since}</td>
            </tr>`,
        )
        .join('');

      const html = `
        <h1 style="text-align:center;">Attendees List</h1>
        <table style="width:100%; border-collapse:collapse;">
          <thead>
            <tr style="background:#eee;">
              <th style="border:1px solid #ccc; padding:6px;">Name</th>
              <th style="border:1px solid #ccc; padding:6px;">Status</th>
              <th style="border:1px solid #ccc; padding:6px;">Since</th>
            </tr>
          </thead>
          <tbody>${rows}</tbody>
        </table>
      `;

      const pdfOptions = {
        html,
        fileName: 'attendees_list',
        directory: 'Downloads',
      };
      console.log('pdfOptions.......', pdfOptions);
      const file = await RNHTMLtoPDF.generatePDF(pdfOptions);
      console.log('file.......', file);
    } catch (err) {
      console.log('PDF Error:', err);
    }
  };

  return (
    <View style={styles.container}>
      <AuthHeader
        title="Attendees"
        style={styles.headerTitle}
        right={true}
        rightIcon={ICONS.upload2}
        onPress2={exportAttendeesPDF}
      />
      <ScrollView
        keyboardShouldPersistTaps="always"
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.searchWrapper}>
          <SearchField
            placeholder="Search by name"
            value={query}
            onChangeText={setQuery}
          />
        </View>

        {/* Filters */}
        <View style={styles.filterContainer}>
          <FlatList
            data={Filters}
            keyExtractor={item => item.id.toString()}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.filterList}
            renderItem={({ item }) => (
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => setActiveFilter(item.name)}
                style={[
                  styles.filterButton,
                  {
                    backgroundColor:
                      activeFilter === item.name
                        ? COLORS.inputColor
                        : COLORS.fieldColor,
                  },
                ]}
              >
                <Text
                  style={[
                    styles.filterText,
                    {
                      color:
                        activeFilter === item.name
                          ? COLORS.white
                          : COLORS.grey4,

                      fontFamily:
                        activeFilter === item.name
                          ? FONTS.semiBold
                          : FONTS.medium,
                    },
                  ]}
                >
                  {item.name}
                </Text>
              </TouchableOpacity>
            )}
          />
        </View>

        {/* Attendees List */}
        <View style={styles.attendeesWrapper}>
          <FlatList
            data={filteredAttendees}
            keyboardShouldPersistTaps="always"
            keyExtractor={item => item.id.toString()}
            renderItem={({ item }) => (
              <View style={styles.attendeeCard}>
                <View style={styles.attendeeRow}>
                  <View style={styles.profileWrapper}>
                    <Image
                      source={item.profile}
                      resizeMode="contain"
                      style={styles.profileImage}
                    />
                  </View>
                  <View style={styles.attendeeInfo}>
                    <Text style={styles.attendeeName}>{item.name}</Text>
                    <Text style={styles.attendeeStatus}>
                      {item.status}{' '}
                      <Text style={styles.attendeeSince}>{item.since}</Text>
                    </Text>
                  </View>
                  <TouchableOpacity
                    activeOpacity={0.8}
                    style={styles.dotsButton}
                    onPress={() => openModal(item)}
                  >
                    <Image
                      source={ICONS.dots}
                      resizeMode="contain"
                      style={styles.dotsIcon}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            )}
          />
        </View>
      </ScrollView>
      {/* Custom Animated Bottom Sheet */}
      <Modal transparent visible={isModalVisible} onRequestClose={closeModal}>
        <BlurView
          style={StyleSheet.absoluteFill}
          blurType="dark"
          blurAmount={5}
          reducedTransparencyFallbackColor="black"
        />
        <TouchableWithoutFeedback onPress={closeModal}>
          <View style={styles.modalOverlay}>
            <Animated.View
              style={[styles.bottomSheet, { transform: [{ translateY }] }]}
            >
              <View style={styles.modalContent}>
                <View style={styles.modalHeader}>
                  <Text style={styles.modalTitle}>Attendee Actions</Text>
                  <TouchableOpacity
                    activeOpacity={0.8}
                    style={styles.modalCloseBtn}
                    onPress={closeModal}
                  >
                    <Image
                      source={ICONS.cross2}
                      resizeMode="contain"
                      style={styles.modalCloseIcon}
                    />
                  </TouchableOpacity>
                </View>

                {selectedUser && (
                  <View style={styles.modalUserRow}>
                    <View style={styles.modalProfileWrapper}>
                      <Image
                        source={selectedUser?.profile}
                        resizeMode="cover"
                        style={styles.modalProfileImage}
                      />
                    </View>
                    <View style={styles.modalUserInfo}>
                      <Text style={styles.modalName}>{selectedUser.name}</Text>
                      <TouchableOpacity activeOpacity={0.8}>
                        <Text style={styles.viewProfile}>View Profile</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                )}

                <View style={styles.actionsWrapper}>
                  <FlatList
                    data={buttons}
                    keyExtractor={item => item.id.toString()}
                    renderItem={({ item }) => (
                      <SocialField
                        name={item.name}
                        icon={item.icon}
                        color={item.color}
                        borderColor={item.color}
                        style={styles.actionItem}
                      />
                    )}
                  />
                </View>
              </View>
            </Animated.View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  );
};

export default EventAttendees;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.white },
  headerTitle: { fontFamily: FONTS.semiBold, fontSize: RFPercentage(2) },
  searchWrapper: {
    width: '90%',
    alignSelf: 'center',
    marginTop: RFPercentage(3),
  },
  filterContainer: {},
  filterList: { paddingHorizontal: RFPercentage(2) },
  filterButton: {
    height: RFPercentage(4.5),
    paddingHorizontal: RFPercentage(2),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: RFPercentage(2.9),
    marginTop: RFPercentage(3),
    marginRight: RFPercentage(1),
  },
  filterText: { fontSize: RFPercentage(1.7), lineHeight: RFPercentage(1.7) },
  attendeesWrapper: {
    width: '90%',
    alignSelf: 'center',
    marginTop: RFPercentage(2),
    flex: 1,
  },
  attendeeCard: {
    width: '100%',
    height: RFPercentage(9),
    backgroundColor: COLORS.white,
    borderWidth: RFPercentage(0.1),
    borderColor: COLORS.lightWhite,
    borderRadius: RFPercentage(2),
    justifyContent: 'center',
    marginTop: RFPercentage(2),
  },
  attendeeRow: {
    width: '90%',
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileWrapper: {
    width: RFPercentage(5.5),
    height: RFPercentage(5.5),
    borderTopRightRadius: RFPercentage(100),
    borderTopLeftRadius: RFPercentage(100),
    backgroundColor: COLORS.pink,
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileImage: {
    width: RFPercentage(5.5),
    height: RFPercentage(5.5),
    borderTopRightRadius: RFPercentage(100),
    borderTopLeftRadius: RFPercentage(100),
    right: RFPercentage(0.1),
    bottom: RFPercentage(0.2),
  },
  attendeeInfo: { marginLeft: RFPercentage(1.6) },
  attendeeName: {
    color: COLORS.primary,
    fontFamily: FONTS.medium,
    fontSize: RFPercentage(1.8),
  },
  attendeeStatus: {
    color: COLORS.lightGrey,
    fontFamily: FONTS.regular,
    fontSize: RFPercentage(1.5),
    marginTop: RFPercentage(0.5),
  },
  attendeeSince: { fontFamily: FONTS.medium },
  dotsButton: { position: 'absolute', right: 0 },
  dotsIcon: { width: RFPercentage(2), height: RFPercentage(2) },

  // Modal
  modalOverlay: { flex: 1 },
  bottomSheet: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    backgroundColor: COLORS.white,
    borderTopLeftRadius: RFPercentage(3),
    borderTopRightRadius: RFPercentage(3),
    minHeight: height * 0.5,
  },
  modalContent: {
    width: '90%',
    alignSelf: 'center',
    marginTop: RFPercentage(3),
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  modalTitle: {
    color: COLORS.primary,
    fontFamily: FONTS.semiBold,
    fontSize: RFPercentage(2),
  },
  modalCloseBtn: { position: 'absolute', right: 0 },
  modalCloseIcon: { width: RFPercentage(1.6), height: RFPercentage(1.6) },
  modalUserRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: RFPercentage(3),
  },
  modalProfileWrapper: {
    width: RFPercentage(10),
    height: RFPercentage(10),
    borderTopRightRadius: RFPercentage(100),
    borderTopLeftRadius: RFPercentage(100),
    backgroundColor: COLORS.pink,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalProfileImage: {
    width: RFPercentage(10),
    height: RFPercentage(10),
    borderTopRightRadius: RFPercentage(100),
    borderTopLeftRadius: RFPercentage(100),
    bottom: RFPercentage(0.2),
    right: RFPercentage(0.2),
  },
  modalUserInfo: { marginLeft: RFPercentage(2) },
  modalName: {
    fontFamily: FONTS.semiBold,
    fontSize: RFPercentage(2.3),
    color: COLORS.primary,
  },
  viewProfile: {
    color: COLORS.pink,
    fontFamily: FONTS.semiBold,
    fontSize: RFPercentage(1.7),
    marginTop: RFPercentage(1),
  },
  actionsWrapper: { marginTop: RFPercentage(3) },
  actionItem: { marginTop: RFPercentage(1.5) },
});
