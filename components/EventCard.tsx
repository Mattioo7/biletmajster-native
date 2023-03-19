import React, { Key, useEffect, useState } from "react";
import { Image, StyleSheet, View } from "react-native";
// import { CarsPaginationResponse } from "../models/CarsPaginationResponse";
// import { Car } from "../models/Car";
import { Card, Text } from "react-native-paper";
import {Event} from '../open-api/generated'
// import Backend from "../models/Backend";
// import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons'
// import MaterialIcon from 'react-native-vector-icons/MaterialIcons'

export const EventCard = (props: { event: Event }) => {
    const { event } = { ...props };

    // const [isLoading, setLoading] = useState(true);
    // const [car, setCar] = useState<Car>();
    //
    // function fetchCars() {
    //     setLoading(false);
    //     fetch('http://localhost:8080/cars/' + props.id)
    //         .then((response) => response.json())
    //         .then((json) => {
    //             // console.log(json);
    //             setCar(json);
    //         })
    //         .catch((error) => console.error(error))
    //         .finally(() => {
    //             setLoading(false);
    //         });
    // }
    //
    // useEffect(() => {
    //     fetchCars();
    // }, []);

    // const fuelIcon =
    //     (car?.model.fuelType.id === 1
    //         ? "fuel" :
    //         car?.model.fuelType.id === 2
    //             ? "fuel" :
    //             car?.model.fuelType.id === 3
    //                 ? "power-plug" : "hydrogen-station") ?? "";

    // const consumptionString = car?.model.avgFuelConsumption + " " +
    //     (car?.model.fuelType.id === 3
    //         ? "kW / 100 km" : "l / 100 km") ?? "";

    return (
        <Card style={styles.card} >
            <Card.Content >
                <View style={styles.contentView}>
                    {/*{
                        car.photos.length === 0 ? undefined :
                            <View style={{ display: 'flex' }}>
                                <Image
                                    style={{ display: 'flex', width: 100, height: 100, borderRadius: 3, marginRight: 5 }}
                                    source={{ uri: "http://localhost:8080/internal/images/" + car.photos[0] }}
                                />
                            </View>
                    }
                    <View style={{ display: 'flex', flex: 1 }}>
                        <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
                            <Image
                                style={{ display: 'flex', width: 20, height: 20 }}
                                source={{ uri: `https://img.icons8.com/color/64/${car.model.brand.name.toLowerCase().replace(" ", "-")}.png` }}
                            />
                            <Text style={{ display: 'flex', fontSize: 18, fontWeight: 'bold' }}>
                                &nbsp;{car.model.brand.name + ' ' + car.model.name}
                            </Text>
                            <Text style={{ display: 'flex', fontSize: 18 }}>
                                &nbsp;{car.model.productionYear}
                            </Text>
                        </View>
                        <View style={{ width: '100%' }}>
                            <View style={{ flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-evenly' }}>
                                <View style={{ alignItems: 'center', alignContent: 'center' }}>
                                    <MaterialCommunityIcon name="car-hatchback" size={24} color="#555" />
                                    <Text style={{ marginLeft: 2, fontWeight: 'bold' }}>{car.model.carType.name}</Text>
                                </View>
                                <View style={{ alignItems: 'center', alignContent: 'center', marginHorizontal: 10 }}>
                                    <MaterialCommunityIcon name={fuelIcon} size={24} color="#555" />
                                    <Text style={{ marginLeft: 2, fontWeight: 'bold' }}>{car.model.fuelType.name}</Text>
                                    <Text>{consumptionString}</Text>
                                </View>
                                <View style={{ alignItems: 'center', alignContent: 'center' }}>
                                    <MaterialCommunityIcon name="cash" size={24} color="#4a9351" />
                                    <Text style={{ marginLeft: 2 }}>{car.dayPrice} PLN / day</Text>
                                </View>
                            </View>
                        </View>
                    </View>*/}
                    <Text style={{ display: 'flex', fontSize: 18 }}>
                        &nbsp;{event.id}
                    </Text>
                    <Text style={{ display: 'flex', fontSize: 18 }}>
                        &nbsp;{event.title}
                    </Text>
                </View>
            </Card.Content>
            {/*<Card.Cover source={{ uri: 'https://picsum.photos/700' }}/>*/}
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