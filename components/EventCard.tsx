import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { Button, Card, Chip, Text } from "react-native-paper";
import { Category, Event, EventStatus } from "../api/Api";
// @ts-ignore
import MaterialCommunityIcon from "react-native-vector-icons/MaterialCommunityIcons";
import { getAddressFromCoordinates } from "./GetAddressFromCoordinates";

export const EventCard = (props: {
  event: Event;
  makeReservation: () => void;
}) => {
  const { event, makeReservation } = { ...props };

  const [address, setAddress] = useState<string>("");

  useEffect(() => {
    getAddressFromCoordinates({
      latitude: event.latitude,
      longitude: event.longitude,
    })
      .then((r) => setAddress(r as string))
      .catch((e) => {
        console.log(e);
        setAddress("Address not found");
      });
  }, []);

  return (
    <Card style={styles.card}>
      <Card.Title
        title={event.title}
        titleStyle={{ fontSize: 20, fontWeight: "bold" }}
        subtitle={address}
        subtitleStyle={{ fontSize: 14 }}
      />
      <Card.Content>
        <View style={styles.contentView}>
          <View style={styles.information}>
            <Text style={{ display: "flex", fontSize: 18 }}>
              <MaterialCommunityIcon name="calendar" size={26} color="#555" />
              {new Intl.DateTimeFormat("en-US", {
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit",
              }).format(event.startTime * 1000 /* fix */)}
            </Text>
            <Text style={{ display: "flex", fontSize: 18 }}>
              <MaterialCommunityIcon name="calendar" size={26} color="#555" />
              {new Intl.DateTimeFormat("en-US", {
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit",
              }).format(event.endTime * 1000 /* fix */)}
            </Text>

            <View style={styles.chips}>
              {event.categories.map((category: Category) => (
                <Chip key={category.id} style={{ maxWidth: 130 }}>
                  {category.name}
                </Chip>
              ))}
            </View>
          </View>
        </View>
      </Card.Content>
      <Card.Actions>
        <MaterialCommunityIcon name="account-multiple" size={30} color="#555" />
        <Text style={{ marginRight: 20 }}>
          {event.freePlace}/{event.maxPlace}
        </Text>

        <Button
          mode="contained"
          onPress={makeReservation}
          disabled={
            event.freePlace <= 0 || event.status !== EventStatus.InFuture
          }
        >
          Reserve
        </Button>
      </Card.Actions>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    maxWidth: "950%",
    minWidth: "90%",
  },
  contentView: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
  },
  information: {},
  image: {
    height: 5,
    width: 5,
    margin: 2,
  },
  button: {
    marginLeft: 40,
    marginTop: 10,
  },
  chips: {
    backgroundColor: "none",
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    columnGap: 5,
    rowGap: 5,
    marginTop: 5,
  },
});
