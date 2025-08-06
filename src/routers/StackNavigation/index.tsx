import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import BottomTabs from '../BottomTabs';
import OnBoarding from '../../screens/common/onboarding';
import Login from '../../screens/common/auth/login';
import SignUp from '../../screens/common/auth/signup';
import RoleSelection from '../../screens/common/auth/role_selection';
import ProfileSetup from '../../screens/common/auth/profile_setup';
import CreateGroup from '../../screens/common/home/groups/create-groups';
import GroupDetails from '../../screens/common/home/groups/create-groups/group-details';
import LoginSignUp from '../../screens/common/auth/login-signup';
import UserDetails from '../../screens/common/home/groups/chat/user-details';
import GroupSettings from '../../screens/common/home/groups/create-groups/group-settings';
import GroupAdmins from '../../screens/common/home/groups/create-groups/group-admins';
import GroupMembers from '../../screens/common/home/groups/create-groups/group-members';
import ChatScreen from '../../screens/common/home/groups/chat';
import PlayerSearch from '../../screens/player/search';
import PlayerProfile from '../../screens/player/search/profiles/player-profile';
import InstructorProfile from '../../screens/player/search/profiles/instructor-profile';
import MyProfile from '../../screens/player/my-profile';
import EditProfile from '../../screens/player/my-profile/edit-profile';

export type RootStackParamList = {
  OnBoarding: undefined;
  Login: undefined;
  SignUp: undefined;
  RoleSelection: undefined;
  ProfileSetup: undefined;
  BottomTabs: undefined;
  CreateGroup: undefined;
  GroupDetails: undefined;
  LoginSignUp: undefined;
  UserDetails: undefined;
  GroupSettings: undefined;
  GroupAdmins: undefined;
  GroupMembers: undefined;
  PlayerProfile: undefined;
  ChatScreen: undefined;
  PlayerSearch: undefined;
  InstructorProfile: undefined;
  MyProfile: undefined;
  EditProfile:undefined
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
        {/* <Stack.Screen name="OnBoarding" component={OnBoarding} />
        <Stack.Screen name="LoginSignUp" component={LoginSignUp} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="SignUp" component={SignUp} />
        <Stack.Screen name="RoleSelection" component={RoleSelection} />
        <Stack.Screen name="ProfileSetup" component={ProfileSetup} /> */}
        <Stack.Screen name="BottomTabs" component={BottomTabs} />
        <Stack.Screen name="CreateGroup" component={CreateGroup} />
        <Stack.Screen name="GroupDetails" component={GroupDetails} />
        <Stack.Screen name="UserDetails" component={UserDetails} />
        <Stack.Screen name="GroupSettings" component={GroupSettings} />
        <Stack.Screen name="GroupAdmins" component={GroupAdmins} />
        <Stack.Screen name="GroupMembers" component={GroupMembers} />
        <Stack.Screen name="PlayerProfile" component={PlayerProfile} />
        <Stack.Screen name="ChatScreen" component={ChatScreen} />
        <Stack.Screen name="PlayerSearch" component={PlayerSearch} />
        <Stack.Screen name="InstructorProfile" component={InstructorProfile} />
        <Stack.Screen name="MyProfile" component={MyProfile} />
        <Stack.Screen name="EditProfile" component={EditProfile} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigator;

const styles = StyleSheet.create({});
