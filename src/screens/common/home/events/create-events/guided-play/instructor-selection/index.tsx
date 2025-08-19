import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  Image,
} from 'react-native';
import React, { useState, useMemo } from 'react';
import {
  COLORS,
  FONTS,
  IMAGES,
  ICONS,
} from '../../../../../../../config/theme';
import { RFPercentage } from 'react-native-responsive-fontsize';
import InputField from '../../../../../../../components/InputField';
import SearchField from '../../../../../../../components/SearchField';
import { useNavigation } from '@react-navigation/native';

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

const InstructorSelection = () => {
  const [instructors, setInstructors] = useState('');
  const [payment, setPayment] = useState('');
  const [query, setQuery] = useState('');
  const [selectedContacts, setSelectedContacts] = useState<number[]>([]);
  const navigation = useNavigation();
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
      <View style={styles.fullWidth}>
        <View style={styles.sectionHeader}>
          <Text style={styles.eventTitle}>Select Instructor</Text>
          <Text style={styles.eventSubtitle}>
            Set spots, payment, and invite instructors for your event.
          </Text>
        </View>

        <View style={styles.inputMargin}>
          <InputField
            placeholder="Number of Instructors Needed"
            value={instructors}
            onChangeText={setInstructors}
            type="number-pad"
          />
        </View>
        <View>
          <InputField
            placeholder="Payment per Instructor (hourly)"
            value={payment}
            onChangeText={setPayment}
            type="number-pad"
          />
        </View>
        <View style={styles.searchInviteHeader}>
          <Text style={styles.searchInviteTitle}>
            Search & Invite Instructors
          </Text>
          <Text style={styles.noteText}>
            Note:{' '}
            <Text style={styles.noteInnerText}>
              If you invite more instructors than needed, the first ones to
              accept will be confirmed.
            </Text>
          </Text>
        </View>
        <View style={styles.searchFieldMargin}>
          <SearchField
            placeholder="Search by name"
            value={query}
            onChangeText={setQuery}
          />
        </View>
        <View style={styles.availableInstructors}>
          <Text style={styles.availableText}>AVAILABLE INSTRUCTORS</Text>
        </View>

        <View style={styles.flatListContainer}>
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
                        <Text style={styles.contactMembers}>{item.member}</Text>
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
    </View>
  );
};

export default InstructorSelection;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.white },
  fullWidth: { width: '100%', alignSelf: 'center' },
  sectionHeader: { marginTop: RFPercentage(4) },
  eventTitle: {
    color: COLORS.primary,
    fontSize: RFPercentage(2.5),
    fontFamily: FONTS.headline,
  },
  eventSubtitle: {
    color: COLORS.lightGrey,
    fontSize: RFPercentage(1.7),
    fontFamily: FONTS.regular,
    marginTop: RFPercentage(2),
  },
  inputMargin: { marginTop: RFPercentage(1.5) },
  searchInviteHeader: { marginTop: RFPercentage(3) },
  searchInviteTitle: {
    color: COLORS.primary,
    fontFamily: FONTS.bold,
    fontSize: RFPercentage(1.9),
  },
  noteText: {
    color: COLORS.lightGrey,
    fontFamily: FONTS.medium,
    fontSize: RFPercentage(1.6),
    marginTop: RFPercentage(1),
    lineHeight: RFPercentage(2.1),
  },
  noteInnerText: { fontFamily: FONTS.regular },
  searchFieldMargin: { marginTop: RFPercentage(3) },
  availableInstructors: { marginTop: RFPercentage(2) },
  availableText: {
    color: COLORS.grey5,
    fontFamily: FONTS.regular,
    fontSize: RFPercentage(1.4),
    letterSpacing: RFPercentage(0.2),
  },
  flatListContainer: { marginTop: RFPercentage(-2) },
  flatListContent: { paddingBottom: RFPercentage(3) },
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
});
