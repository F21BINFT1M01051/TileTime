import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';
import { COLORS, FONTS, ICONS } from '../../../config/theme';
import AuthHeader from '../../../components/AuthHeader';
import { RFPercentage } from 'react-native-responsive-fontsize';
import SocialField from '../../../components/SocialField';
import CustomButton from '../../../components/CustomButton';

const PayoutsInstructor = () => {
  const [deleteCard, setDeleteCard] = useState(false);

  return (
    <View style={{ flex: 1, backgroundColor: COLORS.white }}>
      <AuthHeader
        title="Payouts"
        style={{ fontFamily: FONTS.semiBold, fontSize: RFPercentage(1.9) }}
      />
      <View
        style={{
          width: '90%',
          alignSelf: 'center',
          marginTop: RFPercentage(2),
        }}
      >
        {deleteCard ? (
          <>
            <View
              style={{
                width: '80%',
                alignSelf: 'center',
                marginTop: RFPercentage(3),
                justifyContent: 'center',
              }}
            >
              <Text
                style={{
                  textAlign: 'center',
                  fontFamily: FONTS.headline,
                  color: COLORS.primary,
                  fontSize: RFPercentage(3),
                }}
              >
                Get Paid Directly
              </Text>
              <Text
                style={{
                  textAlign: 'center',
                  fontFamily: FONTS.stylish,
                  color: COLORS.primary,
                  fontSize: RFPercentage(2),
                  marginTop: RFPercentage(2),
                }}
              >
                Connect your payout account to start receiving earnings from
                your hosted events and sessions—fast, secure, and fully
                trackable.
              </Text>
              <Image
                source={ICONS.border}
                resizeMode="contain"
                style={{
                  width: RFPercentage(12),
                  height: RFPercentage(5),
                  alignSelf: 'center',
                  bottom: RFPercentage(1),
                }}
              />
            </View>

            <Image
              source={ICONS.payouts}
              resizeMode="contain"
              style={{
                width: RFPercentage(25),
                height: RFPercentage(26),
                alignSelf: 'center',
                marginTop: RFPercentage(4),
              }}
            />
          </>
        ) : (
          <>
            <Text
              style={{
                fontFamily: FONTS.bold,
                color: COLORS.primary,
                fontSize: RFPercentage(1.8),
              }}
            >
              Linked Account
            </Text>
            <View style={{ marginTop: RFPercentage(2) }}>
              <View
                style={{
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
                }}
              >
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Image
                    source={ICONS.stripe}
                    resizeMode="contain"
                    style={{
                      width: RFPercentage(2.8),
                      height: RFPercentage(2.8),
                    }}
                  />
                  <View style={{ marginLeft: RFPercentage(1.8) }}>
                    <Text
                      style={{
                        fontFamily: FONTS.bold,
                        color: COLORS.primary,
                        fontSize: RFPercentage(1.7),
                      }}
                    >
                      Stripe
                    </Text>
                    <Text
                      style={{
                        color: COLORS.grey4,
                        fontFamily: FONTS.regular,
                        fontSize: RFPercentage(1.4),
                        marginTop: RFPercentage(0.2),
                      }}
                    >
                      xxxxxxxx91082
                    </Text>
                  </View>
                </View>
                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={() => setDeleteCard(true)}
                >
                  <Image
                    source={ICONS.del}
                    resizeMode="contain"
                    style={{ width: RFPercentage(2), height: RFPercentage(2) }}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </>
        )}
      </View>
      <View
        style={{
          position: 'absolute',
          width: '100%',
          alignItems: 'center',
          bottom: 0,
          paddingBottom: RFPercentage(4),
          borderTopWidth: deleteCard ? RFPercentage(0.1) : 0,
          borderTopColor: COLORS.lightWhite,
          paddingTop:RFPercentage(2)
        }}
      >
        <View style={{ width: '90%', alignSelf: 'center' }}>
          {deleteCard ? (
            <CustomButton title="Add Payout Account" icon={ICONS.plus} />
          ) : (
            <SocialField
              name="Add Payout Account"
              color={COLORS.primary}
              icon={ICONS.plus5}
              borderColor={COLORS.primary}
              navigation=""
            />
          )}
        </View>
      </View>
    </View>
  );
};

export default PayoutsInstructor;

const styles = StyleSheet.create({});
