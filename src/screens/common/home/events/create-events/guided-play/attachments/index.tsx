import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  FlatList,
  Linking,
  Platform,
} from 'react-native';
import {
  pick,
  keepLocalCopy,
  isKnownType,
} from '@react-native-documents/picker';
import { COLORS, FONTS, ICONS } from '../../../../../../../config/theme';
import { RFPercentage } from 'react-native-responsive-fontsize';
import { useNavigation } from '@react-navigation/native';

const GuidedPlayAttachments = () => {
  const [attachments, setAttachments] = useState([]);
  const navigation = useNavigation();

  const pickDocument = async () => {
    try {
      const result = await pick();
      if (!result) return;
      const files = Array.isArray(result) ? result : [result];
      const processedFiles = files.map(file => ({
        ...file,
        fileCopyUri: file.uri,
        type: file.type || 'application/octet-stream',
      }));
      setAttachments(prev => [...prev, ...processedFiles]);
    } catch (err) {
      if (err?.message?.includes('cancelled')) {
      } else {
        console.log('Error picking document: ', err);
      }
    }
  };

  const getFileType = file => {
    if (!file || !file.type) return 'unknown';

    const type = file.type.toLowerCase();

    if (type.includes('image/')) return 'image';
    if (type.includes('pdf')) return 'pdf';
    if (type.includes('word') || type.includes('document')) return 'document';
    if (type.includes('sheet') || type.includes('excel')) return 'spreadsheet';

    return 'other';
  };

  const removeAttachment = index => {
    setAttachments(prev => prev.filter((_, i) => i !== index));
  };

  const viewAttachment = item => {
    const fileUri = item.fileCopyUri || item.uri;
    if (fileUri) {
      Linking.openURL(fileUri).catch(err =>
        console.log('Failed to open file:', err),
      );
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.innerWrapper}>
        <View style={styles.sectionHeader}>
          <Text style={styles.eventTitle}>Attachments & Materials</Text>
          <Text style={styles.eventSubtitle}>
            Upload helpful resources or game materials.
          </Text>
        </View>

        {attachments.length > 0 ? (
          <View>
            <FlatList
              data={attachments}
              keyExtractor={(item, index) => index.toString()}
              contentContainerStyle={{ marginTop: RFPercentage(2) }}
              renderItem={({ item, index }) => (
                <TouchableOpacity
                  activeOpacity={0.8}
                  style={styles.fileCard}
                  onPress={() => {
                    if (getFileType(item) === 'image') {
                      navigation.navigate('ImageViewer');
                    } else {
                      navigation.navigate('DocViewer');
                    }
                  }}
                >
                  <View style={styles.fileRow}>
                    <View style={styles.filePreview}>
                      {getFileType(item) === 'image' ? (
                        <Image
                          source={{ uri: item?.fileCopyUri || item?.uri }}
                          style={styles.fileImage}
                        />
                      ) : (
                        <Image
                          source={ICONS.attach}
                          style={[styles.fileImage, { top: RFPercentage(0.2) }]}
                          resizeMode="contain"
                        />
                      )}
                    </View>

                    <View style={styles.fileTextWrapper}>
                      <Text style={styles.fileName}>
                        {item?.name?.length > 25
                          ? item.name.slice(0, 25) + '...'
                          : item.name}
                      </Text>
                      <Text style={styles.fileHint}>Tap to View</Text>
                    </View>

                    <TouchableOpacity
                      activeOpacity={0.8}
                      onPress={() => removeAttachment(index)}
                      style={styles.deleteButton}
                    >
                      <Image
                        source={ICONS.del}
                        resizeMode="contain"
                        style={styles.deleteIcon}
                      />
                    </TouchableOpacity>
                  </View>
                </TouchableOpacity>
              )}
            />

            <View style={styles.addMoreWrapper}>
              <TouchableOpacity activeOpacity={0.8} onPress={pickDocument}>
                <Text style={styles.addMoreText}>Add Attachment(s)</Text>
              </TouchableOpacity>
            </View>
          </View>
        ) : (
          <View style={[styles.imageUploadBox, { borderStyle: 'dashed' }]}>
            <Image
              source={ICONS.attach22}
              resizeMode="contain"
              style={styles.uploadIcon}
            />
            <TouchableOpacity
              onPress={pickDocument}
              style={styles.uploadButton}
              activeOpacity={0.8}
            >
              <Text style={styles.uploadButtonText}>Upload Attachments</Text>
            </TouchableOpacity>
            <Text style={styles.imageHint}>
              We support pdf, jpeg, pngs up to 10MB
            </Text>
          </View>
        )}
      </View>
    </View>
  );
};

export default GuidedPlayAttachments;

// --- styles ---
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.white },
  innerWrapper: { width: '100%', alignSelf: 'center' },
  sectionHeader: { marginTop: RFPercentage(4) },
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
  },
  fileCard: {
    width: '100%',
    borderRadius: RFPercentage(2.5),
    height: RFPercentage(11),
    borderWidth: RFPercentage(0.1),
    borderColor: COLORS.lightWhite,
    borderBottomWidth: RFPercentage(0.4),
    marginTop: RFPercentage(1.5),
    justifyContent: 'center',
    borderBottomColor: 'rgba(230, 247, 250, 0.6)',
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
    borderWidth: 1,
    borderColor: COLORS.white,
    borderRadius: RFPercentage(1),
    // ✅ Shadow for iOS
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.15,
    shadowRadius: 3.84,
  },
  fileImage: {
    width: RFPercentage(5.5),
    height: RFPercentage(6.5),
    borderRadius: RFPercentage(0.8),
  },
  fileTextWrapper: { marginLeft: RFPercentage(1.6) },
  fileName: {
    color: COLORS.primary,
    fontSize: RFPercentage(2),
    fontFamily: FONTS.semiBold,
  },
  fileHint: {
    color: COLORS.grey3,
    fontSize: RFPercentage(1.7),
    fontFamily: FONTS.regular,
    marginTop: Platform.OS === 'ios' ? RFPercentage(0.8) : RFPercentage(0.5),
  },
  deleteButton: { position: 'absolute', right: 0 },
  deleteIcon: { width: RFPercentage(2), height: RFPercentage(2) },
  addMoreWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    marginTop: RFPercentage(4),
  },
  addMoreText: {
    color: COLORS.primary,
    fontFamily: FONTS.bold,
    fontSize: RFPercentage(2),
    textAlign: 'center',
  },
  imageUploadBox: {
    marginTop: RFPercentage(4),
    width: '100%',
    borderWidth: RFPercentage(0.1),
    borderColor: COLORS.dashedBorder,
    height: RFPercentage(26),
    borderRadius: RFPercentage(1.2),
    alignItems: 'center',
    justifyContent: 'center',
  },
  uploadIcon: { width: RFPercentage(9), height: RFPercentage(9) },
  uploadButton: {
    height: RFPercentage(5.3),
    alignItems: 'center',
    width: RFPercentage(21),
    borderWidth: RFPercentage(0.1),
    justifyContent: 'center',
    borderColor: COLORS.primary,
    borderRadius: RFPercentage(2),
    marginTop: RFPercentage(2),
  },
  uploadButtonText: {
    color: COLORS.primary,
    fontFamily: FONTS.bold,
    fontSize: RFPercentage(1.8),
    textAlign: 'center',
  },
  imageHint: {
    color: COLORS.grey4,
    fontFamily: FONTS.regular,
    fontSize: RFPercentage(1.6),
    textAlign: 'center',
    marginTop: RFPercentage(2),
  },
});
