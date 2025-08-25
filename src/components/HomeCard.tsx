import React from 'react';
import { Image, StyleSheet, Text, View, Dimensions, TouchableOpacity } from 'react-native';
import { RFPercentage } from 'react-native-responsive-fontsize';
import { COLORS, FONTS, ICONS, IMAGES } from '../config/theme';
import { useNavigation } from '@react-navigation/native';

const { width } = Dimensions.get('window');

interface Props {
  title: string;
  subTitle: string;
  bannerText: string;
  date: string;
  distance: string;
  profile: any;
  free?: boolean;
}

const HomeCard = (props: Props) => {
  const navigation = useNavigation()
  return (
    <TouchableOpacity activeOpacity={0.8} onPress={()=> navigation.navigate("EventDetails")} style={styles.container}>
      {
        props.free && (
          <Image source={ICONS.free} resizeMode='contain' style={{width:RFPercentage(5), height:RFPercentage(5), position:'absolute', left:0, top:0, zIndex:99}} />
        )
      }
      <View style={styles.imageContainer}>
        <View style={styles.borderWrapper}>
          <Image
            source={props.profile}
            style={styles.image}
            resizeMode="cover"
          />

          {/* <View style={styles.banner}>
            <Image
              source={ICONS.border2}
              resizeMode="cover"
              style={styles.bannerImage}
            />
            <Text style={styles.bannerText}>{props.bannerText}</Text>
          </View> */}
        </View>
      </View>

      <View style={styles.contentContainer}>
        <Text style={styles.title}>{props.title}</Text>
        <Text style={styles.subtitle}>{props.subTitle}</Text>
        <View style={{ marginTop: RFPercentage(0.4) }}>
          <View style={styles.chipRow}>
            <View style={styles.dateChip}>
              <Image
                source={ICONS.calender3}
                resizeMode="contain"
                style={{ width: RFPercentage(2), height: RFPercentage(2) }}
              />
              <Text style={styles.chipText}>{props.date}</Text>
            </View>
          </View>

          <View style={styles.chipRow}>
            <View style={styles.locationChip}>
              <Image
                source={ICONS.map2}
                resizeMode="contain"
                style={{ width: RFPercentage(2), height: RFPercentage(2) }}
              />
              <Text style={styles.chipText}>{props.distance}</Text>
            </View>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default HomeCard;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
  },
  imageContainer: {
    width: RFPercentage(15.4),
    height: RFPercentage(18),
    borderRadius: RFPercentage(5),
    overflow: 'hidden',
    backgroundColor: COLORS.green1,
    justifyContent: 'flex-end',
  },
  borderWrapper: {
    width: '100%',
    height: '100%',
    borderRadius: RFPercentage(5),
    overflow: 'hidden',
    right: RFPercentage(0.5),
    bottom: RFPercentage(0.3),
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: RFPercentage(5),
  },
  banner: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  bannerImage: {
    width: '100%',
    height: RFPercentage(5),
  },
  bannerText: {
    fontSize: RFPercentage(1),
    position: 'absolute',
    top: RFPercentage(1.8),
    fontFamily: FONTS.semiBold,
    color: COLORS.primary,
    textAlign: 'center',
  },
  contentContainer: {
    flex: 1,
    marginLeft: RFPercentage(2),
  },
  title: {
    fontSize: RFPercentage(2),
    color: COLORS.primary,
    fontFamily: FONTS.bold,
    lineHeight: RFPercentage(2),
  },
  subtitle: {
    fontSize: RFPercentage(2),
    color: COLORS.primary,
    fontFamily: FONTS.bold,
    lineHeight: RFPercentage(2),
  },
  chipRow: {
    marginTop: RFPercentage(1),
  },
  dateChip: {
    backgroundColor: COLORS.date,
    flexDirection: 'row',
    alignItems: 'center',
    height: RFPercentage(3.3),
    paddingHorizontal: RFPercentage(1),
    borderRadius: RFPercentage(100),
    maxWidth: RFPercentage(14),
  },
  locationChip: {
    backgroundColor: COLORS.location,
    flexDirection: 'row',
    alignItems: 'center',
    height: RFPercentage(3.3),
    paddingHorizontal: RFPercentage(1),
    borderRadius: RFPercentage(100),
    width: RFPercentage(12),
  },
  chipIcon: {
    marginRight: 6,
    fontSize: RFPercentage(2),
  },
  chipText: {
    fontSize: RFPercentage(1.4),
    color: COLORS.primary,
    fontFamily: FONTS.medium2,
    marginLeft: RFPercentage(0.6),
  },
});
