import {Alert, RefreshControl, StyleSheet} from 'react-native';

import {Text, View} from '../../components/Themed';
import {CategoriesApi, Category, Configuration, Event, EventApi} from '../../open-api/generated'
import {FlatList} from 'react-native';
import React, {useEffect, useState} from "react";
import {BigButton} from "../../components/BigButton";
import {EventCard} from "../../components/EventCard";
import axios from "axios";
import 'react-native-url-polyfill/auto';
import Backend from "../../constants/Backend";
import {useRecoilState} from "recoil";
import selectedEventIdState from "../../recoil/selectedEventIdState";
import showCategoriesAccordionState from "../../recoil/showCategoriesAccordionState";
import {EventsFiltersAccordion} from "../../components/EventsFiltersAccordion";

export default function TabOneScreen() {

    const config = new Configuration();
    const axiosInstance = axios.create({
        headers: {Authorization: 'YOUR_TOKEN'},
    });
    const eventApi = new EventApi(config, Backend(''), axiosInstance);

    const categoriesApi = new CategoriesApi(config, Backend(''), axiosInstance);

    const [isLoading, setLoading] = useState(true);
    const [events, setEvents] = useState<Event[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);

    const [activeEventId, setActiveEventId] = useRecoilState(selectedEventIdState); // used to set ID for Event Details screen

    // const [showCategoriesAccordion, setShowCategoriesAccordion] = useState<boolean>(true);
    const [showCategoriesAccordion, setShowCategoriesAccordion] = useRecoilState(showCategoriesAccordionState);

    const getEvents = async () => {
        try {
            const fetchedEvents = await eventApi.getEvents();
            console.log("Fetched getEvents");
            setEvents(data => fetchedEvents.data);
            setLoading(false);
        } catch (error) {
            console.warn(error);
            Alert.alert('An error occurred');
        }
    };

    const getCategories = async () => {
        try {
            const fetchedCategories = await categoriesApi.getCategories();
            console.log("Fetched getEvents");
            setCategories(data => fetchedCategories.data);
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
            {
                showCategoriesAccordion ?
                  <EventsFiltersAccordion
                    categories={categories}
                    getEvents={eventApi.getEvents}
                    getByCategory={eventApi.getByCategory}
                    getCategories={categoriesApi.getCategories}
                  />
                  : undefined
            }
            <View>
                <FlatList style={styles.flatList}
                    data={events}
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
