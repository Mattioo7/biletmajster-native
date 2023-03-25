import {Alert, Image, RefreshControl, SafeAreaView, StyleSheet} from 'react-native';
import {Text, View} from '../../components/Themed';
import {CategoriesApi, Category, Configuration, Event, EventApi} from '../../open-api/generated'
import {FlatList} from 'react-native';
import React, {useEffect, useState} from "react";
import {BigButton} from "../../components/BigButton";
import {EventCard} from "../../components/EventCard";
import axios from "axios";
import 'react-native-url-polyfill/auto';
import Backend from "../../constants/Backend";
import {useRecoilState} from "recoil";
import selectedEventIdState from "../../recoil/selectedEventIdState";
import showCategoriesAccordionState from "../../recoil/showCategoriesAccordionState";
import {EventsCategoriesFilter} from "../../components/EventsCategoriesFilter";
import {FAB, Provider, Portal, Modal, Dialog, Button} from "react-native-paper";

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

	const [activeEventId, setActiveEventId] = useRecoilState(selectedEventIdState); // used to set ID for Event Details screen

	// const [showCategoriesAccordion, setShowCategoriesAccordion] = useState<boolean>(true);
	const [showCategoriesAccordion, setShowCategoriesAccordion] = useRecoilState(showCategoriesAccordionState);

	const getEvents = async () => {
		try {
			const fetchedEvents = await eventApi.getEvents();
			console.log("Fetched getEvents");
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
			console.log("Fetched getEvents");
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

	// modal
	const [visible, setVisible] = React.useState(true);
	const showModal = () => setVisible(true);
	const hideModal = () => setVisible(false);

	return (
		<Provider>
			<SafeAreaView style={{flex: 1}}>
				<View style={styles.container}>

					<Portal>
						<Modal visible={visible} onDismiss={hideModal} contentContainerStyle={styles.modal}>
							<Text>Example Modal. Click outside this area to dismiss.</Text>
							<EventsCategoriesFilter
								categories={categories}
								getEvents={eventApi.getEvents}
								getByCategory={eventApi.getByCategory}
								getCategories={categoriesApi.getCategories}
							/>
						</Modal>
						{/*<Dialog visible={visible} onDismiss={hideModal}>
							<Dialog.Title>Alert</Dialog.Title>
							<Dialog.Content>
								<Text >This is simple dialog</Text>
							</Dialog.Content>
							<Dialog.Actions>
								<Button onPress={hideModal}>Done</Button>
							</Dialog.Actions>
							<EventsCategoriesFilter
								categories={categories}
								getEvents={eventApi.getEvents}
								getByCategory={eventApi.getByCategory}
								getCategories={categoriesApi.getCategories}
							/>
						</Dialog>*/}
					</Portal>

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
														console.log('Pressed event id: ' + item.id);
														console.log('Recoil event id: ' + activeEventId);
													}}>
													<EventCard event={item}/>
												</BigButton>
											)}
						/>
					</View>

					<FAB
						icon="filter-variant"
						style={styles.fab}
						onPress={
							() => {
								console.log('Pressed');
								setShowCategoriesAccordion(currVal => !currVal);
								setVisible(currVal => !currVal);
							}
						}
					/>
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
