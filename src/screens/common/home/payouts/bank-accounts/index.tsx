import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import { COLORS, FONTS, ICONS } from '../../../../../config/theme';
import AuthHeader from '../../../../../components/AuthHeader';
import { RFPercentage } from 'react-native-responsive-fontsize';
import SearchField from '../../../../../components/SearchField';
import AntDesign from 'react-native-vector-icons/AntDesign';

const banks = [
  { id: 1, icon: ICONS.us },
  { id: 2, icon: ICONS.usa },
  { id: 3, icon: ICONS.td },
  { id: 4, icon: ICONS.chase },
  { id: 5, icon: ICONS.america },
  { id: 6, icon: ICONS.us },
  { id: 7, icon: ICONS.usa },
  { id: 8, icon: ICONS.td },
  { id: 9, icon: ICONS.chase },
  { id: 10, icon: ICONS.america },
  { id: 11, icon: ICONS.chase },
  { id: 12, icon: ICONS.america },
];

const BankAccounts = () => {
  return (
    <View style={styles.container}>
      <AuthHeader title="Setup Bank Account" />
      <View style={styles.innerContainer}>
        <Text style={styles.heading}>Select an account for payouts</Text>
        <Text style={styles.subHeading}>
          A payout is the transfer of funds from Stripe to your bank account.
          Link your bank account to seamlessly receive payouts and help us
          better understand your business.
        </Text>

        <View style={styles.searchWrap}>
          <SearchField placeholder="Search your bank" />
        </View>

        <View style={styles.listWrap}>
          <FlatList
            data={banks}
            numColumns={3}
            keyExtractor={item => item.id.toString()}
            scrollEnabled={false}
            columnWrapperStyle={styles.columnWrapper}
            renderItem={({ item }) => {
              return (
                <TouchableOpacity activeOpacity={0.8} style={styles.bankCard}>
                  <Image source={item.icon} resizeMode="contain" style={styles.bankLogo} />
                </TouchableOpacity>
              );
            }}
          />
        </View>

        <TouchableOpacity activeOpacity={0.8} style={styles.manualWrap}>
          <Text style={styles.manualText}>Enter bank details manually instead</Text>
          <AntDesign name="arrowright" size={RFPercentage(1.8)} color={COLORS.primary} style={styles.manualIcon} />
        </TouchableOpacity>

        <TouchableOpacity activeOpacity={0.8} style={styles.nextBtn}>
          <Text style={styles.nextText}>Next</Text>
          <AntDesign name="arrowright" size={RFPercentage(2)} color={COLORS.white} style={styles.nextIcon} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default BankAccounts;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  innerContainer: {
    width: '90%',
    alignSelf: 'center',
  },
  heading: {
    fontFamily: FONTS.bold,
    color: COLORS.primary,
    fontSize: RFPercentage(2.8),
    marginTop: RFPercentage(3),
    lineHeight: RFPercentage(3.5),
  },
  subHeading: {
    fontFamily: FONTS.regular,
    color: COLORS.lightGrey,
    fontSize: RFPercentage(1.9),
    marginTop: RFPercentage(0.8),
    lineHeight: RFPercentage(2.1),
  },
  searchWrap: {
    marginTop: RFPercentage(2),
  },
  listWrap: {
    marginTop: RFPercentage(0.5),
  },
  columnWrapper: {
    gap: RFPercentage(1),
    marginTop: RFPercentage(1),
  },
  bankCard: {
    width: RFPercentage(13),
    height: RFPercentage(8),
    backgroundColor: COLORS.white,
    borderWidth: RFPercentage(0.1),
    borderColor: COLORS.lightWhite,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: RFPercentage(0.5),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: RFPercentage(0.2) },
    shadowOpacity: 0.11,
    shadowRadius: 3.2,
    elevation: 5,
    borderBottomWidth: RFPercentage(0.3),
  },
  bankLogo: {
    width: RFPercentage(9),
    height: RFPercentage(5),
  },
  manualWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: RFPercentage(2),
  },
  manualText: {
    color: COLORS.primary,
    fontFamily: FONTS.semiBold,
    fontSize: RFPercentage(1.7),
  },
  manualIcon: {
    marginLeft: RFPercentage(0.4),
  },
  nextBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: RFPercentage(5),
    justifyContent: 'center',
    width: '100%',
    height: RFPercentage(4.8),
    backgroundColor: COLORS.primary,
    borderRadius: RFPercentage(1),
  },
  nextText: {
    color: COLORS.white,
    fontFamily: FONTS.semiBold,
    fontSize: RFPercentage(1.8),
  },
  nextIcon: {
    marginLeft: RFPercentage(0.4),
  },
});
