import {
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useState } from 'react';
import LinearGradient from 'react-native-linear-gradient';
import TopNavigation from '../../../routers/TopBar';
import { COLORS, FONTS, ICONS, IMAGES } from '../../../config/theme';
import { RFPercentage } from 'react-native-responsive-fontsize';
import CustomButton from '../../../components/CustomButton';

const Groups = ({ navigation }: any) => {
  const [activeTab, setActiveTab] = useState('groups');

  return (
    <LinearGradient colors={['#FFFFFF', '#F7F0E1']} style={{ flex: 1 }}>
      <View>
        <ImageBackground
          source={IMAGES.background}
          resizeMode="cover"
          style={{ width: '100%', height: RFPercentage(35) }}
        >
          <TopNavigation />
          <View
            style={{ width: '90%', alignSelf: 'center', alignItems: 'center' }}
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
                onPress={() => setActiveTab('groups')}
                style={{
                  width: '50%',
                  backgroundColor:
                    activeTab === 'groups' ? COLORS.pink : 'transparent',
                  alignItems: 'center',
                  justifyContent: 'center',
                  height: '100%',
                  borderRadius: RFPercentage(2),
                }}
              >
                <Text
                  style={{
                    color: activeTab === 'groups' ? COLORS.white : '#82848C',
                    fontFamily:
                      activeTab === 'groups' ? FONTS.medium : FONTS.regular,
                  }}
                >
                  Groups
                </Text>
              </TouchableOpacity>

              {/* Chats Button */}
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => setActiveTab('chats')}
                style={{
                  width: '50%',
                  backgroundColor:
                    activeTab === 'chats' ? COLORS.pink : 'transparent',
                  alignItems: 'center',
                  justifyContent: 'center',
                  height: '100%',
                  borderRadius: RFPercentage(2),
                }}
              >
                <Text
                  style={{
                    color: activeTab === 'chats' ? COLORS.white : '#82848C',
                    fontFamily:
                      activeTab === 'chats' ? FONTS.medium : FONTS.regular,
                  }}
                >
                  Chats
                </Text>
              </TouchableOpacity>
            </View>
            <View style={{ marginTop: RFPercentage(3) }}>
              <Text
                style={{
                  color: COLORS.primary,
                  fontFamily: FONTS.headline,
                  fontSize: RFPercentage(3),
                  textAlign: 'center',
                }}
              >
                {`Start a Group and\nInvite Others`}
              </Text>
            </View>
            <View style={{ marginTop: RFPercentage(1) }}>
              <Text
                style={{
                  color: COLORS.primary,
                  fontFamily: FONTS.stylish,
                  fontSize: RFPercentage(2),
                  textAlign: 'center',
                }}
              >
                {`Groups are a great way to connect with others\nwho share your interests.`}
              </Text>
              <Image
                source={ICONS.border}
                resizeMode="contain"
                style={{
                  width: RFPercentage(10),
                  height: RFPercentage(2),
                  alignSelf: 'flex-end',
                  right: RFPercentage(7),
                }}
              />
            </View>
          </View>
        </ImageBackground>
        <View
          style={{
            width: '90%',
            alignSelf: 'center',
            marginTop: RFPercentage(8),
            alignItems: 'center',
          }}
        >
          <Image
            source={IMAGES.group}
            resizeMode="contain"
            style={{ width: RFPercentage(50), height: RFPercentage(30) }}
          />
          <View
            style={{
              width: '100%',
              alignSelf: 'center',
              alignContent: 'center',
              marginTop: RFPercentage(5),
            }}
          >
            <CustomButton
              title="Create Your First Group"
              onPress={() => {
                navigation.navigate('CreateGroup');
              }}
            />
          </View>
        </View>
      </View>
    </LinearGradient>
  );
};

export default Groups;

const styles = StyleSheet.create({});
