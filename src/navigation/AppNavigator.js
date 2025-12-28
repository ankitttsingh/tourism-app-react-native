import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Import screens
import HomeScreen from '../screens/HomeScreen';
import DestinationsScreen from '../screens/DestinationsScreen';
import DestinationDetailScreen from '../screens/DestinationDetailScreen';
import BookingScreen from '../screens/BookingScreen';
import ContactScreen from '../screens/ContactScreen';

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerShown: false, // We're using custom headers in each screen
          animation: 'slide_from_right',
        }}
      >
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Destinations" component={DestinationsScreen} />
        <Stack.Screen name="DestinationDetail" component={DestinationDetailScreen} />
        <Stack.Screen name="Booking" component={BookingScreen} />
        <Stack.Screen name="Contact" component={ContactScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;