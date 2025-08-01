import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { RFPercentage } from 'react-native-responsive-fontsize';
import { COLORS, FONTS, ICONS } from '../../config/theme';

interface Props {
  right?: boolean;
  onPress: () => void;
}

const TopNavigation = (props: Props) => {
  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <Text style={styles.titleText}>Groups & Chats</Text>
        <Image
          source={ICONS.vector}
          resizeMode="contain"
          style={styles.vectorIcon}
        />
        {props.right && (
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={props.onPress}
            style={{ position: 'absolute', right: 0 }}
          >
            <Text
              style={{
                color: COLORS.white,
                fontFamily: FONTS.semiBold,
                fontSize: RFPercentage(1.8),
              }}
            >
              + New group
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default TopNavigation;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: COLORS.pink,
    height: RFPercentage(12),
    justifyContent: 'flex-end',
    paddingBottom: RFPercentage(2),
  },
  innerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '90%',
    alignSelf: 'center',
  },
  titleText: {
    color: COLORS.white,
    fontFamily: FONTS.headline,
    fontSize: RFPercentage(3),
    marginRight: RFPercentage(0.2),
  },
  vectorIcon: {
    width: RFPercentage(2.2),
    height: RFPercentage(2.2),
    bottom: RFPercentage(1),
  },
});
