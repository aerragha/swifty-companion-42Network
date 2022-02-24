import React from "react";
import { View, StyleSheet, Text } from "react-native";

const Skill = ({ item }) => {
  return (
    <View style={styles.box}>
      <Text style={styles.username}>{item.name}</Text>
      <View style={{ width: "90%" }}>
      </View>
      <View style={styles.iconContent}>
        <Text style={styles.resultStyle}>{item.level?.toFixed(2)}</Text>
      </View>
      <View style={{
        width: `${item.level * 100/20}%`,
        height: 5,
        backgroundColor: '#00babc',
        position: 'absolute',
        bottom: 0,
        borderTopRightRadius: 5,
        borderBottomRightRadius: 5,
      }}>

      </View>

    </View>
  );
};

const styles = StyleSheet.create({
  box: {
    width: "98%",
    marginTop: 5,
    marginBottom: 5,
    marginLeft: 1,
    backgroundColor: "#FFFFFF",
    flexDirection: "row",
    shadowColor: "black",
    shadowOpacity: 0.2,
    shadowOffset: {
      height: 1,
      width: -1,
    },
    elevation: 2,
  },
  username: {
    color: "#00babc",
    fontSize: 16,
    alignSelf: "center",
    marginLeft: 10,
  },
  iconContent: {
    width: 60,
    height: 45,
    marginLeft: "auto",
    justifyContent: "center",
    alignItems: "center",
  },
  resultStyle: {
    color: "#5cb85c",
    fontSize: 15,
    fontWeight: "bold",
  },
});

export default Skill;
