import { StyleSheet } from "react-native";
import { View } from "../components/Themed";
import { useEffect } from "react";
import { useNavigation } from "expo-router";
import MapView, { Marker } from "react-native-maps";
import { useRecoilState } from "recoil";
import selectedReservationLocation from "../recoil/selectedReservationLocation";

export default function MapScreen() {
  const navigation = useNavigation();

  const [reservationLocation, _] = useRecoilState(
    selectedReservationLocation
  );
  const mapRegion = {
    latitude: reservationLocation.latitude,
    longitude: reservationLocation.longitude,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };

  useEffect(() => {
    // set title on page load
    navigation.setOptions({ title: "Map" });
  }, []);

  return (
    <View style={styles.container}>
      <MapView style={styles.map} region={mapRegion}>
        <Marker coordinate={mapRegion} title={"Reservation location"} />
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: "100%",
    height: "100%",
  },
});
