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

export default function TabTwoScreen() {
  const router = useRouter();
  const [qrData, setQrData] = useRecoilState(qrDataState);

  const [isLoading, setLoading] = useState(true);
  const [events, setEvents] = useState<Event[]>([]);
  const [activeEventId, setActiveEventId] = useRecoilState(selectedEventIdState);

  const getEvents = async () => {
    try {
      const fetchedEvents = await apiClient.events.getEvents();
      // console.log("Fetched getEvents");
      if (fetchedEvents.ok)
        setEvents(fetchedEvents.data);
      else {
        // TODO: Handle error
      }
    } catch (error) {
      console.warn(error);
      Alert.alert('An error occurred');
    } finally {
      setLoading(false);
    }
  };

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
    getEvents();
  }, []);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>

        <View style={{ backgroundColor: "none" }}>
          <FlatList style={styles.flatList}
            data={events}
            refreshControl={
              <RefreshControl
                refreshing={isLoading}
                onRefresh={getEvents}
              />
            }
            renderItem={({ item, index }) => (
              <ReservedEventCard
                key={item.id}
                event={item}
                qrFunction={() => showQRCode(item)}
                cancelFunction={() => { console.log("Cancel") }}
                infoFunction={() => { setActiveEventId(item.id); router.push("/event"); }}
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
