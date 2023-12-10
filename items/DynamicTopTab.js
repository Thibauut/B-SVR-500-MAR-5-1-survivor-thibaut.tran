import * as React from 'react';
import { View, Text, Dimensions, TouchableOpacity, StyleSheet, FlatList, ScrollView, SafeAreaView} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { useNavigation } from '@react-navigation/native';
import { IconButton } from "@react-native-material/core";
import { NavigationContainer } from '@react-navigation/native';
import LeadersScreen from '../screens/LeadersScreen';
import HomeScreen from '../screens/HomeScreen';
import SearchStacks from '../screens/SearchScreen';
import PlanningStacks from '../screens/PlanningScreen';
import AddWidgetScreen from '../screens/AddWidgetScreen';
import ProfileScreen from '../screens/ProfileScreen';
import Icon2 from 'react-native-vector-icons/FontAwesome';
import Icon3 from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';



const Tab = createBottomTabNavigator();
const TopTab = createMaterialTopTabNavigator();


const DynamicTopTab = () => {
    const navigation = useNavigation();
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: '#fff'}}>
        <View style={styles.containerTitle}>
          <View style={styles.titleContainer}>
          <Text style={{fontSize: 40, fontWeight: 'bold', padding: '7%'}}>Welcome 📱</Text>
            <IconButton disableRipple={true} style={{backgroundColor: 'transparent', position: 'absolute', right: '16%', top: '30%'
            }}
              icon={props => <MaterialCommunityIcon style={{color: "black"}} name="send-circle" size={30} />}
              onPress={() => {
                navigation.navigate('Conversation');
              }}
            />
            <IconButton disableRipple={true} style={{backgroundColor: 'transparent', position: 'absolute', right: '5%', top: '30%'
            }}
              icon={props => <Icon2 style={{color: "black"}} name="plus-circle" size={30} />}
              onPress={() => {
                navigation.navigate('AddWidgetScreen');
              }}
            />
          </View>
          <TopTab.Navigator
              tabBarPosition="top"
              screenOptions={{
                tabBarLabelStyle: {
                  fontSize: 20,
                  textTransform: 'none',
                  fontWeight: 'bold',
                },
                labelStyle: { fontSize: 20, fontWeight: 'bold', color: 'black'},
                style: { backgroundColor: 'black'},
                tabBarIndicatorStyle: { height: '5%', backgroundColor: '#F697F8', width: '20%', alignSelf: 'center', left: '15%', borderRadius: 30},
                tabBarIndicatorContainerStyle: { justifyContent: 'center', alignItems: 'center' },
              }}
            >
              <TopTab.Screen name="Widgets" component={HomeScreen} options={{ tabBarLabel: 'Widgets'}} />
              <TopTab.Screen name="Leaders" component={LeadersScreen} options={{ tabBarLabel: 'Leaders' }} />
          </TopTab.Navigator>
        </View>
      </SafeAreaView>
      );

  };

  const HomeTabs = ({navigation}) => {
    return (
      <Tab.Navigator
      screenOptions={{
        tabBarStyle: { height: '10%', paddingBottom: '5%', paddingTop: '2%'},
        tabBarActiveTintColor: '#fff',
        tabBarInactiveTintColor: '#fff',
      }}>
        <Tab.Screen name="Home" component={DynamicTopTab} options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Icon name="home" color={color} size={size} />
          ),
          tabBarActiveTintColor: '#a26ffc',
          tabBarInactiveTintColor: '#333333',
        }}/>
        <Tab.Screen name="Search" component={SearchStacks} options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcon name="magnify" color={color} size={size} />
          ),
          tabBarActiveTintColor: '#a26ffc',
          tabBarInactiveTintColor: '#333333',
        }}/>
        <Tab.Screen name="Planning" component={PlanningStacks} options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Icon3 name="calendar" color={color} size={size} />
          ),
          tabBarActiveTintColor: '#a26ffc',
          tabBarInactiveTintColor: '#333333',
        }}/>
        <Tab.Screen name="Profile" component={ProfileScreen} options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Icon2 name="user" color={color} size={size} />
          ),
          tabBarActiveTintColor: '#a26ffc',
          tabBarInactiveTintColor: '#333333',
        }}/>
      </Tab.Navigator>
    );
  };

  const styles = StyleSheet.create({
    containerTitle: {
      backgroundColor: '#fff',
      height: '20%',
      flex: 1,
    },
    container: {
      flex: 1,
      backgroundColor: '#fff',
    },
    columnWrapper: {
      flexDirection: 'row',
      flexBasis: '100%',
    },
    smallItem: {
      // flex: 1,
      borderRadius: 15,
      height: 150,
      width: 150,
      backgroundColor: 'lightblue',
      margin: 8,
      alignItems: 'center',
      justifyContent: 'center',
    },
    largeItem: {
      // flex: 2,
      borderRadius: 15,
      height: 150,
      width: 300,
      // backgroundColor: item.color,
      margin: 8,
      alignItems: 'center',
      justifyContent: 'center',
    },
    textAppBar: {
      padding: '5%',
      fontSize: 20,
      fontWeight: 'bold',
      textDecorationLine: 'underline',
      color: 'lightgrey'
    },
    widgetsIcon: {
      flex: 1,
      textAlign: 'center',
      justifyContent: 'center',
      alignItems: 'center',
      fontSize: 50,
    },
    widgetsText: {
      flex: 1,
      textAlign: 'center',
      justifyContent: 'center',
      alignItems: 'center',
      fontSize: 20,
    },
    blackContainer: {
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'grey',
      borderRadius: 10,
      height: 20,
      width: 20,
      margin: 20,
    },
    scrollBar: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    }
  });

  export default HomeTabs;

  export {MyTabs};

  export {DynamicTopTab};
