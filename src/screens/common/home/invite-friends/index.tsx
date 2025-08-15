import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  FlatList,
  Modal,
  TouchableWithoutFeedback,
} from 'react-native';
import React, { useState } from 'react';
import { COLORS, FONTS, ICONS, IMAGES } from '../../../../config/theme';
import AuthHeader from '../../../../components/AuthHeader';
import { RFPercentage } from 'react-native-responsive-fontsize';
import SearchField from '../../../../components/SearchField';
import CustomButton from '../../../../components/CustomButton';
import { BlurView } from '@react-native-community/blur';
import { ProgressBar } from 'react-native-paper';

const contacts = [
  { id: 1, name: 'Jamie Anderson', profile: 'JA', phone: '(909) 92288 3355' },
  { id: 2, name: 'Jamie Anderson', profile: 'JA', phone: '(909) 92288 3355' },
  { id: 3, name: 'Jamie Anderson', profile: 'JA', phone: '(909) 92288 3355' },
  { id: 4, name: 'Jamie Anderson', profile: 'JA', phone: '(909) 92288 3355' },
  { id: 5, name: 'Jamie Anderson', profile: 'JA', phone: '(909) 92288 3355' },
  { id: 6, name: 'Jamie Anderson', profile: 'JA', phone: '(909) 92288 3355' },
  { id: 7, name: 'Jamie Anderson', profile: 'JA', phone: '(909) 92288 3355' },
  { id: 8, name: 'Jamie Anderson', profile: 'JA', phone: '(909) 92288 3355' },
];

const invited = [
  { id: 1, name: 'Jamie Anderson', profile: 'JA', phone: '(909) 92288 3355' },
  { id: 2, name: 'Jamie Anderson', profile: 'JA', phone: '(909) 92288 3355' },
  { id: 3, name: 'Jamie Anderson', profile: 'JA', phone: '(909) 92288 3355' },
];

const InviteFriends = () => {
  const [activeTab, ssetActiveTab] = useState('All');
  const [selectedContacts, setSelectedContacts] = useState<number[]>([]);
  const [visible, setVisible] = useState(false);
  const [quuery, setQuery] = useState('');

  const toggleContact = (id: number) => {
    setSelectedContacts(prev =>
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id],
    );
  };

  return (
    <View style={{ flex: 1, backgroundColor: COLORS.white }}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: RFPercentage(2) }}
      >
        <AuthHeader title="Invite Friends" />
        <View style={{ width: '90%', alignSelf: 'center' }}>
          <Text style={styles.title}>Invite friends to join</Text>
          <Text style={styles.subtitle}>
            Bring your friends on board to join games and grow your Mahjong
            community.
          </Text>

          <View style={styles.tabContainer}>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => ssetActiveTab('All')}
              style={[
                styles.tabButton,
                {
                  backgroundColor:
                    activeTab === 'All' ? COLORS.pink : COLORS.white,
                },
              ]}
            >
              <Text
                style={[
                  styles.tabText,
                  {
                    fontFamily:
                      activeTab === 'All' ? FONTS.medium : FONTS.regular,
                    color: activeTab === 'All' ? COLORS.white : COLORS.grey5,
                  },
                ]}
              >
                All
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => ssetActiveTab('Invited')}
              style={[
                styles.tabButton,
                {
                  backgroundColor:
                    activeTab === 'Invited' ? COLORS.pink : COLORS.white,
                },
              ]}
            >
              <Text
                style={[
                  styles.tabText,
                  {
                    fontFamily:
                      activeTab === 'Invited' ? FONTS.medium : FONTS.regular,
                    color:
                      activeTab === 'Invited' ? COLORS.white : COLORS.grey5,
                  },
                ]}
              >
                Invited
              </Text>
            </TouchableOpacity>
          </View>

          <View style={{ marginTop: RFPercentage(3.5) }}>
            <SearchField
              placeholder="Search by name"
              value={quuery}
              onChangeText={setQuery}
            />
          </View>
          <View>
            <Text style={styles.sectionTitleDisabled}>YOUR CONTACTS</Text>
            {activeTab === 'All' ? (
              <FlatList
                data={contacts}
                keyExtractor={item => item.id.toString()}
                renderItem={({ item }) => {
                  const isSelected = selectedContacts.includes(item.id);
                  return (
                    <TouchableOpacity
                      activeOpacity={0.8}
                      onPress={() => toggleContact(item.id)}
                    >
                      <View style={styles.contactRow}>
                        <View style={styles.contactInfo}>
                          <View style={styles.avatar}>
                            <Text style={styles.avatarText}>
                              {item.profile}
                            </Text>
                          </View>
                          <View style={styles.nameSection}>
                            <Text style={styles.nameText}>{item.name}</Text>
                            <Text style={styles.phoneText}>{item.phone}</Text>
                          </View>
                        </View>
                        <TouchableOpacity
                          onPress={() => toggleContact(item.id)}
                        >
                          <Image
                            resizeMode="contain"
                            source={isSelected ? ICONS.checked : ICONS.uncheck}
                            style={styles.checkIcon}
                          />
                        </TouchableOpacity>
                      </View>
                    </TouchableOpacity>
                  );
                }}
              />
            ) : (
              <FlatList
                data={invited}
                keyExtractor={item => item.id.toString()}
                renderItem={({ item }) => {
                  return (
                    <View>
                      <View style={styles.contactRow}>
                        <View style={styles.contactInfo}>
                          <View style={styles.avatar}>
                            <Text style={styles.avatarText}>
                              {item.profile}
                            </Text>
                          </View>
                          <View style={styles.nameSection}>
                            <Text style={styles.nameText}>{item.name}</Text>
                            <Text style={styles.phoneText}>{item.phone}</Text>
                          </View>
                        </View>
                      </View>
                    </View>
                  );
                }}
              />
            )}
          </View>
        </View>
      </ScrollView>
      <View style={styles.bottomBar}>
        <View style={{ width: '90%', alignSelf: 'center' }}>
          <CustomButton
            title={
              activeTab === 'All'
                ? `Invite ${selectedContacts.length} People`
                : 'Resend Invites'
            }
            onPress={() => {
              if (activeTab === 'All' && selectedContacts.length > 0) {
                setVisible(true);
              }
            }}
          />
        </View>
      </View>

      {/* Modal */}
      <Modal
        animationType="fade"
        transparent
        visible={visible}
        onRequestClose={() => setVisible(false)}
      >
        <BlurView
          style={StyleSheet.absoluteFill}
          blurType="dark"
          blurAmount={5}
          reducedTransparencyFallbackColor="white"
        />
        <TouchableWithoutFeedback onPress={() => setVisible(false)}>
          <View style={styles.modalWrapper}>
            <View style={styles.modalContent}>
              <Image
                source={IMAGES.logo}
                resizeMode="contain"
                style={{ width: RFPercentage(8), height: RFPercentage(8) }}
              />
              <ProgressBar
                progress={0.7}
                color={COLORS.green}
                style={styles.progress}
                animatedValue={0.7}
              />

              <Text style={styles.head}>Sending Your Invites...</Text>
              <Text style={styles.sub}>
                Sit tight while we notify your friends. You’ll be redirected
                shortly.
              </Text>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  );
};

export default InviteFriends;

const styles = StyleSheet.create({
  title: {
    color: COLORS.primary,
    fontSize: RFPercentage(2.3),
    fontFamily: FONTS.headline,
    marginTop: RFPercentage(3),
  },
  subtitle: {
    color: COLORS.lightGrey,
    fontFamily: FONTS.regular,
    fontSize: RFPercentage(1.6),
    marginTop: RFPercentage(2),
  },
  tabContainer: {
    width: '100%',
    height: RFPercentage(5),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: COLORS.white,
    borderWidth: RFPercentage(0.1),
    borderColor: COLORS.fieldBorder,
    borderRadius: RFPercentage(1.8),
    marginTop: RFPercentage(4),
    paddingHorizontal: RFPercentage(0.5),
  },
  tabButton: {
    width: '49%',
    height: RFPercentage(4.2),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: RFPercentage(1.5),
  },
  tabText: {
    fontSize: RFPercentage(1.8),
  },
  sectionTitleDisabled: {
    color: COLORS.grey5,
    fontFamily: FONTS.regular,
    fontSize: RFPercentage(1.4),
    letterSpacing: 2,
    marginTop: RFPercentage(3),
  },
  contactRow: {
    width: '100%',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: RFPercentage(2.5),
  },
  contactInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: RFPercentage(6),
    height: RFPercentage(6),
    borderRadius: RFPercentage(100),
    backgroundColor: COLORS.white2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    color: COLORS.PURPLE2,
    fontFamily: FONTS.semiBold,
    fontSize: RFPercentage(2),
  },
  nameSection: {
    marginLeft: RFPercentage(1.6),
  },
  nameText: {
    color: COLORS.primary,
    fontFamily: FONTS.semiBold,
    fontSize: RFPercentage(2),
  },
  phoneText: {
    color: COLORS.lightGrey,
    fontFamily: FONTS.regular,
    fontSize: RFPercentage(1.7),
    marginTop: RFPercentage(0.4),
  },
  checkIcon: {
    width: RFPercentage(3),
    height: RFPercentage(3),
  },
  bottomBar: {
    width: '100%',
    paddingTop: RFPercentage(2),
    paddingBottom: RFPercentage(4),
    borderTopWidth: RFPercentage(0.1),
    borderTopColor: COLORS.lightWhite,
  },
  modalWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '80%',
    backgroundColor: COLORS.white,
    alignItems: 'center',
    borderRadius: RFPercentage(1.5),
    padding: RFPercentage(3),
    paddingTop: RFPercentage(1.4),
  },
  progress: {
    width: RFPercentage(10),
    height: RFPercentage(0.6),
    borderRadius: RFPercentage(100),
    marginTop: RFPercentage(2.5),
    backgroundColor: COLORS.fieldColor, // unfilled part color
  },
  head: {
    color: COLORS.primary,
    fontFamily: FONTS.semiBold,
    fontSize: RFPercentage(1.7),
    marginTop: RFPercentage(2),
  },
  sub: {
    textAlign: 'center',
    color: COLORS.grey4,
    fontSize: RFPercentage(1.5),
    fontFamily: FONTS.regular,
    marginTop: RFPercentage(1),
    marginHorizontal: RFPercentage(3),
  },
});
