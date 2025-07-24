import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import OnBoarding from '../../screens/onboarding';
import Login from '../../screens/auth/login';
import SignUp from '../../screens/auth/signup';
import RoleSelection from '../../screens/auth/role_selection';
import ProfileSetup from '../../screens/auth/profile_setup';

export type RootStackParamList = {
  OnBoarding: undefined;
  Login: undefined;
  SignUp: undefined;
  RoleSelection: undefined;
  ProfileSetup : undefined;
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
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="SignUp" component={SignUp} />
        <Stack.Screen name="RoleSelection" component={RoleSelection} />
        <Stack.Screen name="ProfileSetup" component={ProfileSetup} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigator;

const styles = StyleSheet.create({});
