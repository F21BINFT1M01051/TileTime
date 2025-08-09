import { FlatList, StyleSheet, View } from 'react-native';
import React from 'react';
import { COLORS, FONTS, IMAGES } from '../../../../../../config/theme';
import Nav from '../../../../../../components/Nav';
import { RFPercentage } from 'react-native-responsive-fontsize';
import AdminCard from '../../../../../../components/AdminCard';
import SearchField from '../../../../../../components/SearchField';
import CustomButton from '../../../../../../components/CustomButton';

const admins = [
  {
    id: 1,
    name: 'Samantha Lewis (You)',
    since: '4 Sep 2021',
    profile: IMAGES.profile,
    you: true,
  },
  {
    id: 2,
    name: 'James Smith',
    since: '4 Sep 2021',
    profile: IMAGES.profile,
  },
  {
    id: 3,
    name: 'Sophia Lee',
    since: '4 Sep 2021',
    profile: IMAGES.profile,
  },
  {
    id: 4,
    name: 'Emily Carter',
    since: '4 Sep 2021',
    profile: IMAGES.profile,
  },
];

const GroupAdmins = () => {
  return (
    <View style={styles.container}>
      <Nav title="Group Admins" style={styles.navTitle} />
      <View style={styles.contentWrapper}>
        <SearchField placeholder="Search by name" />
        <View style={styles.subSectionSpacing}>
          <FlatList
            data={admins}
            keyExtractor={item => item.id.toString()}
            contentContainerStyle={{ paddingBottom: RFPercentage(1) }}
            renderItem={({ item }) => {
              return (
                <View style={{ marginTop: RFPercentage(2) }}>
                  <AdminCard
                    title={item.name}
                    subTitle={item.since}
                    admin={true}
                    self={item.you}
                    profile
                    userId={item.id}
                    visibleTooltipId={null}
                    setVisibleTooltipId={() => {}}
                  />
                </View>
              );
            }}
          />
        </View>
      </View>
      <View style={styles.bottomWrapper}>
        <View style={styles.buttonContainer}>
          <CustomButton title="Save" onPress={() => {}} />
        </View>
      </View>
    </View>
  );
};

export default GroupAdmins;

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
    marginTop: RFPercentage(3),
    flex: 1,
  },
  sectionTitle: {
    color: COLORS.primary,
    fontFamily: FONTS.semiBold,
    fontSize: RFPercentage(2),
  },
  subSection: {},
  description: {
    fontSize: RFPercentage(1.5),
    color: COLORS.grey4,
    fontFamily: FONTS.regular2,
    marginTop: RFPercentage(0.8),
  },
  lightDescription: {
    fontSize: RFPercentage(1.5),
    color: COLORS.lightGrey,
    fontFamily: FONTS.regular2,
    marginTop: RFPercentage(0.6),
  },
  subSectionSpacing: {
    marginTop: RFPercentage(1),
  },
  bottomWrapper: {
    width: '100%',
    paddingVertical: RFPercentage(2),
    borderTopWidth: 1,
    borderTopColor: COLORS.lightWhite,
    backgroundColor: COLORS.white,
    paddingBottom:RFPercentage(4)
  },
  buttonContainer: {
    width: '90%',
    alignSelf: 'center',
  },
});
