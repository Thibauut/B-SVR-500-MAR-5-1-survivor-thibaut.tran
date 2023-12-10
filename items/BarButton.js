import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Button } from 'react-native';
import Icon from 'react-native-vector-icons'

function BottomButtonContainer() {
  return (
    <View style={styles.container}>
      <Button
        title="Home"
        icon={<Icon name="home" type="font-awesome" color="white" />}
        buttonStyle={styles.button}
        onPress={() => {
        }}
      />
      <Button
        title="Search"
        icon={<Icon name="search" type="font-awesome" color="white" />}
        buttonStyle={styles.button}
        onPress={() => {
        }}
      />
      <Button
        title="Profile"
        icon={<Icon name="user" type="font-awesome" color="white" />}
        buttonStyle={styles.button}
        onPress={() => {
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: "#a64dff",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 50,
  },
  button: {
    backgroundColor: 'blue',
    borderRadius: 50,
    padding: 10,
  },
});

export default BottomButtonContainer;
