import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
} from 'react-native';
import React from 'react';
import { COLORS, FONTS, IMAGES } from '../config/theme';
import { RFPercentage } from 'react-native-responsive-fontsize';
import AntDesign from 'react-native-vector-icons/AntDesign';

const data = [
  { id: 1, profile: IMAGES.profile1 },
  { id: 2, profile: IMAGES.profile1 },
  { id: 3, profile: IMAGES.profile1 },
  { id: 4, profile: IMAGES.profile1 },
  { id: 5, profile: IMAGES.profile1 },
  { id: 6, profile: IMAGES.profile1 },
  { id: 7, profile: IMAGES.profile1 },
  { id: 8, profile: IMAGES.profile1 },
  { id: 9, profile: IMAGES.profile1 },
];

const media = [
  { id: 1, profile: IMAGES.customProfile },
  { id: 2, profile: IMAGES.customProfile },
  { id: 3, profile: IMAGES.customProfile },
  { id: 4, profile: IMAGES.customProfile },
  { id: 5, profile: IMAGES.customProfile },
  { id: 6, profile: IMAGES.customProfile },
  { id: 7, profile: IMAGES.customProfile },
  { id: 8, profile: IMAGES.customProfile },
  { id: 9, profile: IMAGES.customProfile },
];

interface Props {
  media?: boolean;
  title: string;
}

const DetailComponent = (props: Props) => {
  const visibleProfiles = data.slice(0, 5);
  const remainingCount = data.length - visibleProfiles.length;
  const visibleProfiles2 = media.slice(0, 4);
  const remainingCount2 = media.length - visibleProfiles2.length;

  return (
    <TouchableOpacity activeOpacity={0.8} style={styles.container}>
      <View style={styles.innerWrapper}>
        <View>
          <Text style={styles.title}>{props.title}</Text>
          <Text style={styles.subtitle}>
            {props.media ? `${media.length} files` : `${data.length} Members`}
          </Text>

          <View
            style={{
              flexDirection: 'row',
              paddingVertical: RFPercentage(1),
              alignItems: 'center',
            }}
          >
            {props.media ? (
              <>
                {visibleProfiles2.map((item, index) => (
                  <View
                    key={index.toString()}
                    style={{
                      width: RFPercentage(6.5),
                      height: RFPercentage(6.5),
                      borderRadius: RFPercentage(1.4),
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginRight: RFPercentage(1),
                      marginTop: RFPercentage(0.5),
                    }}
                  >
                    <Image
                      source={item.profile}
                      resizeMode="cover"
                      style={{
                        width: RFPercentage(6.5),
                        height: RFPercentage(6.5),
                        borderRadius: RFPercentage(1.4),
                      }}
                    />
                  </View>
                ))}

                {remainingCount2 > 0 && (
                  <View
                    style={{
                      backgroundColor: '#FFE5F6',
                      width: RFPercentage(6.5),
                      height: RFPercentage(6.5),
                      borderRadius: RFPercentage(1),
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <Text style={styles.moreText}>+{remainingCount}</Text>
                  </View>
                )}
              </>
            ) : (
              <>
                {visibleProfiles.map((item, index) => (
                  <View key={index.toString()} style={styles.avatarContainer}>
                    <View style={styles.avatarOuterLayer}>
                      <View style={styles.avatarMiddleLayer}>
                        <View style={styles.avatarInnerLayer}>
                          <Image
                            source={item.profile}
                            resizeMode="contain"
                            style={styles.avatarImage}
                          />
                        </View>
                      </View>
                    </View>
                  </View>
                ))}
                {remainingCount > 0 && (
                  <View
                    style={{
                      backgroundColor: '#FFE5F6',
                      width: RFPercentage(5),
                      height: RFPercentage(6),
                      borderRadius: RFPercentage(2),
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <Text style={styles.moreText}>+{remainingCount}</Text>
                  </View>
                )}
              </>
            )}
          </View>
        </View>
        <View>
          <TouchableOpacity>
            <AntDesign name="right" color={COLORS.icon} size={RFPercentage(2)} />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default DetailComponent;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    borderWidth: RFPercentage(0.1),
    borderBottomWidth: RFPercentage(0.6),
    borderColor: COLORS.lightWhite,
    borderRadius: RFPercentage(1.5),
    paddingVertical: RFPercentage(1.7),
    shadowColor: 'rgba(203, 203, 203, 0.5)',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
    marginTop: RFPercentage(3),
  },
  innerWrapper: {
    width: '90%',
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    color: COLORS.primary,
    fontFamily: FONTS.bold,
    fontSize: RFPercentage(2),
  },
  subtitle: {
    color: '#8C8C8C',
    fontFamily: FONTS.regular,
    fontSize: RFPercentage(1.7),
    marginTop: RFPercentage(0.5),
  },
  avatarContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: RFPercentage(1),
    marginTop: RFPercentage(0.5),
  },
  moreContainer: {
    backgroundColor: '#FFE5F6',
  },
  avatarOuterLayer: {
    width: RFPercentage(5),
    height: RFPercentage(6),
    borderRadius: RFPercentage(2),
    backgroundColor: COLORS.purple,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarMiddleLayer: {
    backgroundColor: COLORS.green2,
    width: RFPercentage(5),
    height: RFPercentage(6),
    borderRadius: RFPercentage(2),
    alignItems: 'center',
    justifyContent: 'center',
    right: RFPercentage(0.1),
  },
  avatarInnerLayer: {
    backgroundColor: COLORS.pink3,
    width: RFPercentage(5),
    height: RFPercentage(6),
    borderRadius: RFPercentage(2),
    alignItems: 'center',
    justifyContent: 'center',
    right: RFPercentage(0.1),
  },
  avatarImage: {
    width: RFPercentage(5),
    height: RFPercentage(6),
    borderRadius: RFPercentage(2),
    right: RFPercentage(0.1),
  },
  moreText: {
    color: '#B14088',
    fontSize: RFPercentage(2),
    fontFamily: FONTS.medium,
  },
});
