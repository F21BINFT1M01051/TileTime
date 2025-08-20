import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  Image,
  Modal,
  TouchableWithoutFeedback,
  Animated,
  Dimensions,
} from 'react-native';
import React, { useState, useRef } from 'react';
import { COLORS, ICONS, FONTS, IMAGES } from '../../../../config/theme';
import AuthHeader from '../../../../components/AuthHeader';
import { RFPercentage } from 'react-native-responsive-fontsize';
import SearchField from '../../../../components/SearchField';
import { BlurView } from '@react-native-community/blur';
import SocialField from '../../../../components/SocialField';

const { height } = Dimensions.get('window');

const Filters = [
  { id: 1, name: 'All' },
  { id: 2, name: 'Confirmed' },
  { id: 3, name: 'Waitlist' },
  { id: 4, name: 'Canceled' },
];

const attendees = [
  {
    id: 1,
    name: 'Samantha Lewis',
    since: '4 Sep 2021',
    profile: IMAGES.chatProfile,
    status: 'Confirmed',
  },
  {
    id: 2,
    name: 'James Smith',
    since: '4 Sep 2021',
    profile: IMAGES.chatProfile,
    status: 'Canceled',
  },
  {
    id: 3,
    name: 'Sophia Lee',
    since: '4 Sep 2021',
    profile: IMAGES.chatProfile,
    status: 'In Waitlist',
  },
  {
    id: 4,
    name: 'Emily Carter',
    since: '4 Sep 2021',
    profile: IMAGES.chatProfile,
    status: 'Confirmed',
  },
];

const buttons = [
    {
        id : 1,
        name : "Resend Invite",
        icon : ICONS.share22,
        color : COLORS.primary
    },
     {
        id : 2,
        name : "Send Message",
        icon : ICONS.msg,
        color : COLORS.primary
    },
     {
        id : 3,
        name : "Remove Attendee",
        icon : ICONS.trash,
        color : COLORS.red
    },
]

const EventAttendees = () => {
  const [activeFilter, setActiveFilter] = useState('All');
  const [query, setQuery] = useState('');

  const [selectedUser, setSelectedUser] = useState(null);
  const [isModalVisible, setModalVisible] = useState(false);

  const translateY = useRef(new Animated.Value(height)).current; // start hidden below screen

  const openModal = user => {
    setSelectedUser(user);
    setModalVisible(true);
    Animated.timing(translateY, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const closeModal = () => {
    Animated.timing(translateY, {
      toValue: height,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      setModalVisible(false);
      setSelectedUser(null);
    });
  };

  return (
    <View style={{ flex: 1, backgroundColor: COLORS.white }}>
      <AuthHeader
        title="Attendees"
        style={styles.headerTitle}
        right={true}
        rightIcon={ICONS.upload2}
      />
      <View
        style={{
          width: '90%',
          alignSelf: 'center',
          marginTop: RFPercentage(3),
        }}
      >
        <SearchField
          placeholder="Search by name"
          value={query}
          onChangeText={setQuery}
        />
      </View>

      {/* Filters */}
      <View style={styles.filterContainer}>
        <FlatList
          data={Filters}
          keyExtractor={item => item.id.toString()}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: RFPercentage(2) }}
          renderItem={({ item }) => (
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => setActiveFilter(item.name)}
              style={[
                styles.filterButton,
                {
                  backgroundColor:
                    activeFilter === item.name
                      ? COLORS.inputColor
                      : COLORS.fieldColor,
                },
              ]}
            >
              <Text
                style={[
                  styles.filterText,
                  {
                    color:
                      activeFilter === item.name ? COLORS.white : COLORS.grey4,
                  },
                ]}
              >
                {item.name}
              </Text>
            </TouchableOpacity>
          )}
        />
      </View>

      {/* Attendees List */}
      <View
        style={{
          width: '90%',
          alignSelf: 'center',
          marginTop: RFPercentage(2),
        }}
      >
        <FlatList
          data={attendees}
          keyExtractor={item => item.id.toString()}
          renderItem={({ item }) => (
            <View
              style={{
                width: '100%',
                height: RFPercentage(9),
                backgroundColor: COLORS.white,
                borderWidth: RFPercentage(0.1),
                borderColor: COLORS.lightWhite,
                borderRadius: RFPercentage(2),
                justifyContent: 'center',
                marginTop: RFPercentage(2),
              }}
            >
              <View
                style={{
                  width: '90%',
                  alignSelf: 'center',
                  flexDirection: 'row',
                  alignItems: 'center',
                }}
              >
                <View
                  style={{
                    width: RFPercentage(5.5),
                    height: RFPercentage(5.5),
                    borderTopLeftRadius: RFPercentage(100),
                    borderTopRightRadius: RFPercentage(100),
                    backgroundColor: COLORS.pink6,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Image
                    source={IMAGES.chatProfile}
                    resizeMode="contain"
                    style={{
                      width: RFPercentage(5.5),
                      height: RFPercentage(5.5),
                      borderTopLeftRadius: RFPercentage(100),
                      borderTopRightRadius: RFPercentage(100),
                      right: RFPercentage(0.1),
                      bottom: RFPercentage(0.2),
                    }}
                  />
                </View>
                <View style={{ marginLeft: RFPercentage(1.6) }}>
                  <Text
                    style={{
                      color: COLORS.primary,
                      fontFamily: FONTS.medium,
                      fontSize: RFPercentage(1.8),
                    }}
                  >
                    {item.name}
                  </Text>
                  <Text
                    style={{
                      color: COLORS.lightGrey,
                      fontFamily: FONTS.regular,
                      fontSize: RFPercentage(1.5),
                      marginTop: RFPercentage(0.5),
                    }}
                  >
                    {item.status}
                    <Text style={{ fontFamily: FONTS.medium }}>
                      {` `}
                      {item.since}
                    </Text>
                  </Text>
                </View>
                <TouchableOpacity
                  activeOpacity={0.8}
                  style={{ position: 'absolute', right: 0 }}
                  onPress={() => openModal(item)}
                >
                  <Image
                    source={ICONS.dots}
                    resizeMode="contain"
                    style={{ width: RFPercentage(2), height: RFPercentage(2) }}
                  />
                </TouchableOpacity>
              </View>
            </View>
          )}
        />
      </View>

      {/* Custom Animated Bottom Sheet */}
      <Modal transparent visible={isModalVisible} onRequestClose={closeModal}>
        <BlurView
          style={StyleSheet.absoluteFill}
          blurType="dark"
          blurAmount={5}
          reducedTransparencyFallbackColor="black"
        />
        <TouchableWithoutFeedback onPress={closeModal}>
          <View style={{ flex: 1 }}>
            <Animated.View
              style={[styles.bottomSheet, { transform: [{ translateY }] }]}
            >
              <View
                style={{
                  width: '90%',
                  alignSelf: 'center',
                  marginTop: RFPercentage(3),
                }}
              >
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
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
                    Attendee Actions
                  </Text>
                  <TouchableOpacity
                    activeOpacity={0.8}
                    style={{ position: 'absolute', right: 0 }}
                    onPress={() => closeModal()}
                  >
                    <Image
                      source={ICONS.cross2}
                      resizeMode="contain"
                      style={{
                        width: RFPercentage(1.6),
                        height: RFPercentage(1.6),
                      }}
                    />
                  </TouchableOpacity>
                </View>
                {selectedUser && (
                  <>
                    <View
                      style={{ flexDirection: 'row', alignItems: 'center', marginTop:RFPercentage(3) }}
                    >
                      <View
                        style={{
                          width: RFPercentage(10),
                          height: RFPercentage(10),
                          borderTopRightRadius: RFPercentage(100),
                          borderTopLeftRadius: RFPercentage(100),
                          backgroundColor: COLORS.pink6,
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        <Image
                          source={selectedUser?.profile}
                          resizeMode="cover"
                          style={{
                            width: RFPercentage(10),
                            height: RFPercentage(10),
                            borderTopRightRadius: RFPercentage(100),
                            borderTopLeftRadius: RFPercentage(100),
                            bottom:RFPercentage(0.2),
                            right:RFPercentage(0.2)
                          }}
                        />
                      </View>
                      <View style={{marginLeft:RFPercentage(2)}}>
                        <Text style={styles.modalName}>{selectedUser.name}</Text>
                        <TouchableOpacity activeOpacity={0.8}>
                            <Text style={{color:COLORS.pink, fontFamily:FONTS.semiBold, fontSize:RFPercentage(1.7), marginTop:RFPercentage(1)}}>View Profile</Text>
                        </TouchableOpacity>
                      </View>
                    </View>

                 
                  </>
                )}
                <View style={{marginTop:RFPercentage(3)}}>
                    <FlatList data={buttons} keyExtractor={(item)=> item.id.toString()} renderItem={({item})=> {
                        return (
                            <SocialField name={item.name} icon={item.icon} color={item.color} borderColor={item.color} style={{marginTop:RFPercentage(1.5)}} />
                        )
                    }} />
                </View>
              </View>
            </Animated.View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  );
};

export default EventAttendees;

const styles = StyleSheet.create({
  headerTitle: { fontFamily: FONTS.semiBold, fontSize: RFPercentage(2) },
  filterContainer: { width: '100%', alignSelf: 'center' },
  filterButton: {
    height: RFPercentage(4.5),
    paddingHorizontal: RFPercentage(2),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: RFPercentage(2.9),
    marginTop: RFPercentage(3),
    marginRight: RFPercentage(1),
  },
  filterText: { fontFamily: FONTS.medium, fontSize: RFPercentage(1.7) },
  bottomSheet: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    backgroundColor: COLORS.white,
    borderTopLeftRadius: RFPercentage(3),
    borderTopRightRadius: RFPercentage(3),

    minHeight: height * 0.5,
  },
  modalProfile: {
    width: RFPercentage(8),
    height: RFPercentage(8),
    borderRadius: RFPercentage(5),
    marginBottom: RFPercentage(2),
  },
  modalName: {
    fontFamily: FONTS.semiBold,
    fontSize: RFPercentage(2.3),
    color: COLORS.primary,
  },
  modalText: {
    fontFamily: FONTS.regular,
    fontSize: RFPercentage(1.7),
    color: COLORS.grey4,
    marginTop: RFPercentage(0.5),
  },
});
