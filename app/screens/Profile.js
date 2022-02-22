import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  Image,
  Linking,
  StyleSheet,
  ScrollView,
} from "react-native";
import userData from "./intra_profile.json";
import PercentageBar from "../components/PercentageBar";

const Profile = ({ navigation, route }) => {
  // const { login } = route.params;
  const [selecterCuresus, setSelecterCuresus] = useState(21);
  const [level, setLevel] = useState(0);
  useEffect(() => {
    setLevel(
      userData.cursus_users.find(
        (cursus) => cursus.cursus_id === selecterCuresus
      )?.level
    );
  }, [selecterCuresus]);
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <Image
            style={styles.avatar}
            source={{
              uri: userData.image_url,
            }}
          />
          <Text style={styles.name}>{userData.usual_full_name}</Text>
          <Text style={styles.login}>{userData.login}</Text>
        </View>
      </View>

      <View style={styles.profileDetail}>
        <View style={styles.detailContent}>
          <Text style={styles.title}>Email:</Text>
          <Text style={styles.count}>{userData.email}</Text>
        </View>
      </View>

      <View style={styles.profileDetailSec}>
        <View style={styles.detailContent}>
          <Text style={styles.title}>Mobile:</Text>
          <Text style={styles.count}>
            {userData.phone === "hidden" ? "Hidden" : userData.phone}
          </Text>
        </View>
        <View style={styles.detailContent}>
          <Text style={styles.title}>Campus:</Text>
          <Text style={styles.count}>{userData.campus[0]?.name}</Text>
        </View>
        <View style={styles.detailContent}>
          <Text style={styles.title}>Correction points:</Text>
          <Text style={styles.count}>{userData.correction_point}</Text>
        </View>
      </View>
      <View style={styles.profileDetailNext}>
        <View style={styles.detailContent}>
          <Text style={styles.title}>Location:</Text>
          <Text style={styles.count}>{userData.location}</Text>
        </View>
        <View style={styles.detailContent}>
          <Text style={styles.title}>Wallet:</Text>
          <Text style={styles.count}>{userData.wallet} ₳</Text>
        </View>
        <View style={styles.detailContent}>
          <Text style={styles.title}>Level:</Text>
          <Text style={styles.count}>{level}</Text>
        </View>
        <View style={styles.detailContent}>
          <Text style={styles.title}>Profile intra:</Text>
          <Text
            style={{
              fontSize: 18,
              marginTop: 5,
              color: "blue",
              textDecorationLine: "underline",
            }}
            onPress={() =>
              Linking.openURL(
                `https://profile.intra.42.fr/users/${userData.login}`
              )
            }>
            Link intra
          </Text>
        </View>
      </View>
      <View style={styles.levelView}>
        {level ? (
          <PercentageBar
            height={20}
            backgroundColor={"grey"}
            completedColor={"#00CED1"}
            percentage={`${level?.toString()?.split(".")[1]}%`}
            level={level}
          />
        ) : null}
      </View>
    </ScrollView>
  );
};

// projects status: [in_progress, finished, searching_a_group,]
const styles = StyleSheet.create({
  header: {
    backgroundColor: "#000",
  },
  headerContent: {
    padding: 52,
    alignItems: "center",
  },
  avatar: {
    width: 130,
    height: 130,
    borderRadius: 63,
    borderWidth: 4,
    borderColor: "white",
    marginBottom: 10,
  },
  name: {
    fontSize: 22,
    color: "#FFFFFF",
    fontWeight: "600",
  },
  login: {
    fontSize: 17,
    color: "#FFFFFF",
    fontWeight: "400",
  },
  profileDetail: {
    width: "100%",
    alignSelf: "center",
    marginTop: 260,
    alignItems: "center",
    flexDirection: "row",
    position: "absolute",
    backgroundColor: "#ffffff",
  },
  profileDetailSec: {
    width: "100%",
    alignSelf: "center",
    marginTop: 325,
    alignItems: "center",
    flexDirection: "row",
    position: "absolute",
    backgroundColor: "#ffffff",
  },
  profileDetailNext: {
    width: "100%",
    alignSelf: "center",
    marginTop: 390,
    alignItems: "center",
    flexDirection: "row",
    position: "absolute",
    backgroundColor: "#ffffff",
  },
  detailContent: {
    margin: 10,
    alignItems: "flex-start",
  },
  title: {
    fontSize: 15,
    color: "#00CED1",
  },
  count: {
    fontSize: 18,
    marginTop: 5,
  },
  levelView: {
    marginTop: 155,
    width: "100%",
    justifyContent: "center",
  },
});
export default Profile;
