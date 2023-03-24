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
import {EventsFiltersAccordion} from "../../components/EventsFiltersAccordion";
import {Banner, FAB} from "react-native-paper";

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

	const [active, setActive] = React.useState('');
	const [visible, setVisible] = React.useState(true);

	return (
		<SafeAreaView style={{flex: 1}}>
			<View style={styles.container}>

				<Text style={styles.title}>Tab One</Text>
				{/*<View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)"/>*/}


				{/*{
					!showCategoriesAccordion ?
						<View style={{marginTop: 120, backgroundColor: "red"}}>
							<EventsFiltersAccordion
							categories={categories}
							getEvents={eventApi.getEvents}
							getByCategory={eventApi.getByCategory}
							getCategories={categoriesApi.getCategories}
						/>
							<Banner style={{backgroundColor: "green"}}
											visible={!showCategoriesAccordion}
											actions={[
												{
													label: 'Fix it',
													onPress: () => setVisible(false),
												},
												{
													label: 'Learn more',
													onPress: () => setVisible(false),
												},
											]}
											icon={({size}) => (
												<Image
													source={{
														uri: 'https://avatars3.githubusercontent.com/u/17571969?s=400&v=4',
													}}
													style={{
														width: size,
														height: size,
													}}
												/>
											)}
							>
								<EventsFiltersAccordion
								categories={categories}
								getEvents={eventApi.getEvents}
								getByCategory={eventApi.getByCategory}
								getCategories={categoriesApi.getCategories}
							/>
								<Text>
									xDD
								</Text>
							</Banner>
						</View>
						: undefined
				}*/}

				<Banner
					visible={visible}
					actions={[
						{
							label: 'Fix it',
							onPress: () => setVisible(false),
							color: 'red'
						},
						{
							label: 'Learn more',
							onPress: () => setVisible(false),
							color: 'red'
						},
					]}>
					<View style={{backgroundColor: "lightblue", marginTop: 100}}>
						<Text style={{fontWeight: "bold", fontSize: 10}}>
							Ajflfjlawjfljflwjflia
						</Text>
					</View>
					{/*<EventsFiltersAccordion
						categories={categories}
						getEvents={eventApi.getEvents}
						getByCategory={eventApi.getByCategory}
						getCategories={categoriesApi.getCategories}
					/>*/}
				</Banner>

				<View style={{backgroundColor: "blue"}}>
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
		marginBottom: 60,
	},
	fab: {
		position: 'absolute',
		margin: 10,
		right: 0,
		bottom: 0,
	},
});
