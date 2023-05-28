import { StatusBar } from "expo-status-bar";
import { Alert, Animated, FlatList, Image, Platform, ScrollView, StyleSheet } from "react-native";
import { Text, View } from "../components/Themed";
import { useRecoilState } from "recoil";
import selectedEventIdState from "../recoil/selectedEventIdState";
import React, { useEffect, useState } from "react";
import { Category, EventWithPlaces } from "../api/Api";
import { ActivityIndicator, Card, Chip, IconButton } from "react-native-paper";
// @ts-ignore
import MaterialCommunityIcon from "react-native-vector-icons/MaterialCommunityIcons";
import selectedReservationLocation from "../recoil/selectedReservationLocation";
import { useRouter } from "expo-router";
import { useApiClient } from "../functions/useApiClient";
import { useSafeAreaFrame } from "react-native-safe-area-context";
import { backendUrlState } from "../recoil/backendUrlState";
import { ScalingDot } from "react-native-animated-pagination-dots";

interface placeModel {
  label: string;
  value: number;
}

export default function ReservationScreen() {
  const router = useRouter();
  const apiClient = useApiClient();

  const { width } = useSafeAreaFrame();
  const imgWidth = width - 20;
  const [backend, _3] = useRecoilState(backendUrlState);
  const scrollX = React.useRef(new Animated.Value(0)).current;

  const [isLoading, setLoading] = useState(true);

  const [eventId, setEventId] = useRecoilState(selectedEventIdState);
  const [event, setEvent] = useState<EventWithPlaces | undefined>();
  const [photoUrls, setPhotoUrls] = useState<string[]>([]);

  const getPhotosUrls = async () => {
    try {
      const fetchedPhotos = await apiClient.events.getPhoto(eventId as number);

      if (fetchedPhotos.ok) {
        setPhotoUrls(fetchedPhotos.data);
        console.log(fetchedPhotos.data);
      } else {
        // TODO: Handle errors
      }
    } catch (error) {
      console.warn(error);
      Alert.alert(
        "An error occurred in fetching photos urls for event with id: [" +
        eventId +
        "]"
      );
    }
  };

  const getEvent = async () => {
    try {
      const fetchedEvents = await apiClient.events.getEventById(
        eventId as number
      );

      if (fetchedEvents.ok) {
        const image = fetchedEvents.data.placeSchema;
        fetchedEvents.data.placeSchema = image
          ? image.includes("data:image/png;base64,")
            ? image
            : "data:image/png;base64," + image
          : undefined;

        setEvent(fetchedEvents.data);
        await getPhotosUrls();
      }
    } catch (error) {
      console.warn(error);
      Alert.alert("An error occurred");
    }
  };

  const [reservationLocation, setReservationLocation] = useRecoilState(
    selectedReservationLocation
  );

  const mapFunction = () => {
    const lat: number = parseFloat(event!.latitude);
    const lon: number = parseFloat(event!.longitude);
    setReservationLocation({ latitude: lat, longitude: lon });
    router.push("/map");
  };

  useEffect(() => {
    getEvent().then(() => {
      setLoading(false);
    });
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={{ flexGrow: 1 }}
      >
        <View style={styles.container}>
          {
            photoUrls.length === 0 ? undefined :
              <>
                <FlatList
                  onScroll={Animated.event(
                    [{ nativeEvent: { contentOffset: { x: scrollX } } }],
                    {
                      useNativeDriver: false,
                    }
                  )}
                  showsHorizontalScrollIndicator={false}
                  style={styles.photos}
                  horizontal={true}
                  snapToAlignment="start"
                  decelerationRate="normal"
                  snapToInterval={imgWidth + 10}
                  data={photoUrls}
                  renderItem={
                    ({ item, index }) =>
                      <View style={{ width: imgWidth, marginLeft: index === 0 ? 0 : 10 }}>
                        <Card style={{ width: '100%' }}>
                          <Card.Cover source={{ uri: photoUrls[index] }} resizeMode={'stretch'} />
                        </Card>
                      </View>
                  }
                />
                <View style={{ height: 40 }}>
                  <ScalingDot data={photoUrls} scrollX={scrollX} />
                </View>
              </>
          }

          <Text style={styles.title}>Reservation details</Text>
          <View
            style={styles.separator}
            lightColor="#eee"
            darkColor="rgba(255,255,255,0.1)"
          />

          {event === undefined ? (
            <View style={{ marginTop: 20 }}>
              <ActivityIndicator animating size="large" />
            </View>
          ) : (
            <View style={styles.cardView}>
              <Card>
                <Card.Content style={{ rowGap: 5 }}>
                  <Text
                    style={{
                      display: "flex",
                      fontSize: 20,
                      fontWeight: "bold",
                    }}
                  >
                    {event.title}
                  </Text>
                  <Text style={{ display: "flex", fontSize: 20 }}>
                    <MaterialCommunityIcon
                      name="calendar-start"
                      size={20}
                      color="#555"
                    />
                    {new Intl.DateTimeFormat("en-US", {
                      year: "numeric",
                      month: "2-digit",
                      day: "2-digit",
                      hour: "2-digit",
                      minute: "2-digit",
                      second: "2-digit",
                    }).format(event.startTime * 1000)}
                  </Text>
                  <Text style={{ display: "flex", fontSize: 20 }}>
                    <MaterialCommunityIcon
                      name="calendar-end"
                      size={20}
                      color="#555"
                    />
                    {new Intl.DateTimeFormat("en-US", {
                      year: "numeric",
                      month: "2-digit",
                      day: "2-digit",
                      hour: "2-digit",
                      minute: "2-digit",
                      second: "2-digit",
                    }).format(event.endTime * 1000)}
                  </Text>
                  <Text style={{ display: "flex", fontSize: 20 }}>
                    {event.name}
                  </Text>
                  <View style={{ backgroundColor: "none", marginTop: 10 }}>
                    <Text style={{ display: "flex", fontSize: 20 }}>
                      Categories:
                    </Text>
                    <View style={styles.chips}>
                      {event.categories.map((category: Category) => (
                        <Chip key={category.id} style={{ maxWidth: 130 }}>
                          {category.name}
                        </Chip>
                      ))}
                    </View>
                  </View>
                  <View
                    style={{
                      backgroundColor: "none",
                      marginTop: 10,
                      minHeight: 200,
                    }}
                  >
                    <Text style={{ display: "flex", fontSize: 20 }}>
                      <MaterialCommunityIcon
                        name="seat"
                        size={20}
                        color="#555"
                      />
                      Seats:
                    </Text>
                    <View
                      style={{
                        backgroundColor: "none",
                        alignItems: "center",
                        justifyContent: "center",
                        maxHeight: 300,
                        padding: 10,
                      }}
                    >
                      {event.placeSchema ? (
                        <Image
                          style={styles.image}
                          source={{ uri: event.placeSchema }}
                        />
                      ) : (
                        <Text>Not available</Text>
                      )}
                    </View>
                  </View>
                </Card.Content>
                <Card.Actions
                  style={{ marginVertical: 5, backgroundColor: "none" }}
                >
                  <IconButton icon="map" onPress={mapFunction} />
                </Card.Actions>
              </Card>
            </View>
          )}

          {/* Use a light status bar on iOS to account for the black space above the modal */}
          <StatusBar style={Platform.OS === "ios" ? "light" : "auto"} />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    // marginBottom: 200
  },
  container: {
    paddingTop: 20,
    // paddingBottom: 100,
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
  },
  photos: {
    marginBottom: 10,
    marginHorizontal: 10,
  },
  cardView: {
    padding: 10,
    margin: 5,
    minWidth: "80%",
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 15,
    height: 1,
    width: "80%",
  },
  image: {
    height: "100%",
    width: "100%",
    resizeMode: "contain",
    margin: 15,
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

  dropdown: {
    height: 50,
    borderColor: "gray",
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
  },
  icon: {
    marginRight: 5,
  },
  label: {
    position: "absolute",
    backgroundColor: "white",
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});
