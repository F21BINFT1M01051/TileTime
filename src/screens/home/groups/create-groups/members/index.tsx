import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';
import { COLORS, FONTS } from '../../../../../config/theme';
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

      <View style={styles.tabContainer}>
        <View style={styles.tabWrapper}>
          {/* Groups Button */}
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => setActiveTab('players')}
            style={[
              styles.tabButton,
              activeTab === 'players' && styles.activeTabButton,
            ]}
          >
            <Text
              style={[
                styles.tabButtonText,
                activeTab === 'players' && styles.activeTabButtonText,
              ]}
            >
              All Players
            </Text>
          </TouchableOpacity>

          {/* Chats Button */}
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => setActiveTab('contacts')}
            style={[
              styles.tabButton,
              activeTab === 'contacts' && styles.activeTabButton,
            ]}
          >
            <Text
              style={[
                styles.tabButtonText,
                activeTab === 'contacts' && styles.activeTabButtonText,
              ]}
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
    borderRadius: RFPercentage(2.5),
    height: RFPercentage(6.5),
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
    borderRadius: RFPercentage(2),
  },
  activeTabButton: {
    backgroundColor: COLORS.pink,
  },
  tabButtonText: {
    color: COLORS.grey5,
    fontFamily: FONTS.regular,
  },
  activeTabButtonText: {
    color: COLORS.white,
    fontFamily: FONTS.medium,
  },
});
