import {
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useState } from 'react';
import { COLORS, FONTS, IMAGES } from '../../../../../../config/theme';
import AuthHeader from '../../../../../../components/AuthHeader';
import { RFPercentage } from 'react-native-responsive-fontsize';
import CustomButton from '../../../../../../components/CustomButton';

const groups = [
  {
    id: '1',
    title: 'Mahjong - Richie Rich Group',
    members: 'Michelle, Samantha and 21 more',
  },
  {
    id: '2',
    title: 'Mahjong - Power Rangers',
    members: 'Michelle, Samantha and 21 more',
  },
  {
    id: '3',
    title: 'Mahjong Masters Circle',
    members: 'Michelle, Samantha and 21 more',
  },
];

const InviteGroup = ({ navigation }: any) => {
  const [selectedGroups, setSelectedGroups] = useState<string[]>([]);

  const toggleGroupSelection = (id: string) => {
    if (selectedGroups.includes(id)) {
      // remove group
      setSelectedGroups(selectedGroups.filter(groupId => groupId !== id));
    } else {
      // add group
      setSelectedGroups([...selectedGroups, id]);
    }
  };

  return (
    <View style={styles.container}>
      <AuthHeader title="Invite a Group" rightText="Save Draft" right={true} />
      <ScrollView>
        <View style={styles.contentContainer}>
          <Text style={styles.headingText}>
            Choose a Group for This Open Play
          </Text>
          <View style={styles.listContainer}>
            <FlatList
              data={groups}
              keyExtractor={item => item.id}
              renderItem={({ item }) => {
                const isSelected = selectedGroups.includes(item.id);
                return (
                  <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={() => toggleGroupSelection(item.id)}
                    style={[
                      styles.groupItem,
                      {
                        borderColor: isSelected
                          ? COLORS.pink
                          : COLORS.lightWhite,
                      },
                    ]}
                  >
                    <View style={styles.groupContent}>
                      <View style={styles.groupLeft}>
                        <View style={styles.avatarContainer}>
                          <Image
                            source={IMAGES.customProfile}
                            resizeMode="cover"
                            style={styles.avatarImage}
                          />
                        </View>
                        <View style={styles.textContainer}>
                          <Text style={styles.groupTitle}>{item.title}</Text>
                          <Text style={styles.groupMembers}>
                            {item.members}
                          </Text>
                        </View>
                      </View>
                      <TouchableOpacity
                        onPress={() => toggleGroupSelection(item.id)}
                        style={[
                          styles.radioButton,
                          {
                            borderColor: isSelected
                              ? COLORS.pink
                              : COLORS.radio,
                            backgroundColor: isSelected
                              ? 'transparent'
                              : COLORS.radio2,
                          },
                        ]}
                      >
                        {isSelected && <View style={styles.radioDot} />}
                      </TouchableOpacity>
                    </View>
                  </TouchableOpacity>
                );
              }}
            />
          </View>
        </View>
      </ScrollView>
      <View style={styles.bottomBar}>
        <View style={styles.bottomContent}>
          <CustomButton
            title="Save And Next"
            onPress={() =>
              navigation.navigate('GuidedPlay', {
                players: false,
                groups: true,
                link: false,
              })
            }
            disabled={selectedGroups.length === 0}
            style={{
              backgroundColor:
                selectedGroups.length > 0 ? COLORS.primary : COLORS.disabled,
            }}
          />
        </View>
      </View>
    </View>
  );
};

export default InviteGroup;

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
    fontSize: RFPercentage(2.5),
  },
  listContainer: {
    marginTop: RFPercentage(1.5),
  },
  groupItem: {
    width: '100%',
    paddingVertical: RFPercentage(1.5),
    borderWidth: RFPercentage(0.1),
    borderRadius: RFPercentage(1.5),
    marginTop: RFPercentage(2.2),
  },
  groupContent: {
    width: '90%',
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  groupLeft: {
    width: '80%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatarContainer: {
    width: RFPercentage(7),
    height: RFPercentage(7),
    backgroundColor: COLORS.yellow,
    borderTopRightRadius: RFPercentage(100),
    borderTopLeftRadius: RFPercentage(100),
    borderBottomRightRadius: RFPercentage(100),
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarImage: {
    width: RFPercentage(7),
    height: RFPercentage(7),
    borderTopRightRadius: RFPercentage(100),
    borderTopLeftRadius: RFPercentage(100),
    borderBottomRightRadius: RFPercentage(100),
    right: RFPercentage(0.4),
  },
  textContainer: {
    marginLeft: RFPercentage(1.5),
  },
  groupTitle: {
    color: COLORS.primary,
    fontSize: RFPercentage(2),
    fontFamily: FONTS.medium,
  },
  groupMembers: {
    color: COLORS.lightGrey,
    fontSize: RFPercentage(1.7),
    fontFamily: FONTS.regular,
    marginTop: RFPercentage(0.8),
  },
  radioButton: {
    width: RFPercentage(2.7),
    height: RFPercentage(2.7),
    borderRadius: RFPercentage(100),
    borderWidth: RFPercentage(0.1),
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioDot: {
    width: RFPercentage(1.9),
    height: RFPercentage(1.9),
    borderRadius: RFPercentage(100),
    backgroundColor: COLORS.pink,
  },
  bottomBar: {
    width: '100%',
    borderTopWidth: RFPercentage(0.1),
    borderTopColor: COLORS.lightWhite,
    position: 'absolute',
    bottom: 0,
    paddingTop: RFPercentage(2),
    paddingBottom: RFPercentage(4),
  },
  bottomContent: {
    width: '90%',
    alignSelf: 'center',
  },
});
