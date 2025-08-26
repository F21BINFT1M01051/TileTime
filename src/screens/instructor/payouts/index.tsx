import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';
import { COLORS, FONTS, ICONS } from '../../../config/theme';
import AuthHeader from '../../../components/AuthHeader';
import { RFPercentage } from 'react-native-responsive-fontsize';
import SocialField from '../../../components/SocialField';
import CustomButton from '../../../components/CustomButton';

const PayoutsInstructor = ({ navigation }: any) => {
  const [deleteCard, setDeleteCard] = useState(false);

  return (
    <View style={styles.container}>
      <AuthHeader title="Payouts" style={styles.headerTitle} />
      <View style={styles.mainWrapper}>
        {deleteCard ? (
          <>
            <View style={styles.getPaidWrapper}>
              <Text style={styles.getPaidTitle}>Get Paid Directly</Text>
              <Text style={styles.getPaidDesc}>
                Connect your payout account to start receiving earnings from
                your hosted events and sessions—fast, secure, and fully
                trackable.
              </Text>
              <Image
                source={ICONS.border}
                resizeMode="contain"
                style={styles.borderImg}
              />
            </View>

            <Image
              source={ICONS.payouts}
              resizeMode="contain"
              style={styles.payoutImg}
            />
          </>
        ) : (
          <>
            <Text style={styles.linkedAccountText}>Linked Account</Text>
            <View style={styles.linkedAccountWrapper}>
              <View style={styles.accountContainer}>
                <View style={styles.accountLeft}>
                  <Image
                    source={ICONS.stripe}
                    resizeMode="contain"
                    style={styles.stripeImg}
                  />
                  <View style={styles.accountTextWrapper}>
                    <Text style={styles.accountTitle}>Stripe</Text>
                    <Text style={styles.accountNumber}>xxxxxxxx91082</Text>
                  </View>
                </View>
                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={() => setDeleteCard(true)}
                >
                  <Image
                    source={ICONS.del}
                    resizeMode="contain"
                    style={styles.deleteIcon}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </>
        )}
      </View>
      <View style={[styles.footerWrapper, deleteCard && styles.footerBorder]}>
        <View style={styles.footerInner}>
          {deleteCard ? (
            <CustomButton
              title="Add Payout Account"
              icon={ICONS.plus}
              onPress={() => {
                navigation.navigate('Payouts');
              }}
            />
          ) : (
            <SocialField
              name="Add Payout Account"
              color={COLORS.primary}
              icon={ICONS.plus5}
              borderColor={COLORS.primary}
              onPress={() => {
                navigation.navigate('Payouts');
              }}
            />
          )}
        </View>
      </View>
    </View>
  );
};

export default PayoutsInstructor;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  headerTitle: {
    fontFamily: FONTS.semiBold,
    fontSize: RFPercentage(1.9),
  },
  mainWrapper: {
    width: '90%',
    alignSelf: 'center',
    marginTop: RFPercentage(2),
  },
  getPaidWrapper: {
    width: '95%',
    alignSelf: 'center',
    marginTop: RFPercentage(3),
    justifyContent: 'center',
  },
  getPaidTitle: {
    textAlign: 'center',
    fontFamily: FONTS.headline,
    color: COLORS.primary,
    fontSize: RFPercentage(2.7),
  },
  getPaidDesc: {
    textAlign: 'center',
    fontFamily: FONTS.regular,
    color: COLORS.primary,
    fontSize: RFPercentage(2),
    marginTop: RFPercentage(2),
    lineHeight:RFPercentage(2.2)
  },
  borderImg: {
    width: RFPercentage(12),
    height: RFPercentage(5),
    alignSelf: 'center',
    bottom: RFPercentage(1),
    left:RFPercentage(8)
  },
  payoutImg: {
    width: RFPercentage(25),
    height: RFPercentage(26),
    alignSelf: 'center',
    marginTop: RFPercentage(4),
    right:RFPercentage(1)
  },
  linkedAccountText: {
    fontFamily: FONTS.bold,
    color: COLORS.primary,
    fontSize: RFPercentage(2),
  },
  linkedAccountWrapper: {
    marginTop: RFPercentage(2),
  },
  accountContainer: {
    width: '100%',
    backgroundColor: COLORS.white,
    height: RFPercentage(6),
    borderWidth: RFPercentage(0.1),
    borderColor: COLORS.lightWhite,
    borderRadius: RFPercentage(2.3),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: RFPercentage(2),
  },
  accountLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  stripeImg: {
    width: RFPercentage(2.8),
    height: RFPercentage(2.8),
  },
  accountTextWrapper: {
    marginLeft: RFPercentage(1.8),
  },
  accountTitle: {
    fontFamily: FONTS.bold,
    color: COLORS.primary,
    fontSize: RFPercentage(1.8),
  },
  accountNumber: {
    color: COLORS.grey4,
    fontFamily: FONTS.regular,
    fontSize: RFPercentage(1.5),
    marginTop: RFPercentage(0.2),
  },
  deleteIcon: {
    width: RFPercentage(2),
    height: RFPercentage(2),
  },
  footerWrapper: {
    position: 'absolute',
    width: '100%',
    alignItems: 'center',
    bottom: 0,
    paddingBottom: RFPercentage(4),
    paddingTop: RFPercentage(2),
  },
  footerBorder: {
    borderTopWidth: RFPercentage(0.1),
    borderTopColor: COLORS.lightWhite,
  },
  footerInner: {
    width: '90%',
    alignSelf: 'center',
  },
});
