import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  FlatList,
} from 'react-native';
import React from 'react';
import { COLORS } from '../../../../../../config/theme';
import AuthHeader from '../../../../../../components/AuthHeader';
import { FONTS, ICONS } from '../../../../../../config/theme';
import { RFPercentage } from 'react-native-responsive-fontsize';

const Documents = [
  { id: 1, picture: ICONS.attach, name: 'Rulebook for referecne' },
  { id: 2, picture: ICONS.attach, name: 'Rulebook for referecne' },
  { id: 3, picture: ICONS.attach, name: 'Rulebook for referecne' },
  { id: 4, picture: ICONS.attach, name: 'Rulebook for referecne' },
  { id: 5, picture: ICONS.attach, name: 'Rulebook for referecne' },
  { id: 6, picture: ICONS.attach, name: 'Rulebook for referecne' },
];

const EventAttachments = ({ navigation }: any) => {
  return (
    <View style={{ flex: 1, backgroundColor: COLORS.white }}>
      <AuthHeader
        title="Attachments"
        style={{ fontFamily: FONTS.semiBold, fontSize: RFPercentage(2.1) }}
      />
      <View style={styles.docWrapper}>
        <FlatList
          data={Documents}
          key={'documents'}
          keyExtractor={item => item.id.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity
              activeOpacity={0.8}
              style={styles.fileCard}
              onPress={() => navigation.navigate('DocViewer')}
            >
              <View style={styles.fileRow}>
                <View style={styles.filePreview}>
                  <Image
                    source={ICONS.attach}
                    style={[styles.fileImage, { top: RFPercentage(0.2) }]}
                    resizeMode="contain"
                  />
                </View>
                <View style={styles.fileTextWrapper}>
                  <Text style={styles.fileName}>
                    {item?.name.length > 25
                      ? item.name.slice(0, 25) + `...`
                      : item.name}
                  </Text>
                  <Text style={styles.fileHint}>Tap to View</Text>
                </View>
              </View>
            </TouchableOpacity>
          )}
        />
      </View>
    </View>
  );
};

export default EventAttachments;

const styles = StyleSheet.create({
  docWrapper: {
    marginTop: RFPercentage(2),
    width:"90%",
    alignSelf:"center"
  },
  fileCard: {
    width: '100%',
    borderRadius: RFPercentage(2.5),
    height: RFPercentage(10),
    borderWidth: RFPercentage(0.1),
    borderColor: COLORS.lightWhite,
    marginTop: RFPercentage(1.2),
    justifyContent: 'center',
  },
  fileRow: {
    width: '90%',
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
  },
  filePreview: {
    width: RFPercentage(6),
    height: RFPercentage(7),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.fieldColor,
    borderRadius: RFPercentage(1.2),
  },
  fileImage: {
    width: RFPercentage(5.5),
    height: RFPercentage(6.5),
    borderRadius: RFPercentage(0.8),
  },
  fileTextWrapper: {
    marginLeft: RFPercentage(1.6),
  },
  fileName: {
    color: COLORS.primary,
    fontSize: RFPercentage(2),
    fontFamily: FONTS.semiBold,
  },
  fileHint: {
    color: COLORS.grey3,
    fontSize: RFPercentage(1.8),
    fontFamily: FONTS.regular,
    marginTop: RFPercentage(0.8),
  },
});
