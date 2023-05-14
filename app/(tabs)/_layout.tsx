import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Tabs, useRouter } from "expo-router";
import React from "react";
import { useColorScheme } from "react-native";
import { IconButton } from "react-native-paper";
import { View } from "../../components/Themed";

import Colors from "../../constants/Colors";

function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>["name"];
  color: string;
}) {
  return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const router = useRouter();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Events",
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="calendar" color={color} />
          ),
          headerRight: () => (
            <View
              style={{
                flexDirection: "row",
                alignContent: "center",
                alignItems: "center",
                justifyContent: "center",
                gap: -10,
              }}
            >
              <IconButton icon="web" onPress={() => router.push("/Backend")} />
              <IconButton
                icon="filter"
                onPress={() => router.push("/Filters")}
              />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="two"
        options={{
          title: "My reservations",
          tabBarIcon: ({ color }) => <TabBarIcon name="ticket" color={color} />,
        }}
      />
    </Tabs>
  );
}
