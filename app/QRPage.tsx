import { StatusBar } from "expo-status-bar";
import { Platform, StyleSheet, Dimensions } from "react-native";
import { View, Text } from "../components/Themed";
import { useRecoilValue } from "recoil";
import qrDataState from "../recoil/qrDataState";
import { useEffect, useState } from "react";
import QRCode from "react-native-qrcode-svg";
import { useNavigation } from "expo-router";

/* Example:
 * const [qr, setQr] = useRecoilState(qrDataState);
 * ...
 * <Link href="/QRPage" onPress={() => setQr({ coreData: "QR Code content", title: "Event name", description: "Event info" })} asChild>
 * ...
 * </Link>
 */
export default function ModalScreen() {
  const data = useRecoilValue(qrDataState);
  const navigation = useNavigation();

  useEffect(() => {
    // set title on page load
    navigation.setOptions({ title: "QR Code for " + data.title });
  }, []);

  return (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: "column",
          alignContent: "center",
          alignItems: "center",
          alignSelf: "center",
          justifyContent: "center",
          gap: 10,
          width: "100%",
          height: "100%",
        }}
      >
        <QRCode
          value={data.coreData}
          size={
            Math.min(
              Dimensions.get("window").width,
              Dimensions.get("window").height
            ) - 100
          }
        />
        <Text style={styles.title}>{data.title}</Text>
        <Text>{data.description}</Text>
      </View>
      <StatusBar style={Platform.OS === "ios" ? "light" : "auto"} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 5,
    height: 1,
    width: "100%",
  },
  margins: {
    margin: 10,
    marginTop: 0,
  },
});
