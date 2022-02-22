import React, { useState } from "react";
import { Text, View } from "react-native";

const PercentageBar = ({
  percentage,
  height,
  backgroundColor,
  completedColor,
  level,
}) => {
  const [getPercentage, setPercentage] = useState(percentage);
  const [getheight, setHeight] = useState(height);
  const [getBackgroundColor, setBackgroundColor] = useState(backgroundColor);
  const [getCompletedColor, setCompletedColor] = useState(completedColor);
  console.log("percentage", percentage);
  return (
    <View style={styles.container}>
      <View style={{ justifyContent: "center" }}>
        <View
          style={{
            width: "100%",
            height: getheight,
            marginVertical: 10,
            borderRadius: 1,
            borderColor: getBackgroundColor,
            borderWidth: 1,
          }}
        />
        <View
          style={{
            width: getPercentage ? getPercentage : 0,
            height: getheight,
            marginVertical: 10,
            borderRadius: 5,
            backgroundColor: "#00CED1",
            position: "absolute",
            bottom: 20,
          }}
        />
        <View
          style={{
            width: "100%",
            height: getheight,
            bottom: 29,
          }}>
          <Text
            style={{ textAlign: "center", color: "#000", fontWeight: "700" }}>
            Level {level}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default PercentageBar;
