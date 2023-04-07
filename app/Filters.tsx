import {StatusBar} from 'expo-status-bar';
import {Alert, Platform, StyleSheet} from 'react-native';

import {View} from '../components/Themed';
import {useRecoilState} from "recoil";
import {EventsCategoriesDropdown} from "../components/EventsCategoriesDropdown";
import React, {useEffect, useState} from "react";
import {Category} from "../api/Api";
import {apiClient} from '../api/apiClient';
import {Button, Searchbar} from "react-native-paper";
import {EventsSortByDropdown} from "../components/EventsSortByDropdown";
import allEventsSortByState from "../recoil/allEventsSortByState";
import allEventsSearchNameState from "../recoil/allEventsSortByNameState";
import allEventsFilterByCategoryState from "../recoil/allEventsFilterByCategoryState";

export default function ModalScreen() {
  // categories
  const [categories, setCategories] = useState<Category[]>([]);
  const [categoryId, setCategoryId] = useRecoilState(allEventsFilterByCategoryState);

  // search bar
  const [searchQuery, setSearchQuery] = useRecoilState(allEventsSearchNameState);
  const onChangeSearch = (query: string)  => {
    setSearchQuery(query);
  }

  // sort by
  const [sortBy, setSortBy] = useRecoilState(allEventsSortByState);

  // fetch categories
  const getCategories = async () => {
    try {
      const fetchedCategories = await apiClient.categories.getCategories({ headers: { "sessionToken": "token" } });
      // console.log("Fetched getEvents");
      if (fetchedCategories.ok)
        setCategories(fetchedCategories.data);
      else {
        // TODO: Support error codes
      }
    } catch (error) {
      console.warn(error);
      Alert.alert('An error occurred');
    }
  };

  // use filters


  // clear filters
  const [clearFiltersState, setClearFiltersState] = useState<boolean>(false);
  const clearFilters = () => {
    setCategoryId(undefined);
    setSearchQuery('');
    setSortBy(undefined);
    setClearFiltersState(prev => !prev);
    // console.log("ClearFilters");
    console.log("****************");
    console.log("SearchQuery: " + searchQuery);
    console.log("CategoryId: " + categoryId);
    console.log("SortBy: " + sortBy);
    console.log("****************");
  }

  // reload screen
  useEffect(() => {
    console.log("#################");
    console.log("ClearFilters or [render] :(");
    console.log("SearchQuery: " + searchQuery);
    console.log("CategoryId: " + categoryId);
    console.log("SortBy: " + sortBy);
    console.log("#################");
  }, [clearFiltersState]);


  // on screen load
  useEffect(() => {
    getCategories();
  }, []);

  // DEBUG
  // useEffect(() => {
  //   console.log("SearchQuery: " + searchQuery);
  // }, [searchQuery])
  const [selecion, setSelecitnon] = useState<number | undefined>(undefined);

  return (
    <View style={styles.container}>
      <Searchbar style={{...styles.margins, marginTop: 20}}
        placeholder="Search"
        onChangeText={onChangeSearch}
        value={searchQuery}
      />
      {/*<View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />*/}
      <EventsCategoriesDropdown
        categories={categories}
        getEvents={apiClient.events.getEvents}
        getByCategory={num => apiClient.events.getByCategory({ headers: { categoryId: num.toString() } })}
        getCategories={apiClient.categories.getCategories}
      />
      {/* TODO: Do we need to pass getters and setters like this? */}

      <EventsSortByDropdown/>

      <View style={{flexDirection: 'row'}}>

        <View style={{width: '50%'}}>
          <Button
            style={{...styles.margins, marginRight: 5}} icon="filter-remove" mode="outlined" onPress={clearFilters}>
            Clear filters
          </Button>
        </View>

        <View style={{width: '50%'}}>
          <Button
            style={{...styles.margins, marginLeft: 5}} icon="car-info" mode="contained" onPress={() => {console.debug("Use filters clicked")}}>
            Use filters
          </Button>
        </View>

      </View>
      {/*<View style={{ width: '100%' }}>
        <ModalSelect label="Items" items={["Item 1", "Item 2", "Item 3"]} renderItem={i => i} selectedIndex={selecion} setSelectedIndex={setSelecitnon} />
      </View>*/}

      {/* Use a light status bar on iOS to account for the black space above the modal */}
      <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
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
  margins: {
    margin: 10,
    marginTop: 0,
  }
});
