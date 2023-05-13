import { StatusBar } from "expo-status-bar";
import { Alert, Platform, Pressable, StyleSheet } from "react-native";
import { Text, View } from "../components/Themed";
import { useRecoilState } from "recoil";
import React, { useEffect, useState } from "react";
import { Category } from "../api/Api";
import { useApiClient } from "../functions/useApiClient";
import { Button, Card, Searchbar } from "react-native-paper";
import allEventsSortByState, {
  eventSortByPairs,
} from "../recoil/allEventsSortByState";
import allEventsSearchNameState from "../recoil/allEventsSortByNameState";
import allEventsFilterByCategoryState from "../recoil/allEventsFilterByCategoryState";
import { Dropdown } from "react-native-element-dropdown";
import { useTheme } from "react-native-paper";
import { backendUrlState, urls } from "../recoil/backendUrlState";

export default function ModalScreen() {
  const [backend, setBackend] = useRecoilState(backendUrlState);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Choose your event provider</Text>
      {
        urls.map(bk =>
          <Pressable key={bk.url} onPress={() => setBackend(bk.url)} style={{ width: "100%" }}>
            <Card style={
              backend == bk.url ? { borderWidth: 4, width: "100%" } : { width: "100%" }
            }>
              <Card.Content>
                <Text style={styles.title}>{bk.name}</Text>
                <Text style={styles.text}>{bk.url}</Text>
              </Card.Content>
            </Card>
          </Pressable>
        )
      }
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    padding: 10,
    rowGap: 10
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  text: {
    fontSize: 16
  }
});
