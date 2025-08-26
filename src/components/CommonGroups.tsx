import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
} from 'react-native';
import React from 'react';
import { COLORS, FONTS, ICONS, IMAGES } from '../config/theme';
import { RFPercentage } from 'react-native-responsive-fontsize';
import AntDesign from 'react-native-vector-icons/AntDesign';

const data = [
  {
    id: 1,
    profile: IMAGES.customProfile,
    name: 'Mahjong - Richie Rich Group',
    members: 'Sophie Reynolds, Ava Brown, You',
  },
  {
    id: 2,
    profile: IMAGES.customProfile,
    name: 'Mahjong - Richie Rich Group',
    members: 'Sophie Reynolds, Ava Brown, You',
  },
  {
    id: 3,
    profile: IMAGES.customProfile,
    name: 'Mahjong - Richie Rich Group',
    members: 'Sophie Reynolds, Ava Brown, You',
  },
];

const future = [
  {
    id: 1,
    profile: IMAGES.customProfile,
    name: 'Four Winds: Community Mahjong Session',
    members: 'August 12, 2025 (in 14 days)',
  },
  {
    id: 2,
    profile: IMAGES.customProfile,
    name: 'Four Winds: Community Mahjong Session',
    members: 'August 12, 2025 (in 14 days)',
  },
  {
    id: 3,
    profile: IMAGES.customProfile,
    name: 'Four Winds: Community Mahjong Session',
    members: 'August 12, 2025 (in 14 days)',
  },
];

const past = [
  {
    id: 1,
    profile: IMAGES.customProfile,
    name: 'Four Winds: Community Mahjong Session',
    members: 'June 10, 2025',
  },
  {
    id: 2,
    profile: IMAGES.customProfile,
    name: 'Four Winds: Community Mahjong Session',
    members: 'June 10, 2025',
  },
  {
    id: 3,
    profile: IMAGES.customProfile,
    name: 'Four Winds: Community Mahjong Session',
    members: 'June 10, 2025',
  },
];

interface Props {
  pastEvents?: boolean;
  futureEvents?: boolean;
}

const CommonGroup = (props: Props) => {
  return (
    <TouchableOpacity activeOpacity={0.8} style={styles.container}>
      <View style={styles.innerWrapper}>
        <View style={styles.headerRow}>
          <Text style={styles.title}>
            {props.futureEvents
              ? `Attending Next`
              : props.pastEvents
              ? `Past Events Attended`
              : `3 Groups in Common`}
          </Text>
          <TouchableOpacity>
         <Image source={ICONS.right} resizeMode='contain' style={{width:RFPercentage(1.5), height:RFPercentage(1.5)}} />
          </TouchableOpacity>
        </View>
        <FlatList
          data={props.futureEvents ? future : props.pastEvents ? past : data}
          keyExtractor={item => item.id.toString()}
          renderItem={({ item, index }) => {
            const isLastItem = index === data.length - 1;
            return (
              <View
                style={[
                  styles.listItem,
                  !isLastItem && styles.listItemBorder,
                ]}
              >
                {props.futureEvents || props.pastEvents ? (
                  <Image
                    source={item.profile}
                    resizeMode="cover"
                    style={styles.smallProfileImage}
                  />
                ) : (
                  <View style={styles.largeGroupIconContainer}>
                    <Image
                      source={item.profile}
                      resizeMode="cover"
                      style={styles.largeGroupIcon}
                    />
                  </View>
                )}

                <View style={styles.listItemTextWrapper}>
                  <Text style={styles.groupName}>{item.name}</Text>
                  <Text style={styles.groupMembers}>{item.members}</Text>
                </View>
              </View>
            );
          }}
        />
      </View>
    </TouchableOpacity>
  );
};

export default CommonGroup;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    borderWidth: RFPercentage(0.1),
    borderBottomWidth: RFPercentage(0.6),
    borderColor: COLORS.lightWhite,
    borderRadius: RFPercentage(1.5),
    paddingVertical: RFPercentage(1.7),
    shadowColor: 'rgba(203, 203, 203, 0.5)',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
    marginTop: RFPercentage(1),
  },
  innerWrapper: {
    width: '90%',
    alignSelf: 'center',
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    color: COLORS.primary,
    fontFamily: FONTS.bold,
    fontSize: RFPercentage(2.42),
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: RFPercentage(1.3),
    marginTop: RFPercentage(3),
  },
  listItemBorder: {
    borderBottomColor: COLORS.lightWhite,
    borderBottomWidth: RFPercentage(0.1),
  },
  smallProfileImage: {
    width: RFPercentage(5),
    height: RFPercentage(5),
    borderRadius: RFPercentage(2),
  },
  largeGroupIconContainer: {
    width: RFPercentage(5),
    height: RFPercentage(5),
    borderRadius: RFPercentage(100),
    backgroundColor: COLORS.yellow,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: RFPercentage(1),
  },
  largeGroupIcon: {
    width: RFPercentage(5),
    height: RFPercentage(5),
    borderTopRightRadius: RFPercentage(100),
    right: RFPercentage(0.5),
    borderTopLeftRadius: RFPercentage(100),
    borderBottomRightRadius: RFPercentage(100),
    borderBottomLeftRadius: RFPercentage(1),
  },
  listItemTextWrapper: {
    marginLeft: RFPercentage(1.5),
    width: '80%',
  },
  groupName: {
    color: COLORS.primary,
    fontFamily: FONTS.medium,
    fontSize: RFPercentage(2),
  },
  groupMembers: {
    fontSize: RFPercentage(1.8),
    color: COLORS.lightGrey,
    fontFamily: FONTS.regular,
    marginTop: RFPercentage(0.7),
  },
});
