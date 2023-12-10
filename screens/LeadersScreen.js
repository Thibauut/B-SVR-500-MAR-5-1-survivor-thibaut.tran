import React from 'react';
import {useState, useEffect} from 'react';
import {StyleSheet,
    TextInput,
    View,
    Image,
    Text,
    TouchableOpacity,
    Button,
    Font,
    SafeAreaView,
    ScrollView,
    ImageBackground,
    Dimensions,
    Alert
  } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';

const LeadersScreen = () => {
    const [jsonData, setJsonData] = useState([]);
    const headers = {
        'accept': 'application/json',
        'X-Group-Authorization': 'DLjsqJHActEeYHiMzNZKdRbtOSeEe4J1',
        'Authorization': 'Bearer ' + window.userToken,
    }
    const getLeaders = async () => {
        await axios.get('https://masurao.fr/api/employees/leaders', {headers}).then((response) => {
            const leaders = response.data;
            setJsonData(leaders);
            // const lop = 'https://masurao.fr/api/employees/' + response.data.id;
            // axios.get('lop', {headers}).then((response2) => {
            // console.log(response2.data);
            // }).catch((error) => {
            //     console.log(error);
            // });
        }).catch((error) => {
            console.log(error);
        });
    };
    useEffect(() => {
        getLeaders();
    }, []);
    const navigation = useNavigation();
    console.log(jsonData);
    return(
        jsonData.map((employeeInfo, index) => {
        return(
            <TouchableOpacity key={index} style={{ top: 8 }}
                onPress={() => {
                    navigation.navigate('EmployeeProfileScreen', employeeInfo);
                }}>
                <View style={styles.container}>

                    <View style={{ flexDirection: 'row', height: '100%', left:'10%' }}>
                        <Image source={{ uri: `https://masurao.fr/api/employees/${employeeInfo.id}/image` }} style={{width: '30%', height: '50%', alignSelf: 'center', borderRadius: 100}} />
                        <View style={{ flexDirection: 'column', height: '30%', top: '23%'}}>
                            <Text style={{ flex: 1, fontSize: 20, fontWeight: 'bold', alignSelf: 'flex-start', left: '10%'}}>{employeeInfo.name + ' ' + employeeInfo.surname}</Text>
                            <Text style={{ flex: 1, fontSize: 20, alignSelf: 'flex-end', left: '10%'}}>{employeeInfo.email}</Text>
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
        )})
    );
}

const styles = StyleSheet.create({
    container: {
        borderRadius: 15,
        height: '60%',
        alignSelf: 'center',
        marginVertical: '5%',
        width: '95%',
        backgroundColor: '#ffcce6',
      }
});

export default LeadersScreen;