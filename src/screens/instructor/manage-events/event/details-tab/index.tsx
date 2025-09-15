import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  FlatList,
} from 'react-native';
import React from 'react';
import { COLORS, ICONS, FONTS, IMAGES } from '../../../../../config/theme';
import { RFPercentage } from 'react-native-responsive-fontsize';
import SocialField from '../../../../../components/SocialField';
import { useNavigation } from '@react-navigation/native';
const attachments = [
  { id: 1, profile: ICONS.attach },
  { id: 2, profile: ICONS.attach },
  { id: 3, profile: ICONS.attach },
];

const cohosts = [
  { id: 1, profile: IMAGES.chatProfile },
  { id: 2, profile: IMAGES.chatProfile },
];

const Details = ({ type,  }: any) => {
  const navigation = useNavigation()
  return (
    <View
      style={{
        width: '90%',
        alignSelf: 'center',
      }}
    >
      {type === 'Lessons' ? (
        <TouchableOpacity onPress={()=> navigation.navigate("EditEventBasic")} activeOpacity={0.8} style={styles.insightBox}>
          <View style={styles.insightContent}>
            <View>
              <Text style={styles.insightTitle}>Basics</Text>
              <Text style={styles.insightSub}>
                Event Tittle, Price, Game Variant and more
              </Text>
            </View>
            <TouchableOpacity>
              <Image
                source={ICONS.right}
                resizeMode="contain"
                style={styles.rightIcon}
              />
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      ) : (
        <>
          <TouchableOpacity onPress={()=> navigation.navigate("EditEventBasic")} activeOpacity={0.8} style={styles.insightBox}>
            <View style={styles.insightContent}>
              <View>
                <Text style={styles.insightTitle}>Basics</Text>
                <Text style={styles.insightSub}>
                  Event Tittle, Price, Game Variant and more
                </Text>
              </View>
              <TouchableOpacity>
                <Image
                  source={ICONS.right}
                  resizeMode="contain"
                  style={styles.rightIcon}
                />
              </TouchableOpacity>
            </View>
          </TouchableOpacity>

          <View style={styles.sectionSpacing}>
            <TouchableOpacity onPress={()=> navigation.navigate("EventAttachments")} activeOpacity={0.8} style={styles.attachmentCard}>
              <View style={styles.cardInner}>
                <View>
                  <Text style={styles.cardTitle}>Attachments</Text>
                  <Text style={styles.attachmentCount}>3 attachments</Text>
                  <FlatList
                    horizontal
                    data={attachments}
                    keyExtractor={item => item.id.toString()}
                    contentContainerStyle={styles.attachmentList}
                    renderItem={({ item }) => (
                      <View style={styles.attachmentWrapper}>
                        <Image
                          source={item.profile}
                          resizeMode="cover"
                          style={styles.attachmentImage}
                        />
                      </View>
                    )}
                  />
                </View>
                <TouchableOpacity activeOpacity={0.8}>
                  <Image
                    source={ICONS.right}
                    resizeMode="contain"
                    style={styles.rightIcon}
                  />
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          </View>

          <View style={{ marginTop: RFPercentage(2) }}>
            <TouchableOpacity activeOpacity={0.8} onPress={()=> navigation.navigate("EditAddOneExtra")} style={styles.card}>
              <View style={styles.cardInner}>
                <View>
                  <Text style={styles.cardTitle}>Add ons and Extra</Text>
                  <Text
                    style={[
                      styles.insightSub,
                      { marginTop: RFPercentage(0.8) },
                    ]}
                  >
                    {`Event chats, Co - Hosts and Visibility.\nSamantha and Emily added as Co- Hosts `}
                  </Text>
                  <FlatList
                    horizontal
                    data={cohosts}
                    keyExtractor={item => item.id.toString()}
                    contentContainerStyle={styles.cohostList}
                    renderItem={({ item }) => (
                      <View style={styles.cohostImageWrapper}>
                        <Image
                          source={item.profile}
                          resizeMode="cover"
                          style={styles.cohostImage}
                        />
                      </View>
                    )}
                  />
                </View>
                <TouchableOpacity activeOpacity={0.8}>
                  <Image
                    source={ICONS.right}
                    resizeMode="contain"
                    style={styles.rightIcon}
                  />
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          </View>
        </>
      )}

      <View style={{ marginTop: RFPercentage(6) }}>
        <SocialField
          name="Cancel Event"
          icon={ICONS.x}
          borderColor={COLORS.red}
          color={COLORS.red}
        />
      </View>
    </View>
  );
};

export default Details;

const styles = StyleSheet.create({
  insightBox: {
    width: '100%',
    height: RFPercentage(8),
    backgroundColor: COLORS.white,
    borderWidth: RFPercentage(0.1),
    borderColor: COLORS.lightWhite,
    borderBottomWidth: RFPercentage(0.5),
    borderRadius: RFPercentage(2),
    marginTop: RFPercentage(2),
    justifyContent: 'center',
    borderBottomColor: 'rgba(230, 247, 250, 0.6)',
  },
  insightContent: {
    width: '90%',
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  insightTitle: {
    color: COLORS.primary,
    fontFamily: FONTS.bold,
    fontSize: RFPercentage(2),
  },
  insightSub: {
    color: COLORS.lightGrey,
    fontSize: RFPercentage(1.5),
    fontFamily: FONTS.regular,
    marginTop: RFPercentage(0.6),
  },
  rightIcon: {
    width: RFPercentage(1.6),
    height: RFPercentage(1.6),
  },
  sectionSpacing: { marginTop: RFPercentage(2) },
  card: {
    width: '100%',
    height: RFPercentage(18),
    backgroundColor: COLORS.white,
    borderColor: COLORS.lightWhite,
    borderWidth: RFPercentage(0.1),
    borderBottomWidth: RFPercentage(0.5),
    borderRadius: RFPercentage(1.8),
    justifyContent: 'center',
    borderBottomColor: 'rgba(230, 247, 250, 0.6)',
  },
  attachmentCard: {
    width: '100%',
    height: RFPercentage(16),
    backgroundColor: COLORS.white,
    borderColor: COLORS.lightWhite,
    borderWidth: RFPercentage(0.1),
    borderBottomWidth: RFPercentage(0.5),
    borderRadius: RFPercentage(1.8),
    justifyContent: 'center',
    borderBottomColor: 'rgba(230, 247, 250, 0.6)',
  },
  locationCard: {
    width: '100%',
    height: RFPercentage(16),
    backgroundColor: COLORS.white,
    borderColor: COLORS.lightWhite,
    borderWidth: RFPercentage(0.1),
    borderBottomWidth: RFPercentage(0.5),
    borderRadius: RFPercentage(1.8),
    justifyContent: 'center',
  },
  cardInner: {
    width: '90%',
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  cardTitle: {
    color: COLORS.primary,
    fontFamily: FONTS.bold,
    fontSize: RFPercentage(1.8),
  },
  attachmentCount: {
    color: COLORS.lightGrey,
    fontFamily: FONTS.regular,
    fontSize: RFPercentage(1.6),
    marginTop: RFPercentage(0.5),
  },
  attachmentList: { marginTop: RFPercentage(1) },
  attachmentWrapper: {
    width: RFPercentage(7),
    height: RFPercentage(7.5),
    backgroundColor: COLORS.fieldColor,
    borderRadius: RFPercentage(1.3),
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: RFPercentage(1.5),
  },
  attachmentImage: {
    width: RFPercentage(5.5),
    height: RFPercentage(6.5),
    borderRadius: RFPercentage(1.3),
    alignSelf: 'center',
    top: RFPercentage(0.3),
  },
  cohostList: {
    marginTop: RFPercentage(1.8),
    paddingHorizontal: RFPercentage(0.5),
  },
  cohostImageWrapper: {
    width: RFPercentage(6),
    height: RFPercentage(6),
    backgroundColor: COLORS.pink,
    borderTopRightRadius: RFPercentage(100),
    borderTopLeftRadius: RFPercentage(100),
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: RFPercentage(1.8),
  },
  cohostImage: {
    width: RFPercentage(6),
    height: RFPercentage(6),
    borderTopRightRadius: RFPercentage(100),
    borderTopLeftRadius: RFPercentage(100),
    right: RFPercentage(0.3),
    bottom: RFPercentage(0.2),
  },
});
