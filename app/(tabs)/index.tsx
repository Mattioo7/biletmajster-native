import { Alert, FlatList, RefreshControl, SafeAreaView, StyleSheet } from 'react-native';
import { View } from '../../components/Themed';
import { Category, Event } from '../../api/Api'
import { apiClient } from '../../api/apiClient';
import React, { useEffect, useState } from "react";
import { BigButton } from "../../components/BigButton";
import { EventCard } from "../../components/EventCard";
import 'react-native-url-polyfill/auto';
import { useRecoilState } from "recoil";
import selectedEventIdState from "../../recoil/selectedEventIdState";
import { Provider } from "react-native-paper";
import allEventsSearchNameState from "../../recoil/allEventsSortByNameState";
import allEventsFilterByCategoryState from "../../recoil/allEventsFilterByCategoryState";
import allEventsSortByState from "../../recoil/allEventsSortByState";
import { Reservation } from "../../models/Reservation";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function TabOneScreen() {
	const [isLoading, setLoading] = useState(true);
	const [events, setEvents] = useState<Event[]>([]);
	const [categories, setCategories] = useState<Category[]>([]);

	const [activeEventId, setActiveEventId] = useRecoilState(selectedEventIdState);

	// filters and sorts
	const [searchQuery, setSearchQuery] = useRecoilState(allEventsSearchNameState);
	const [categoryId, setCategoryId] = useRecoilState(allEventsFilterByCategoryState);
	const [sortBy, setSortBy] = useRecoilState(allEventsSortByState);

	const getEvents = async () => {
		try {
			const fetchedEvents = await apiClient.events.getEvents();
			console.log("Fetched getEvents");
			if (fetchedEvents.ok)
				setEvents(fetchedEvents.data);
			else {
				// TODO: Handle error
				console.log("Error: " + fetchedEvents);
			}
		} catch (error) {
			console.warn(error);
			Alert.alert('An error occurred');
		} finally {
			setLoading(false);
		}
	};

	const getCategories = async () => {
		try {
			const fetchedCategories = await apiClient.categories.getCategories();
			// console.log("Fetched getCategories");
			if (fetchedCategories.ok)
				setCategories(fetchedCategories.data);
			else {
				// TODO: Handle error
				console.log("Error: " + fetchedCategories);
			}
		} catch (error) {
			console.warn(error);
			Alert.alert('An error occurred');
		}
	};

	const storeData = async (key: string, value: string) => {
		await AsyncStorage.setItem(key, value);
	};

	// TODO: add refetch of events after reservation or move to parent component
	const makeReservation = async (event: Event) => {
		try {
			// TODO: Api call
			// const reservation = await apiClient.reservation.makeReservation();
			const reservation = {
				ok: true,
				data: {
					reservationToken: "123",
					placeId: 456
				}
			}
			// console.log("Fetched getCategories");
			if (reservation.ok) {
				const reservationData: Reservation = {
					event: event,
					reservationToken: reservation.data.reservationToken,
					placeId: reservation.data.placeId,
				};
				await storeData(event.id.toString(), JSON.stringify(reservationData));

				getEvents();
			}
			else {
				// TODO: Handle error
			}
		} catch (error) {
			console.warn(error);
			Alert.alert('An error occurred');
		} finally {
			console.log("Reserve");
		}
	}

	useEffect(() => {
		getEvents();
		getCategories();
	}, []);

	// DEBUG
	// useEffect(() => {
	// 	console.log("----------------------");
	// 	console.log("SearchQuery: " + searchQuery);
	// 	console.log("CategoryId: " + categoryId);
	// 	console.log("SortBy: " + sortBy);
	// 	console.log("----------------------");
	// }, [searchQuery, categoryId, sortBy])

	// useEffect(() => {
	// 	console.log("SearchQuery: " + searchQuery);
	// }, [searchQuery])
	// useEffect(() => {
	// 	console.log("CategoryId: " + categoryId);
	// }, [categoryId])
	// useEffect(() => {
	// 	console.log("SortBy: " + sortBy);
	// }, [sortBy])

	return (
		<Provider>
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
										  <EventCard event={item} makeReservation={() => makeReservation(item)}/>
									  </BigButton>
								  )}
						/>
					</View>
				</View>

			</SafeAreaView>
		</Provider>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
	},
	title: {
		marginTop: 100,
		fontSize: 20,
		fontWeight: 'bold',
		backgroundColor: "brown",
		width: "auto",
	},
	separator: {
		marginVertical: 50,
		height: 1,
		width: '80%',
	},
	flatList: {},
	fab: {
		position: 'absolute',
		margin: 10,
		right: 0,
		bottom: 0,
	},
	modal: {
		backgroundColor: 'white',
		padding: 20,
		height: 500,
		marginBottom: 50,
		marginHorizontal: 15,
		justifyContent: "center",
		alignItems: "center"
	}

});
