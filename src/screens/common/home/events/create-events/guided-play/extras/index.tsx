import { StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native';
import React, { useState } from 'react';
import {
  COLORS,
  FONTS,
  ICONS,
  IMAGES,
} from '../../../../../../../config/theme';
import { RFPercentage } from 'react-native-responsive-fontsize';
import ToggleSwitch from 'toggle-switch-react-native';
import DropdownField from '../../../../../../../components/DropDown';

const coHosts = [
  {
    id: 1,
    name: 'Emily Carter',
    member: '2 common groups | Birmingham, AL',
    profile: IMAGES.profile1,
  },
  {
    id: 2,
    name: 'James Smith',
    member: 'Member since 4 months',
    profile: IMAGES.profile1,
  },
  {
    id: 3,
    name: 'Emily Carter',
    member: '2 common groups | Birmingham, AL',
    profile: IMAGES.profile1,
  },
  {
    id: 4,
    name: 'James Smith',
    member: 'Member since 4 months',
    profile: IMAGES.profile1,
  },
];

const GuidedPlayExtras = ({
  onAddCoHost,
  selectedContacts,
  removeContact,
}: any) => {
  const [isOn, setIsOn] = useState(false);
  const [isOn2, setIsOn2] = useState(false);
  const [isOn3, setIsOn3] = useState(false);
  const [isOn4, setIsOn4] = useState(false);
  const [remind, setRemind] = useState(null);
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);

  return (
    <View style={styles.container}>
      <View style={styles.fullWidth}>
        {/* Header Section */}
        <View style={styles.sectionHeader}>
          <Text style={styles.eventTitle}>Add-Ons & Extras</Text>
          <Text style={styles.eventSubtitle}>
            Join exciting games, improve your skills, and connect with
            instructors and fellow players.
          </Text>
        </View>

        {/* Toggle Switches */}
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => setIsOn(!isOn)}
          style={styles.toggleRow}
        >
          <Text style={styles.toggleLabel}>
            Make Event Visible To Anyone On TileTime
          </Text>
          <ToggleSwitch
            isOn={isOn}
            onColor={COLORS.pink}
            offColor={COLORS.switch}
            size="small"
            onToggle={() => setIsOn(!isOn)}
          />
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => setIsOn2(!isOn2)}
          style={styles.toggleRow}
        >
          <Text style={styles.toggleLabel}>Enable Event Chat</Text>
          <ToggleSwitch
            isOn={isOn2}
            onColor={COLORS.pink}
            offColor={COLORS.switch}
            size="small"
            onToggle={() => setIsOn2(!isOn2)}
          />
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => setIsOn3(!isOn3)}
          style={styles.toggleRow}
        >
          <Text style={styles.toggleLabel}>Enable reminder</Text>
          <ToggleSwitch
            isOn={isOn3}
            onColor={COLORS.pink}
            offColor={COLORS.switch}
            size="small"
            onToggle={() => setIsOn3(!isOn3)}
          />
        </TouchableOpacity>

        {/* Remind Drop Down */}
        <View style={styles.dropdownWrapper}>
          <DropdownField
            placeholder="Remind Attendees Before"
            data={['1 Hour', '12 Hours', '1 Day']}
            selectedValue={remind}
            onValueChange={(val: any) => setRemind(val)}
            isDropdownVisible={isDropdownVisible}
            setIsDropdownVisible={setIsDropdownVisible}
          />
        </View>

        {/* Co host section */}
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => setIsOn4(!isOn4)}
          style={styles.toggleRow}
        >
          <Text style={styles.toggleLabel}>Include Co-Host</Text>
          <ToggleSwitch
            isOn={isOn4}
            onColor={COLORS.pink}
            offColor={COLORS.switch}
            size="small"
            onToggle={() => setIsOn4(!isOn4)}
          />
        </TouchableOpacity>
        {isOn4 && (
          <>
            {selectedContacts.length > 0 ? (
              <View style={styles.selectedContactsWrapper}>
                {selectedContacts.map((contactId: any) => {
                  const item = coHosts.find(c => c.id === contactId);
                  return (
                    <View style={styles.contactCard}>
                      <View style={styles.contactRow}>
                        <View style={styles.avatarOuterLayer}>
                          <View style={styles.avatarMiddleLayer}>
                            <View style={styles.avatarInnerLayer}>
                              <Image
                                source={item?.profile}
                                resizeMode="cover"
                                style={styles.avatarImage}
                              />
                            </View>
                          </View>
                        </View>
                        <View style={styles.contactTextWrapper}>
                          <Text style={styles.contactName}>{item?.name}</Text>
                          <Text style={styles.contactSubtitle}>
                            Added As Co-host
                          </Text>
                        </View>
                        <TouchableOpacity
                          activeOpacity={0.8}
                          onPress={() => removeContact(contactId)}
                          style={styles.deleteBtn}
                        >
                          <Image
                            source={ICONS.del}
                            resizeMode="contain"
                            style={styles.deleteIcon}
                          />
                        </TouchableOpacity>
                      </View>
                    </View>
                  );
                })}
              </View>
            ) : (
              <View style={styles.emptyCoHostBox}>
                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={onAddCoHost}
                  style={styles.addCoHostBtn}
                >
                  <Text style={styles.addCoHostText}>Add Co-Host</Text>
                </TouchableOpacity>
              </View>
            )}
          </>
        )}
      </View>
    </View>
  );
};

export default GuidedPlayExtras;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  fullWidth: {
    width: '100%',
    alignSelf: 'center',
  },
  sectionHeader: {
    marginTop: RFPercentage(4),
  },
  eventTitle: {
    color: COLORS.primary,
    fontSize: RFPercentage(2.5),
    fontFamily: FONTS.headline,
  },
  eventSubtitle: {
    color: COLORS.lightGrey,
    fontSize: RFPercentage(1.8),
    fontFamily: FONTS.regular,
    marginTop: RFPercentage(2),
    lineHeight: RFPercentage(1.9),
  },
  toggleRow: {
    width: '100%',
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: RFPercentage(4),
  },
  toggleLabel: {
    fontFamily: FONTS.regular,
    color: COLORS.inputColor,
    fontSize: RFPercentage(1.9),
    width: '80%',
    lineHeight: RFPercentage(2.6),
  },
  dropdownWrapper: {
    marginTop: RFPercentage(2),
  },
  selectedContactsWrapper: {
    marginTop: RFPercentage(1),
  },
  contactCard: {
    width: '100%',
    borderRadius: RFPercentage(2.5),
    height: RFPercentage(10),
    borderWidth: RFPercentage(0.1),
    borderColor: COLORS.lightWhite,
    borderBottomWidth: RFPercentage(0.4),
    marginTop: RFPercentage(1),
    justifyContent: 'center',
    borderBottomColor: 'rgba(230, 247, 250, 0.6)',
  },
  contactRow: {
    width: '90%',
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
  },
  contactTextWrapper: {
    marginLeft: RFPercentage(1.6),
  },
  contactName: {
    color: COLORS.primary,
    fontSize: RFPercentage(1.8),
    fontFamily: FONTS.bold,
  },
  contactSubtitle: {
    color: COLORS.grey3,
    fontSize: RFPercentage(1.6),
    fontFamily: FONTS.regular,
    marginTop: RFPercentage(0.8),
  },
  deleteBtn: {
    position: 'absolute',
    right: 0,
  },
  deleteIcon: {
    width: RFPercentage(2),
    height: RFPercentage(2),
  },
  emptyCoHostBox: {
    width: '100%',
    height: RFPercentage(16),
    backgroundColor: COLORS.white,
    borderWidth: RFPercentage(0.1),
    borderColor: COLORS.lightWhite,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: RFPercentage(2),
    marginTop: RFPercentage(3),
  },
  addCoHostBtn: {
    width: RFPercentage(14),
    borderRadius: RFPercentage(2),
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: RFPercentage(0.2),
    borderColor: COLORS.primary,
    height: RFPercentage(4.5),
  },
  addCoHostText: {
    color: COLORS.primary,
    fontFamily: FONTS.semiBold,
    fontSize: RFPercentage(1.7),
    textAlign: 'center',
  },
  avatarOuterLayer: {
    width: RFPercentage(5),
    height: RFPercentage(6),
    borderRadius: RFPercentage(2.1),
    backgroundColor: COLORS.purple,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarMiddleLayer: {
    backgroundColor: COLORS.green2,
    width: RFPercentage(5),
    height: RFPercentage(6),
    borderRadius: RFPercentage(2.1),
    alignItems: 'center',
    justifyContent: 'center',
    right: RFPercentage(0.2),
  },
  avatarInnerLayer: {
    backgroundColor: COLORS.pink3,
    width: RFPercentage(5),
    height: RFPercentage(6),
    borderRadius: RFPercentage(2.1),
    alignItems: 'center',
    justifyContent: 'center',
    right: RFPercentage(0.2),
  },
  avatarImage: {
    width: RFPercentage(5),
    height: RFPercentage(6),
    borderRadius: RFPercentage(2.1),
    right: RFPercentage(0.2),
    bottom: RFPercentage(0.2),
  },
});
