import React, { useState, useEffect } from "react";
import { Ionicons } from "@expo/vector-icons";
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
import Project from "../components/Project";
import Skill from "../components/Skill";

const Profile = ({ navigation, route }) => {
  const [selecterCursus, setSelecterCursus] = useState(21);
  const [level, setLevel] = useState(0);
  const [percentage, setPercentage] = useState(0);
  const [cursusList, setCursusList] = useState([]);
  const [projects, setProjects] = useState([]);

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
    setProjects(
      userData.projects_users.filter(
        (project) =>
          project.cursus_ids.includes(selecterCursus) &&
          project.status === "finished" &&
          !project.project.parent_id
      )
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
    <ScrollView style={styles.container} nestedScrollEnabled={true}>
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
      <Ionicons
        name="arrow-back"
        size={24}
        color="white"
        style={styles.backIcon}
        onPress={() => navigation.goBack()}
      />
      <View style={styles.levelView}>
        <PercentageBar
          height={20}
          backgroundColor={"grey"}
          percentage={`${percentage}%`}
          level={level}
        />
      </View>

      <View style={styles.profileDetailProj}>
        <View style={styles.detailContent}>
          <Text style={styles.title}>Projects:</Text>
          <ScrollView style={styles.scrollViewStyle} nestedScrollEnabled={true}>
            {projects && projects.length
              ? projects.map((project) => (
                  <Project key={project.id} item={project} />
                ))
              : null}
          </ScrollView>
        </View>
      </View>
      <View style={styles.profileDetailSkill} nestedScrollEnabled={true}>
        <View style={styles.detailContent}>
          <Text style={styles.title}>Skills:</Text>
          <ScrollView style={styles.scrollViewStyle}>
            {projects && projects.length
              ? projects.map((project) => (
                  <Project key={project.id} item={project} />
                ))
              : null}
          </ScrollView>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: 1200,
  },
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
  profileDetailProj: {
    margin: 10,
    alignItems: "flex-start",
    width: "100%",
    alignSelf: "center",
    marginTop: -25,
    alignItems: "center",
    flexDirection: "row",
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
  scrollViewStyle: {
    width: "98%",
    height: 200,
    marginTop: 10,
    marginLeft: 5,
    alignSelf: "center",
  },
  profileDetailSkill: {
    width: "100%",
    alignSelf: "center",
    marginTop: -6,
    alignItems: "center",
    flexDirection: "row",
    backgroundColor: "#ffffff",
  },
  backIcon: {
    position: "absolute",
    top: 15,
    left: 15,
  },
});
export default Profile;
