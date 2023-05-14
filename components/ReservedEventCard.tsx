import { useState, useEffect } from "react";
import { StyleSheet } from "react-native";
import { Button, Card, IconButton, Text } from "react-native-paper";
import { Event } from "../api/Api";
// @ts-ignore
import MaterialCommunityIcon from "react-native-vector-icons/MaterialCommunityIcons";
import { getAddressFromCoordinates } from "../functions/GetAddressFromCoordinates";
import { Reservation, ReservationWithBackend } from "../models/Reservation";
import { useRouter } from "expo-router";
import { useRecoilState } from "recoil";
import selectedReservationLocation from "../recoil/selectedReservationLocation";

export const ReservedEventCard = (props: {
  reservation: ReservationWithBackend;
  cancelFunction: (
    id: number,
    seat: number,
    reservationToken: string,
    backend: string
  ) => void;
  qrFunction: () => void;
  infoFunction: () => void;
}) => {
  const router = useRouter();
  const { reservation, cancelFunction, qrFunction, infoFunction } = {
    ...props,
  };
  const event: Event = reservation.event;

  const [reservationLocation, setReservationLocation] = useRecoilState(
    selectedReservationLocation
  );

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

  const mapFunction = () => {
    const lat: number = parseFloat(event.latitude);
    const lon: number = parseFloat(event.longitude);
    setReservationLocation({ latitude: lat, longitude: lon });
    router.push("/map");
  };

  return (
    <Card style={styles.card}>
      <Card.Title
        title={event.title}
        titleStyle={{ fontSize: 20, fontWeight: "bold" }}
        subtitle={address}
        subtitleStyle={{ fontSize: 14 }}
      />
      <Card.Content>
        <Text style={{ marginBottom: 10 }}>{event.name}</Text>
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
        <Text>
          <MaterialCommunityIcon name="seat" size={26} color="#555" />
          Seat no.: {reservation.placeId}
        </Text>
        <Text>
          <MaterialCommunityIcon name="server" size={26} color="#555" />
          {reservation.backend}
        </Text>
      </Card.Content>
      <Card.Actions>
        {/*<IconButton icon="information" onPress={infoFunction} />*/}
        <IconButton icon="map" onPress={mapFunction} />
        <IconButton
          icon="qrcode"
          onPress={qrFunction}
          testID="qr-code-button"
        />
        <Button
          onPress={() =>
            cancelFunction(
              event.id,
              reservation.placeId,
              reservation.reservationToken,
              reservation.backend
            )
          }
        >
          Cancel
        </Button>
      </Card.Actions>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    margin: 10,
    minWidth: "90%",
  },
  contentView: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
  },
  information: {
    marginTop: 20,
  },
  image: {
    height: 5,
    width: 5,
    margin: 2,
  },
  button: {
    marginLeft: 40,
    marginTop: 10,
  },
});
