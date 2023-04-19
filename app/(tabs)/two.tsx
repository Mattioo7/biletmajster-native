import { Alert, FlatList, RefreshControl, SafeAreaView, StyleSheet } from 'react-native';
import { View } from '../../components/Themed';
import { BigButton } from "../../components/BigButton";
import { ReservedEventCard } from "../../components/ReservedEventCard";
import React, { useEffect, useState } from "react";
import { apiClient } from "../../api/apiClient";
import { Event } from "../../api/Api";
import { useRecoilState } from "recoil";
import selectedEventIdState from "../../recoil/selectedEventIdState";
import { useRouter } from 'expo-router';
import qrDataState from '../../recoil/qrDataState';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Reservation } from "../../models/Reservation";
import EmptyListComponent from "../../components/EmptyListComponent";

export default function TabTwoScreen() {
  const router = useRouter();
  const [qrData, setQrData] = useRecoilState(qrDataState);

  const [isLoading, setLoading] = useState(true);
  const [events, setEvents] = useState<Event[]>([]);
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [activeEventId, setActiveEventId] = useRecoilState(selectedEventIdState);

  const getReservations = async () => {
    try {
      const keys = await AsyncStorage.getAllKeys();
      const data = await AsyncStorage.multiGet(keys);

      // console.log("Reservations data:" + data);

      setReservations(data.map(([key, value]) => JSON.parse(value as string) ));

      // data.forEach(([key, value]) => {
      //   console.log("\n");
      //   console.log("Key:" + key);
      //   const res: Reservation = JSON.parse(value as string);
      //   console.log("Reservation:" + res);
      //   setReservations(prevState => [...prevState, res]);
      //   // console.log("Reservations:" + reservations);
      // });

    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => console.log("useEffect" + reservations), [reservations])

  // const getEvents = async () => {
  //   try {
  //     const fetchedEvents = await apiClient.events.getEvents();
  //     // console.log("Fetched getEvents");
  //     if (fetchedEvents.ok)
  //       setEvents(fetchedEvents.data);
  //     else {
  //       // TODO: Handle error
  //     }
  //   } catch (error) {
  //     console.warn(error);
  //     Alert.alert('An error occurred');
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  const showQRCode = (event: Event) => {
    const dtf = new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit'
    }); 
    setQrData({
      coreData: "QR Pass for event " + event.name + " at " + event.latitude + ", " + event.longitude + " from " + dtf.format(event.startTime) + " to " + dtf.format(event.endTime),
      title: event.name,
      description: dtf.format(event.startTime) + " - " + dtf.format(event.endTime)
    });
    router.push("/QRPage")
  }

  useEffect(() => {
    // getEvents();
    getReservations();
  }, []);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>

        <View style={{ backgroundColor: "none" }}>
          <FlatList style={styles.flatList}
            data={reservations}
            ListEmptyComponent={<EmptyListComponent />}
            refreshControl={
              <RefreshControl
                refreshing={isLoading}
                onRefresh={getReservations}
              />
            }
            renderItem={({ item, index }) => (
              <ReservedEventCard
                key={item.event.id}
                event={item.event}
                qrFunction={() => showQRCode(item.event)}
                cancelFunction={() => { console.log("Cancel") }}
                infoFunction={() => { setActiveEventId(item.event.id); router.push("/event"); }}
              />
            )}
          />
        </View>
      </View>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  flatList: {

  },
});
