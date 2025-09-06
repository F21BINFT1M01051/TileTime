import React, { useRef, useState } from 'react';
import {
  Animated,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  Share,
} from 'react-native';
import { COLORS, FONTS, ICONS } from '../config/theme';
import { RFPercentage } from 'react-native-responsive-fontsize';
import Feather from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';

const steps = [
  {
    id: 1,
    name: 'Create Event',
    icon: ICONS.hm1,
    completed: true,
    button: 'Create',
    navigationScreen: '',
  },
  {
    id: 2,
    name: 'Create Group',
    icon: ICONS.hm2,
    completed: false,
    button: 'Create',
    navigationScreen: 'CreateGroup',
  },
  {
    id: 3,
    name: 'Invite Friends',
    icon: ICONS.hm3,
    completed: false,
    button: 'Invite',
    navigationScreen: 'InviteFriends',
  },
  {
    id: 4,
    name: 'Join Local Events',
    icon: ICONS.hm4,
    completed: false,
    button: 'Explore',
    navigationScreen: 'EventDetails',
  },
];

const ActionsCard = () => {
  const [expanded, setExpanded] = useState(true);
  const animation = useRef(new Animated.Value(1)).current;
  const navigation = useNavigation();

  const onShare = async () => {
    try {
      const result = await Share.share({
        message: 'Check out this awesome content! 🚀',
        url: 'https://example.com',
      });

      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          console.log('Shared with activity type: ', result.activityType);
        } else {
          console.log('Shared successfully');
        }
      } else if (result.action === Share.dismissedAction) {
        console.log('Dismissed');
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const toggleExpand = () => {
    Animated.timing(animation, {
      toValue: expanded ? 0 : 1,
      duration: 300,
      useNativeDriver: false,
    }).start();
    setExpanded(!expanded);
  };

  const heightInterpolate = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, steps.length * RFPercentage(9)],
  });

  const opacityInterpolate = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
  });

  return (
    <View style={[styles.container, { paddingBottom: expanded ? RFPercentage(0) : RFPercentage(2),}]}>
      <TouchableOpacity activeOpacity={0.8} onPress={toggleExpand} style={styles.header}>
        <View>
          <Text style={styles.headerTitle}>Getting Started</Text>
          <Text style={styles.headerSubTitle}>
            1 of 4 steps completed - let's begin!
          </Text>
        </View>
        <TouchableOpacity onPress={toggleExpand}>
          <Feather
            name={expanded ? 'chevron-up' : 'chevron-down'}
            color={COLORS.icon}
            size={RFPercentage(2.6)}
          />
        </TouchableOpacity>
      </TouchableOpacity>

      <View style={styles.progressBar}>
        {steps.map((step, index) => (
          <View
            key={index}
            style={[
              styles.progressStep,
              {
                backgroundColor: step.completed
                  ? COLORS.pink
                  : COLORS.fieldColor,
                marginRight: index !== steps.length - 1 ? RFPercentage(0.3) : 0,
              },
            ]}
          />
        ))}
      </View>

      <Animated.View
        style={[
          styles.animatedList,
          { height: heightInterpolate, opacity: opacityInterpolate },
        ]}
      >
        <FlatList
          data={steps}
          keyExtractor={item => item.id.toString()}
          scrollEnabled={false}
          renderItem={({ item }) => (
            <View style={styles.stepRow}>
              <View style={styles.stepLeft}>
                <Image
                  source={item.icon}
                  resizeMode="contain"
                  style={styles.stepIcon}
                />
                <Text style={styles.stepName}>{item.name}</Text>
              </View>
              {item.completed ? (
                <Image
                  source={ICONS.greenCheck}
                  resizeMode="contain"
                  style={styles.checkIcon}
                />
              ) : (
                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={() => {
                    if (item.button === 'Invite') {
                      onShare();
                    } else {
                      navigation.navigate(item.navigationScreen);
                    }
                  }}
                  style={styles.stepButton}
                >
                  <Text style={styles.stepButtonText}>{item.button}</Text>
                </TouchableOpacity>
              )}
            </View>
          )}
        />
      </Animated.View>
    </View>
  );
};

export default ActionsCard;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: COLORS.white,
    borderRadius: RFPercentage(2),
    paddingVertical: RFPercentage(3),
    borderWidth: RFPercentage(0.1),
    borderBottomWidth: RFPercentage(0.5),
    borderColor: COLORS.lightWhite,
   
  },
  header: {
    width: '90%',
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerTitle: {
    color: COLORS.primary,
    fontFamily: FONTS.bold,
    fontSize: RFPercentage(2.1),
  },
  headerSubTitle: {
    color: COLORS.lightGrey,
    fontSize: RFPercentage(1.8),
    fontFamily: FONTS.regular,
    marginTop: RFPercentage(1),
  },
  progressBar: {
    width: '100%',
    alignSelf: 'center',
    height: RFPercentage(0.8),
    flexDirection: 'row',
    backgroundColor: COLORS.fieldColor,
    overflow: 'hidden',
    marginTop: RFPercentage(1.3),
  },
  progressStep: {
    flex: 1,
    borderTopRightRadius: RFPercentage(0.5),
    borderBottomRightRadius: RFPercentage(0.5),
  },
  animatedList: {
    width: '90%',
    alignSelf: 'center',
    overflow: 'hidden',
  },
  stepRow: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: RFPercentage(3.5),
  },
  stepLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  stepIcon: {
    width: RFPercentage(4.5),
    height: RFPercentage(4.5),
  },
  stepName: {
    marginLeft: RFPercentage(1.5),
    fontFamily: FONTS.semiBold,
    color: COLORS.primary,
    fontSize: RFPercentage(1.9),
  },
  checkIcon: {
    width: RFPercentage(5),
    height: RFPercentage(5),
  },
  stepButton: {
    width: RFPercentage(10),
    height: RFPercentage(3.8),
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: RFPercentage(100),
  },
  stepButtonText: {
    color: COLORS.white,
    fontSize: RFPercentage(1.7),
    fontFamily: FONTS.medium,
    lineHeight:RFPercentage(1.7)
  },
});
