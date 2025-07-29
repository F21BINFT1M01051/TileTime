import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import React, { useState } from 'react';
import { COLORS, FONTS } from '../../../../config/theme';
import { RFPercentage } from 'react-native-responsive-fontsize';
import ToggleSwitch from 'toggle-switch-react-native';

const experience = [
  {
    id: 1,
    name: 'Beginner-Friendly',
  },
  {
    id: 2,
    name: 'Fast Paced ',
  },
  {
    id: 3,
    name: 'Ender Friendly',
  },
  {
    id: 4,
    name: 'Free',
  },
  {
    id: 5,
    name: 'Paid',
  },
];

const credentials = [
  {
    id: 1,
    name: 'OMM Certified',
  },
  {
    id: 2,
    name: 'MahjongLine Certified ',
  },
  {
    id: 3,
    name: 'Gaming Industry Approved',
  },
];

const ProffessionalInfo = () => {
  const [isOn, setIsOn] = useState(false);
  const [selectedExperience, setSelectedExperience] = useState<number[]>([]);
  const [selectedCredential, setSelectedCredential] = useState<number[]>([]);

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>
        Share your coaching style and experience
      </Text>

      <View style={styles.inputContainer}>
        <Text style={styles.sectionLabel}>Your Experience</Text>

        <View style={styles.tagWrapper}>
          {experience.map(item => {
            const isSelected = selectedExperience.includes(item.id);
            return (
              <TouchableOpacity
                key={item.id}
                activeOpacity={0.8}
                onPress={() => {
                  if (isSelected) {
                    setSelectedExperience(prev =>
                      prev.filter(id => id !== item.id),
                    );
                  } else {
                    setSelectedExperience(prev => [...prev, item.id]);
                  }
                }}
                style={[
                  styles.tagButton,
                  {
                    backgroundColor: isSelected
                      ? COLORS.primary
                      : COLORS.fieldColor,
                  },
                ]}
              >
                <Text
                  style={[
                    styles.tagText,
                    {
                      color: isSelected ? COLORS.white : COLORS.grey3,
                    },
                  ]}
                >
                  {item.name}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        <Text style={[styles.sectionLabel, { marginTop: RFPercentage(3) }]}>
          Credentials
        </Text>

        <View style={styles.tagWrapper}>
          {credentials.map(item => {
            const isSelected = selectedCredential.includes(item.id);
            return (
              <TouchableOpacity
                key={item.id}
                activeOpacity={0.8}
                onPress={() => {
                  if (isSelected) {
                    setSelectedCredential(prev =>
                      prev.filter(id => id !== item.id),
                    );
                  } else {
                    setSelectedCredential(prev => [...prev, item.id]);
                  }
                }}
                style={[
                  styles.tagButton,
                  {
                    backgroundColor: isSelected
                      ? COLORS.primary
                      : COLORS.fieldColor,
                  },
                ]}
              >
                <Text
                  style={[
                    styles.tagText,
                    {
                      color: isSelected ? COLORS.white : COLORS.grey3,
                    },
                  ]}
                >
                  {item.name}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>

      <View style={styles.toggleRow}>
        <Text style={styles.toggleLabel}>Keep My Profile Private</Text>
        <ToggleSwitch
          isOn={isOn}
          onColor={COLORS.pink}
          offColor={COLORS.switch}
          size="small"
          onToggle={() => setIsOn(!isOn)}
        />
      </View>
    </View>
  );
};

export default ProffessionalInfo;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerText: {
    fontFamily: FONTS.headline,
    color: COLORS.primary,
    fontSize: RFPercentage(2.3),
    lineHeight: RFPercentage(2.8),
  },
  inputContainer: {
    marginTop: RFPercentage(4),
  },
  sectionLabel: {
    fontFamily: FONTS.semiBold2,
    color: COLORS.primary,
    fontSize: RFPercentage(1.8),
  },
  tagWrapper: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: RFPercentage(1.8),
    marginTop: RFPercentage(2),
  },
  tagButton: {
    height: RFPercentage(5.6),
    paddingHorizontal: RFPercentage(2.2),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: RFPercentage(100),
  },
  tagText: {
    fontFamily: FONTS.medium,
    fontSize: RFPercentage(1.8),
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
    textAlign: 'center',
    fontFamily: FONTS.medium,
    color: COLORS.inputColor,
    fontSize: RFPercentage(2),
  },
});
