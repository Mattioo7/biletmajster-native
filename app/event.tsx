import { StatusBar } from 'expo-status-bar';
import { Alert, Image, Platform, ScrollView, StyleSheet } from 'react-native';
import { Text, View } from '../components/Themed';
import { useRecoilState } from "recoil";
import selectedEventIdState from "../recoil/selectedEventIdState";
import React, { useEffect, useState } from "react";
import { Event, EventWithPlaces, Place } from '../api/Api'
import { apiClient } from '../api/apiClient';
import { ActivityIndicator, Card } from "react-native-paper";
// @ts-ignore
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons'
import { Dropdown } from 'react-native-element-dropdown';

interface data {
	label: string;
	value: number;
}

export default function ModalScreen() {
	const [eventId, setEventId] = useRecoilState(selectedEventIdState);
	const [event, setEvent] = useState<EventWithPlaces | undefined>();

	// dropdown
	const data = [
		{ label: 'Item 1', value: '1' },
		{ label: 'Item 2', value: '2' },
		{ label: 'Item 3', value: '3' },
		{ label: 'Item 4', value: '4' },
		{ label: 'Item 5', value: '5' },
		{ label: 'Item 6', value: '6' },
		{ label: 'Item 7', value: '7' },
		{ label: 'Item 8', value: '8' },
	];

	// const data2 = event.places.map((place) => {
	// 	label: place.id;
	// 	value: place.id
	// });


	const [data2, setData2] = useState<data[]>([]);

	const [value, setValue] = useState<number>();
	const [isFocus, setIsFocus] = useState(false);

	const renderLabel = () => {
		if (value || isFocus) {
			return (
				<Text style={[styles.label, isFocus && { color: 'blue' }]}>
					Dropdown label
				</Text>
			);
		}
		return null;
	};
	// end dropdown

	const getEvent = async () => {
		try {
			const fetchedEvents = await apiClient.events.getEventById(eventId as number);
			// console.log("Fetched getEvent");
			if (fetchedEvents.ok) {
				setEvent(fetchedEvents.data);
				// console.log(fetchedEvents.data);

				const data22: data[] = fetchedEvents.data.places.map((place: Place) => ({
					label: `Place ${place.id}`,
					value: place.id,
				}));

				setData2(prev => data22);
			} else {
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

	useEffect(() => {
		console.log(value);
	}, [value]);

	return (
		<View style={{flex: 1}}>
		<ScrollView style={styles.scrollView} contentContainerStyle={{flexGrow:1}} >
			<View style={styles.container}>
				<Text style={styles.title}>Event details</Text>
				<View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)"/>
				{/*<Text style={styles.title}>Event id: {eventId}</Text>*/}
				{/*<EditScreenInfo path="app/modal.tsx" />*/}

				{event === undefined
					?
					<View style={{marginTop: 20}}>
						<ActivityIndicator animating size='large'/>
					</View>
					:
					<View style={styles.cardView}>
						<Card>
							<Card.Content style={{rowGap: 5}}>
								<Text style={{display: 'flex', fontSize: 20, fontWeight: 'bold'}}>
									{event.title}
									{/*{event.status}*/}
									{/*{event.categories}*/}
								</Text>
								<Text style={{display: 'flex', fontSize: 20}}>
									<MaterialCommunityIcon name="ticket" size={20} color="#555"/>
									Free places: {event.freePlace}
								</Text>
								<Text style={{display: 'flex', fontSize: 20}}>
									<MaterialCommunityIcon name="calendar-start" size={20} color="#555"/>
									{new Intl.DateTimeFormat('en-US', {
										year: 'numeric',
										month: '2-digit',
										day: '2-digit',
										hour: '2-digit',
										minute: '2-digit',
										second: '2-digit'
									})
										.format(event.startTime)}
								</Text>
								<Text style={{display: 'flex', fontSize: 20}}>
									<MaterialCommunityIcon name="calendar-end" size={20} color="#555"/>
									{new Intl.DateTimeFormat('en-US', {
										year: 'numeric',
										month: '2-digit',
										day: '2-digit',
										hour: '2-digit',
										minute: '2-digit',
										second: '2-digit'
									})
										.format(event.endTime)}
								</Text>
								<Text style={{display: 'flex', fontSize: 20}}>
									{event.name}
								</Text>
								<View style={{backgroundColor: "none", marginTop: 10, minHeight: 200}}>
									<Text style={{display: 'flex', fontSize: 20}}>
										<MaterialCommunityIcon name="seat" size={20} color="#555"/>
										Seats:
									</Text>
									{/*dropdown with seats*/}
									<Dropdown
										style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
										placeholderStyle={styles.placeholderStyle}
										selectedTextStyle={styles.selectedTextStyle}
										inputSearchStyle={styles.inputSearchStyle}
										iconStyle={styles.iconStyle}
										data={data2}
										search
										maxHeight={300}
										labelField="label"
										valueField="value"
										placeholder={!isFocus ? 'Select item' : '...'}
										searchPlaceholder="Search..."
										value={value}
										onFocus={() => setIsFocus(true)}
										onBlur={() => setIsFocus(false)}
										onChange={item => {
											setValue(item.value);
											setIsFocus(false);
										}}
									/>
									{event.placeSchema ?
										<Image
											style={styles.image}
											source={{uri: event.placeSchema}}
										/>
										: <Text>Not available</Text>}
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
				<StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'}/>
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
		paddingBottom: 200,
		flex: 1,
		alignItems: 'center',
		justifyContent: 'flex-start',
	},
	cardView: {
		padding: 10,
		margin: 5,
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

	dropdown: {
		height: 50,
		borderColor: 'gray',
		borderWidth: 0.5,
		borderRadius: 8,
		paddingHorizontal: 8,
	},
	icon: {
		marginRight: 5,
	},
	label: {
		position: 'absolute',
		backgroundColor: 'white',
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





