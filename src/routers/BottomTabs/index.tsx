import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { RFPercentage } from 'react-native-responsive-fontsize';
import { COLORS, FONTS, ICONS } from '../../config/theme';
import Dashboard from '../../screens/home/dashboard';
import Events from '../../screens/home/events';
import Groups from '../../screens/home/groups';
import Home from '../../screens/home/home';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';

const Tab = createBottomTabNavigator();

const CustomTabBar: React.FC<BottomTabBarProps> = ({
  state,
  descriptors,
  navigation,
}) => {
  return (
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
          const icons = [ICONS.tab1, ICONS.tab2, ICONS.tab3, ICONS.tab4];
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
                tintColor={isFocused ? COLORS.primary : '#82848C'}
                style={{ width: RFPercentage(3.5), height: RFPercentage(3.5) }}
              />
              {isFocused && (
                <Text style={styles.activeText}>{options.title}</Text>
              )}
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

export default function BottomTabs() {
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
      initialRouteName="Groups"
    >
      <Tab.Screen name="Home" component={Home} options={{ title: 'Home' }} />
      <Tab.Screen
        name="Events"
        component={Events}
        options={{ title: 'Events' }}
      />
      <Tab.Screen
        name="Dashboard"
        component={Dashboard}
        options={{ title: 'Dashboard' }}
      />
      <Tab.Screen
        name="Groups"
        component={Groups}
        options={{ title: 'Groups & Chats' }}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  tabContainer: {
    position: 'absolute',
    backgroundColor: '#FFFFFF',
    borderRadius: RFPercentage(3.2),
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 6,
    borderWidth: RFPercentage(0.1),
    borderColor: '#EEEEEE',
    shadowColor: 'rgba(73, 73, 73, 0.12)',
    height: RFPercentage(11),
    width: '90%',
    alignSelf: 'center',
    bottom: RFPercentage(2),
  },
  tabButton: {
    flexDirection: 'row',
    alignItems: 'center',

    justifyContent: 'center',
  },
  activeTab: {
    backgroundColor: '#F6F6F6',
    paddingVertical: RFPercentage(1.3),
    paddingHorizontal: RFPercentage(1.8),
    borderRadius: RFPercentage(100),
  },
  activeText: {
    color: '#151515',
    fontFamily: FONTS.semiBold2,
    fontSize: RFPercentage(1.7),
    marginLeft: RFPercentage(0.5),
  },
});
