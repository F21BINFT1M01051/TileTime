import {
  FlatList,
  Image,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TouchableWithoutFeedback,
  Modal,
} from 'react-native';
import React, { useState } from 'react';
import { COLORS, FONTS, ICONS, IMAGES } from '../../../config/theme';
import { RFPercentage } from 'react-native-responsive-fontsize';
import SearchField from '../../../components/SearchField';
import SearchCard from '../components/SearchCard';
import CustomButton from '../../../components/CustomButton';

const searchData = [
  {
    id: 1,
    name: 'Emily Johnson',
    location: 'Seattle, WA',
    player: true,
  },

  {
    id: 2,
    name: 'Emily Carter',
    location: 'Seattle, WA',
    instructor: true,
  },
  {
    id: 3,
    name: 'Emily Girls Group',
    member: 21,
    group: true,
  },
];

const PlayerSearch = ({ navigation }: any) => {
  const [modalVisible, setModalVisible] = useState(false); // First modal
  const [modalVisible2, setModalVisible2] = useState(false); // Second (bottom sheet)
  const [selectedGroup, setSelectedGroup] = useState(null); // For dynamic modal content

  const handleCardPress = (item: any) => {
    if (item.group) {
      setSelectedGroup(item);
      setModalVisible(true);
    } else if (item.player) {
      navigation.navigate('PlayerProfile');
    } else {
      navigation.navigate('InstructorProfile');
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: COLORS.white }}>
      <View
        style={{
          marginTop: Platform.OS == 'ios' ? RFPercentage(6) : RFPercentage(5),
          paddingBottom: RFPercentage(1.5),
          borderBottomWidth: RFPercentage(0.1),
          borderBottomColor: '#D8D8D8',
        }}
      >
        <View
          style={{
            width: '90%',
            alignSelf: 'center',
            alignItems: 'center',
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}
        >
          <Text
            style={{
              color: COLORS.primary,
              fontFamily: FONTS.semiBold,
              fontSize: RFPercentage(1.9),
            }}
          >
            Search Players and Groups
          </Text>
          <TouchableOpacity>
            <Image
              source={ICONS.cross}
              tintColor={'#8C8C8C'}
              resizeMode="contain"
              style={{ width: RFPercentage(2.8), height: RFPercentage(2.8) }}
            />
          </TouchableOpacity>
        </View>
      </View>
      <View
        style={{
          width: '90%',
          alignSelf: 'center',
          marginTop: RFPercentage(3),
        }}
      >
        <SearchField placeholder="Search by name" />

        <FlatList
          data={searchData}
          keyExtractor={item => item.id.toString()}
          contentContainerStyle={{ paddingVertical: RFPercentage(2) }}
          renderItem={({ item }) => (
            <SearchCard
              name={item.name}
              isPlayer={item.player}
              location={item.location}
              onPress={() => handleCardPress(item)}
              isInstructor={item.instructor}
              isGroup={item.group}
              members={item.member}
            />
          )}
        />
      </View>

      <Modal
        visible={modalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}
      >
        <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
          <View style={styles.overLay}>
            <TouchableWithoutFeedback>
              <View style={styles.modalContent}>
                <TouchableOpacity
                  onPress={() => setModalVisible(false)}
                  style={styles.closeButton}
                >
                  <Image source={ICONS.cross} style={styles.closeIcon} />
                </TouchableOpacity>

                <View style={styles.largeGroupIconContainer}>
                  <Image
                    source={IMAGES.customProfile}
                    style={styles.largeGroupIcon}
                  />
                </View>

                <Text style={styles.modalText}>Join {selectedGroup?.name}</Text>
                <Text style={styles.modalSubText}>
                  Group - {selectedGroup?.member} Members
                </Text>

                <View style={{ marginTop: RFPercentage(3.5), width: '100%' }}>
                  <CustomButton
                    title="Join Group Now"
                    onPress={() => {
                      setModalVisible(false);
                      setModalVisible2(true);
                    }}
                  />
                </View>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>

      <Modal
        visible={modalVisible2}
        transparent
        animationType="slide"
        onRequestClose={() => setModalVisible2(false)}
      >
        <TouchableWithoutFeedback onPress={() => setModalVisible2(false)}>
          <View style={[styles.overLay, { justifyContent: 'flex-end' }]}>
            <TouchableWithoutFeedback>
              <View style={styles.bottomSheet}>
                <TouchableOpacity
                  onPress={() => setModalVisible2(false)}
                  style={styles.closeButton}
                >
                  <Image source={ICONS.cross} style={styles.closeIcon} />
                </TouchableOpacity>
                <Image
                  source={ICONS.group22}
                  resizeMode="contain"
                  style={{ width: RFPercentage(40), height: RFPercentage(10) }}
                />
                <View style={{ marginTop: RFPercentage(4) }}>
                  <Text
                    style={{
                      fontFamily: FONTS.headline,
                      fontSize: RFPercentage(3),
                      color: COLORS.primary,
                      textAlign: 'center',
                    }}
                  >
                    Emily Girls Group
                  </Text>

                  <Text
                    style={{
                      color: COLORS.primary,
                      fontSize: RFPercentage(1.7),
                      fontFamily: FONTS.medium,
                      textAlign: 'center',
                      marginTop: RFPercentage(1),
                    }}
                  >
                    This Group Is Invite-only
                  </Text>

                  <Image
                    source={ICONS.qoutes}
                    resizeMode="contain"
                    style={{
                      width: RFPercentage(8),
                      height: RFPercentage(4),
                      position: 'absolute',
                      right: RFPercentage(-6.5),
                      top: RFPercentage(1),
                    }}
                  />
                </View>

                <View style={{ marginTop: RFPercentage(3), width: '70%' }}>
                  <Text
                    style={{
                      textAlign: 'center',
                      color: COLORS.lightGrey,
                      fontSize: RFPercentage(1.8),
                      fontFamily: FONTS.regular,
                    }}
                  >
                    Reach out to a member you know for an invite or the group
                    link.
                  </Text>
                </View>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  );
};

export default PlayerSearch;

const styles = StyleSheet.create({
  overLay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: COLORS.white,
    padding: RFPercentage(3.5),
    borderRadius: RFPercentage(2),
    width: '90%',
    alignItems: 'center',
  },
  modalText: {
    fontSize: RFPercentage(1.8),
    fontFamily: FONTS.semiBold,
    color: COLORS.primary,
    marginTop: RFPercentage(2.3),
  },
  largeGroupIconContainer: {
    width: RFPercentage(7.8),
    height: RFPercentage(7.8),
    borderRadius: RFPercentage(100),
    backgroundColor: COLORS.yellow,
    alignItems: 'center',
    justifyContent: 'center',
  },
  largeGroupIcon: {
    width: RFPercentage(7.8),
    height: RFPercentage(7.8),
    borderTopRightRadius: RFPercentage(100),
    right: RFPercentage(0.5),
    borderTopLeftRadius: RFPercentage(100),
    borderBottomRightRadius: RFPercentage(100),
    borderBottomLeftRadius: RFPercentage(1),
  },
  closeButton: {
    position: 'absolute',
    right: RFPercentage(2),
    top: RFPercentage(2),
  },
  closeIcon: {
    width: RFPercentage(3),
    height: RFPercentage(3),
    tintColor: COLORS.lightGrey,
  },
  modalSubText: {
    color: COLORS.lightGrey,
    fontSize: RFPercentage(1.7),
    fontFamily: FONTS.regular,
    marginTop: RFPercentage(0.6),
  },
  bottomSheet: {
    backgroundColor: COLORS.white,
    padding: RFPercentage(3),
    borderTopLeftRadius: RFPercentage(3),
    borderTopRightRadius: RFPercentage(3),
    width: '100%',
    alignItems: 'center',
    paddingVertical: RFPercentage(5),
  },
});
