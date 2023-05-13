import React from "react";
import { View, Text } from "react-native";

const EmptyListComponent = () => {
  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 10,
      }}
    >
      <Text style={{ fontSize: 16, fontWeight: "bold" }}>
        No items to display
      </Text>
    </View>
  );
};

export default EmptyListComponent;
