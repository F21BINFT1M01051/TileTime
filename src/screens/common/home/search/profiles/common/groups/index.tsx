import {
  FlatList,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
} from 'react-native';
import React from 'react';
import AuthHeader from '../../../../../../../components/AuthHeader';
import { IMAGES } from '../../../../../../../config/theme';
import { FONTS, COLORS } from '../../../../../../../config/theme';
import { RFPercentage } from 'react-native-responsive-fontsize';

const groups = [
  {
    id: 1,
    name: 'Mahjong - Richie Rich Group',
    profile: IMAGES.profile3,
    members: 'Sophie, Ava and 29 more',
  },
  {
    id: 2,
    name: 'The Tile Society',
    profile: IMAGES.profile3,
    members: 'Sophie, Ava and 29 more',
  },
  {
    id: 3,
    name: 'Mahjong Masters Circle',
    profile: IMAGES.customProfile,
    members: 'Sophie, Ava and 29 more',
  },
  {
    id: 4,
    name: 'The Tile Society',
    profile: IMAGES.profile3,
    members: 'Sophie, Ava and 29 more',
  },
  {
    id: 5,
    name: 'Mahjong Masters Circle',
    profile: IMAGES.customProfile,
    members: 'Sophie, Ava and 29 more',
  },
];

const CommonGroups = ({ navigation }: any) => {
  return (
    <View style={{ backgroundColor: COLORS.white, flex: 1 }}>
      <AuthHeader title="Groups in Common" style={{fontFamily : FONTS.semiBold, fontSize:RFPercentage(2.4)}} />
      <View
        style={{
          width: '90%',
          alignSelf: 'center',
          marginTop: RFPercentage(1),
          flex: 1,
        }}
      >
        <FlatList
          data={groups}
          keyExtractor={item => item.id.toString()}
          renderItem={({ item }) => {
            return (
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() =>
                  navigation.navigate('ChatScreen', {
                    isGroup: true,
                    isNew: false,
                  })
                }
              >
                <View style={styles.contactRow}>
                  <View style={styles.contactLeft}>
                    <View style={styles.contactAvatarWrapper}>
                      <Image
                        source={IMAGES.customProfile}
                        resizeMode="cover"
                        style={styles.contactAvatar}
                      />
                    </View>
                    <View style={styles.contactInfo}>
                      <Text style={styles.contactName}>{item.name}</Text>
                      <Text style={styles.contactMembers}>{item.members}</Text>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            );
          }}
        />
      </View>
    </View>
  );
};

export default CommonGroups;

const styles = StyleSheet.create({
  contactRow: {
    width: '100%',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: RFPercentage(1.8),
    borderBottomWidth: 1,
    borderBottomColor: COLORS.lightWhite,
    paddingBottom: RFPercentage(1.5),
  },
  contactLeft: {
    marginLeft: RFPercentage(1),
    flexDirection: 'row',
    alignItems: 'center',
  },
  contactAvatarWrapper: {
    width: RFPercentage(7),
    height: RFPercentage(7),
    borderTopRightRadius: RFPercentage(100),
    borderTopLeftRadius: RFPercentage(100),
    borderBottomRightRadius: RFPercentage(100),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.yellow,
  },
  contactAvatar: {
    width: RFPercentage(7),
    height: RFPercentage(7),
    borderTopRightRadius: RFPercentage(100),
    borderTopLeftRadius: RFPercentage(100),
    borderBottomRightRadius: RFPercentage(100),
    right: RFPercentage(0.5),
  },
  contactInfo: { marginLeft: RFPercentage(1.5), width: '70%' },
  contactName: {
    fontFamily: FONTS.semiBold,
    color: COLORS.primary,
    fontSize: RFPercentage(2),
  },
  contactMembers: {
    fontFamily: FONTS.regular,
    color: COLORS.lightGrey,
    fontSize: RFPercentage(1.7),
    marginTop: RFPercentage(0.5),
  },
});
