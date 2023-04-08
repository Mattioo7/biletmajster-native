import {Alert, FlatList, RefreshControl, SafeAreaView, StyleSheet} from 'react-native';
import {View} from '../../components/Themed';
import {BigButton} from "../../components/BigButton";
import {ReservedEventCard} from "../../components/ReservedEventCard";
import React, {useEffect, useState} from "react";
import {apiClient} from "../../api/apiClient";
import {Event} from "../../api/Api";
import {useRecoilState} from "recoil";
import selectedEventIdState from "../../recoil/selectedEventIdState";

export default function TabTwoScreen() {

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

  useEffect(() => {
    getEvents();
  }, []);

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.container}>

        <View style={{backgroundColor: "none"}}>
          <FlatList style={styles.flatList}
                    data={events}
                    refreshControl={
                      <RefreshControl
                        refreshing={isLoading}
                        onRefresh={getEvents}
                      />
                    }
                    renderItem={({item, index}) => (
                      <BigButton
                        index={index}
                        onPress={() => {
                          setActiveEventId(item.id);
                          // console.log('Pressed event id: ' + item.id);
                          // console.log('Recoil event id: ' + activeEventId);
                        }}>
                        <ReservedEventCard event={item} myFunction={() => {
                          console.log("Cancel")
                        }}/>
                      </BigButton>
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
