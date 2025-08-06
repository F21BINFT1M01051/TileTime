import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import React, { useState } from 'react';
import { COLORS, FONTS } from '../../../../../config/theme';
import { RFPercentage } from 'react-native-responsive-fontsize';
import Search from '../../../../../components/SearchExperience';

const ProffessionalInfo = () => {
  const [Experience, setExperience] = useState('');
  const [Credential, setCredential] = useState('');

  return (
    <TouchableWithoutFeedback>
      <View style={styles.container}>
        <Text style={styles.headerText}>
          Share your coaching style and experience
        </Text>

        <View style={styles.inputContainer}>
          <Text style={styles.sectionLabel}>Your Experience</Text>
          <View style={{ marginTop: RFPercentage(1.5) }}>
            <Search
              placeholder="Search And Add Experience"
              value={Experience}
              onChangeText={setExperience}
              data={[
                'Beginner-Friendly',
                'Fast Paced',
                'Ender Friendly',
                'Free',
              ]}
            />
          </View>

          <Text style={[styles.sectionLabel, { marginTop: RFPercentage(3) }]}>
            Credentials
          </Text>
          <View style={{ marginTop: RFPercentage(1.5) }}>
            <Search
              placeholder="Search And Add Credentials"
              value={Credential}
              onChangeText={setCredential}
              data={[
                'OMM Certified',
                'MahjongLine Certified',
                'Gaming Industry Approved',
              ]}
            />
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
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
    fontFamily: FONTS.regular,
    color: COLORS.primary,
    fontSize: RFPercentage(1.6),
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
});
