import {
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
  Platform,
} from 'react-native';
import React, { useState } from 'react';
import { COLORS, FONTS, ICONS, IMAGES } from '../../../../../../config/theme';
import AuthHeader from '../../../../../../components/AuthHeader';
import { RFPercentage } from 'react-native-responsive-fontsize';

const Media = [
  { id: 1, picture: IMAGES.customProfile },
  { id: 2, picture: IMAGES.customProfile },
  { id: 3, picture: IMAGES.customProfile },
  { id: 4, picture: IMAGES.customProfile },
  { id: 5, picture: IMAGES.customProfile },
  { id: 6, picture: IMAGES.customProfile },
  { id: 7, picture: IMAGES.customProfile },
  { id: 8, picture: IMAGES.customProfile },
];

const Documents = [
  { id: 1, picture: ICONS.attach, name: 'Rulebook for referecne' },
  { id: 2, picture: ICONS.attach, name: 'Rulebook for referecne' },
  { id: 3, picture: ICONS.attach, name: 'Rulebook for referecne' },
  { id: 4, picture: ICONS.attach, name: 'Rulebook for referecne' },
  { id: 5, picture: ICONS.attach, name: 'Rulebook for referecne' },
  { id: 6, picture: ICONS.attach, name: 'Rulebook for referecne' },
];

const screenWidth = Dimensions.get('window').width;
const numColumns = 3;
const spacing = RFPercentage(2.1);
const imageSize = (screenWidth - spacing * (numColumns + 1)) / numColumns;

const ChatMedia = ({navigation} : any) => {
  const [activeTab, setActiveTab] = useState('Media');
  return (
    <View style={styles.container}>
      <AuthHeader title="Media and Documents" style={styles.headerTitle} />
      <View style={styles.innerContainer}>
        <View style={styles.tabContainer}>
          <TouchableOpacity
            onPress={() => setActiveTab('Media')}
            activeOpacity={0.8}
            style={[
              styles.tab,
              {
                backgroundColor:
                  activeTab === 'Media' ? COLORS.pink : COLORS.white,
              },
            ]}
          >
            <Text
              style={[
                styles.tabText,
                {
                  color: activeTab === 'Media' ? COLORS.white : COLORS.grey5,
                  fontFamily:
                    activeTab === 'Media' ? FONTS.semiBold : FONTS.regular,
                },
              ]}
            >
              Media
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setActiveTab('Documents')}
            activeOpacity={0.8}
            style={[
              styles.tab,
              {
                backgroundColor:
                  activeTab === 'Documents' ? COLORS.pink : COLORS.white,
              },
            ]}
          >
            <Text
              style={[
                styles.tabText,
                {
                  color:
                    activeTab === 'Documents' ? COLORS.white : COLORS.grey5,
                  fontFamily:
                    activeTab === 'Documents' ? FONTS.semiBold : FONTS.regular,
                },
              ]}
            >
              Documents
            </Text>
          </TouchableOpacity>
        </View>

        {activeTab === 'Media' ? (
          <View style={styles.mediaWrapper}>
            <FlatList
              key={'media'}
              data={Media}
              keyExtractor={item => item.id.toString()}
              numColumns={numColumns}
              columnWrapperStyle={styles.mediaRow}
              renderItem={({ item }) => (
                <TouchableOpacity activeOpacity={0.8} onPress={()=> navigation.navigate("ImageViewer")} >
                  <Image
                    source={item.picture}
                    resizeMode="cover"
                    style={[
                      styles.mediaImage,
                      { width: imageSize, height: imageSize },
                    ]}
                  />
                </TouchableOpacity>
              )}
            />
          </View>
        ) : (
          <View style={styles.docWrapper}>
            <FlatList
              data={Documents}
              key={'documents'}
              keyExtractor={item => item.id.toString()}
              renderItem={({ item }) => (
                <TouchableOpacity activeOpacity={0.8} style={styles.fileCard} onPress={()=> navigation.navigate("DocViewer")}>
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
        )}
      </View>
    </View>
  );
};

export default ChatMedia;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  headerTitle: {
    fontFamily: FONTS.semiBold,
    fontSize: RFPercentage(2.2),
  },
  innerContainer: {
    width: '90%',
    alignSelf: 'center',
    marginTop: RFPercentage(3),
  },
  tabContainer: {
    width: '100%',
    backgroundColor: COLORS.white,
    height: RFPercentage(6),
    borderWidth: RFPercentage(0.1),
    borderColor: COLORS.lightWhite,
    borderRadius: RFPercentage(2.2),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: RFPercentage(0.5),
  },
  tab: {
    width: '48%',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: RFPercentage(1.8),
    height: '100%',
  },
  tabText: {
    fontSize: RFPercentage(2),
    textAlign: 'center',
    bottom:Platform.OS === 'android' ? 2 : 0
  },
  mediaWrapper: {
    alignSelf: 'center',
    marginTop: RFPercentage(2),
  },
  mediaRow: {
    gap: RFPercentage(1.2),
    marginTop: RFPercentage(1.2),
    alignItems: 'center',
  },
  mediaImage: {
    borderRadius: RFPercentage(1.2),
  },
  docWrapper: {
    marginTop: RFPercentage(2),
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
