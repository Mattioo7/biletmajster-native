import {Alert, StyleSheet} from 'react-native';

import EditScreenInfo from '../../components/EditScreenInfo';
import {Text, View} from '../../components/Themed';
import {Configuration, Event, EventApi} from '../../open-api/generated'
import {RefreshControl, TouchableOpacity, FlatList, Animated, ScrollView} from 'react-native';
import {useEffect, useState} from "react";
import {BigButton} from "../../components/BigButton";
import {EventCard} from "../../components/EventCard";
import axios from "axios";
// import 'react-native-url-polyfill/auto';

export default function TabOneScreen() {

    const [isLoading, setLoading] = useState(true);
    const [data, setData] = useState<Event[]>();
    const [event, setEvent] = useState<Event>();

    const config = new Configuration();
    const axiosInstance = axios.create({
        headers: {Authorization: 'YOUR_TOKEN'},
    });
    const eventApi = new EventApi(config, 'http://localhost:3000', axiosInstance);

    const getEvent = async (id: number) => {
        try {
            const fetchedEvent = await eventApi.getEventById(id);
            setEvent(fetchedEvent.data);
            setLoading(false);
        } catch (error) {
            console.warn(error);
            Alert.alert('An error occurred');
        }
    };

    const getEvents = async () => {
        try {
            const fetchedEvents = await eventApi.getEvents();
            console.log("Udalo sie");
            setData(fetchedEvents.data);
            setLoading(false);
        } catch (error) {
            console.warn(error);
            Alert.alert('An error occurred');
        }
    };

    function fetchCars() {
        setLoading(false);
        fetch('http://localhost:3000/events/')
            .then((response) => response.json())
            .then((json) => {
                // console.log(json);
                setData(json);
            })
            .catch((error) => console.error(error))
            .finally(() => {
                setLoading(false);
            });
    }

    useEffect(() => {
        console.log("Before getEvents");
        // getEvents();
        fetchCars();
        console.log("After getEvents");
    }, []);


    // const [_, setActiveCarId] = useRecoilState(selectedCarIdState); // used to set ID for Car Details screen

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Tab One</Text>
            <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)"/>
            {/*<EditScreenInfo path="app/(tabs)/index.tsx" />*/}
            <View>
                <FlatList
                    data={data}
                    // keyExtractor={({id}, index) => id}
                    /*refreshControl={
                      <RefreshControl
                          refreshing={isLoading}
                          onRefresh={fetchCars}
                      />
                    }*/
                    renderItem={({item, index}) => (
                        <BigButton
                            index={index}
                            onPress={() => {
                                // setActiveCarId(item.id);
                                // navigation.navigate('CarDetailsScreen');
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
});
