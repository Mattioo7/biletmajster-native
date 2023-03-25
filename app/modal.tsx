import { StatusBar } from 'expo-status-bar';
import {Alert, Platform, StyleSheet} from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import {useRecoilState} from "recoil";
import selectedEventIdState from "../recoil/selectedEventIdState";
import {EventsCategoriesFilter} from "../components/EventsCategoriesFilter";
import React, {useEffect, useState} from "react";
import {CategoriesApi, Category, Configuration, EventApi} from "../open-api/generated";
import axios from "axios/index";
import Backend from "../constants/Backend";
import {Divider, Searchbar} from "react-native-paper";

export default function ModalScreen() {

  const [eventId, setEventId] = useRecoilState(selectedEventIdState);
  const [categories, setCategories] = useState<Category[]>([]);
  const config = new Configuration();
  const axiosInstance = axios.create({
    headers: {Authorization: 'YOUR_TOKEN'},
  });
  const eventApi = new EventApi(config, Backend(''), axiosInstance);
  const categoriesApi = new CategoriesApi(config, Backend(''), axiosInstance);

  const [searchQuery, setSearchQuery] = React.useState<string>('');

  const onChangeSearch = (query: React.SetStateAction<string>)  => setSearchQuery(query);

  const getCategories = async () => {
    try {
      const fetchedCategories = await categoriesApi.getCategories();
      console.log("Fetched getEvents");
      setCategories(data => fetchedCategories.data);
    } catch (error) {
      console.warn(error);
      Alert.alert('An error occurred');
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <View style={styles.container}>
      <Searchbar
        placeholder="Search"
        onChangeText={onChangeSearch}
        value={searchQuery}
      />
      {/*<View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />*/}
      <EventsCategoriesFilter
        categories={categories}
        getEvents={eventApi.getEvents}
        getByCategory={eventApi.getByCategory}
        getCategories={categoriesApi.getCategories}
      />
      {/* Use a light status bar on iOS to account for the black space above the modal */}
      <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
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
    marginVertical: 5,
    height: 1,
    width: '100%',
  },
});
