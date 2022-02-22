import React, { useState } from "react";
import {
  ImageBackground,
  StyleSheet,
  TextInput,
  Pressable,
  Text,
} from "react-native";
import { useDeviceOrientation } from "@react-native-community/hooks";

const SearchUser = ({ navigation }) => {
  const [login, setLogin] = useState("");
  const { landscape } = useDeviceOrientation();

  const onChange = (textValue) => setLogin(textValue);
  const onPress = () => {
    navigation.navigate("Profile", { login });
  };

  return (
    <ImageBackground
      resizeMode="cover"
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: landscape ? "flex-start" : "center",
        paddingTop: landscape ? 50 : 0,
      }}
      source={
        landscape
          ? require("../assets/background2.jpg")
          : require("../assets/background.jpg")
      }>
      <TextInput
        value={login}
        style={styles.input}
        placeholder="Enter a login..."
        placeholderTextColor="#fff"
        onChangeText={onChange}
      />
      <Pressable style={styles.button} onPress={onPress}>
        <Text style={styles.btnText}>Search</Text>
      </Pressable>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  input: {
    width: "80%",
    height: 50,
    color: "#fff",
    borderWidth: 1,
    borderColor: "#fff",
    padding: 10,
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    width: "50%",
    marginTop: 30,
    borderRadius: 4,
    backgroundColor: "rgb(163, 222, 131)",
  },
  btnText: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "white",
  },
});

export default SearchUser;
