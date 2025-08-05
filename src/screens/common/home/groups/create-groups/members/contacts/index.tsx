import {
  FlatList,
  Image,
  ImageBackground,
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

const contacts = [
  { id: 1, name: 'Jamie Anderson', profile: 'JA', phone: '(909) 92288 3355' },
  { id: 2, name: 'Jamie Anderson', profile: 'JA', phone: '(909) 92288 3355' },
  { id: 3, name: 'Jamie Anderson', profile: 'JA', phone: '(909) 92288 3355' },
  { id: 4, name: 'Jamie Anderson', profile: 'JA', phone: '(909) 92288 3355' },
  { id: 5, name: 'Jamie Anderson', profile: 'JA', phone: '(909) 92288 3355' },
  { id: 6, name: 'Jamie Anderson', profile: 'JA', phone: '(909) 92288 3355' },
  { id: 7, name: 'Jamie Anderson', profile: 'JA', phone: '(909) 92288 3355' },
  { id: 8, name: 'Jamie Anderson', profile: 'JA', phone: '(909) 92288 3355' },
];

const Contacts = () => {
  const [enable, setEnable] = useState(false);
  const [selectedContacts, setSelectedContacts] = useState<number[]>([]);
  const [quuery, setQuery] = useState('');

  const toggleContact = (id: number) => {
    setSelectedContacts(prev =>
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id],
    );
  };

  return (
    <ScrollView>
      {enable ? (
        <>
          <View style={{ marginTop: RFPercentage(2.5) }}>
            <SearchField
              placeholder="Search by name"
              value={quuery}
              onChangeText={setQuery}
            />
          </View>
          <Text style={styles.sectionTitle}>YOUR CONTACTS</Text>
          <View>
            <FlatList
              data={contacts}
              keyExtractor={item => item.id.toString()}
              renderItem={({ item }) => {
                const isSelected = selectedContacts.includes(item.id);
                return (
                  <TouchableOpacity activeOpacity={0.8} onPress={() => toggleContact(item.id)}>
                    <View style={styles.contactRow}>
                      <View style={styles.contactInfo}>
                        <View style={styles.avatar}>
                          <Text style={styles.avatarText}>{item.profile}</Text>
                        </View>
                        <View style={styles.nameSection}>
                          <Text style={styles.nameText}>{item.name}</Text>
                          <Text style={styles.phoneText}>{item.phone}</Text>
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
        </>
      ) : (
        <>
          <Text style={styles.sectionTitleDisabled}>YOUR CONTACTS</Text>
          <ImageBackground
            source={IMAGES.contacts}
            resizeMode="contain"
            style={styles.imageBackground}
          >
            <Text style={styles.accessText}>
              {` Enable Access To Your Contacts So You Can Easily Connect, Share Invites, And Message\nYour Friends.`}
            </Text>
          </ImageBackground>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => setEnable(true)}
            style={styles.enableButton}
          >
            <Text style={styles.enableButtonText}>Enable Contact Access</Text>
          </TouchableOpacity>
        </>
      )}
    </ScrollView>
  );
};

export default Contacts;

const styles = StyleSheet.create({
  sectionTitle: {
    color: COLORS.grey5,
    fontFamily: FONTS.medium2,
    fontSize: RFPercentage(1.6),
    letterSpacing: 2,
    marginTop: RFPercentage(2),
  },
  sectionTitleDisabled: {
    color: COLORS.grey5,
    fontFamily: FONTS.medium,
    fontSize: RFPercentage(1.6),
    letterSpacing: 2,
    marginTop: RFPercentage(4),
  },
  imageBackground: {
    width: '100%',
    height: RFPercentage(30),
    alignSelf: 'center',
    justifyContent: 'flex-end',
    marginTop: RFPercentage(1),
  },
  accessText: {
    textAlign: 'center',
    color: COLORS.grey5,
    fontFamily: FONTS.regular,
    fontSize: RFPercentage(1.8),
    bottom: RFPercentage(1),
    lineHeight:RFPercentage(2.7),
  },
  enableButton: {
    height: RFPercentage(5.4),
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: RFPercentage(0.2),
    borderColor: COLORS.primary,
    borderRadius: RFPercentage(2.6),
    alignSelf: 'center',
    paddingHorizontal: RFPercentage(2.5),
    marginTop: RFPercentage(3),
  },
  enableButtonText: {
    color: COLORS.primary,
    fontFamily: FONTS.semiBold,
    fontSize: RFPercentage(1.9),
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
  avatar: {
    width: RFPercentage(6),
    height: RFPercentage(6),
    borderRadius: RFPercentage(100),
    backgroundColor: COLORS.white2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    color: COLORS.PURPLE2,
    fontFamily: FONTS.semiBold,
    fontSize: RFPercentage(2),
  },
  nameSection: {
    marginLeft: RFPercentage(1.6),
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
