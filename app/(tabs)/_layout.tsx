import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Link, Tabs } from "expo-router";
import { Pressable, useColorScheme } from "react-native";
import { View } from "../../components/Themed";

import Colors from "../../constants/Colors";

function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>["name"];
  color: string;
}) {
  return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
}

function IconLink(props: { link: string, icon: string }) {
  const colorScheme = useColorScheme();

  return <Link href={props.link} asChild>
      <Pressable>
        {({ pressed }) => (
          <FontAwesome
            name={props.icon as any}
            size={25}
            color={Colors[colorScheme ?? "light"].text}
            style={{ marginRight: 20, opacity: pressed ? 0.5 : 1 }}
          />
        )}
      </Pressable>
    </Link>
}

export default function TabLayout() {
  const colorScheme = useColorScheme();

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
          tabBarIcon: ({ color }) => <TabBarIcon name="code" color={color} />,
          headerRight: () => (
            <View style={{ flexDirection: "row", alignContent: "center", alignItems: "center", justifyContent: "center" }}>
              <IconLink link="/Filters" icon="filter" />
              <IconLink link="/Backend" icon="server" />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="two"
        options={{
          title: "My reservations",
          tabBarIcon: ({ color }) => <TabBarIcon name="code" color={color} />,
        }}
      />
    </Tabs>
  );
}
