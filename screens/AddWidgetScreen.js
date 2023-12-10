import React, { useState } from 'react';
import {TextInput,
  Image,
  TouchableOpacity,
  Font,
  SafeAreaView,
  ScrollView,
  ImageBackground,
  Dimensions,
  Alert
} from 'react-native';
import { StyleSheet, View, Text, Switch } from "react-native";
import MaterialCommunityIconsIcon from "react-native-vector-icons/MaterialCommunityIcons";
import IoniconsIcon from "react-native-vector-icons/Ionicons";
import CupertinoSearchBarBasic from "./CupertinoSearchBarBasic";
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';


function AddWidgetScreen(props) {
  const [switchValue, setSwitchValue] = useState(false);

  const navigation = useNavigation();
  const handleBackButtonPress = () => {
      navigation.goBack();
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff'}}>
      <View style={styles.containerTitle}>
          <View style={styles.titleContainer}>
          <TouchableOpacity onPress={handleBackButtonPress}>
              <View style={{flex: 1, left: '30%', marginBottom: '80%'}}>
              <Icon style={{ color: "black", top: '70%' }} name="arrow-left" size={40} />
              </View>
          </TouchableOpacity>
          <Text style={{ fontSize: 40, fontWeight: 'bold', padding: '3%', paddingHorizontal: '15%', top:"3%"}}>
              Add Widget 📲
          </Text>
          <View style={{ flex: 1 }}></View>
          </View>
      </View>
      <View style={styles.editScreen}>
         <View style={styles.sizeBox}>
           <Text style={styles.size}>Size</Text>
           {/* <View style={styles.groupRow}>
             <View style={styles.group}>
               <Text style={styles.small}>Small</Text>
             </View>
             <Switch
               value={switchValue}
               disabled={false}
               style={styles.switch}
             onPress={() => setSwitchValue(!switchValue)}
             ></Switch>
             <Text style={styles.large}>Large</Text>
           </View> */}
         </View>
        </View>
    </SafeAreaView>


    // <View style={styles.container}>
    //   <View style={styles.icon2Row}>
    //     <MaterialCommunityIconsIcon
    //       name="home"
    //       style={styles.icon2}
    //     ></MaterialCommunityIconsIcon>
    //     <View style={styles.createWidgetScreen}>
    //       <View style={styles.appBar}>
    //         <TouchableOpacity onPress={handleBackButtonPress}>
    //             <View style={styles.backButton}>
    //               <Icon style={{ color: "black", top: '70%' }} name="arrow-left" size={40} />
    //             </View>
    //         </TouchableOpacity>
    //         <Text style={styles.addWidget}>Add Widget</Text>
    //       </View>
    //       <View style={styles.editScreen}>
    //         <View style={styles.sizeBox}>
    //           <Text style={styles.size}>Size</Text>
    //           <View style={styles.groupRow}>
    //             <View style={styles.group}>
    //               <Text style={styles.small}>Small</Text>
    //             </View>
    //             <Switch
    //               value={switchValue}
    //               disabled={false}
    //               style={styles.switch}
    //               // onPress={() => setSwitchValue(!switchValue)}
    //             ></Switch>
    //             <Text style={styles.large}>Large</Text>
    //           </View>
    //         </View>
    //         <View style={styles.contentBox}>
    //           <Text style={styles.content}>Content</Text>
    //           <CupertinoSearchBarBasic
    //             inputLeftIconName="magnify"
    //             inputStyle="Choose a widget..."
    //             style={styles.cupertinoSearchBarBasic1}
    //           ></CupertinoSearchBarBasic>
    //         </View>
    //         <View style={styles.rect2}>
    //           <Text style={styles.color}>Color</Text>
    //           <CupertinoSearchBarBasic
    //             inputLeftIconName="magnify"
    //             inputStyle="Choose a widget..."
    //             style={styles.cupertinoSearchBarBasic2}
    //           ></CupertinoSearchBarBasic>
    //         </View>
    //       </View>
    //       <View style={styles.inspectorScreen}>
    //           <Text style={styles.inspector5}>INSPECTOR</Text>
    //           <View style={styles.rect}></View>
    //         </View>
    //     </View>
    //   </View>
    // </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row"
  },
  icon2: {
    color: "rgba(128,128,128,1)",
    fontSize: 40,
    marginTop: 561
  },
  createWidgetScreen: {
    width: 371,
    height: 799,
    marginLeft: 124
  },
  appBar: {
    width: 318,
    height: 87,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  icon: {
    color: "rgba(0,0,0,1)",
    fontSize: 80
  },
  addWidget: {
    color: "#121212",
    fontSize: 35
  },
  editScreen: {
    width: '80%',
    height: '50%',
    marginTop: '3%',
    alignItems: "center",
    backgroundColor: 'grey',
    alignSelf: 'center',
  },
  sizeBox: {
    width: '80%',
    height: '20%',
    backgroundColor: 'black'
  },
  size: {
    color: "#121212",
    fontSize: 20,
    fontWeight: "bold",
  },
  group: {
    width: 60,
    height: 23
  },
  small: {
    color: "#121212",
    height: 23,
    width: 60,
    fontSize: 20
  },
  switch: {
    marginLeft: 11
  },
  large: {
    color: "#121212",
    height: 23,
    width: 73,
    fontSize: 20,
    marginLeft: 17
  },
  groupRow: {
    height: 23,
    flexDirection: "row",
    marginTop: 12,
  },
  contentBox: {
    width: 71,
    height: 24,
    marginTop: 48
  },
  content: {
    color: "#121212",
    fontSize: 20
  },
  cupertinoSearchBarBasic1: {
    height: 44,
    width: 212,
    borderRadius: 15,
    marginTop: 19
  },
  rect2: {
    width: 71,
    height: 24,
    marginTop: 99
  },
  color: {
    color: "#121212",
    fontSize: 20
  },
  cupertinoSearchBarBasic2: {
    height: 44,
    width: 212,
    borderRadius: 15,
    marginTop: 19
  },
  inspectorScreen: {
    width: 414,
    height: '10%',
    marginLeft: -32
  },
  inspecteur: {
    width: 414,
    height: 241,
    backgroundColor: "#E6E6E6"
  },
  inspector5: {
    color: "#121212",
    fontSize: 18,
    marginTop: 20,
    marginLeft: 159
  },
  rect: {
    width: 350,
    height: 149,
    backgroundColor: "rgba(214,127,231,1)",
    borderRadius: 15,
    marginTop: 17,
    marginLeft: 32
  },
  icon2Row: {
    height: 799,
    flexDirection: "row",
    flex: 1,
    marginRight: 11,
    marginLeft: -132,
    marginTop: 50
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
});

export default AddWidgetScreen;
