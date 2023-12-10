import React, { useState, useContext } from 'react';
import HomeScreen from './HomeScreen';
import {StyleSheet,
  TextInput,
  View,
  Image,
  Text,
  TouchableOpacity,
  Font,
  SafeAreaView,
  ScrollView,
  ImageBackground,
  Dimensions,
  Alert,
  Animated
} from 'react-native';
import { useEffect, useRef } from 'react';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon2 from 'react-native-vector-icons/MaterialIcons';
import { MyContext} from '../utils/Provider'
import { Buffer } from 'buffer';

window.userToken = '';

const LoginScreen = () => {
  const { updateEmployeeData } = useContext(MyContext);
  const { updateEmployeeTmpData } = useContext(MyContext);
  const { updateProfileData } = useContext(MyContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const [isPasswordVisible, setPasswordVisible] = useState(false);
  const togglePasswordVisibility = () => {
    setPasswordVisible(!isPasswordVisible);
  };

  const [isEmailFocused, setIsEmailFocused] = useState(false);
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);
  const handleEmailFocus = () => {
    setIsEmailFocused(true);
    setIsPasswordFocused(false);
  };
  const handlePasswordFocus = () => {
    setIsPasswordFocused(true);
    setIsEmailFocused(false);
  };
  const emailBorderColor = isEmailFocused ? '#a64dff' : '#000000';
  const passwordBorderColor = isPasswordFocused ? '#a64dff' : '#000000';

  const [scrollY] = useState(new Animated.Value(0));

  const navigation = useNavigation();
  const handlePress = (email, password) => {
    const data_login = {
      email,
      password
    }
    // console.log(data_login);
    axios.post('http://192.168.0.30:1234/employee/login', data_login ).then(response => {
      if (response.status === 200) {
        updateProfileData(response.data);
        getEmployees();
        navigation.navigate('HomeScreen');
      }
    }).catch(error => {
      console.log(error);
      if (error.response.status === 401) {
        console.log("Invalid Email and Password combination.");
        setErrorMessage("Invalid Email and Password combination.");
      }
      if (error.response.status === 422) {
        console.log("Server error.");
        setErrorMessage("Server error.");
      }
    });
  };

  const getEmployees = async () => {
    axios.get('http://192.168.0.30:1234/employees').then(async response => {
      const employees = response.data;
      updateEmployeeData(employees);
      updateEmployeeTmpData(employees);
    }).catch(error => {
      console.log(error);
    });
  }

  const scrollViewRef = useRef();
  const [userScrolled, setUserScrolled] = useState(false);

  const headerOpacity = scrollY.interpolate({
    inputRange: [10, 300],
    outputRange: [1, 0],
    extrapolate: 'clamp',
  });

  const contentOpacity = scrollY.interpolate({
    inputRange: [200, 700],
    outputRange: [0, 1],
    extrapolate: 'clamp',
  });

  const scrollToBottom = () => {
    if (scrollViewRef.current && userScrolled) {
      const scrollYValue = scrollY._value;
      const scrollDuration = 500;

      Animated.timing(scrollY, {
        toValue: scrollYValue + 6000,
        duration: scrollDuration,
        useNativeDriver: false,
      }).start();
    }
  };

  useEffect(() => {
    if (userScrolled) {
      scrollToBottom();
    }
  }, [userScrolled]);

  const handleScroll = (event) => {
    const yOffset = event.nativeEvent.contentOffset.y;
    if (yOffset > 50) {
      setUserScrolled(true);
    }
  };

  useEffect(() => {
    Animated.timing(scrollY, {
      toValue: 100,
      duration: 500,
      useNativeDriver: false,
    }).start();
  }, []);

  return (
    <ImageBackground source={require('../assets/background.jpg')} style={styles.backgroundImage}>
      <SafeAreaView style={styles.container}>
        <ScrollView contentContainerStyle={{
          paddingTop: '15%',
          paddingHorizontal: '8%',
          paddingBottom: '140%',
        }}
        ref={scrollViewRef}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: false }
        )}
        scrollEventThrottle={16}
        onScrollBeginDrag={(event) => handleScroll(event)}
        >
        <Animated.View style={{ opacity: headerOpacity }}>
          <View style={{ height: '50%', width: '90%', marginTop: '20%' ,alignSelf: 'center', marginBottom: '20%'}}>
            <Image source={require('../assets/CollabZ.png')} style={{ flex: 1, width: '90%', height: '90%', resizeMode: 'contain', alignSelf:'center', transform: [{ scale: 2.5 }]}} />
          </View>
        </Animated.View>
          <Animated.Text style={{fontSize: 15, color: '#000000', marginBottom: '30%', fontWeight: 'bold', alignSelf: 'center', opacity: headerOpacity}}>
            Want to login ? Swipe up ! ⬆️
          </Animated.Text>

          <Animated.View style={{ opacity: contentOpacity }}>
          <Text style={{fontSize: 50, color: '#000000', marginBottom: 20, fontWeight: 'bold'}}>
            Login
          </Text>
          <Text style={{fontSize: 20, color: '#333333', marginBottom: 50}}>
            Welcome back ! 💻
          </Text>

          {errorMessage ? (
            <Text style={styles.errorMessage}>{errorMessage}</Text>
          ) : null}

          <View style={[styles.inputEmailContainer, { borderColor: emailBorderColor }]}>
            <TextInput
              placeholder="Email"
              value={email}
              style={styles.textBox}
              onChangeText={(text) => setEmail(text)}
              onFocus={handleEmailFocus}
            />
            <Icon name="email-outline" size={20} color="#000000" style={{ paddingHorizontal: '2%'}}/>
          </View>

          <View style={[styles.inputPasswordContainer, { borderColor: passwordBorderColor }]}>
            <TextInput
              placeholder="Password"
              value={password}
              style={styles.textBox}
              secureTextEntry={!isPasswordVisible}
              onChangeText={(text) => setPassword(text)}
              onFocus={handlePasswordFocus}
            />
            <TouchableOpacity onPress={togglePasswordVisibility} style={styles.iconContainer}>
              <Icon2
                name={isPasswordVisible ? 'visibility' : 'visibility-off'}
                size={25}
                color="#000000"
              />
            </TouchableOpacity>
          </View>
          <TouchableOpacity onPress={() => handlePress(email, password)} style={styles.loginBtn}>
            <Text style={{fontWeight: 'bold', fontSize: 15, color: '#fff'}}>
              LETS GO ! 🚀
            </Text>
          </TouchableOpacity>
          </Animated.View>
        </ScrollView>
      </SafeAreaView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0,5)',
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
  },
  inputEmailContainer: {
    marginTop: '10%',
    borderWidth: '2%',
    borderRadius: 15,
    backgroundColor: '#ffffff',
    height: '9%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: "center",
  },
  inputPasswordContainer: {
    marginTop: '10%',
    borderWidth: '2%',
    borderRadius: 15,
    height: '9%',
    backgroundColor: '#ffffff',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: "center",
  },
  loginBtn: {
    width: "80%",
    borderRadius: 15,
    height: '8%',
    alignItems: "center",
    justifyContent: "center",
    marginTop: '30%',
    backgroundColor: "#a64dff",
    alignSelf: 'center',
  },

  textBox:{
    margin: '3%',
    borderRadius: 15,
    padding: '2%',
    width:'80%',
    alignItems: "center",
    height: '80%',
  },
  iconContainer: {
    padding: '2%',
  },
  errorMessage: {
    color: '#ff4d4d',
    padding: '2%',
    paddingHorizontal: '13%',
    fontWeight: 'bold',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 13,
  },
});

export default LoginScreen;