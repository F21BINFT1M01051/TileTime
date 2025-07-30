import {
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useState } from 'react';
import { COLORS, FONTS, ICONS, IMAGES } from '../../../../../../config/theme';
import { RFPercentage } from 'react-native-responsive-fontsize';
import SearchField from '../../../../../../components/SearchField';

const players = [
  {
    id: 1,
    name: 'Jamie Anderson',
    profile: IMAGES.profile1,
    common: '2 Groups Common • Montgom..',
  },
  {
    id: 2,
    name: 'Jamie Anderson',
    profile: IMAGES.profile2,
    common: '2 Groups Common • Montgom..',
  },
  {
    id: 3,
    name: 'Jamie Anderson',
    profile: IMAGES.profile1,
    common: '2 Groups Common • Montgom..',
  },
  {
    id: 4,
    name: 'Jamie Anderson',
    profile: IMAGES.profile2,
    common: '2 Groups Common • Montgom..',
  },
  {
    id: 5,
    name: 'Jamie Anderson',
    profile: IMAGES.profile1,
    common: '2 Groups Common • Montgom..',
  },
  {
    id: 6,
    name: 'Jamie Anderson',
    profile: IMAGES.profile1,
    common: '2 Groups Common • Montgom..',
  },
  {
    id: 7,
    name: 'Jamie Anderson',
    profile: IMAGES.profile1,
    common: '2 Groups Common • Montgom..',
  },
  {
    id: 8,
    name: 'Jamie Anderson',
    profile: IMAGES.profile1,
    common: '2 Groups Common • Montgom..',
  },
];

const Players = () => {
  const [selectedContacts, setSelectedContacts] = useState<number[]>([]);
  const [quuery, setQuery] = useState('');

  const toggleContact = (id: number) => {
    setSelectedContacts(prev =>
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id],
    );
  };
  return (
    <ScrollView>
      <SearchField
        placeholder="Search by name"
        value={quuery}
        onChangeText={setQuery}
      />
      <Text style={styles.sectionTitle}>ALL PLAYERS</Text>
      <View>
        <FlatList
          data={players}
          keyExtractor={item => item.id.toString()}
          renderItem={({ item }) => {
            const isSelected = selectedContacts.includes(item.id);
            return (
              <View style={styles.contactRow}>
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
                    <Text style={styles.phoneText}>{item.common}</Text>
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
            );
          }}
        />
      </View>
    </ScrollView>
  );
};

export default Players;

const styles = StyleSheet.create({
  sectionTitle: {
    color: COLORS.grey5,
    fontFamily: FONTS.medium,
    fontSize: RFPercentage(1.7),
    letterSpacing: 2,
    marginTop: RFPercentage(2),
  },
  contactRow: {
    width: '100%',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: RFPercentage(2.5),
  },
  contactInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatarContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    left: RFPercentage(0.2),
  },
  avatarOuterLayer: {
    width: RFPercentage(10.5),
    height: RFPercentage(11),
    borderRadius: RFPercentage(4),
    backgroundColor: COLORS.purple,
  },
  avatarMiddleLayer: {
    backgroundColor: COLORS.green2,
    borderRadius: RFPercentage(4),
    width: RFPercentage(10),
    height: RFPercentage(11),
  },
  avatarInnerLayer: {
    backgroundColor: COLORS.pink3,
    borderRadius: RFPercentage(4),
    width: RFPercentage(9.6),
    height: RFPercentage(11),
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarImage: {
    width: RFPercentage(10),
    height: RFPercentage(11),
    borderRadius: RFPercentage(4),
    bottom: RFPercentage(0.3),
    right: RFPercentage(0.2),
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
    marginTop: RFPercentage(0.4),
  },
  checkIcon: {
    width: RFPercentage(3.5),
    height: RFPercentage(3.5),
  },
});
