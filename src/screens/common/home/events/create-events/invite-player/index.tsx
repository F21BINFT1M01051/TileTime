import {
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import { COLORS, FONTS } from '../../../../../../config/theme';
import AuthHeader from '../../../../../../components/AuthHeader';
import { RFPercentage } from 'react-native-responsive-fontsize';
import NextCard from '../../../../../../components/NextCard';
import CustomButton from '../../../../../../components/CustomButton';

const types = [
  {
    id: 1,
    title: 'Invite a Group',
    subTitle:
      'Choose from your existing Mahjong groups. Everyone in the group gets notified and can join directly.',
    navigateTo: 'InviteGroup',
  },
  {
    id: 2,
    title: 'Select Players Manually',
    subTitle:
      'Pick individual players from your contacts or recent games. Great for more curated matchups.',
    navigateTo: 'SelectPlayers',
  },
  {
    id: 3,
    title: 'Generate a Join Link',
    subTitle:
      'Get a unique shareable link. Send it via chat, email, carrier pigeon - your call.',
    navigateTo: 'GuidedPlay',
  },
];

const InvitePlayer = ({ navigation }: any) => {
  return (
    <View style={styles.container}>
      <AuthHeader title="Invite Players" rightText="Save Draft" right={true} />
      <ScrollView>
        <View style={styles.contentContainer}>
          <Text style={styles.headingText}>
          { `How would you like to get\nplayers in?`}
          </Text>
          <View style={styles.listContainer}>
            <FlatList
              data={types}
              keyExtractor={item => item.id.toString()}
              renderItem={({ item }) => {
                return (
                  <NextCard
                    title={item.title}
                    subTitle={item.subTitle}
                    onPress={() => {
                      if (item.navigateTo === 'GuidedPlay') {
                        navigation.navigate('GuidedPlay', {
                          players: false,
                          groups: false,
                          link: true,
                        });
                      } else {
                        navigation.navigate(item.navigateTo);
                      }
                    }}
                  />
                );
              }}
            />
          </View>
        </View>
      </ScrollView>
      <View style={styles.bottomBar}>
        <View style={styles.bottomContent}>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => navigation.goBack()}
            style={styles.backButton}
          >
            <Text style={styles.backButtonText}>Back</Text>
          </TouchableOpacity>
          <CustomButton
            title="Save And Next"
            style={styles.saveButton}
            onPress={() => {}}
          />
        </View>
      </View>
    </View>
  );
};

export default InvitePlayer;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  contentContainer: {
    width: '90%',
    alignSelf: 'center',
    marginTop: RFPercentage(2.5),
  },
  headingText: {
    color: COLORS.primary,
    fontFamily: FONTS.bold,
    fontSize: RFPercentage(2.6),
  },
  listContainer: {
    marginTop: RFPercentage(3),
  },
  bottomBar: {
    width: '100%',
    borderTopWidth: RFPercentage(0.1),
    borderTopColor: COLORS.lightWhite,
    position: 'absolute',
    bottom: 0,
    paddingTop: RFPercentage(2),
    paddingBottom: RFPercentage(4),
    backgroundColor: COLORS.white,
  },
  bottomContent: {
    width: '85%',
    alignSelf: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  backButton: {
    width: RFPercentage(12),
    height: RFPercentage(5.5),
    borderWidth: RFPercentage(0.1),
    borderColor: COLORS.primary,
    borderRadius: RFPercentage(2),
    alignItems: 'center',
    justifyContent: 'center',
  },
  backButtonText: {
    color: COLORS.primary,
    fontSize: RFPercentage(1.9),
    fontFamily: FONTS.bold,
  },
  saveButton: {
    width: RFPercentage(25),
  },
});
