import "react-native-gesture-handler";
import { StyleSheet, SafeAreaView, StatusBar, Platform } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import SearchUser from "./app/screens/SearchUser";
import Profile from "./app/screens/Profile";
import { createStackNavigator } from "@react-navigation/stack";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <SafeAreaView style={styles.container}>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}>
          <Stack.Screen name="SearchUser" component={SearchUser} />
          <Stack.Screen name="Profile" component={Profile} />
        </Stack.Navigator>
      </SafeAreaView>
    </NavigationContainer>
  );
}

/*
use for all screen 
screenOptions={{headerShown: false}}

use only for one screen
options={{headerShown: false}}

*/

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
});
