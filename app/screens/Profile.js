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
import CursusPicker from "../components/CursusPicker";
import { Ionicons } from "@expo/vector-icons";

const Profile = ({ navigation, route }) => {
  // const { login } = route.params;
  const [selecterCursus, setSelecterCursus] = useState(21);
  const [level, setLevel] = useState(0);
  const [percentage, setPercentage] = useState(0);
  const [cursusList, setCursusList] = useState([]);

  useEffect(() => {
    setSelecterCursus(
      userData.cursus_users[userData.cursus_users.length - 1].cursus_id
    );
    if (level.toString().split(".")[1])
      setPercentage(level.toString().split(".")[1]);
  }, []);

  useEffect(() => {
    setLevel(
      userData.cursus_users.find(
        (cursus) => cursus.cursus_id === selecterCursus
      )?.level
    );
  }, [selecterCursus]);
  useEffect(() => {
    if (level.toString().split(".")[1])
      setPercentage(level.toString().split(".")[1]);
  }, [level]);

  useEffect(() => {
    let list = [];
    for (let i = 0; i < userData.cursus_users.length; i++) {
      list = [
        ...list,
        {
          key: userData.cursus_users[i].cursus_id,
          label: userData.cursus_users[i].cursus.name,
        },
      ];
    }
    setCursusList(list);
  }, []);

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

      <View style={styles.profileDetailCursus}>
        <View
          style={{
            margin: 10,
            flexDirection: "row",
          }}>
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "flex-start",
            }}>
            <Text style={styles.title}>Cursus:</Text>
          </View>
          <View
            style={{
              flex: 1,
              width: "20%",
              justifyContent: "flex-end",
            }}>
            <CursusPicker
              cursusList={cursusList}
              selecterCursus={selecterCursus}
              setSelecterCursus={setSelecterCursus}
            />
          </View>
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
        <PercentageBar
          height={20}
          backgroundColor={"grey"}
          percentage={`${percentage}%`}
          level={level}
        />
      </View>
      <Ionicons
        name="arrow-back"
        size={24}
        color="white"
        style={styles.backIcon}
        onPress={() => navigation.goBack()}
      />
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
  profileDetailCursus: {
    width: "100%",
    alignSelf: "center",
    marginTop: 260,
    alignItems: "center",
    flexDirection: "row",
    position: "absolute",
    backgroundColor: "#ffffff",
  },
  profileDetail: {
    width: "100%",
    alignSelf: "center",
    marginTop: 320,
    alignItems: "center",
    flexDirection: "row",
    position: "absolute",
    backgroundColor: "#ffffff",
  },
  profileDetailSec: {
    width: "100%",
    alignSelf: "center",
    marginTop: 387,
    alignItems: "center",
    flexDirection: "row",
    position: "absolute",
    backgroundColor: "#ffffff",
  },
  profileDetailNext: {
    width: "100%",
    alignSelf: "center",
    marginTop: 454,
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
    marginTop: 220,
    width: "100%",
    justifyContent: "center",
  },
  backIcon: {
    position: "absolute",
    top: 15,
    left: 15,
  },
});
export default Profile;
