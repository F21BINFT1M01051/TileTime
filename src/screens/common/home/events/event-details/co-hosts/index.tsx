import {
  FlatList,
  StyleSheet,
  View,
  Text,
  TouchableWithoutFeedback,
  Keyboard,
  Modal,
  TouchableOpacity,
} from 'react-native';
import React, { useState, useMemo } from 'react';
import { COLORS, FONTS, IMAGES } from '../../../../../../config/theme';
import Nav from '../../../../../../components/Nav';
import { RFPercentage } from 'react-native-responsive-fontsize';
import AdminCard from '../../../../../../components/AdminCard';
import SearchField from '../../../../../../components/SearchField';
import { BlurView } from '@react-native-community/blur';

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

const EventCoHosts = ({ navigation }: any) => {
  const [visibleTooltipId, setVisibleTooltipId] = useState(null);
  const [query, setQuery] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedAdmin, setSelectedAdmin] = useState(null);

  const dismissAll = () => {
    Keyboard.dismiss();
    setVisibleTooltipId(null);
  };

  const filteredAdmins = useMemo(() => {
    if (!query.trim()) return admins;
    return admins.filter(item =>
      item.name.toLowerCase().includes(query.toLowerCase()),
    );
  }, [query]);

  return (
    <TouchableWithoutFeedback onPress={dismissAll}>
      <View style={{ flex: 1 }}>
        <View style={styles.container}>
          <Nav
            title="Co - Hosts"
            style={styles.navTitle}
            onPress={() => navigation.goBack()}
          />
          <View style={styles.contentWrapper}>
            <SearchField
              placeholder="Search by name"
              value={query}
              onChangeText={setQuery}
            />
            <View style={styles.subSectionSpacing}>
              <FlatList
                data={filteredAdmins}
                keyExtractor={item => item.id.toString()}
                keyboardShouldPersistTaps="always"
                contentContainerStyle={{ paddingBottom: RFPercentage(1) }}
                ListEmptyComponent={
                  <Text
                    style={{
                      textAlign: 'center',
                      marginTop: RFPercentage(5),
                      color: COLORS.grey4,
                      fontFamily: FONTS.regular,
                      fontSize: RFPercentage(1.8),
                    }}
                  >
                    No Co-Host found
                  </Text>
                }
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
                        visibleTooltipId={visibleTooltipId}
                        setVisibleTooltipId={setVisibleTooltipId}
                        onRemove={() => {
                          setSelectedAdmin(item);
                          setModalVisible(true);
                        }}
                        event={true}
                      />
                    </View>
                  );
                }}
              />
            </View>
          </View>
        </View>
        <Modal
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
          animationType="fade"
          transparent
        >
          <BlurView
            style={StyleSheet.absoluteFill}
            blurType="dark"
            blurAmount={5}
            reducedTransparencyFallbackColor="white"
          />
          <TouchableWithoutFeedback>
            <View
              style={{
                position: 'absolute',
                bottom: RFPercentage(5),
                width: '90%',
                alignSelf: 'center',
              }}
            >
              <View
                style={{
                  width: '100%',
                  height: RFPercentage(12),
                  borderRadius: RFPercentage(2.5),
                  backgroundColor: COLORS.white,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Text
                  style={{
                    color: COLORS.primary,
                    fontFamily: FONTS.regular,
                    textAlign: 'center',
                    fontSize: RFPercentage(1.9),
                  }}
                >
                  Remove {selectedAdmin?.name} from event?
                </Text>
                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={() => setModalVisible(false)}
                >
                  <Text
                    style={{
                      color: COLORS.red,
                      fontFamily: FONTS.semiBold,
                      textAlign: 'center',
                      fontSize: RFPercentage(2),
                      marginTop: RFPercentage(2.7),
                    }}
                  >
                    Remove
                  </Text>
                </TouchableOpacity>
              </View>
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => setModalVisible(false)}
                style={{
                  width: '100%',
                  height: RFPercentage(6),
                  alignItems: 'center',
                  justifyContent: 'center',

                  backgroundColor: COLORS.white,
                  borderRadius: RFPercentage(2),
                  marginTop: RFPercentage(2),
                }}
              >
                <Text
                  style={{
                    color: COLORS.primary,
                    fontFamily: FONTS.bold,
                    textAlign: 'center',
                    fontSize: RFPercentage(2),
                  }}
                >
                  Cancel
                </Text>
              </TouchableOpacity>
            </View>
          </TouchableWithoutFeedback>
        </Modal>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default EventCoHosts;

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
    flex: 1,
  },
  bottomWrapper: {
    width: '100%',
    paddingVertical: RFPercentage(2),
    borderTopWidth: 1,
    borderTopColor: COLORS.lightWhite,
    backgroundColor: COLORS.white,
    paddingBottom: RFPercentage(4),
  },
  buttonContainer: {
    width: '90%',
    alignSelf: 'center',
  },
});
