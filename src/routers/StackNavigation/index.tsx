import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import OnBoarding from '../../screens/onboarding';
import Login from '../../screens/auth/login';
import SignUp from '../../screens/auth/signup';
import RoleSelection from '../../screens/auth/role_selection';
import ProfileSetup from '../../screens/auth/profile_setup';
import BottomTabs from '../BottomTabs';
import CreateGroup from '../../screens/home/groups/create-groups';
import GroupCreated from '../../screens/home/groups/create-groups/group-created';
import GroupDetails from '../../screens/home/groups/create-groups/group-details';
import LoginSignUp from '../../screens/auth/login-signup';
import DirectChat from '../../screens/home/groups/chat/direct-chat';
import UserDetails from '../../screens/home/groups/chat/user-details';
import GroupSettings from '../../screens/home/groups/create-groups/group-settings';
import GroupAdmins from '../../screens/home/groups/create-groups/group-admins';
import GroupMembers from '../../screens/home/groups/create-groups/group-members';
import PlayerProfile from '../../screens/home/groups/create-groups/player-profile';

export type RootStackParamList = {
  OnBoarding: undefined;
  Login: undefined;
  SignUp: undefined;
  RoleSelection: undefined;
  ProfileSetup: undefined;
  BottomTabs: undefined;
  CreateGroup: undefined;
  GroupCreated: undefined;
  GroupDetails: undefined;
  LoginSignUp: undefined;
  DirectChat: undefined;
  UserDetails: undefined;
  GroupSettings: undefined;
  GroupAdmins: undefined;
  GroupMembers: undefined;
  PlayerProfile:undefined
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const Navigator: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="OnBoarding" component={OnBoarding} />
        <Stack.Screen name="LoginSignUp" component={LoginSignUp} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="SignUp" component={SignUp} />
        <Stack.Screen name="RoleSelection" component={RoleSelection} />
        <Stack.Screen name="ProfileSetup" component={ProfileSetup} />
        <Stack.Screen name="BottomTabs" component={BottomTabs} />
        <Stack.Screen name="CreateGroup" component={CreateGroup} />
        <Stack.Screen name="DirectChat" component={DirectChat} />
        <Stack.Screen name="GroupCreated" component={GroupCreated} />
        <Stack.Screen name="GroupDetails" component={GroupDetails} />
        <Stack.Screen name="UserDetails" component={UserDetails} />
        <Stack.Screen name="GroupSettings" component={GroupSettings} />
        <Stack.Screen name="GroupAdmins" component={GroupAdmins} />
        <Stack.Screen name="GroupMembers" component={GroupMembers} />
        <Stack.Screen name="PlayerProfile" component={PlayerProfile} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigator;

const styles = StyleSheet.create({});
