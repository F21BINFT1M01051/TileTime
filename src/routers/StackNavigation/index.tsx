import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import OnBoarding from '../../screens/common/onboarding';
import Login from '../../screens/common/auth/login';
import SignUp from '../../screens/common/auth/signup';
import RoleSelection from '../../screens/common/auth/role_selection';
import CreateGroup from '../../screens/common/home/groups/create-groups';
import GroupDetails from '../../screens/common/home/groups/create-groups/group-details';
import LoginSignUp from '../../screens/common/auth/login-signup';
import UserDetails from '../../screens/common/home/groups/chat/user-details';
import GroupSettings from '../../screens/common/home/groups/create-groups/group-settings';
import GroupAdmins from '../../screens/common/home/groups/create-groups/group-admins';
import GroupMembers from '../../screens/common/home/groups/create-groups/group-members';
import ChatScreen from '../../screens/common/home/groups/chat';
import EditProfile from '../../screens/player/my-profile/edit-profile';
import CreateInstructorProfile from '../../screens/player/my-profile/create-instructor-profile';
import PlayerProfileSetup from '../../screens/player/profile-setup';
import PlayerTabs from '../PlayerTabs';
import InstructorProfileSetup from '../../screens/instructor/profile_setup';
import InstructorTabs from '../InstructorTabs';
import EditProfileInstructor from '../../screens/instructor/my-profile/edit-profile';
import Notifications from '../../screens/common/home/notifications';
import SearchScreen from '../../screens/common/home/search';
import PlayerProfile from '../../screens/common/home/search/profiles/player-profile';
import InstructorProfile from '../../screens/common/home/search/profiles/instructor-profile';
import PayoutsInstructor from '../../screens/instructor/payouts';
import InviteFriends from '../../screens/common/home/invite-friends';
import Dashboard from '../../screens/instructor/dashboard';
import EventDetails from '../../screens/common/home/events/event-details';
import InvitePlayer from '../../screens/common/home/events/create-events/invite-player';
import InviteGroup from '../../screens/common/home/events/create-events/invite-group';
import SelectPlayers from '../../screens/common/home/events/create-events/select-players';
import GuidedPlay from '../../screens/common/home/events/create-events/guided-play';
import SelectPlayersInstructor from '../../screens/instructor/create-lessons';
import CreateLessonInstructor from '../../screens/instructor/create-lessons/lesson';
import CreateLessonPlayer from '../../screens/player/create-lesson';
import SelectLessonInstructors from '../../screens/player/create-lesson/select-instructor';
import Payouts from '../../screens/common/home/payouts';
import OpenPlayEventDetail from '../../screens/instructor/manage-events/open-play/event-detail';
import EventAttendees from '../../screens/instructor/manage-events/attendees';
import EventInsights from '../../screens/instructor/manage-events/insights';

export type RootStackParamList = {
  OnBoarding: undefined;
  Login: undefined;
  SignUp: undefined;
  RoleSelection: undefined;
  CreateGroup: undefined;
  GroupDetails: undefined;
  LoginSignUp: undefined;
  UserDetails: undefined;
  GroupSettings: undefined;
  GroupAdmins: undefined;
  GroupMembers: undefined;
  PlayerProfile: undefined;
  ChatScreen: undefined;
  SearchScreen: undefined;
  InstructorProfile: undefined;
  EditProfile: undefined;
  CreateInstructorProfile: undefined;
  PlayerProfileSetup: undefined;
  PlayerTabs: undefined;
  InstructorProfileSetup: undefined;
  InstructorTabs: undefined;
  EditProfileInstructor: undefined;
  Notifications: undefined;
  PayoutsInstructor: undefined;
  InviteFriends: undefined;
  InvitePlayer: undefined;
  InviteGroup: undefined;
  SelectPlayers: undefined;
  GuidedPlay: undefined;
  Dashboard: undefined;
  EventDetails: undefined;
  SelectPlayersInstructor: undefined;
  CreateLessonInstructor: undefined;
  CreateLessonPlayer: undefined;
  SelectLessonInstructors: undefined;
  Payouts: undefined;
  OpenPlayEventDetail: undefined;
  EventAttendees:undefined;
  EventInsights:undefined
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
        <Stack.Screen name="InstructorTabs" component={InstructorTabs} />

        {/* ----------------Common Flow----------- */}
        <Stack.Screen name="OnBoarding" component={OnBoarding} />
        <Stack.Screen name="LoginSignUp" component={LoginSignUp} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="SignUp" component={SignUp} />
        <Stack.Screen name="RoleSelection" component={RoleSelection} />
        <Stack.Screen name="CreateGroup" component={CreateGroup} />
        <Stack.Screen name="GroupDetails" component={GroupDetails} />
        <Stack.Screen name="UserDetails" component={UserDetails} />
        <Stack.Screen name="GroupSettings" component={GroupSettings} />
        <Stack.Screen name="GroupAdmins" component={GroupAdmins} />
        <Stack.Screen name="GroupMembers" component={GroupMembers} />
        <Stack.Screen name="Notifications" component={Notifications} />
        <Stack.Screen name="ChatScreen" component={ChatScreen} />
        <Stack.Screen name="SearchScreen" component={SearchScreen} />
        <Stack.Screen name="InviteFriends" component={InviteFriends} />
        <Stack.Screen name="InvitePlayer" component={InvitePlayer} />
        <Stack.Screen name="InviteGroup" component={InviteGroup} />
        <Stack.Screen name="SelectPlayers" component={SelectPlayers} />
        <Stack.Screen name="GuidedPlay" component={GuidedPlay} />
        <Stack.Screen name="Dashboard" component={Dashboard} />
        <Stack.Screen name="EventDetails" component={EventDetails} />
        <Stack.Screen name="Payouts" component={Payouts} />

        <Stack.Screen
          name="SelectPlayersInstructor"
          component={SelectPlayersInstructor}
        />
        <Stack.Screen
          name="CreateLessonInstructor"
          component={CreateLessonInstructor}
        />

        <Stack.Screen
          name="CreateLessonPlayer"
          component={CreateLessonPlayer}
        />
        <Stack.Screen
          name="SelectLessonInstructors"
          component={SelectLessonInstructors}
        />

        {/* --------------------Player Flow-------------------- */}
        <Stack.Screen name="PlayerTabs" component={PlayerTabs} />
        <Stack.Screen
          name="PlayerProfileSetup"
          component={PlayerProfileSetup}
        />
        <Stack.Screen name="PlayerProfile" component={PlayerProfile} />
        <Stack.Screen name="EditProfile" component={EditProfile} />
        <Stack.Screen
          name="CreateInstructorProfile"
          component={CreateInstructorProfile}
        />

        {/* ------------------------Instructor Flow------------------- */}
        {/* <Stack.Screen name="InstructorTabs" component={InstructorTabs} /> */}
        <Stack.Screen
          name="InstructorProfileSetup"
          component={InstructorProfileSetup}
        />
        <Stack.Screen
          name="EditProfileInstructor"
          component={EditProfileInstructor}
        />
        <Stack.Screen name="InstructorProfile" component={InstructorProfile} />
        <Stack.Screen name="PayoutsInstructor" component={PayoutsInstructor} />
        <Stack.Screen
          name="OpenPlayEventDetail"
          component={OpenPlayEventDetail}
        />
        <Stack.Screen
          name="EventAttendees"
          component={EventAttendees}
        />
         <Stack.Screen
          name="EventInsights"
          component={EventInsights}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigator;

const styles = StyleSheet.create({});
