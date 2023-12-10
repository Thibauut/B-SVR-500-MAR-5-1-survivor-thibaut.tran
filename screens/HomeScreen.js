import * as Animatable from 'react-native-animatable';
import React, { useState, useEffect } from 'react';
import { StyleSheet,
          TextInput,
          View,
          Image,
          Text,
          TouchableOpacity,
          ImageBackground,
          ScrollView,
          ActivityIndicator,
          FlatList,
          Button,
          Dimensions,
          SafeAreaView,
        } from 'react-native';
import BottomButtonContainer from '../items/BarButton';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as Location from 'expo-location';
import ProfileScreen from './ProfileScreen';
import axios from 'axios';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon2 from 'react-native-vector-icons/FontAwesome';
import { IconButton } from "@react-native-material/core";
import MapView, { Marker } from 'react-native-maps';
import DropDownPicker from 'react-native-dropdown-picker';
import ModalDropdown from 'react-native-modal-dropdown';
import RNPickerSelect from 'react-native-picker-select';
import { LinearGradient } from "expo-linear-gradient";




const Stack = createNativeStackNavigator();

// import { Drawer } from 'react-native-drawer-layout';
// import { Icon } from 'react-native-elements';

const isEven = (id) => {
  return id % 2 === 0;
};

const TabTop = () => {
  return (
    <View style={ styles.blackContainer}>
      <Icon name="more" size={30} color="black" />
    </View>
  );
}


const HomeScreen = () => {
  const navigation = useNavigation();
  const [dataWeather, setDataWeather] = useState({icon: '', text: '', temp: 0, city: '', temp_max: 0, temp_min: 0});
  const [expandedId, setExpandedId] = useState(null);

  const [location, setLocation] = useState({coords: {
    latitude: 0,
    longitude: 0
  }});

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location_tmp = await Location.getCurrentPositionAsync({});
      setLocation(location_tmp);
      getWeather(location_tmp.coords);
    })();
    imageGenerator();
  }, []);


  const getWeather = async (location) => {
    let position = location.latitude + ',' + location.longitude;
    const optionsWeather = {
      method: 'GET',
        url: 'https://weatherapi-com.p.rapidapi.com/current.json',
        params: {q: position},
        headers: {
          'X-RapidAPI-Key': '80d47395c5msh52e2c886ebbe562p1ef55cjsn04546cbdd88e',
          'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com'
        }
      };
      await axios.request(optionsWeather).then(response => {
        const data = {
          icon: 'https:' + response.data.current.condition.icon,
          text: response.data.current.condition.text,
          temp: response.data.current.temp_c,
          city: response.data.location.name,
          // temp_max: response.data.forecast.forecastday[0].day.maxtemp_c,
          // temp_min: response.data.forecast.forecastday[0].day.mintemp_c
        };
        setDataWeather(data);
        // console.log(data);
      }).catch(error => {
        console.log(error);
      });
  }

  // const getNews = async (news) => {
  //     await axios.get('https://newsdata.io/api/1/news?apikey=pub_29019d0c4058f6b09dcfbf23da9d615c458c3&q=cyber%20security').then(response => {
  //       const data = response.data;
  //       setDataNews(data);
  //       console.log(data);
  //     }).catch(error => {
  //       console.log(error);
  //     });
  // }

    const handleItemPress = (id) => {
      setExpandedId(id === expandedId ? null : id);
    };

    const handleImageLoad = () => {
      setIsLoading(false);
    };

    useEffect(() => {
      setIsLoading(true);
    }, [imageUrl]);

    const [fromCurrency, setFromCurrency] = useState('EUR');
    const [toCurrency, setToCurrency] = useState('USD');
    const [newCurrency, setNewCurrency] = useState('')

    const [result, setToResult] = useState('');
    const [amount, setAmount] = useState('');
    const [imageUrl, setImageUrl] = useState('data:image/png;base64,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');
    const imageGenerator = async () => {
      // let encodedParams = new URLSearchParams();
      // encodedParams.set(name='text', value='une partie de bowling');
      const options = {
        method: 'POST',
        url: 'https://open-ai21.p.rapidapi.com/texttoimage2',
        headers: {
          'content-type': 'application/x-www-form-urlencoded',
          'X-RapidAPI-Key': '80d47395c5msh52e2c886ebbe562p1ef55cjsn04546cbdd88e',
          'X-RapidAPI-Host': 'open-ai21.p.rapidapi.com'
        },
        data: { text: 'landscape' },
      };
      try {
        // const response_image = await axios.request(options);
        // setImageUrl(response_image.data.url);
        // console.log(response_image.data.url);
      } catch (error) {
        console.error(error);
      }
    };
    const handleConvert = async (amount) => {
      const options = {
        method: 'GET',
        url: 'https://currency-converter-by-api-ninjas.p.rapidapi.com/v1/convertcurrency',
        params: {
          have: fromCurrency,
          want: toCurrency,
          amount: amount
        },
        headers: {
          'X-RapidAPI-Key': '4351ecdcfamshf16630a57a9b07cp121108jsnac8912d5be05',
          'X-RapidAPI-Host': 'currency-converter-by-api-ninjas.p.rapidapi.com'
        }
      };
      try {
        const response = await axios.request(options);
        console.log(response.data);
        setToResult(response.data.new_amount);
        setNewCurrency(response.data.new_currency);
      } catch (error) {
        console.error(error);
      }
    };

    const currencies = [
      { label: 'USD', value: 'USD' },
      { label: 'EUR', value: 'EUR' },
      { label: 'JPY', value: 'JPY' },
      { label: 'GBP', value: 'GBP' },
      { label: 'AUD', value: 'AUD' },
      { label: 'CAD', value: 'CAD' },
    ];


    const [open, setOpen] = React.useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const widgets = [
      { id: '1', text: 'Translate', icon: '🌤️', large: true, color: '#1a1a1a', item: () => {
        return (
          // <ImageBackground source={require('../assets/moneybg.png')} style={{flex: 1, resizeMode: 'cover', borderRadius: 15}}>

          <LinearGradient style={{flex: 1, borderRadius: 15}} colors={['#4d4d4d', 'black']}>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingBottom: '2%'}}>
              <Text style={{ fontSize: 20, marginLeft: '5%', marginRight: '5%', marginTop: '5%',  color: '#fff' }}>Currency Converter</Text>
              <Image source={require('../assets/money-exchange.png')} style={{ width: '12%', height: '100%', marginTop: '5%', marginLeft: '5%', marginRight: '5%', paddingBottom: '2%'}} />
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
            <View style={styles.pickerContainer}>
              <RNPickerSelect
                items={currencies}
                onValueChange={(value) => setFromCurrency(value)}
                value={fromCurrency}
                style={{fontWeight: 'bold', fontSize: 20}}
              />
            </View>
            <Text style={{ fontSize: 20, margin: '5%', paddingHorizontal: '5%', color: 'white' }}>-></Text>
            <View style={styles.pickerContainer}>
              <RNPickerSelect
                items={currencies}
                onValueChange={(value) => setToCurrency(value)}
                value={toCurrency}
              />
            </View>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: '10%'}}>
              <TextInput
                placeholder="Enter amount..."
                value={amount}
                onEndEditing={(text) => setAmount(text)}
                onChangeText={(text) => setAmount(text)}
                keyboardType="numeric"
                style={{
                  padding: '5%',
                  marginBottom: '2%',
                  fontSize: 14,
                  width: '50%',
                  height: '50%',
                  backgroundColor: 'white',
                  borderRadius: 10,
                  marginTop: '2%',
                  alignSelf: 'center',
                }}
              />
               <TouchableOpacity style={styles.convertButton} onPress = {() => handleConvert(amount)}>
                <Text style={styles.buttonText}>Convert</Text>
              </TouchableOpacity>
            </View>
            <Text style={{fontSize: 16, fontWeight: 'bold', paddingHorizontal: '5%', color: 'white'}}>Result: {result + ' ' + newCurrency}</Text>
        </LinearGradient>
        // </ImageBackground>
        );
      }},
      { id: '12', text: 'Map', icon: '📈', large: true, color: '#d9b3ff', item: () => {
        const coordinate = {
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
        };
        return(
            <MapView
              style={{ width: '100%', height: '100%', borderRadius: 15}}
              initialRegion={{
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
                latitudeDelta: 0.01,
                longitudeDelta: 0.01,
              }}>
                <Marker coordinate={coordinate} />
              </MapView>
        );
      } },
      { id: '7', text: 'Weather', icon: '📰', large: false, color: '#ccb3ff', item: () => {
        return(
          <ImageBackground source={require('../assets/sky.jpg')} imageStyle={{ borderRadius: 15 }} style={{ width: '100%', height: '100%'}} >
            <View style={{ paddingTop: '10%', left: '10%', width: '90%', height: '100%', alignSelf:'auto', padding:5 }}>
          <Text style={{
              fontSize: 20,
              color: 'white',
              fontFamily: 'Helvetica',
             }} >{dataWeather.city}</Text>
          <Text style={{
              fontSize: 50,
              color: 'white',
              fontFamily: 'Helvetica',
          }} >{dataWeather.temp}°</Text>
            {/* <Image source={{uri : dataWeather.icon}} style={{ bottom: '6%', right: '10%', width: '40%', height: '40%'}} /> */}
            <Text style={{
              fontSize: 20,
              color: 'white',
              fontFamily: 'Helvetica',
          }} >{dataWeather.text}</Text>
          </View>
        </ImageBackground>
      )} },
      { id: '3', text: 'News', icon: '🗓️', large: false, color: '#ffbb99', item: () => {
        return (
          (<TouchableOpacity >
          {isLoading ? (
            <View>
              <Image
                  onLoad={handleImageLoad}
                  onProgress={() => {console.log('isLoading_before: '); }}
                  style={{ width: '100%', height: '100%', borderRadius: 15}}
                  source={{uri: imageUrl}}
                />
              <ActivityIndicator size="large" color="white" style={{ width: '100%', height: '100%', alignSelf: 'center', justifyContent: 'center' }} />
            </View>
          ) :
            <Image
              onLoad={handleImageLoad}
              onProgress={() => {console.log('isLoading_before: '); }}
              style={{ width: '100%', height: '100%', borderRadius: 15}}
              source={{uri: imageUrl}}
            />}
          </TouchableOpacity>)
        );
      } },
      // { id: '5', text: 'Contacts', icon: '📇', large: false, color: '#ccb3ff', item: () => {
      //   <View>
      //     <Text>Weather Plus</Text>
      //   </View>
      // } },
      // { id: '9', text: 'Music', icon: '🎵', large: false, color: '#99ddff', item: () => {
      //   <View>
      //     <Text>Weather Plus</Text>
      //   </View>
      // } },
      // { id: '4', text: 'Calendar', icon: '📅', large: true, color: '#d9b3ff', item: () => {
      //   <View>
      //     <Text>Weather Plus</Text>
      //   </View>
      // } },
      // { id: '6', text: 'Mail', icon: '💌', large: true, color: '#b3ccff', item: () => {
      //   <View>
      //     <Text>Weather Plus</Text>
      //   </View>
      // } },
      // { id: '10', text: 'Photos', icon: '🌅', large: false, color: '#b3ccff', item: () => {
      //   <View>
      //     <Text>Weather Plus</Text>
      //   </View>
      // } },
      // { id: '11', text: 'Videos', icon: '🎥', large: false, color: '#99ddff', item: () => {
      //   <View>
      //     <Text>Weather Plus</Text>
      //   </View>
      // } },
      // { id: '8', text: 'Maps', icon: '🗺️', large: true, color: '#ffd9b3', item: () => {
      //   <View>
      //     <Text>Weather Plus</Text>
      //   </View>
      // } },
      // { id: '2', text: 'Notes', icon: '📝', large: false, color: '#b3ffd9', item: () => {
      //   <View>
      //     <Text>Weather Plus</Text>
      //   </View>
      // } },
    ]
  return (
    // <SafeAreaView style={{ width: Dimensions.get('window').width}}>
      <ScrollView style={{flexDirection: 'column'}}
      contentContainerStyle={{alignItems: 'center',paddingBottom: '30%', paddingTop: '2%'}}
      showsVerticalScrollIndicator={false}>
        <View style={{flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-around'}}>
      {widgets.map((item) => (
            <View key={item.id} style={item.large ? {
              borderRadius: 15,
              height: 230,
              marginHorizontal: 8,
              marginVertical: 10,
              width: '95%',
              backgroundColor: item.color,
            } : {
              borderRadius: 15,
              height: 180,
              width: '45%',
              margin: '2%',
              backgroundColor: item.color,
            }}>
              <item.item/>
        </View>
      ))}
      </View>
      </ScrollView>
  );
};

const styles = StyleSheet.create({
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    paddingHorizontal: '5%',
  },
  convertButton: {
    backgroundColor: '#ffe6ff',
    padding: '2%',
    borderRadius: 10,
    marginLeft: 10,
  },
  pickerContainer: {
    // borderWidth: 2,
    // borderColor: 'black',
    borderRadius: 10,
    // marginVertical: 10,
    paddingHorizontal: 10,
    width: '25%',
    padding: '2%',
    backgroundColor: 'white',
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

export default HomeScreen;