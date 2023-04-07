import React from "react";
import {StyleSheet, View} from "react-native";
import {Button, Card, Text} from "react-native-paper";
import {Event} from '../api/Api'
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons'
import {MaterialCommunityIcons} from "@expo/vector-icons";

export const ReservedEventCard = (
	props: {
		event: Event,
		myFunction: () => void
	}) => {

	const { event, myFunction } = { ...props };

	return (
		<Card style={styles.card} >
			<Card.Title title={event.title} titleStyle={{fontSize: 20, fontWeight: 'bold' }} subtitle={event.latitude + ' ' +
				event.longitude} subtitleStyle={{fontSize: 14}}/>
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
			</Card.Content>
			<Card.Actions>
				<Button onPress={() => {console.log("Cancel")}}>Cancel</Button>
			</Card.Actions>

		</Card>
	)
}

const styles = StyleSheet.create({
	card: {
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