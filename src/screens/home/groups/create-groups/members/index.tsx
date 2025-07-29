import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';
import { COLORS, FONTS, ICONS } from '../../../../../config/theme';
import { RFPercentage } from 'react-native-responsive-fontsize';
import ToggleSwitch from 'toggle-switch-react-native';
import Contacts from './contacts';
import Players from './players';

const Members = () => {
  const [isOn, setIsOn] = useState(false);
  const [activeTab, setActiveTab] = useState('contacts');

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

      <View
        style={{ width: '100%', alignSelf: 'center', alignItems: 'center' }}
      >
        <View
          style={{
            width: '100%',
            backgroundColor: COLORS.white,
            borderWidth: RFPercentage(0.1),
            borderColor: COLORS.lightWhite,
            borderRadius: RFPercentage(2.5),
            height: RFPercentage(6.5),
            marginTop: RFPercentage(4),
            alignItems: 'center',
            flexDirection: 'row',
            justifyContent: 'space-between',
            padding: RFPercentage(0.5),
          }}
        >
          {/* Groups Button */}
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => setActiveTab('players')}
            style={{
              width: '50%',
              backgroundColor:
                activeTab === 'players' ? COLORS.pink : 'transparent',
              alignItems: 'center',
              justifyContent: 'center',
              height: '100%',
              borderRadius: RFPercentage(2),
            }}
          >
            <Text
              style={{
                color: activeTab === 'players' ? COLORS.white : '#82848C',
                fontFamily:
                  activeTab === 'players' ? FONTS.medium : FONTS.regular,
              }}
            >
              All Players
            </Text>
          </TouchableOpacity>

          {/* Chats Button */}
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => setActiveTab('contacts')}
            style={{
              width: '50%',
              backgroundColor:
                activeTab === 'contacts' ? COLORS.pink : 'transparent',
              alignItems: 'center',
              justifyContent: 'center',
              height: '100%',
              borderRadius: RFPercentage(2),
            }}
          >
            <Text
              style={{
                color: activeTab === 'contacts' ? COLORS.white : '#82848C',
                fontFamily:
                  activeTab === 'contacts' ? FONTS.medium : FONTS.regular,
              }}
            >
              Your Contacts
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      {activeTab === 'contacts' ? <Contacts /> : <Players />}
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
    marginTop: RFPercentage(4),
  },
  toggleLabel: {
    textAlign: 'center',
    fontFamily: FONTS.regular,
    color: COLORS.inputColor,
    fontSize: RFPercentage(1.8),
  },
  dropdowns: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: RFPercentage(1),
  },
  editIcon: {
    width: RFPercentage(3.8),
    height: RFPercentage(3.8),
    bottom: RFPercentage(2),
  },
  bioWrapper: {
    marginTop: RFPercentage(3),
  },
  bioContainer: {
    backgroundColor: COLORS.fieldColor,
    borderWidth: RFPercentage(0.1),
    borderColor: COLORS.fieldBorder,
    borderRadius: RFPercentage(1.5),
  },
  bioHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    alignSelf: 'center',
    marginTop: RFPercentage(1),
  },
  bioLabel: {
    fontFamily: FONTS.medium2,
    color: COLORS.primary,
    fontSize: RFPercentage(1.7),
  },
  bioInput: {
    width: '100%',
    alignSelf: 'center',
    textAlignVertical: 'top',
    fontFamily: FONTS.regular,
    color: COLORS.inputColor,
    lineHeight: RFPercentage(2.5),
    fontSize: RFPercentage(1.8),
    height: RFPercentage(12),
    paddingHorizontal: 0,
    paddingVertical: 0,
    top: RFPercentage(2),
  },
});
