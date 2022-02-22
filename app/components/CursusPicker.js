import React from "react";
import { StyleSheet } from "react-native";
import ModalSelector from "react-native-modal-selector";

const Projects = ({ cursusList, selecterCursus, setSelecterCursus }) => {
  const handleChange = (selected) => {
    setSelecterCursus(selected.key);
  };

  return (
    <ModalSelector
      data={cursusList}
      onChange={handleChange}
      // selectedKey={selecterCursus}
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
