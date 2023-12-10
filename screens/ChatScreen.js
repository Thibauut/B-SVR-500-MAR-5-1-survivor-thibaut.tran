import axios from 'axios';
import React, { useState, useCallback, useContext } from 'react';
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
  Buttons
} from 'react-native';
import { useEffect } from 'react';
import { Buffer } from 'buffer';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Button, IconButton } from '@react-native-material/core';
import Icon2 from 'react-native-vector-icons/MaterialIcons';
import Icon3 from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
import { AppRegistry } from 'react-native';
import { GiftedChat, Send, Bubble } from 'react-native-gifted-chat'
import io from 'socket.io-client';
import { MyContext } from '../utils/Provider';

const ChatScreen = ({ route }) => {
  const employeeInfo = route.params;
  const {data, setData} = useContext(MyContext);
  const navigation = useNavigation();
  const socket = io('http://192.168.0.36:3000/');
  socket.emit('join', 1);
    let idSocket = null;
    useEffect(() => {
      socket.on('set id', (data) => {
        if (idSocket == null)
          idSocket = data;
      });
      socket.on('message received', (message) => {
        const uniqueId = new Date().getTime();
        let formattedMessage = {
          _id: uniqueId,
          text: message.text,
          createdAt: new Date(message.createdAt),
          user: {
            name: employeeInfo.name + ' ' + employeeInfo.surname,
            _id: 2,
          },
        };
        if (message.id !== idSocket)
          setMessages((previousMessages) => GiftedChat.append(previousMessages, [formattedMessage]));
      });
    }, []);

    const handleBackButtonPress = () => {
      navigation.goBack();
      socket.emit('leave', 1);
    };
    // const getUserInfo = () => {
    //     const headers = {
    //       'accept': 'application/json',
    //       'X-Group-Authorization': 'DLjsqJHActEeYHiMzNZKdRbtOSeEe4J1',
    //       'Authorization': 'Bearer ' + window.userToken,
    //     };
    //     axios.get(`https://masurao.fr/api/employees/${employeeInfo.id}`, {headers})
    //       .then(response => {
    //         const userData = response.data;
    //         setIuser(userData);

    //       })
    //       .catch(error => {
    //         console.log(error);
    //       });
    //   }
    //   useEffect(() => {
    //     getUserInfo();
    // }, []);

    const [messages, setMessages] = useState([]);

    const onSend = useCallback((messages = []) => {
      messages[0].groupId = 1;
      messages[0].id = idSocket;
      socket.emit('message', messages[0]);
      setMessages(previousMessages => GiftedChat.append(previousMessages, messages),)
      messages = [];
    }, [])

    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: '#fff'}}>
        <View style={styles.containerTitle}>
            <View style={styles.titleContainer}>
            <TouchableOpacity onPress={handleBackButtonPress}>
                <View style={styles.backButton}>
                <Icon style={{ color: "black", top: '70%' }} name="arrow-left" size={40} />
                </View>
            </TouchableOpacity>
            <Text style={{ fontSize: 20, fontWeight: 'bold', padding: '3%', paddingHorizontal: '10%', top: '5.5%', alignSelf: 'center' }}>
                {data.me.name + ' ' + data.me.surname}
            </Text>
            <View style={{ flex: 1 }}></View>
            </View>
        </View>
        <GiftedChat
          messages={messages}
          onSend={messages => onSend(messages)}
          user={{
            _id: 1,
          }}
        />
    </SafeAreaView>
    );
}

const styles = StyleSheet.create({
  test: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
	containera: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderTopColor: '#ccc',
  },
	iconContainer: {
    paddingHorizontal: 8,
  },
  textInput: {
    flex: 1,
    fontSize: 16,
    paddingVertical: 8,
  },
  containerTitle: {
    backgroundColor: '#fff',
    height: '13%',
  },
  titleContainer: {
    paddingTop: '5%',
    flexDirection: 'row',
    justifyContent: 'center',
    paddingHorizontal: '3%',
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  containerChat: {
    flex: 1,
    backgroundColor: '#fff',
		alignItems: 'center',
		width: '90%',
  },
  container2: {
    flex: 3,
    backgroundColor: '#fff',
  },
  image: {
    width: '29%',
    height: '70%',
    resizeMode: 'cover',
    borderRadius: 180,
    position: 'relative',
    padding: '1%',
    left: '1%',
  },
  infoBox: {
    backgroundColor: '#ffb3b3',
    flexDirection: 'row',
    height: '82%',
    width: '90%',
    borderRadius: 20,
    position: 'absolute',
    marginBottom: '2%',
    marginTop: '2%',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: '10%',
  },
  infoContent: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: '1%',
    left: '15%',
  },
  infoTextTitle: {
    fontSize: 30,
    color: '#000000',
    marginTop: '6%',
    marginBottom: '2%',
    textAlign: 'center',
  },
  infoText: {
    fontSize: 15,
    color: '#000000',
    marginBottom: "2%",
    textAlign: 'center',
  },
  icon: {
    marginRight: '4%',
    marginBottom: '2.1%',
  },
});

export default ChatScreen;