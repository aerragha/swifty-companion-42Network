import React from "react";
import { Button, View, Text } from "react-native";

const Profile = ({ navigation, route }) => {
  const { login } = route.params;
  return (
    <View>
      <Text>Hello {login}</Text>
      <Button
        title="Go to Home"
        onPress={() => navigation.navigate("SearchUser")}
      />
    </View>
  );
};

export default Profile;
