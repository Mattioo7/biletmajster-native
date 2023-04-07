import {StatusBar} from 'expo-status-bar';
import {Alert, Image, Platform, StyleSheet} from 'react-native';

import {Text, View} from '../components/Themed';
import {useRecoilState} from "recoil";
import selectedEventIdState from "../recoil/selectedEventIdState";
import React, {useEffect, useState} from "react";
import {Event} from '../api/Api'
import {apiClient} from '../api/apiClient';
import {ActivityIndicator, Card} from "react-native-paper";
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons'


export default function ModalScreen() {
	const [eventId, setEventId] = useRecoilState(selectedEventIdState);
	const [event, setEvent] = useState<Event | undefined>();

	const getEvent = async () => {
		try {
			const fetchedEvents = await apiClient.events.getEventById(eventId as number);
			// console.log("Fetched getEvent");
			if (fetchedEvents.ok)
				setEvent(fetchedEvents.data);
			else {
				// TODO: Handle errors
			}
		} catch (error) {
			console.warn(error);
			Alert.alert('An error occurred');
		}
	};

	useEffect(() => {
		getEvent();
	}, []);

	return (
		<View style={styles.container}>
			<Text style={styles.title}>Event details</Text>
			<View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
			{/*<Text style={styles.title}>Event id: {eventId}</Text>*/}
			{/*<EditScreenInfo path="app/modal.tsx" />*/}

			{event === undefined
				?
				<View style={{ marginTop: 20 }}>
					<ActivityIndicator animating size='large' />
				</View>
				:
				<View style={styles.cardView}>
					<Card>
						<Card.Content style={{rowGap: 5}}>
							<Text style={{ display: 'flex', fontSize: 20, fontWeight: 'bold' }}>
								{event.title}
								{/*{event.status}*/}
								{/*{event.categories}*/}
							</Text>
							<Text style={{ display: 'flex', fontSize: 20 }}>
								<MaterialCommunityIcon name="ticket" size={20} color="#555" />
								Free places: {event.freePlace}
							</Text>
							<Text style={{ display: 'flex', fontSize: 20 }}>
								<MaterialCommunityIcon name="calendar-start" size={20} color="#555" />
								{new Intl.DateTimeFormat('en-US', {year: 'numeric',
								month: '2-digit',day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit'})
								.format(event.startTime)}
							</Text>
							<Text style={{ display: 'flex', fontSize: 20 }}>
								<MaterialCommunityIcon name="calendar-end" size={20} color="#555" />
								{new Intl.DateTimeFormat('en-US', {year: 'numeric',
								month: '2-digit',day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit'})
								.format(event.endTime)}
							</Text>
							<Text style={{ display: 'flex', fontSize: 20 }}>
								{event.name}
							</Text>
							<View style={{ backgroundColor: "none", marginTop: 10}}>
								<Text style={{ display: 'flex', fontSize: 20 }}>
									<MaterialCommunityIcon name="seat" size={20} color="#555" />
									Seats:
								</Text>
								<Image
									style={styles.image}
									source={{uri: event.placeSchema}}
								/>
							</View>
							{/*<View>
								<Text style={{ display: 'flex', fontSize: 20 }}>
									Categories:
								</Text>
								<FlatList
									data={event.categories}
									renderItem={({item, index}) => (
										<Text style={{ display: 'flex', fontSize: 20 }}>
											{item.name}
										</Text>
									)}
								/>
							</View>*/}

						</Card.Content>
					</Card>
				</View>
			}

			{/* Use a light status bar on iOS to account for the black space above the modal */}
			<StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
		</View>
	);
}

const styles = StyleSheet.create({
	cardView: {
		padding: 10,
		margin: 5,
	},
	container: {
		paddingTop: 20,
		flex: 1,
		alignItems: 'center',
		justifyContent: 'flex-start',
	},
	title: {
		fontSize: 30,
		fontWeight: 'bold',
	},
	separator: {
		marginVertical: 15,
		height: 1,
		width: '80%',
	},
	image: {
		height: '100%',
		width: '100%',
		maxHeight: 200,
		// alignSelf: "center",
		resizeMode: 'contain',
		marginTop: 5
	},
});





