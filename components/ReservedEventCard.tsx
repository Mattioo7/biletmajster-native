import React, {useEffect} from "react";
import {StyleSheet} from "react-native";
import {Button, Card, IconButton, Text} from "react-native-paper";
// @ts-ignore
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons'
import {getAddressFromCoordinates} from "./GetAddressFromCoordinates";
import { Reservation } from "../models/Reservation";

export const ReservedEventCard = (
	props: {
		reservation: Reservation,
		cancelFunction: (id: number, reservationToken: string) => void,
		qrFunction: () => void,
		infoFunction: () => void
	}) => {

	const { reservation, cancelFunction, qrFunction, infoFunction } = { ...props };
	const event = reservation.event;

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
		<Card style={styles.card} >
			<Card.Title title={event.title} titleStyle={{fontSize: 20, fontWeight: 'bold' }} subtitle={address} subtitleStyle={{fontSize: 14}}/>
			<Card.Content>
				<Text style={{marginBottom: 10}}>
					{event.name}
				</Text>
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
				<Text>
					Token: {reservation.reservationToken}
				</Text>
			</Card.Content>
			<Card.Actions>
				{/*<IconButton icon="information" onPress={infoFunction} />*/}
				<IconButton icon="qrcode" onPress={qrFunction}/>
				<Button onPress={() => cancelFunction(event.id, reservation.reservationToken)}>Cancel</Button>
			</Card.Actions>

		</Card>
	)
}

const styles = StyleSheet.create({
	card: {
		margin: 10,
		minWidth: '90%',
	},
	contentView: {
		display: 'flex',
		flexDirection: 'row',
		width: '100%',
	},
	information: {
		marginTop: 20,
	},
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