import { StatusBar } from "expo-status-bar";
import { Alert, Platform, Pressable, StyleSheet } from "react-native";
import { Text, View } from "../components/Themed";
import { useRecoilState } from "recoil";
import React, { useEffect, useState } from "react";
import { Category } from "../api/Api";
import { useApiClient } from "../functions/useApiClient";
import { Button, Card, Checkbox, Searchbar } from "react-native-paper";
import allEventsSortByState, {
  eventSortByPairs,
} from "../recoil/allEventsSortByState";
import allEventsSearchNameState from "../recoil/allEventsSortByNameState";
import allEventsFilterByCategoryState from "../recoil/allEventsFilterByCategoryState";
import { Dropdown } from "react-native-element-dropdown";
import { useTheme } from "react-native-paper";
import { backendUrlState, urls } from "../recoil/backendUrlState";
import { useColorScheme } from "react-native";
import Colors from "../constants/Colors";

export default function ModalScreen() {
  const [backend, setBackend] = useRecoilState(backendUrlState);
  const scheme = useColorScheme();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Choose your event provider</Text>
      {urls.map((bk) => (
        <Pressable
          key={bk.url}
          onPress={() => setBackend(bk.url)}
          style={{ width: "100%" }}
        >
          <Card
            elevation={2}
            style={
              backend === bk.url
                ? { backgroundColor: "white", borderWidth: 2, margin: -2, borderColor: "#6750A4", width: "100%" }
                : { backgroundColor: "white", width: "100%" }
            }
          >
            <Card.Content>
              <View style={{ flexDirection: "row", marginLeft: -12 }}>
                <Checkbox status={backend === bk.url ? "checked" : "unchecked"} />
                <View style={{ flexDirection: "column" }}>
                  <Text style={styles.title}>{bk.name}</Text>
                  <Text style={styles.text}>{bk.url}</Text>
                </View>
              </View>
            </Card.Content>
          </Card>
        </Pressable>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    padding: 10,
    rowGap: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  text: {
    fontSize: 16,
  },
});
