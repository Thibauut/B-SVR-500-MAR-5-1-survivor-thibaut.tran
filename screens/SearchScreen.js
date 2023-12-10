import React, { useState, useContext } from 'react';
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
  ActivityIndicator
} from 'react-native';
import { useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { Buffer } from 'buffer';
import filter from 'lodash.filter';
import { MyContext} from '../utils/Provider'

const SearchScreen = () => {
  const {data, setData} = useContext(MyContext);
  const { updateEmployeeData } = useContexzt(MyContext);
  const [searchQuery, setSearchQuery] = useState('');

  function handleSearch (text) {
    setSearchQuery(text);
    const formattedQuery = text.toLowerCase();
    const filteredData = filter(data.employeeTmp, employee => {
      return contains(employee, formattedQuery);
    });
    updateEmployeeData(filteredData);
  }

  const contains = ({ name, surname }, query) => {
    const fullName = `${name.toLowerCase()} ${surname.toLowerCase()}`;
    if (fullName.includes(query)) {
      return true;
    }
    return false;
  }

  const navigation = useNavigation();
  const onItemClick = (employeeInfo) => {
    console.log(employeeInfo);
    navigation.navigate('EmployeeProfileScreen', employeeInfo);
  };

  console.log(data.employee);
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff'}}>
      <View style={styles.container}>
        <Text style={{fontSize: 40, fontWeight: 'bold', padding: '7%'}}>Search 🔎</Text>
      </View>
      <TextInput
        placeholder='Looking for an employee ?'
        clearButtonMode="always"
        style={{
          marginHorizontal: '5%',
          paddingHorizontal: '6%',
          paddingVertical: '3%',
          marginBottom: '5%',
          borderRadius: 16,
          borderColor: '#000000',
          borderWidth: 2,
        }}
        value={searchQuery}
        onChangeText={(text) => handleSearch(text)}
      ></TextInput>
      <ScrollView contentContainerStyle={styles.container2}>
        {
        (data.employee.map((employeeInfo, index) => (
          <TouchableOpacity
            key={index}
            style={styles.employeeContainer}
            onPress={() => onItemClick(employeeInfo)}>
            <View style={styles.employeeInfo}>
              <Text>{employeeInfo.name + ' ' + employeeInfo.surname}</Text>
              <Text>{employeeInfo.email}</Text>
              <Text>ID: {employeeInfo.id}</Text>
            </View>
              <Image style={styles.employeeImage} source={{ uri: employeeInfo.imageUrl }} />
          </TouchableOpacity>
        ))
      )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    height: '15%',
  },
    container2: {
        flexGrow: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        paddingTop: '7%',
    },
    employeeContainer: {
      padding: '3%',
      backgroundColor: '#e1d0fc',
      borderRadius: 20,
      marginBottom: 16,
      width: '90%',
      alignItems: 'center',
      flexDirection: 'row',
    },
    employeeInfo: {
      flex: 1,
    },
    employeeImage: {
      width: '12%',
      height: '85%',
      borderRadius: 50,
      marginLeft: 5,
    },
});

export default SearchScreen;
