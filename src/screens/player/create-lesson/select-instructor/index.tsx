import {
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Keyboard,
} from 'react-native';
import React, { useState, useMemo, useEffect } from 'react';
import { COLORS, FONTS, ICONS, IMAGES } from '../../../../config/theme';
import { RFPercentage } from 'react-native-responsive-fontsize';
import CustomButton from '../../../../components/CustomButton';
import SearchField from '../../../../components/SearchField';
import AuthHeader from '../../../../components/AuthHeader';
import EventLiveLessons from '../../../instructor/components/EventLive_Lessons';

const Instructors = [
  {
    id: 1,
    name: 'Emily Carter',
    member: '2 common groups | Birmingham, AL',
    profile: IMAGES.chatProfile,
  },
  {
    id: 2,
    name: 'James Smith',
    member: 'Member since 4 months',
    profile: IMAGES.chatProfile,
  },
  {
    id: 3,
    name: 'Emily Carter',
    member: '2 common groups | Birmingham, AL',
    profile: IMAGES.chatProfile,
  },
  {
    id: 4,
    name: 'James Smith',
    member: 'Member since 4 months',
    profile: IMAGES.chatProfile,
  },
];

const SelectLessonInstructors = ({ navigation }: any) => {
  const [query, setQuery] = useState('');
  const [selectedContacts, setSelectedContacts] = useState<number[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
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

  const toggleContact = (id: number) => {
    setSelectedContacts(prev =>
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id],
    );
  };

  const filteredHosts = useMemo(() => {
    if (!query.trim()) return Instructors;
    return Instructors.filter(
      (item: any) =>
        (item.name?.toLowerCase() || '').includes(query.toLowerCase()) ||
        (item.common?.toLowerCase() || '').includes(query.toLowerCase()),
    );
  }, [query]);

  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Header */}
        <AuthHeader
          title="Select Instructors"
          right={true}
          rightText="Save Draft"
        />

        {/* Info */}
        <View style={styles.contentContainer}>
          <View>
            <Text
              style={{
                color: COLORS.primary,
                fontFamily: FONTS.headline,
                fontSize: RFPercentage(2.4),
              }}
            >
              Find Instructor
            </Text>
            <Text
              style={{
                fontSize: RFPercentage(1.7),
                fontFamily: FONTS.regular,
                color: COLORS.lightGrey,
                marginTop: RFPercentage(1.5),
              }}
            >
              Search and invite instructors for your event.
            </Text>
          </View>

          {/* Search Field */}
          <View style={{ marginTop: RFPercentage(3) }}>
            <SearchField
              placeholder="Search by name"
              value={query}
              onChangeText={setQuery}
            />
          </View>

          {/* Instructors */}
          <View style={styles.availableInstructors}>
            <Text style={styles.availableText}>AVAILABLE INSTRUCTORS</Text>
          </View>

          <View style={{ marginTop: RFPercentage(-1.5) }}>
            <FlatList
              data={filteredHosts}
              keyExtractor={item => item.id.toString()}
              contentContainerStyle={styles.flatListContent}
              ListEmptyComponent={
                <Text style={styles.noResultText}>No results found</Text>
              }
              renderItem={({ item }) => {
                const isSelected = selectedContacts.includes(item.id);
                return (
                  <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={() => toggleContact(item.id)}
                    style={styles.contactWrapper}
                  >
                    <View style={styles.contactRow}>
                      <View style={styles.contactLeft}>
                        <View style={styles.avatarInnerLayer}>
                          <Image
                            source={item.profile}
                            resizeMode="cover"
                            style={styles.avatarImage}
                          />
                          <TouchableOpacity
                            activeOpacity={0.8}
                            onPress={() =>
                              navigation.navigate('InstructorProfile')
                            }
                            style={styles.viewProfileBtn}
                          >
                            <Text style={styles.viewProfileText}>
                              View Profile
                            </Text>
                          </TouchableOpacity>
                        </View>
                        <View style={styles.contactInfo}>
                          <Text style={styles.contactName}>{item.name}</Text>
                          <Text style={styles.contactMembers}>
                            {item.member}
                          </Text>
                        </View>
                      </View>
                      <TouchableOpacity onPress={() => toggleContact(item.id)}>
                        <Image
                          resizeMode="contain"
                          source={isSelected ? ICONS.checked : ICONS.uncheck}
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
      </ScrollView>

      {/* Bottom Button */}
      {!keyboardIsVisible && (
        <View style={styles.bottomBar}>
          <View style={styles.bottomContent}>
            <CustomButton
              title="Save And Next"
              disabled={selectedContacts.length === 0}
              style={{
                backgroundColor:
                  selectedContacts.length > 0
                    ? COLORS.primary
                    : COLORS.disabled,
              }}
              onPress={() => setModalVisible(true)}
            />
          </View>
        </View>
      )}

      {/* Modal */}
      <EventLiveLessons
        visible={modalVisible}
        title={`Request Sent for Lesson`}
        subtitle={`Your Request Has Been Sent Ton Ava. You’ll Be\nNotified Once They Accept It. `}
        onClose={() => setModalVisible(false)}
      />
    </View>
  );
};

export default SelectLessonInstructors;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  scrollContent: {
    paddingBottom: RFPercentage(2),
  },
  contentContainer: {
    width: '90%',
    alignSelf: 'center',
    marginTop: RFPercentage(2),
  },
  listContainer: {
    marginTop: RFPercentage(3),
  },
  flatListContent: {
    paddingBottom: RFPercentage(10),
  },
  sectionTitleDisabled: {
    color: COLORS.grey5,
    fontFamily: FONTS.regular,
    fontSize: RFPercentage(1.4),
    letterSpacing: 2,
  },
  availableInstructors: { marginTop: RFPercentage(2) },
  availableText: {
    color: COLORS.grey5,
    fontFamily: FONTS.regular,
    fontSize: RFPercentage(1.4),
    letterSpacing: RFPercentage(0.2),
  },
  noResultText: {
    textAlign: 'center',
    color: COLORS.lightGrey,
    fontFamily: FONTS.regular,
    fontSize: RFPercentage(1.8),
    marginTop: RFPercentage(5),
  },
  contactWrapper: { marginTop: RFPercentage(6) },
  contactRow: {
    width: '100%',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: RFPercentage(1),
  },
  contactLeft: { flexDirection: 'row', alignItems: 'center' },
  avatarInnerLayer: {
    backgroundColor: COLORS.pink3,
    width: RFPercentage(10.5),
    height: RFPercentage(11),
    borderTopRightRadius: RFPercentage(100),
    borderTopLeftRadius: RFPercentage(100),
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarImage: {
    width: RFPercentage(10.5),
    height: RFPercentage(11),
    borderTopRightRadius: RFPercentage(100),
    borderTopLeftRadius: RFPercentage(100),
    bottom: RFPercentage(0.2),
    right: RFPercentage(0.3),
  },
  viewProfileBtn: {
    width: RFPercentage(9),
    height: RFPercentage(2.4),
    backgroundColor: COLORS.white,
    borderWidth: RFPercentage(0.1),
    borderRadius: RFPercentage(100),
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: RFPercentage(-1),
  },
  viewProfileText: {
    color: COLORS.primary,
    fontSize: RFPercentage(1),
    fontFamily: FONTS.medium,
  },
  contactInfo: { marginLeft: RFPercentage(2), width: '60%' },
  contactName: {
    fontFamily: FONTS.semiBold,
    color: COLORS.primary,
    fontSize: RFPercentage(1.9),
  },
  contactMembers: {
    fontFamily: FONTS.regular,
    color: COLORS.lightGrey,
    fontSize: RFPercentage(1.6),
    marginTop: RFPercentage(0.5),
  },
  checkIcon: { width: RFPercentage(3), height: RFPercentage(3) },
  bottomBar: {
    width: '100%',
    borderTopWidth: RFPercentage(0.1),
    borderTopColor: COLORS.lightWhite,
    position: 'absolute',
    bottom: 0,
    paddingTop: RFPercentage(2),
    paddingBottom: RFPercentage(4),
    backgroundColor: COLORS.white,
  },
  bottomContent: {
    width: '90%',
    alignSelf: 'center',
  },
});
