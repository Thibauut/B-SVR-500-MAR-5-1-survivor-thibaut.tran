import React, { Component } from "react";
import { StyleSheet, View, TextInput } from "react-native";

function CupertinoSearchBarBasic(props) {
  return (
    <View style={[styles.container, props.style]}>
      <View
        style={[
          styles.inputBox,
          {
            backgroundColor: props.inputBox || undefined
          }
        ]}
      >
        <TextInput
          placeholder={props.inputStyle || "Choose a widget"}
          textBreakStrategy="highQuality"
          style={styles.inputStyle}
        ></TextInput>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#CECED2",
    padding: 8
  },
  inputBox: {
    flex: 1,
    flexDirection: "row",
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center"
  },
  inputStyle: {
    height: 32,
    alignSelf: "flex-start",
    fontSize: 15,
    lineHeight: 15,
    color: "#000",
    flex: 1
  }
});

export default CupertinoSearchBarBasic;
