import React, { useState } from "react";
import {
  ImageBackground,
  StyleSheet,
  TextInput,
  Pressable,
  Text,
  ActivityIndicator,
  Alert,
} from "react-native";
import { useDeviceOrientation } from "@react-native-community/hooks";
import AsyncStorage from "@react-native-async-storage/async-storage";
// functions
import { generateToken, checkToken } from "../api/apiHelpers";

const SearchUser = ({ navigation }) => {
  const [login, setLogin] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { landscape } = useDeviceOrientation();

  const onChange = (textValue) => setLogin(textValue);

  const showAlert = (msg) => {
    if (msg) Alert.alert("Error", msg);
    else Alert.alert("Error", "Something went wrong, try again later");
  };

  const getUserData = async () => {
    if (!login || !login.trim() || login.length > 50)
      showAlert("Please enter a valid login");
    else {
      setIsLoading(true);

      try {
        // await AsyncStorage.removeItem("@token");
        const token = await AsyncStorage.getItem("@token");

        // if there is no token, generate new one
        if (!token) {
          const token = await generateToken();
          await AsyncStorage.setItem("@token", token);
        }

        // check the token if it's expired, if it's expired, generate new one
        const tokenInfo = await checkToken(token);
        if (
          !tokenInfo.expires_in_seconds ||
          tokenInfo.expires_in_seconds < 60
        ) {
          const newToken = await generateToken();
          await AsyncStorage.setItem("@token", newToken);
        }

        // if everything is ok, get user data
        const res = await getUserData(login);
        if (res.status === "success") {
          setIsLoading(false);
          navigation.navigate("Profile", { userData: res.data });
        } else {
          showAlert(res.msg);
          setIsLoading(false);
        }
      } catch (error) {
        showAlert();
        setIsLoading(false);
      }
    }
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
      <Pressable
        style={styles.button}
        onPress={getUserData}
        disabled={isLoading}>
        <Text style={styles.btnText}>
          {isLoading ? (
            <ActivityIndicator
              style={{
                marginBottom: -5,
              }}
              size="small"
              color="#fff"
            />
          ) : (
            "Search"
          )}
        </Text>
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
