import React from "react";
import { StyleSheet, View } from "react-native";
import { Card, Text } from "react-native-paper";
import {Event} from '../open-api/generated'

export const EventCard = (props: { event: Event }) => {
    const { event } = { ...props };

    return (
        <Card style={styles.card} >
            <Card.Content >
                <View style={styles.contentView}>
                    <Text style={{ display: 'flex', fontSize: 18 }}>
                        &nbsp;{event.id}
                    </Text>
                    <Text style={{ display: 'flex', fontSize: 18 }}>
                        &nbsp;{event.title}
                    </Text>
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
        width: '100%'
    },
    image: {
        height: 5,
        width: 5,
        margin: 2,
    }
});