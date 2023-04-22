import React, { useEffect } from "react";
import { StyleSheet, View } from "react-native";
import { Button, Card, Text } from "react-native-paper";
import { Event, EventStatus } from '../api/Api'
// @ts-ignore
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons'
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { getAddressFromCoordinates } from "./GetAddressFromCoordinates";


export const EventCard = (
	props: {
		event: Event,
		makeReservation: () => void,
	}) => {

	const {event, makeReservation} = {...props};

	const [address, setAddress] = React.useState<string>('');

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
			<Card.Title title={event.title + ", id: " + event.id + ", " + event.status}
						titleStyle={{fontSize: 20, fontWeight: 'bold'}}
						subtitle={address}
						subtitleStyle={{fontSize: 14}}/>
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
				<Button mode="contained"
						onPress={makeReservation}
						disabled={event.freePlace <= 0 || event.status !== EventStatus.InFuture}>
					Reserve
				</Button>
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