import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { COLORS, FONTS, ICONS } from '../../../../../config/theme';
import Nav from '../../../../../components/Nav';
import { RFPercentage } from 'react-native-responsive-fontsize';
import DoubleSwitch from '../../../../../components/DoubleSwitch';
import SettingsButton from '../../../../../components/SettingsButton';
import AdminCard from '../../../../../components/AdminCard';

const GroupSettings = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Nav title="Permissions & Settings" style={styles.navTitle} />
      <View style={styles.contentWrapper}>
        <Text style={styles.sectionTitle}>Members can</Text>
        <View style={styles.subSection}>
          <DoubleSwitch />
          <Text style={styles.description}>
            Turning off these settings means that only group admins can perform this action.
          </Text>
        </View>
        <View style={styles.subSectionSpacing}>
          <Text style={styles.sectionTitle}>Media and Documents</Text>
          <View style={styles.subSection}>
            <SettingsButton
              title="Download to Gallery"
              icon={ICONS.settings}
              switch={true}
            />
            <Text style={styles.lightDescription}>
              Automatically save photos you receive to Gallery.
            </Text>
          </View>
        </View>
        <View style={styles.subSectionSpacing}>
          <AdminCard icon={true} title="Manage Group Admins" subTitle="You and Samantha" />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default GroupSettings;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  navTitle: {
    fontFamily: FONTS.semiBold,
    fontSize: RFPercentage(2.1),
  },
  contentWrapper: {
    width: '90%',
    alignSelf: 'center',
    marginTop: RFPercentage(2),
  },
  sectionTitle: {
    color: COLORS.primary,
    fontFamily: FONTS.semiBold,
    fontSize: RFPercentage(2),
  },
  subSection: {
    marginTop: RFPercentage(1),
  },
  description: {
    fontSize: RFPercentage(1.5),
    color: COLORS.grey4,
    fontFamily: FONTS.regular2,
    marginTop: RFPercentage(0.3),
  },
  lightDescription: {
    fontSize: RFPercentage(1.5),
    color: COLORS.lightGrey,
    fontFamily: FONTS.regular2,
    marginTop: RFPercentage(0.3),
  },
  subSectionSpacing: {
    marginTop: RFPercentage(3),
  },
});
