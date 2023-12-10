// import 'react-native-gesture-handler';
// import 'react-native-reanimated';
// navigator.geolocation = require('@react-native-community/geolocation');
import React, { useState, useEffect } from 'react';
import {StyleSheet, TextInput, View, Image, Text, TouchableOpacity} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './screens/LoginScreen';
import HomeTabs from './items/DynamicTopTab';
import AddWidgetScreen from './screens/AddWidgetScreen';
import EmployeeProfileScreen from './screens/EmployeeProfileScreen';
import Conversation from './screens/Conversation';
import ChatScreen from './screens/ChatScreen';
import PlanningScreen from './screens/PlanningScreen';
import { MyProvider } from './utils/Provider';

const Stack = createStackNavigator();


function App() {
  const [errorMsg, setErrorMsg] = useState(null);
  const [location, setLocation] = useState(null);

  // navigator.geolocation.getCurrentPosition();
//   if (navigator.geolocation) {
//     var location_timeout = setTimeout("geolocFail()", 10000);

//     navigator.geolocation.getCurrentPosition(function(position) {
//         clearTimeout(location_timeout);

//         var lat = position.coords.latitude;
//         var lng = position.coords.longitude;

//         geocodeLatLng(lat, lng);
//     }, function(error) {
//         clearTimeout(location_timeout);
//         geolocFail();
//     });
// } else {
//   console.log('ERROR');
// }
  return (
    <MyProvider>
      <NavigationContainer>
        <Stack.Navigator >
          <Stack.Screen name="Login" component={LoginScreen} options={{headerShown: false, gestureEnabled: false, title: 'Restaurants'}}/>
          <Stack.Screen name="HomeScreen" component={HomeTabs} options={{headerShown: false, gestureEnabled: false}}/>
          <Stack.Screen name="EmployeeProfileScreen" component={EmployeeProfileScreen} options={{headerShown: false}} />
          <Stack.Screen name="Conversation" component={Conversation} options={{headerShown: false, gestureEnabled: false}}/>
          <Stack.Screen name="ChatScreen" component={ChatScreen} options={{headerShown: false, gestureEnabled: false}}/>
          <Stack.Screen name="AddWidgetScreen" component={AddWidgetScreen} options={{headerShown: false, gestureEnabled: false}}/>
          <Stack.Screen name="PlanningScreen" component={PlanningScreen} options={{headerShown: false, gestureEnabled: false}}/>
        </Stack.Navigator>
      </NavigationContainer>
    </MyProvider>
  );
};

export default App;