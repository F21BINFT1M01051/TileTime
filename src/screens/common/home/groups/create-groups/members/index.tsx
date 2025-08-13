import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  FlatList,
} from 'react-native';
import React, { useState } from 'react';
import { COLORS, FONTS, IMAGES, ICONS } from '../../../../../../config/theme';
import { RFPercentage } from 'react-native-responsive-fontsize';
import ToggleSwitch from 'toggle-switch-react-native';
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
    name: 'Jamie Anderson',
    profile: IMAGES.profile3,
    common: '2 Groups Common • Montgom..',
    connected: false,
    tileTime: true,
  },
  {
    id: 3,
    name: 'Jamie Anderson',
    profile: IMAGES.customProfile,
    connected: true,
    tileTime: false,
  },
  {
    id: 4,
    name: 'Jamie Anderson',
    profile: null,
    connected: false,
    tileTime: false,
  },
  {
    id: 5,
    name: 'Jamie Anderson',
    profile: IMAGES.profile1,
    common: '2 Groups Common • Montgom..',
    connected: false,
    tileTime: true,
  },
  {
    id: 6,
    name: 'Jamie Anderson',
    profile: IMAGES.profile1,
    common: '2 Groups Common • Montgom..',
    connected: false,
    tileTime: true,
  },
  {
    id: 7,
    name: 'Jamie Anderson',
    profile: IMAGES.profile1,
    common: '2 Groups Common • Montgom..',
    connected: false,
    tileTime: true,
  },
  {
    id: 8,
    name: 'Jamie Anderson',
    profile: IMAGES.profile1,
    common: '2 Groups Common • Montgom..',
    connected: false,
    tileTime: true,
  },

  {
    id: 9,
    name: 'Jamie Anderson',
    profile: IMAGES.profile1,
    common: '2 Groups Common • Montgom..',
    connected: false,
    tileTime: true,
  },
  {
    id: 10,
    name: 'Jamie Anderson',
    profile: IMAGES.profile1,
    common: '2 Groups Common • Montgom..',
    connected: false,
    tileTime: true,
  },
];

const Members = () => {
  const [isOn, setIsOn] = useState(false);
  const [selectedContacts, setSelectedContacts] = useState<number[]>([]);
  const [quuery, setQuery] = useState('');
  const [enable, setEnable] = useState(false);

  const toggleContact = (id: number) => {
    setSelectedContacts(prev =>
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id],
    );
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Invite Members</Text>

      <View style={styles.toggleRow}>
        <Text style={styles.toggleLabel}>Members Can Invite Others</Text>
        <ToggleSwitch
          isOn={isOn}
          onColor={COLORS.pink}
          offColor={COLORS.switch}
          size="small"
          onToggle={() => setIsOn(!isOn)}
        />
      </View>
      <View style={{ marginTop: RFPercentage(4) }}>
        <SearchField
          placeholder="Search Name, Email or Phone Number"
          value={quuery}
          onChangeText={setQuery}
        />
      </View>
      {enable === false && (
        <View
          style={{
            width: '100%',
            alignItems: 'center',
            borderWidth: RFPercentage(0.1),
            borderColor: '#DEDEDE',
            borderRadius: RFPercentage(1.6),
            backgroundColor: COLORS.white,
            height: RFPercentage(29.5),
            marginTop: RFPercentage(3),
          }}
        >
          <Text
            style={{
              color: '#1D211E',
              fontSize: RFPercentage(1.7),
              fontFamily: FONTS.regular,
              textAlign: 'center',
              marginTop: RFPercentage(1.6),
            }}
          >{`Enable Contact Access To Connect,\nInvite, And Message Friends.`}</Text>
          <Image
            source={IMAGES.contacts}
            resizeMode="contain"
            style={{ width: RFPercentage(50), height: RFPercentage(25) }}
          />
          <TouchableOpacity
            activeOpacity={0.8}
            style={styles.enableButton}
            onPress={() => setEnable(true)}
          >
            <Text style={styles.enableButtonText}>Enable Contact Access</Text>
          </TouchableOpacity>
        </View>
      )}

      <View>
        <Text style={styles.sectionTitleDisabled}>SUGGESTED</Text>
      </View>
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
                  {item.connected === false && item.tileTime === true ? (
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
                  ) : item.connected === true && item.tileTime === false ? (
                    <View style={styles.contactInfo}>
                      <View style={{width:RFPercentage(8), height:RFPercentage(8), borderRadius:RFPercentage(100), }}>
                        <Image
                          source={item.profile}
                          resizeMode="cover"
                          style={{width:RFPercentage(8), height:RFPercentage(8), borderRadius:RFPercentage(100),}}
                        />
                        <Image source={ICONS.fb22} resizeMode='contain' style={{width:RFPercentage(4), height:RFPercentage(4), position:"absolute", bottom:RFPercentage(-1), right:RFPercentage(-0.6)}} />
                      </View>
                      <View style={styles.nameSection}>
                        <Text style={styles.nameText}>{item.name}</Text>
                        <Text style={styles.phoneText}>{`Not on TileTime`}</Text>
                      </View>
                    </View>
                  ) : (
                    <View style={styles.contactInfo}>
                      <View style={{width:RFPercentage(8), height:RFPercentage(8), borderRadius:RFPercentage(100),backgroundColor:"#FFFFE1", alignItems:'center', justifyContent:"center" }}>
                        <Text style={{fontFamily:FONTS.semiBold, fontSize:RFPercentage(2.3), color:"#929212"}}>JA</Text>
                        <Image source={ICONS.contact22} resizeMode='contain' style={{width:RFPercentage(4), height:RFPercentage(4), position:"absolute", bottom:RFPercentage(-1), right:RFPercentage(-0.6)}} />
                      </View>
                      <View style={styles.nameSection}>
                        <Text style={styles.nameText}>{item.name}</Text>
                        <Text style={styles.phoneText}>{`Not on TileTime`}</Text>
                      </View>
                    </View>
                  )}

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
  );
};

export default Members;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontFamily: FONTS.headline,
    color: COLORS.primary,
    fontSize: RFPercentage(2.3),
  },
  toggleRow: {
    width: '100%',
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: RFPercentage(3.5),
  },
  toggleLabel: {
    textAlign: 'center',
    fontFamily: FONTS.regular,
    color: COLORS.inputColor,
    fontSize: RFPercentage(1.8),
  },

  tabContainer: {
    width: '100%',
    alignSelf: 'center',
    alignItems: 'center',
  },
  tabWrapper: {
    width: '100%',
    backgroundColor: COLORS.white,
    borderWidth: RFPercentage(0.1),
    borderColor: COLORS.lightWhite,
    borderRadius: RFPercentage(1.8),
    height: RFPercentage(5.5),
    marginTop: RFPercentage(4),
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: RFPercentage(0.5),
  },
  tabButton: {
    width: '50%',
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    borderRadius: RFPercentage(1.5),
  },
  activeTabButton: {
    backgroundColor: COLORS.pink,
  },
  tabButtonText: {
    color: COLORS.grey5,
    fontFamily: FONTS.regular,
    fontSize: RFPercentage(1.8),
  },
  activeTabButtonText: {
    color: COLORS.white,
    fontFamily: FONTS.medium,
  },
  enableButton: {
    height: RFPercentage(5),
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: RFPercentage(0.2),
    borderColor: COLORS.primary,
    borderRadius: RFPercentage(2.2),
    alignSelf: 'center',
    paddingHorizontal: RFPercentage(2.7),
    bottom: RFPercentage(8.5),
  },
  enableButtonText: {
    color: COLORS.primary,
    fontFamily: FONTS.semiBold,
    fontSize: RFPercentage(1.8),
  },
  sectionTitleDisabled: {
    color: COLORS.grey5,
    fontFamily: FONTS.medium,
    fontSize: RFPercentage(1.6),
    letterSpacing: 2,
    marginTop: RFPercentage(4),
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
    width: RFPercentage(6.5),
    height: RFPercentage(7.5),
    borderRadius: RFPercentage(3),
    backgroundColor: COLORS.purple,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarMiddleLayer: {
    backgroundColor: COLORS.green2,
    width: RFPercentage(6.5),
    height: RFPercentage(7.5),
    borderRadius: RFPercentage(3),
    alignItems: 'center',
    justifyContent: 'center',
    right: RFPercentage(0.2),
  },
  avatarInnerLayer: {
    backgroundColor: COLORS.pink3,
    width: RFPercentage(6.5),
    height: RFPercentage(7.5),
    borderRadius: RFPercentage(3),
    alignItems: 'center',
    justifyContent: 'center',
    right: RFPercentage(0.2),
  },
  avatarImage: {
    width: RFPercentage(6.5),
    height: RFPercentage(7.5),
    borderRadius: RFPercentage(3),
    right: RFPercentage(0.2),
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
    marginTop: RFPercentage(0.7),
  },
  checkIcon: {
    width: RFPercentage(3),
    height: RFPercentage(3),
  },
});
