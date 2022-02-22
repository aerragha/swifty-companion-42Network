import React, { useState } from "react";
import { View, Text, StyleSheet, TextInput } from "react-native";
import ModalSelector from "react-native-modal-selector";

const Projects = () => {
  let index = 0;
  const data = [
    { key: index++, section: true, label: "Fruits" },
    { key: index++, label: "Red Apples" },
    { key: index++, label: "Cherries" },
    {
      key: index++,
      label: "Cranberries",
      accessibilityLabel: "Tap here for cranberries",
    },
    // etc...
    // Can also add additional custom keys which are passed to the onChange callback
    { key: index++, label: "Vegetable", customKey: "Not a fruit" },
  ];
  return (
    <ModalSelector
      data={data}
      onChange={(option) => {
        alert(`${option.label} (${option.key}) nom nom nom`);
      }}
      selectedKey={2}
      style={{
        flex: 1,
        width: "100%",
        justifyContent: "flex-end",
      }}
      initValue="Select cursus..."></ModalSelector>
  );
};

const styles = StyleSheet.create({
  picker: {
    width: "100%",
  },
});
export default Projects;
