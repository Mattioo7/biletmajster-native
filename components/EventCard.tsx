import React from "react";
import { StyleSheet, View } from "react-native";
import { Card, Text, Button } from "react-native-paper";
import { Event } from '../api/Api'
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons'

export const EventCard = (props: { event: Event }) => {
    const { event } = { ...props };

    return (
        <Card style={styles.card} >
            <Card.Content >
                <View style={styles.contentView}>
                    <MaterialCommunityIcon name="calendar" size={26} color="#555" />
                    <Text style={{ display: 'flex', fontSize: 20, fontWeight: 'bold' }}>
                        {/*{event.id}*/}
                        {event.title}
                    </Text>
                </View>
                <View style={styles.contentView}>
                    <View style={styles.information}>
                        <Text style={{ display: 'flex', fontSize: 18 }}>
                            {new Intl.DateTimeFormat('en-US', {year: 'numeric',
                            month: '2-digit',day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit'}).format(event.startTime)}
                        </Text>
                    </View>
                    <View style={styles.button}>
                        <Button mode="contained">
                            Reserve
                        </Button>
                    </View>
                </View>
            </Card.Content>
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