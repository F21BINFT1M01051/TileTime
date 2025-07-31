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
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
      <Nav
        title="Permissions & Settings"
        style={{ fontFamily: FONTS.semiBold, fontSize: RFPercentage(2.1) }}
      />
      <View
        style={{
          width: '90%',
          alignSelf: 'center',
          marginTop: RFPercentage(2),
        }}
      >
        <Text
          style={{
            color: COLORS.primary,
            fontFamily: FONTS.semiBold,
            fontSize: RFPercentage(2),
          }}
        >
          Members can
        </Text>
        <View style={{ marginTop: RFPercentage(1) }}>
          <DoubleSwitch />
          <Text
            style={{
              fontSize: RFPercentage(1.5),
              color: COLORS.grey4,
              fontFamily: FONTS.regular2,
              marginTop: RFPercentage(0.3),
            }}
          >
            Turning off these settings means that only group admins can perform
            this action.
          </Text>
        </View>
        <View style={{ marginTop: RFPercentage(3) }}>
          <Text
            style={{
              color: COLORS.primary,
              fontFamily: FONTS.semiBold,
              fontSize: RFPercentage(2),
            }}
          >
            Media and Documents
          </Text>
          <View style={{ marginTop: RFPercentage(1) }}>
            <SettingsButton
              title="Download to Gallery"
              icon={ICONS.settings}
              switch={true}
            />
            <Text
              style={{
                fontSize: RFPercentage(1.5),
                color: COLORS.lightGrey,
                fontFamily: FONTS.regular2,
                marginTop: RFPercentage(0.3),
              }}
            >
              Automatically save photos you receive to Gallery.
            </Text>
          </View>
        </View>
        <View style={{ marginTop: RFPercentage(3) }}>
          <AdminCard icon={true} title='Manage Group Admins' subTitle='You and Samantha' />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default GroupSettings;

const styles = StyleSheet.create({});
