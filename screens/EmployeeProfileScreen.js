import axios from 'axios';
import React, { useState } from 'react';
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
  Alert
} from 'react-native';
import { useEffect } from 'react';
import { Buffer } from 'buffer';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { IconButton } from '@react-native-material/core';
import Icon2 from 'react-native-vector-icons/MaterialIcons';
import Icon3 from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
import { AppRegistry } from 'react-native';

const EmployeeProfileScreen = ({ route }) => {
  const employeeInfo = route.params;
  const [imageData, setImageData] = useState(null);
  const [Iuser, setIuser] = useState({});

  const navigation = useNavigation();

  const handleBackButtonPress = () => {
    navigation.goBack();
  };

  const getUserInfo = () => {
    axios.get(`http://192.168.0.30:1234/employees/${employeeInfo.id}`)
      .then(response => {
        const userData = response.data;
        setIuser(userData);
      })
      .catch(error => {
        console.log(error);
      });
  }
  useEffect(() => {
    getUserInfo();
  }, []);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff'}}>
      <View style={styles.containerTitle}>
        <View style={styles.titleContainer}>
          <TouchableOpacity onPress={handleBackButtonPress}>
            <View style={styles.backButton}>
              <Icon style={{ color: "black", top: '70%' }} name="arrow-left" size={40} />
            </View>
          </TouchableOpacity>
          <Text style={{ fontSize: 30, fontWeight: 'bold', padding: '3%', paddingHorizontal: '10%'}}>
            {Iuser.name + '\n' + Iuser.surname}
          </Text>
          <View style={{ flex: 1 }}></View>
        </View>
      </View>
      <View style={styles.container}>
        <View style={styles.infoBox}>
          {(
            <Image source={{ uri: Iuser.imageUrl }} style={styles.image} />
          )}
          <Text style={{fontSize: 30, fontWeight: 'bold', padding: '3%', right: '40%'}}>{'ID: ' + Iuser.id}</Text>
         </View>
       </View>
       <View style={styles.container2}>

       <Text style={{fontSize: 40, fontWeight: 'bold', padding: '2%', paddingHorizontal: '10%', marginBottom: '3%'}}>About</Text>

       <View style={styles.infoContent}>
         <Icon name="email" size={25} color="#000000" style={styles.icon} />
         <Text style={styles.infoText}>
           {Iuser.email}
         </Text>
       </View>

       <View style={styles.infoContent}>
         {Iuser.sexe === 'Male' ? (
          <Icon name="gender-male" size={25} color="#000000" style={styles.icon} />
        ) : (
          <Icon name="gender-female" size={20} color="#000000" style={styles.icon} />
        )}
        <Text style={styles.infoText}>
          {Iuser.sexe}
        </Text>
      </View>

      <View style={styles.infoContent}>
        <Icon3 name="birthday-cake" size={23} color="#000000" style={styles.icon} />
        <Text style={styles.infoText}>
          {Iuser.age}
        </Text>
      </View>

      <View style={styles.infoContent}>
        <Icon2 name="work" size={25} color="#000000" style={styles.icon} />
        <Text style={styles.infoText}>
          {Iuser.fonction}
        </Text>
      </View>
    </View>


    </SafeAreaView>

  );
};

const styles = StyleSheet.create({
  containerTitle: {
    backgroundColor: '#fff',
    height: '20%',
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
  backButton: {
    flex: 1,
  }

});

export default EmployeeProfileScreen;