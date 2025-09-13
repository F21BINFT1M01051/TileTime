import {
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Keyboard,
  Platform,
  TouchableWithoutFeedback,
  Dimensions,
  KeyboardAvoidingView,
} from 'react-native';
import React, { useState, useMemo, useEffect } from 'react';
import { COLORS, FONTS, ICONS, IMAGES } from '../../../../../../config/theme';
import AuthHeader from '../../../../../../components/AuthHeader';
import { RFPercentage } from 'react-native-responsive-fontsize';
import CustomButton from '../../../../../../components/CustomButton';
import SearchField from '../../../../../../components/SearchField';

const players = [
  {
    id: 1,
    name: 'Jamie Anderson',
    profile: IMAGES.profile3,
    common: '2 Groups Common • Montgom..',
    connected: false,
    tileTime: true,
  },
  {
    id: 2,
    name: 'David Warner',
    profile: IMAGES.profile3,
    common: '3 Groups Common • NYC',
    connected: false,
    tileTime: true,
  },
  {
    id: 3,
    name: 'Chris Evans',
    profile: IMAGES.profile3,
    connected: false,
    tileTime: true,
    common: '3 Groups Common • NYC',
  },
  {
    id: 4,
    name: 'Emma Stone',
    profile: IMAGES.profile3,
    connected: false,
    tileTime: true,
    common: '3 Groups Common • NYC',
  },
];

const { height } = Dimensions.get('window');

const AddMembers = ({ navigation }: any) => {
  const [selectedContacts, setSelectedContacts] = useState<number[]>([]);
  const [query, setQuery] = useState('');

  const toggleContact = (id: number) => {
    setSelectedContacts(prev =>
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id],
    );
  };

  const filteredPlayers = useMemo(() => {
    if (!query.trim()) return players;
    return players.filter(
      item =>
        (item.name?.toLowerCase() || '').includes(query.toLowerCase()) ||
        (item.common?.toLowerCase() || '').includes(query.toLowerCase()),
    );
  }, [query]);

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        keyboardVerticalOffset={-height}
      >
        <View style={styles.container}>
          <AuthHeader
            title="Add Member"
            style={{ fontFamily: FONTS.semiBold, fontSize: RFPercentage(2.2) }}
          />
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.scrollContent}
            keyboardShouldPersistTaps="always"
          >
            <View style={styles.contentContainer}>
              <View style={{ marginTop: RFPercentage(1) }}>
                <SearchField
                  placeholder="Search Name, Email or Phone Number"
                  value={query}
                  onChangeText={setQuery}
                />
              </View>

              <View style={styles.listContainer}>
                <Text style={styles.sectionTitleDisabled}>SUGGESTED</Text>
                <FlatList
                  data={filteredPlayers}
                  keyExtractor={item => item.id.toString()}
                  keyboardShouldPersistTaps="always"
                  contentContainerStyle={styles.flatListContent}
                  ListEmptyComponent={
                    <Text
                      style={{
                        textAlign: 'center',
                        marginTop: RFPercentage(2),
                        color: COLORS.grey5,
                      }}
                    >
                      No players found
                    </Text>
                  }
                  renderItem={({ item }) => {
                    const isSelected = selectedContacts.includes(item.id);
                    return (
                      <TouchableOpacity
                        activeOpacity={0.8}
                        onPress={() => toggleContact(item.id)}
                      >
                        <View style={styles.contactRow}>
                          {item.connected === false &&
                          item.tileTime === true ? (
                            <View style={styles.contactInfo}>
                              <View style={styles.avatarContainer}>
                                <View style={styles.avatarOuterLayer}>
                                  <View style={styles.avatarMiddleLayer}>
                                    <View style={styles.avatarInnerLayer}>
                                      <Image
                                        source={item.profile}
                                        resizeMode="contain"
                                        style={styles.avatarImage}
                                      />
                                    </View>
                                  </View>
                                </View>
                              </View>
                              <View style={styles.nameSection}>
                                <Text style={styles.nameText}>{item.name}</Text>
                                <Text style={styles.phoneText}>
                                  {item.common}
                                </Text>
                              </View>
                            </View>
                          ) : item.connected === true &&
                            item.tileTime === false ? (
                            <View style={styles.contactInfo}>
                              <View style={styles.connectedAvatar}>
                                <Image
                                  source={item.profile}
                                  resizeMode="cover"
                                  style={styles.connectedAvatarImage}
                                />
                                <Image
                                  source={ICONS.fb22}
                                  resizeMode="contain"
                                  style={styles.connectedFbIcon}
                                />
                              </View>
                              <View style={styles.nameSection}>
                                <Text style={styles.nameText}>{item.name}</Text>
                                <Text style={styles.phoneText}>
                                  Not on TileTime
                                </Text>
                              </View>
                            </View>
                          ) : (
                            <View style={styles.contactInfo}>
                              <View style={styles.notOnTileTimeAvatar}>
                                <Text style={styles.notOnTileTimeInitials}>
                                  JA
                                </Text>
                                <Image
                                  source={ICONS.contact22}
                                  resizeMode="contain"
                                  style={styles.connectedFbIcon}
                                />
                              </View>
                              <View style={styles.nameSection}>
                                <Text style={styles.nameText}>{item.name}</Text>
                                <Text style={styles.phoneText}>
                                  Not on TileTime
                                </Text>
                              </View>
                            </View>
                          )}

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
          </ScrollView>

          <View style={styles.bottomBar}>
            <View style={styles.bottomContent}>
              <CustomButton
                title="Save"
                disabled={selectedContacts.length === 0}
                style={{
                  backgroundColor:
                    selectedContacts.length > 0
                      ? COLORS.primary
                      : COLORS.disabled,
                }}
                onPress={() => {}}
              />
            </View>
          </View>
        </View>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

export default AddMembers;

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
    marginTop: RFPercentage(2.5),
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
  contactRow: {
    width: '100%',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: RFPercentage(3),
  },
  contactInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatarContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: RFPercentage(1),
  },
  avatarOuterLayer: {
    width: RFPercentage(5.5),
    height: RFPercentage(6.5),
    borderRadius: RFPercentage(2.5),
    backgroundColor: COLORS.purple,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headingText: {
    color: COLORS.primary,
    fontFamily: FONTS.bold,
    fontSize: RFPercentage(2.6),
  },
  avatarMiddleLayer: {
    backgroundColor: COLORS.green2,
    width: RFPercentage(5.5),
    height: RFPercentage(6.5),
    borderRadius: RFPercentage(2.5),
    alignItems: 'center',
    justifyContent: 'center',
    right: RFPercentage(0.2),
  },
  avatarInnerLayer: {
    backgroundColor: COLORS.pink3,
    width: RFPercentage(5.5),
    height: RFPercentage(6.5),
    borderRadius: RFPercentage(2.5),
    alignItems: 'center',
    justifyContent: 'center',
    right: RFPercentage(0.2),
  },
  avatarImage: {
    width: RFPercentage(5.5),
    height: RFPercentage(6.5),
    borderRadius: RFPercentage(2.5),
    right: RFPercentage(0.2),
    bottom: RFPercentage(0.2),
  },
  connectedAvatar: {
    width: RFPercentage(7),
    height: RFPercentage(7),
    borderRadius: RFPercentage(100),
  },
  connectedAvatarImage: {
    width: RFPercentage(7),
    height: RFPercentage(7),
    borderRadius: RFPercentage(100),
  },
  connectedFbIcon: {
    width: RFPercentage(4),
    height: RFPercentage(4),
    position: 'absolute',
    bottom: RFPercentage(-1),
    right: RFPercentage(-0.6),
  },
  notOnTileTimeAvatar: {
    width: RFPercentage(7),
    height: RFPercentage(7),
    borderRadius: RFPercentage(100),
    backgroundColor: COLORS.lightYellow,
    alignItems: 'center',
    justifyContent: 'center',
  },
  notOnTileTimeInitials: {
    fontFamily: FONTS.semiBold,
    fontSize: RFPercentage(2.3),
    color: COLORS.darkYeloow,
  },
  nameSection: {
    marginLeft: RFPercentage(2),
  },
  nameText: {
    color: COLORS.primary,
    fontFamily: FONTS.semiBold,
    fontSize: RFPercentage(2),
  },
  phoneText: {
    color: COLORS.lightGrey,
    fontFamily: FONTS.regular,
    fontSize: RFPercentage(1.7),
    marginTop: Platform.OS === 'ios' ? RFPercentage(0.6) : RFPercentage(0.1),
  },
  checkIcon: {
    width: RFPercentage(3),
    height: RFPercentage(3),
  },
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
