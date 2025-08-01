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
  {
    id: 1,
    profile: IMAGES.customProfile,
    name: 'Mahjong - Richie Rich Group',
    members: 'Sophie Reynolds, Ava Brown, You',
  },
  {
    id: 2,
    profile: IMAGES.customProfile,
    name: 'Mahjong - Richie Rich Group',
    members: 'Sophie Reynolds, Ava Brown, You',
  },
  {
    id: 3,
    profile: IMAGES.customProfile,
    name: 'Mahjong - Richie Rich Group',
    members: 'Sophie Reynolds, Ava Brown, You',
  },
];

const CommonGroup = () => {
  return (
    <TouchableOpacity activeOpacity={0.8} style={styles.container}>
      <View style={styles.innerWrapper}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Text style={styles.title}>3 Groups in Common</Text>
          <TouchableOpacity>
            <AntDesign
              name="right"
              color={COLORS.icon}
              size={RFPercentage(2)}
            />
          </TouchableOpacity>
        </View>
        <View>
          <FlatList
            data={data}
            keyExtractor={item => item.id.toString()}
            renderItem={({ item, index }) => {
              const isLastItem = index === data.length - 1;
              return (
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    borderBottomColor: COLORS.lightWhite,
                    borderBottomWidth: isLastItem ? 0 : RFPercentage(0.1),
                    paddingBottom: RFPercentage(1.3),
                    marginTop:RFPercentage(3),
                  }}
                >
                  <View style={styles.largeGroupIconContainer}>
                    <Image
                      source={item.profile}
                      resizeMode="cover"
                      style={styles.largeGroupIcon}
                    />
                  </View>
                  <View style={{ marginLeft: RFPercentage(1.5) }}>
                    <Text
                      style={{
                        color: COLORS.primary,
                        fontFamily: FONTS.semiBold,
                        fontSize: RFPercentage(1.8),
                      }}
                    >
                      {item.name}
                    </Text>
                    <Text
                      style={{
                        fontSize: RFPercentage(1.7),
                        color: COLORS.lightGrey,
                        fontFamily: FONTS.regular,
                        marginTop: RFPercentage(0.5),
                      }}
                    >
                      {item.members}
                    </Text>
                  </View>
                </View>
              );
            }}
          />
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default CommonGroup;

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
    marginTop: RFPercentage(1),
  },
  innerWrapper: {
    width: '90%',
    alignSelf: 'center',
  },
  title: {
    color: COLORS.primary,
    fontFamily: FONTS.bold,
    fontSize: RFPercentage(2),
  },
  largeGroupIconContainer: {
    width: RFPercentage(5),
    height: RFPercentage(5),
    borderRadius: RFPercentage(100),
    backgroundColor: COLORS.yellow,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft:RFPercentage(1)
  },
  largeGroupIcon: {
    width: RFPercentage(5),
    height: RFPercentage(5),
    borderTopRightRadius: RFPercentage(100),
    right: RFPercentage(0.5),
    borderTopLeftRadius: RFPercentage(100),
    borderBottomRightRadius: RFPercentage(100),
    borderBottomLeftRadius: RFPercentage(1),
  },
});
