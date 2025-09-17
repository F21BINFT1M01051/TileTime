import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Keyboard,
  TouchableWithoutFeedback,
} from 'react-native';
import React, { useState, useEffect } from 'react';
import { COLORS, FONTS, ICONS } from '../../../../../config/theme';
import AuthHeader from '../../../../../components/AuthHeader';
import { RFPercentage } from 'react-native-responsive-fontsize';
import SearchField from '../../../../../components/SearchField';
import AntDesign from 'react-native-vector-icons/AntDesign';

const banks = [
  { id: 1, name: 'Bank of America', icon: ICONS.america },
  { id: 2, name: 'Chase Bank', icon: ICONS.chase },
  { id: 3, name: 'TD Bank', icon: ICONS.td },
  { id: 4, name: 'US Bank', icon: ICONS.us },
  { id: 5, name: 'Wells Fargo', icon: ICONS.usa },
  { id: 6, name: 'Citibank', icon: ICONS.america },
  { id: 7, name: 'TD Bank', icon: ICONS.td },
  { id: 8, name: 'US Bank', icon: ICONS.us },
  { id: 9, name: 'Wells Fargo', icon: ICONS.usa },
  { id: 10, name: 'Bank of America', icon: ICONS.america },
  { id: 11, name: 'Chase Bank', icon: ICONS.chase },
  { id: 12, name: 'TD Bank', icon: ICONS.td },
];

const BankAccounts = () => {
  const [search, setSearch] = useState('');
  const [selectedBank, setSelectedBank] = useState<number | null>(null);
  const [keyboardIsVisible, setKeyboardIsVisible] = useState(false);

  const filteredBanks = banks.filter(bank =>
    bank.name.toLowerCase().includes(search.toLowerCase()),
  );

  useEffect(() => {
    const showSubscription = Keyboard.addListener('keyboardDidShow', () => {
      setKeyboardIsVisible(true);
    });
    const hideSubscription = Keyboard.addListener('keyboardDidHide', () => {
      setKeyboardIsVisible(false);
    });

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
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
            <SearchField
              placeholder="Search your bank"
              value={search}
              onChangeText={setSearch}
            />
          </View>

          <View style={styles.listWrap}>
            <FlatList
              data={filteredBanks}
              keyboardShouldPersistTaps="always"
              numColumns={3}
              keyExtractor={item => item.id.toString()}
              scrollEnabled={false}
              columnWrapperStyle={styles.columnWrapper}
              contentContainerStyle={{ paddingBottom: RFPercentage(1) }}
              renderItem={({ item }) => {
                const isSelected = selectedBank === item.id;
                return (
                  <TouchableOpacity
                    activeOpacity={0.8}
                    style={[
                      styles.bankCard,
                      {
                        borderColor: isSelected
                          ? COLORS.pink
                          : COLORS.lightWhite,
                      },
                    ]}
                    onPress={() => setSelectedBank(item.id)}
                  >
                    <Image
                      source={item.icon}
                      resizeMode="contain"
                      style={styles.bankLogo}
                    />
                  </TouchableOpacity>
                );
              }}
            />
          </View>
          {!keyboardIsVisible && (
            <>
              <TouchableOpacity activeOpacity={0.8} style={styles.manualWrap}>
                <Text style={styles.manualText}>
                  Enter bank details manually instead
                </Text>
                <AntDesign
                  name="arrowright"
                  size={RFPercentage(1.8)}
                  color={COLORS.primary}
                  style={styles.manualIcon}
                />
              </TouchableOpacity>

              <TouchableOpacity activeOpacity={0.8} style={styles.nextBtn}>
                <Text style={styles.nextText}>Next</Text>
                <AntDesign
                  name="arrowright"
                  size={RFPercentage(2)}
                  color={COLORS.white}
                  style={styles.nextIcon}
                />
              </TouchableOpacity>
            </>
          )}
        </View>
      </View>
    </TouchableWithoutFeedback>
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
    width: '31%',
    height: RFPercentage(8),
    backgroundColor: COLORS.white,
    borderWidth: RFPercentage(0.2), // thicker border to show green clearly
    borderColor: COLORS.lightWhite,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: RFPercentage(0.5),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: RFPercentage(0.2) },
    shadowOpacity: 0.11,
    shadowRadius: 3.2,
    elevation: 5,
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
    fontSize: RFPercentage(1.8),
    lineHeight: RFPercentage(1.8),
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
    lineHeight: RFPercentage(1.5),
  },
  nextIcon: {
    marginLeft: RFPercentage(0.4),
  },
});
