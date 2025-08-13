import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { RFPercentage } from 'react-native-responsive-fontsize';
import { COLORS, FONTS, ICONS } from '../../config/theme';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import LinearGradient from 'react-native-linear-gradient';
import Events from '../../screens/common/home/events';
import Groups from '../../screens/common/home/groups';
import InstructorHome from '../../screens/instructor/home';
import MyProfileInstructor from '../../screens/instructor/my-profile';

const Tab = createBottomTabNavigator();

const CustomTabBar: React.FC<BottomTabBarProps> = ({
  state,
  descriptors,
  navigation,
}) => {
  return (
    <LinearGradient
      colors={['rgba(255, 255, 255, 1)', 'rgba(206, 206, 206, 0)']}
      style={{ height: RFPercentage(13) }}
    >
      <View style={styles.tabContainer}>
        <View
          style={{
            flexDirection: 'row',
            width: '90%',
            alignItems: 'center',
            justifyContent: 'space-around',
          }}
        >
          {state.routes.map((route, index) => {
            const { options } = descriptors[route.key];
            const isFocused = state.index === index;

            const onPress = () => {
              const event = navigation.emit({
                type: 'tabPress',
                target: route.key,
                canPreventDefault: true,
              });

              if (!isFocused && !event.defaultPrevented) {
                navigation.navigate(route.name);
              }
            };

            // Map icons for each screen
            const icons = [ICONS.tab1, ICONS.tab2, ICONS.tab4, ICONS.tab6];
            const iconName = icons[index];

            return (
              <TouchableOpacity
                key={index}
                onPress={onPress}
                style={[styles.tabButton, isFocused && styles.activeTab]}
              >
                <Image
                  source={iconName}
                  resizeMode="contain"
                  tintColor={isFocused ? COLORS.primary : COLORS.grey5}
                  style={{
                    width: RFPercentage(2.7),
                    height: RFPercentage(2.7),
                  }}
                />
                {isFocused && (
                  <Text style={styles.activeText}>{options.title}</Text>
                )}
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
    </LinearGradient>
  );
};

export default function InstructorTabs() {
  return (
    <Tab.Navigator
      tabBar={props => <CustomTabBar {...props} />}
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: 'transparent',
          position: 'absolute',
          borderTopWidth: 0,
          elevation: 0,
        },
      }}
      initialRouteName="Home"
    >
      <Tab.Screen
        name="Home"
        component={InstructorHome}
        options={{ title: 'Home' }}
      />
      <Tab.Screen
        name="Events"
        component={Events}
        options={{ title: 'My Events' }}
      />

      <Tab.Screen
        name="Groups"
        component={Groups}
        options={{ title: 'Groups & Chats' }}
      />
      <Tab.Screen
        name="Profile"
        component={MyProfileInstructor}
        options={{ title: 'Profile' }}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  tabContainer: {
    position: 'absolute',
    backgroundColor: COLORS.white,
    borderRadius: RFPercentage(3),
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 6,
    borderWidth: RFPercentage(0.1),
    borderColor: COLORS.lightWhite,
    shadowColor: 'rgba(173, 171, 171, 1)',
    height: RFPercentage(10),
    width: '91%',
    alignSelf: 'center',
    bottom: RFPercentage(2),
  },
  tabButton: {
    flexDirection: 'row',
    alignItems: 'center',

    justifyContent: 'center',
  },
  activeTab: {
    backgroundColor: COLORS.tab,
    paddingVertical: RFPercentage(1.2),
    paddingHorizontal: RFPercentage(1.8),
    borderRadius: RFPercentage(100),
  },
  activeText: {
    color: COLORS.tbText,
    fontFamily: FONTS.semiBold2,
    fontSize: RFPercentage(1.6),
    marginLeft: RFPercentage(0.5),
  },
});
