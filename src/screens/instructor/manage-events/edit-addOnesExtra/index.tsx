import {
  StyleSheet,
  Image,
  View,
  Platform,
  ScrollView,
  TouchableOpacity,
  Text,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import React, { useState } from 'react';
import { COLORS, FONTS, ICONS, IMAGES } from '../../../../config/theme';
import AuthHeader from '../../../../components/AuthHeader';
import { RFPercentage } from 'react-native-responsive-fontsize';
import CustomButton from '../../../../components/CustomButton';
import ToggleSwitch from 'toggle-switch-react-native';

const coHosts = [
  {
    id: 1,
    name: 'John Doe',
    profile: IMAGES.profile1,
  },
  {
    id: 2,
    name: 'Jane Smith',
    profile: IMAGES.profile1,
  },
  {
    id: 3,
    name: 'Alex Johnson',
    profile: IMAGES.profile1,
  },
];

const EditAddOneExtra = () => {
  const [isOn2, setIsOn2] = useState(true);
  const [isOn3, setIsOn3] = useState(true);
  const [isOn4, setIsOn4] = useState(false);
  const [isOn5, setIsOn5] = useState(true);
  const [selectedContacts, setSelectedContacts] = useState([1, 2]);

  const removeContact = (id: any) => {
    setSelectedContacts(prev => prev.filter(item => item !== id));
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={{ flex: 1, backgroundColor: COLORS.white }}>
        <AuthHeader
          title="Edit Add ons and Extra"
          style={{ fontFamily: FONTS.semiBold, fontSize: RFPercentage(2) }}
        />
        <ScrollView
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="always"
        >
          <View style={{ width: '90%', alignSelf: 'center' }}>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => setIsOn2(!isOn2)}
              style={styles.toggleRow}
            >
              <Text style={styles.toggleLabel}>
            Make Event Visible To Anyone On TileTime
              </Text>
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
              <Text style={styles.toggleLabel}>Enable Event Chat</Text>
              <ToggleSwitch
                isOn={isOn3}
                onColor={COLORS.pink}
                offColor={COLORS.switch}
                size="small"
                onToggle={() => setIsOn3(!isOn3)}
              />
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => setIsOn4(!isOn4)}
              style={styles.toggleRow}
            >
              <Text style={styles.toggleLabel}>Enable Reminder</Text>
              <ToggleSwitch
                isOn={isOn4}
                onColor={COLORS.pink}
                offColor={COLORS.switch}
                size="small"
                onToggle={() => setIsOn4(!isOn4)}
              />
            </TouchableOpacity>

            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => setIsOn5(!isOn5)}
              style={styles.toggleRow}
            >
              <Text style={styles.toggleLabel}>Include Co-Host</Text>
              <ToggleSwitch
                isOn={isOn5}
                onColor={COLORS.pink}
                offColor={COLORS.switch}
                size="small"
                onToggle={() => setIsOn5(!isOn5)}
              />
            </TouchableOpacity>
            {isOn5 && (
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
                            Added As Co-Host
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
            )}
          </View>
        </ScrollView>
        <View style={styles.bottomBar}>
          <View style={styles.bottomContent}>
            <CustomButton title="Save" onPress={() => {}} />
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default EditAddOneExtra;

const styles = StyleSheet.create({
  locationIcon: {
    width: RFPercentage(2.5),
    height: RFPercentage(2.5),
  },
  dateIcon: {
    width: RFPercentage(2),
    height: RFPercentage(2),
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
    width: '90%',
    alignSelf: 'center',
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
    fontSize: RFPercentage(2),
    width:"80%",
    lineHeight:RFPercentage(2.1)
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
