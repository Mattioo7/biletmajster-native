import {
  Alert,
  FlatList,
  RefreshControl,
  SafeAreaView,
  StyleSheet,
} from "react-native";
import { View } from "../../components/Themed";
import { ReservedEventCard } from "../../components/ReservedEventCard";
import { useCallback, useState } from "react";
import { Api, Event } from "../../api/Api";
import { useRecoilState } from "recoil";
import selectedEventIdState from "../../recoil/selectedEventIdState";
import { useRouter } from "expo-router";
import qrDataState from "../../recoil/qrDataState";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ReservationWithBackend } from "../../models/Reservation";
import EmptyListComponent from "../../components/EmptyListComponent";
import { FAB } from "react-native-paper";
import { useFocusEffect } from "@react-navigation/native";

export default function TabTwoScreen() {
  const router = useRouter();
  const [_1, setQrData] = useRecoilState(qrDataState);

  const [isLoading, setLoading] = useState(true);
  // const [events, setEvents] = useState<Event[]>([]);
  const [reservations, setReservations] = useState<ReservationWithBackend[]>(
    []
  );
  const [_2, setActiveEventId] =
    useRecoilState(selectedEventIdState);

  const getReservations = async () => {
    try {
      const keys = await AsyncStorage.getAllKeys();
      const data = await AsyncStorage.multiGet(keys);

      setReservations(
        data.map(([_key, value]) => JSON.parse(value as string))
      );
    } catch (e) {
      console.log(e);
    }
  };

  const showQRCode = (event: Event) => {
    const dtf = new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
    setQrData({
      coreData:
        "QR Pass for event " +
        event.name +
        " at " +
        event.latitude +
        ", " +
        event.longitude +
        " from " +
        dtf.format(event.startTime * 1000 /* fix */) +
        " to " +
        dtf.format(event.endTime * 1000 /* fix */),
      title: event.name,
      description:
        dtf.format(event.startTime * 1000 /* fix */) +
        " - " +
        dtf.format(event.endTime * 1000 /* fix */),
    });
    router.push("/QRPage");
  };

  const cancelReservation = async (
    id: number,
    seat: number,
    reservationToken: string,
    backend: string
  ) => {
    setLoading(true);
    try {
      const headers = {
        headers: {
          reservationToken: reservationToken,
        },
      };

      const customClient = new Api({ baseUrl: backend });

      const response = await customClient.reservation.deleteReservation(
        headers
      );
      // console.log(response.status);

      if (response.status === 204) {
        AsyncStorage.removeItem(id.toString() + "_" + seat.toString())
          .then(() => {
            // console.log('Item removed successfully!');
            getReservations();
          })
          .catch((error) => {
            console.error(error);
          });
      } else {
        // TODO: Handle error
        console.log("Error: " + response.error);
        console.log(response.status);
      }
    } catch (error) {
      console.warn(error);
      Alert.alert("An error occurred");
    } finally {
      setLoading(false);
    }
  };

  const clearAllData = async () => {
    try {
      await AsyncStorage.clear();
      console.log("AsyncStorage successfully cleared!");
      getReservations().then(() => {
        setLoading(false);
      });
    } catch (e) {
      console.log("Failed to clear AsyncStorage:", e);
    }
  };

  useFocusEffect(
    useCallback(() => {
      getReservations().finally(() => {
        // console.log("Reservations: " + reservations.length);
        setLoading(false);
      });
      return () => {};
    }, [])
  );

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <View style={{ backgroundColor: "none" }}>
          <FlatList
            style={styles.flatList}
            data={reservations}
            ListEmptyComponent={<EmptyListComponent />}
            refreshControl={
              <RefreshControl
                refreshing={isLoading}
                onRefresh={getReservations}
              />
            }
            renderItem={({ item }) => (
              <ReservedEventCard
                key={item.event.id}
                reservation={item}
                qrFunction={() => showQRCode(item.event)}
                cancelFunction={cancelReservation}
                infoFunction={() => {
                  setActiveEventId(item.event.id);
                  router.push("/event");
                }}
              />
            )}
          />
        </View>
      </View>
      <FAB
        style={styles.fab}
        small
        icon="minus"
        onPress={clearAllData}
        disabled={true}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
  flatList: {},
  fab: {
    position: "absolute",
    margin: 16,
    right: 0,
    bottom: 0,
  },
});
