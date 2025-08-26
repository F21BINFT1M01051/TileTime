import { FlatList, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { COLORS, FONTS, ICONS } from '../../../../config/theme';
import AuthHeader from '../../../../components/AuthHeader';
import { RFPercentage } from 'react-native-responsive-fontsize';
import SettingsButton from '../../../../components/SettingsButton';

const payouts = [
  {
    id: 1,
    name: 'Bank Transfer',
    icon: ICONS.bank,
  },
  {
    id: 2,
    name: 'Paypal',
    icon: ICONS.paypal,
  },
  {
    id: 3,
    name: 'Stripe',
    icon: ICONS.stripe,
  },
];

const Payouts = ({navigation}: any) => {
  return (
    <View style={styles.container}>
      <AuthHeader title="Setup Payouts" right={true} rightIcon={ICONS.cross2} rightIconStyle={{width:RFPercentage(1.5),height:RFPercentage(1.5)}}  onPress2={()=> navigation.goBack()} />
      <View style={styles.innerContainer}>
        <Text style={styles.title}>Choose Your Payout Method</Text>
        <Text style={styles.subtitle}>
          Add a payout method to start hosting events and receiving earnings
          directly.
        </Text>

        <View style={styles.listContainer}>
          <FlatList
            data={payouts}
            keyExtractor={(item) => item.id.toString()}
            scrollEnabled={false}
            renderItem={({ item }) => {
              return (
                <View style={styles.listItem}>
                  <SettingsButton
                    title={item.name}
                    icon={item.icon}
                    style={styles.settingsButton}
                  />
                </View>
              );
            }}
          />
        </View>
      </View>
    </View>
  );
};

export default Payouts;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  innerContainer: {
    width: '90%',
    alignSelf: 'center',
  },
  title: {
    color: COLORS.primary,
    fontFamily: FONTS.headline,
    fontSize: RFPercentage(2.4),
    marginTop: RFPercentage(3.5),
  },
  subtitle: {
    color: COLORS.lightGrey,
    fontFamily: FONTS.regular,
    fontSize: RFPercentage(1.8),
    marginTop: RFPercentage(2),
  },
  listContainer: {
    marginTop: RFPercentage(3),
  },
  listItem: {
    marginTop: RFPercentage(1.7),
  },
  settingsButton: {
    borderBottomWidth: RFPercentage(0.1),
  },
});
