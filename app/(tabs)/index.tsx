import {Alert, FlatList, RefreshControl, SafeAreaView, StyleSheet} from 'react-native';
import {View} from '../../components/Themed';
import {CategoriesApi, Category, Configuration, Event, EventApi} from '../../open-api/generated'
import React, {useEffect, useState} from "react";
import {BigButton} from "../../components/BigButton";
import {EventCard} from "../../components/EventCard";
import axios from "axios";
import 'react-native-url-polyfill/auto';
import Backend from "../../constants/Backend";
import {useRecoilState} from "recoil";
import selectedEventIdState from "../../recoil/selectedEventIdState";
import {Provider} from "react-native-paper";
import allEventsSearchNameState from "../../recoil/allEventsSortByNameState";
import allEventsFilterByCategoryState from "../../recoil/allEventsFilterByCategoryState";
import allEventsSortByState from "../../recoil/allEventsSortByState";

export default function TabOneScreen() {

	const config = new Configuration();
	const axiosInstance = axios.create({
		headers: {Authorization: 'YOUR_TOKEN'},
	});
	const eventApi = new EventApi(config, Backend(''), axiosInstance);

	const categoriesApi = new CategoriesApi(config, Backend(''), axiosInstance);

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
			const fetchedEvents = await eventApi.getEvents();
			// console.log("Fetched getEvents");
			setEvents(data => fetchedEvents.data);
			setLoading(false);
		} catch (error) {
			console.warn(error);
			Alert.alert('An error occurred');
		}
	};

	const getCategories = async () => {
		try {
			const fetchedCategories = await categoriesApi.getCategories();
			// console.log("Fetched getCategories");
			setCategories(data => fetchedCategories.data);
			setLoading(false);
		} catch (error) {
			console.warn(error);
			Alert.alert('An error occurred');
		}
	};

	useEffect(() => {
		getEvents();
		getCategories();
	}, []);

	// DEBUG
	useEffect(() => {
		console.log("----------------------");
		console.log("SearchQuery: " + searchQuery);
		console.log("CategoryId: " + categoryId);
		console.log("SortBy: " + sortBy);
		console.log("----------------------");
	}, [searchQuery, categoryId, sortBy])

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
													<EventCard event={item}/>
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
		justifyContent : "center",
		alignItems: "center"
	}

});
