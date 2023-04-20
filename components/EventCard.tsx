import React, {useEffect} from "react";
import { Alert, StyleSheet, View } from "react-native";
import {Button, Card, Text} from "react-native-paper";
import {Event} from '../api/Api'
// @ts-ignore
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons'
import {MaterialCommunityIcons} from "@expo/vector-icons";
import {getAddressFromCoordinates} from "./GetAddressFromCoordinates";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { apiClient } from "../api/apiClient";
import { Reservation } from "../models/Reservation";

export const EventCard = (
	props: {
		event: Event
	}) => {

	const {event} = {...props};

	const [address, setAddress] = React.useState<string>('');

	const storeData = async (key: string, value: string) => {
		await AsyncStorage.setItem(key, value);
	};

	// TODO: add refetch of events after reservation or move to parent component
	const makeReservation = async () => {
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
		getAddressFromCoordinates({latitude: event.latitude, longitude: event.longitude})
			.then(r => setAddress(r as string))
			.catch(e => {
				console.log(e);
				setAddress('Address not found');
			});
	}, []);

	return (
		<Card style={styles.card}>
			<Card.Title title={event.title} titleStyle={{fontSize: 20, fontWeight: 'bold'}} subtitle={address} subtitleStyle={{fontSize: 14}}/>
			<Card.Content>
				<View style={styles.contentView}>
					<View style={styles.information}>
						<Text style={{display: 'flex', fontSize: 18}}>
							<MaterialCommunityIcon name="calendar" size={26} color="#555"/>
							{new Intl.DateTimeFormat('en-US', {
								year: 'numeric',
								month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit'
							}).format(event.startTime)}
						</Text>
						<Text style={{display: 'flex', fontSize: 18}}>
							<MaterialCommunityIcon name="calendar" size={26} color="#555"/>
							{new Intl.DateTimeFormat('en-US', {
								year: 'numeric',
								month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit'
							}).format(event.endTime)}
						</Text>
					</View>
				</View>
			</Card.Content>
			<Card.Actions>
				<MaterialCommunityIcons name="account-multiple" size={30} color="#555"/>
				<Text style={{marginRight: 20}}>{event.freePlace}/{event.maxPlace}</Text>
				{event.freePlace > 0 ? <Button mode="contained" onPress={makeReservation}>Reserve</Button> :
					<Button mode="contained" disabled={true}>Reserve</Button>}
			</Card.Actions>
		</Card>
	)
}

const styles = StyleSheet.create({
	card: {
		maxWidth: '950%',
		minWidth: '90%',
	},
	contentView: {
		display: 'flex',
		flexDirection: 'row',
		width: '100%',
	},
	information: {},
	image: {
		height: 5,
		width: 5,
		margin: 2,
	},
	button: {
		marginLeft: 40,
		marginTop: 10,
	},
});