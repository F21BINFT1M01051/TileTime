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
    profile: IMAGES.profile3,
    common: '2 Groups Common • Montgom..',
  },
  {
    id: 2,
    name: 'Jamie Anderson',
    profile: IMAGES.profile3,
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
      <View style={{ marginTop: RFPercentage(2.5) }}>
        <SearchField
          placeholder="Search by name"
          value={quuery}
          onChangeText={setQuery}
        />
      </View>
      <Text style={styles.sectionTitle}>ALL PLAYERS</Text>
      <View>
        <FlatList
          data={players}
          keyExtractor={item => item.id.toString()}
          renderItem={({ item }) => {
            const isSelected = selectedContacts.includes(item.id);
            return (
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => toggleContact(item.id)}
              >
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
              </TouchableOpacity>
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
    fontFamily: FONTS.medium2,
    fontSize: RFPercentage(1.6),
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
    marginLeft: RFPercentage(1),
  },
  avatarOuterLayer: {
    width: RFPercentage(7.1),
    height: RFPercentage(8.4),
    borderRadius: RFPercentage(3.5),
    backgroundColor: COLORS.purple,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarMiddleLayer: {
    backgroundColor: COLORS.green2,
    width: RFPercentage(7.1),
    height: RFPercentage(8.4),
    borderRadius: RFPercentage(3.5),
    alignItems: 'center',
    justifyContent: 'center',
    right: RFPercentage(0.3),
  },
  avatarInnerLayer: {
    backgroundColor: COLORS.pink3,
    width: RFPercentage(7.1),
    height: RFPercentage(8.4),
    borderRadius: RFPercentage(3.5),
    alignItems: 'center',
    justifyContent: 'center',
    right: RFPercentage(0.3),
  },
  avatarImage: {
    width: RFPercentage(7.8),
    height: RFPercentage(8.6),
    borderRadius: RFPercentage(3.5),
    right: RFPercentage(0.3),
    bottom: RFPercentage(0.2),
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
