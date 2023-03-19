import React from "react";
import { StyleSheet, View } from "react-native";
import { Card, Text, Button } from "react-native-paper";
import {Event} from '../open-api/generated'

export const EventCard = (props: { event: Event }) => {
    const { event } = { ...props };

    return (
        <Card style={styles.card} >
            <Card.Content >
                <View style={styles.contentView}>
                    <Text style={{ display: 'flex', fontSize: 20, fontWeight: 'bold' }}>
                        &nbsp;{event.id}
                        &nbsp;{event.title}
                    </Text>
                </View>
                <View style={styles.contentView}>
                    <View style={styles.information}>
                        <Text style={{ display: 'flex', fontSize: 18 }}>
                            &nbsp;{new Intl.DateTimeFormat('en-US', {year: 'numeric',
                            month: '2-digit',day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit'}).format(event.startTime)}
                        </Text>
                    </View>
                    <View style={styles.button}>
                        <Button mode="contained">
                            Rezerwuj
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
        marginLeft: 20,
        marginTop: 10,
    },
});