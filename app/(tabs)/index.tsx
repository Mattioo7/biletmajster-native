import {Alert, RefreshControl, StyleSheet} from 'react-native';

import {Text, View} from '../../components/Themed';
import {Configuration, Event, EventApi} from '../../open-api/generated'
import {FlatList} from 'react-native';
import React, {useEffect, useState} from "react";
import {BigButton} from "../../components/BigButton";
import {EventCard} from "../../components/EventCard";
import axios from "axios";
import 'react-native-url-polyfill/auto';
import Backend from "../../constants/Backend";
import {useRecoilState} from "recoil";
import selectedEventIdState from "../../recoil/selectedEventIdState";

export default function TabOneScreen() {

    const config = new Configuration();
    const axiosInstance = axios.create({
        headers: {Authorization: 'YOUR_TOKEN'},
    });
    const eventApi = new EventApi(config, Backend(''), axiosInstance);

    const [isLoading, setLoading] = useState(true);
    const [data, setData] = useState<Event[]>();

    const [activeEventId, setActiveEventId] = useRecoilState(selectedEventIdState); // used to set ID for Event Details screen

    const getEvents = async () => {
        try {
            const fetchedEvents = await eventApi.getEvents();
            console.log("Fetched getEvents");
            setData(data => fetchedEvents.data);
            setLoading(false);
        } catch (error) {
            console.warn(error);
            Alert.alert('An error occurred');
        }
    };

    useEffect(() => {
        getEvents();
    }, []);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Tab One</Text>
            <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)"/>
            <View>
                <FlatList style={styles.flatList}
                    data={data}
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
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    separator: {
        marginVertical: 30,
        height: 1,
        width: '80%',
    },
    flatList: {
        marginBottom: 60,
    },
});
