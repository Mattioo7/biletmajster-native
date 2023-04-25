import { Alert, FlatList, RefreshControl, SafeAreaView, StyleSheet } from 'react-native';
import { View } from '../../components/Themed';
import { Category, Event } from '../../api/Api'
import { apiClient } from '../../api/apiClient';
import React, { useCallback, useEffect, useState } from "react";
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
import EmptyListComponent from "../../components/EmptyListComponent";
import { useFocusEffect } from "@react-navigation/native";

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
			if (fetchedEvents.ok)
				setEvents(fetchedEvents.data);
			else {
				console.log("Error: " + fetchedEvents);
			}
		} catch (error) {
			console.warn(error);
			Alert.alert('An error occurred');
		}
	};

	const getEventsWithFilters = async (categoryId?: number, searchText?: string, sortBy?: string) => {
		try {
			let fetchedEvents;
			if (categoryId !== undefined) {
				const headers = {
					headers: {
						categoryId: categoryId.toString()
					},
				};
				fetchedEvents = await apiClient.events.getByCategory(headers);
			}
			else {
				fetchedEvents = await apiClient.events.getEvents();
			}

			if (fetchedEvents.ok) {
				if (searchText !== undefined) {
					fetchedEvents.data = fetchedEvents.data.filter((event) => {
						return event.title.toLowerCase().includes(searchText.toLowerCase());
					});
				}
				if (sortBy !== undefined) {
					if (sortBy === "name") {
						fetchedEvents.data.sort((a, b) => {
							return a.name.localeCompare(b.name);
						});
					} else if (sortBy === "freePlace") {
						fetchedEvents.data.sort((a, b) => {
							return a.freePlace - b.freePlace;
						});
					} else if (sortBy === "startTime") {
						fetchedEvents.data.sort((a, b) => {
							return a.startTime - b.startTime;
						});
					} else if (sortBy === "endTime") {
						fetchedEvents.data.sort((a, b) => {
							return a.endTime - b.endTime;
						});
					}
				}
				setEvents(fetchedEvents.data);
			}
			else {
				console.log("getEventsWithFilters status code: " + fetchedEvents.status);
				console.log("Error in getEventsWithFilters: " + fetchedEvents);
			}
		} catch (error) {
			console.warn(error);
			Alert.alert('An error occurred');
		}
	};

	const getCategories = async () => {
		try {
			const fetchedCategories = await apiClient.categories.getCategories();
			if (fetchedCategories.ok)
				setCategories(fetchedCategories.data);
			else {
				console.log("Error: " + fetchedCategories);
			}
		} catch (error) {
			console.warn(error);
			Alert.alert('An error occurred');
		}
	};

	const makeReservation = async (event: Event) => {
		setLoading(true);
		try {

			const headers = {
				headers: {
					eventId: event.id.toString()
				},
			};

			const reservation = await apiClient.reservation.makeReservation(headers);

			if (reservation.ok) {
				const reservationData: Reservation = {
					event: event,
					reservationToken: reservation.data.reservationToken,
					placeId: reservation.data.placeId,
				};
				await AsyncStorage.setItem(event.id.toString() + '_' + reservationData.placeId.toString(), JSON.stringify(reservationData))
					.then(() => {
						// console.log("Stored reservation: " + JSON.stringify(reservationData));
					});
			}
			else {
				// TODO: Handle error
				console.log("Error in file [index.tsx] in makeReservation = async (event: Event): " + reservation.error);
				console.log(reservation.status);
			}
		} catch (error) {
			console.warn(error);
			Alert.alert('An error occurred');
		} finally {
			getEvents()
				.then(() => {
					setLoading(false);
				});
		}
	}

	useEffect(() => {
		getCategories()
			.then(() => {
				//console.log("Fetched categories");
			});
	}, []);

	useEffect(() => {
		getEventsWithFilters(categoryId, searchQuery, sortBy)
			.then(() => {
				setLoading(false);
			});
	}, [categoryId, searchQuery, sortBy]);

	useFocusEffect(
		useCallback(() => {
			getEventsWithFilters(categoryId, searchQuery, sortBy)
				.then(() => {
					setLoading(false);
				});
			return () => {};
		}, [])
	);

	return (
		<Provider>
			<SafeAreaView style={{flex: 1}}>
				<View style={styles.container}>

					<View style={{backgroundColor: "none", flex: 1}}>
						<FlatList style={styles.flatList}
								  data={events}
								  ListEmptyComponent={<EmptyListComponent/>}
								  refreshControl={
									  <RefreshControl
										  refreshing={isLoading}
										  onRefresh={() => getEventsWithFilters(categoryId, searchQuery, sortBy)}
									  />
								  }
								  renderItem={({item, index}) => (
									  <BigButton
										  index={index}
										  onPress={() => {
											  setActiveEventId(item.id);
										  }}>
										  <EventCard event={item}
													 makeReservation={() => makeReservation(item)}/>
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
	flatList: {
		flex: 1,
	},
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
