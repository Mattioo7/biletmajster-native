import { FlatList, RefreshControl, SafeAreaView, StyleSheet } from 'react-native';
import { View } from '../../components/Themed';
import { ReservedEventCard } from "../../components/ReservedEventCard";
import React, { useEffect, useState } from "react";
import { Event, EventStatus } from "../../api/Api";
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
	// const [reservations, setReservations] = useState<Reservation[]>([]);
	const [reservations, setReservations] = useState<Reservation[]>([]);
	const [activeEventId, setActiveEventId] = useRecoilState(selectedEventIdState);

	const ress: Reservation = {
		"event":
			{
				"id": 21,
				"title": "Patch test",
				"startTime": 1687568840,
				"endTime": 1688568840,
				"latitude": "52.3682382",
				"longitude": "20.8801369",
				"name": "Postman test",
				"status": EventStatus.Cancelled,
				"categories": [
					{
						"id": 1,
						"name": "Sport"
					},
					{
						"id": 2,
						"name": "Art"
					}
				],
				"freePlace": 10,
				"maxPlace": 10,
				"placeSchema": ""
			},
		"reservationToken": "123",
		"placeId": 456
	}

	const getReservations = async () => {
		// console.log("getReservations");
		try {
			const keys = await AsyncStorage.getAllKeys();
			const data = await AsyncStorage.multiGet(keys);

			const eee = data.map(([key, value]) => JSON.parse(value as string));

			setReservations(prevState => data.map(([key, value]) => JSON.parse(JSON.parse(value as string))));

			console.log("here2");

		} catch (e) {
			console.log(e);
		} finally {
			setLoading(false);
		}
	}

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
		<SafeAreaView style={{flex: 1}}>
			<View style={styles.container}>

				<View style={{backgroundColor: "none"}}>
					<FlatList style={styles.flatList}
							  data={reservations}
							  ListEmptyComponent={<EmptyListComponent/>}
							  refreshControl={
								  <RefreshControl
									  refreshing={isLoading}
									  onRefresh={getReservations}
								  />
							  }
							  renderItem={({item, index}) => (
								  <ReservedEventCard
									  key={item.event.id}
									  event={item.event}
									  qrFunction={() => showQRCode(item.event)}
									  cancelFunction={() => {
										  console.log("Cancel")
									  }}
									  infoFunction={() => {
										  setActiveEventId(item.event.id);
										  router.push("/event");
									  }}
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
	flatList: {},
});
