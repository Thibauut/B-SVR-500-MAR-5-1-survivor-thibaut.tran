import React from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';

function WidgetsItem() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.blackContainer}></View>

      <View style={styles.blackContainer}></View>

      <View style={styles.blackContainer}></View>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  blackContainer: {
    flex: 1,
    backgroundColor: 'black',
    borderRadius: 10,
    height: 200,
    margin: 10,
  },
});

export default WidgetsItem;