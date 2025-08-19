import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  FlatList,
  Linking,
} from 'react-native';
import React, { useState } from 'react';
import { COLORS, FONTS, ICONS } from '../../../../../../../config/theme';
import { RFPercentage } from 'react-native-responsive-fontsize';
import DocumentPicker, {
  DocumentPickerResponse,
} from 'react-native-document-picker';

const GuidedPlayAttachments = () => {
  const [attachments, setAttachments] = useState<DocumentPickerResponse[]>([]);

  // Pick Image or Document
  const pickDocument = async () => {
    try {
      const res = await DocumentPicker.pickSingle({
        type: [DocumentPicker.types.images, DocumentPicker.types.pdf],
        copyTo: 'cachesDirectory',
      });

      setAttachments(prev => [...prev, res]);
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        console.log('User cancelled');
      } else {
        console.log('Error: ', err);
      }
    }
  };

  // Remove attachment by index
  const removeAttachment = (index: number) => {
    setAttachments(prev => prev.filter((_, i) => i !== index));
  };

  // View file
  const viewAttachment = (item: DocumentPickerResponse) => {
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
          <>
            <FlatList
              data={attachments}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item, index }) => (
                <TouchableOpacity
                  activeOpacity={0.8}
                  style={styles.fileCard}
                  onPress={() => viewAttachment(item)} // 👈 Tap to view
                >
                  <View style={styles.fileRow}>
                    <View style={styles.filePreview}>
                      {item.type?.includes('image') ? (
                        <Image
                          source={{ uri: item.fileCopyUri || item.uri }}
                          style={styles.fileImage}
                        />
                      ) : (
                        <Image source={ICONS.attach} style={styles.fileImage} />
                      )}
                    </View>

                    <View style={styles.fileTextWrapper}>
                      <Text style={styles.fileName}>{item?.name}</Text>
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
          </>
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

// --- styles remain same from last version ---
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
    fontSize: RFPercentage(1.7),
    fontFamily: FONTS.regular,
    marginTop: RFPercentage(2),
  },
  fileCard: {
    width: '100%',
    borderRadius: RFPercentage(2.5),
    height: RFPercentage(10),
    borderWidth: RFPercentage(0.1),
    borderColor: COLORS.lightWhite,
    borderBottomWidth: RFPercentage(0.4),
    marginTop: RFPercentage(1),
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
    borderRadius: RFPercentage(2),
  },
  fileImage: {
    width: RFPercentage(5),
    height: RFPercentage(6),
    borderRadius: RFPercentage(1),
  },
  fileTextWrapper: { marginLeft: RFPercentage(1.6) },
  fileName: {
    color: COLORS.primary,
    fontSize: RFPercentage(1.8),
    fontFamily: FONTS.bold,
  },
  fileHint: {
    color: COLORS.grey3,
    fontSize: RFPercentage(1.6),
    fontFamily: FONTS.regular,
    marginTop: RFPercentage(0.8),
  },
  deleteButton: { position: 'absolute', right: 0 },
  deleteIcon: { width: RFPercentage(2), height: RFPercentage(2) },
  addMoreWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    marginTop: RFPercentage(2),
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
    fontSize: RFPercentage(1.5),
    textAlign: 'center',
    marginTop: RFPercentage(2),
  },
});
