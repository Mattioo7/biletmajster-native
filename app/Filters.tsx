import { StatusBar } from "expo-status-bar";
import { Alert, Platform, StyleSheet } from "react-native";
import { Text, View } from "../components/Themed";
import { useRecoilState } from "recoil";
import { useEffect, useState } from "react";
import { Category } from "../api/Api";
import { apiClient } from "../api/apiClient";
import { Button, Searchbar } from "react-native-paper";
import allEventsSortByState, {
  eventSortByPairs,
} from "../recoil/allEventsSortByState";
import allEventsSearchNameState from "../recoil/allEventsSortByNameState";
import allEventsFilterByCategoryState from "../recoil/allEventsFilterByCategoryState";
import { Dropdown } from "react-native-element-dropdown";
import { useTheme } from "react-native-paper";

export default function ModalScreen() {
  const theme = useTheme();

  // categories
  const [categories, setCategories] = useState<Category[]>([]);
  const [categoryId, setCategoryId] = useRecoilState(
    allEventsFilterByCategoryState
  );
  const [isFocusCategory, setIsFocusCategory] = useState(false);
  // end categories

  // search bar
  const [searchQuery, setSearchQuery] = useRecoilState(
    allEventsSearchNameState
  );
  // end search bar

  // sort by
  const [sortBy, setSortBy] = useRecoilState(allEventsSortByState);
  const [isFocusSortBy, setIsFocusSortBy] = useState(false);
  // end sort by

  // fetch categories
  const getCategories = async () => {
    try {
      const fetchedCategories = await apiClient.categories.getCategories();
      if (fetchedCategories.ok) {
        setCategories(fetchedCategories.data);
      } else {
        // TODO: Support error codes
      }
    } catch (error) {
      console.warn(error);
      Alert.alert("An error occurred");
    }
  };

  const clearFilters = () => {
    setCategoryId(undefined);
    setSearchQuery("");
    setSortBy(undefined);
  };

  // on screen load
  useEffect(() => {
    getCategories();
  }, []);

  return (
    <View style={styles.container}>
      <Searchbar
        style={{ ...styles.margins, marginTop: 20 }}
        placeholder="Search"
        onChangeText={setSearchQuery}
        value={searchQuery}
      />
      {/*<View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />*/}
      <Dropdown
        style={[
          styles.dropdown,
          isFocusCategory && { borderColor: "blue" },
          { backgroundColor: theme.colors.background },
        ]}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        iconStyle={styles.iconStyle}
        data={categories}
        maxHeight={300}
        labelField="name"
        valueField="id"
        placeholder={!isFocusCategory ? "Categories" : "..."}
        searchPlaceholder="Search..."
        value={categoryId}
        onFocus={() => setIsFocusCategory(true)}
        onBlur={() => setIsFocusCategory(false)}
        onChange={(item) => {
          setCategoryId(item.id);
          setIsFocusCategory(false);
        }}
      />

      <Dropdown
        style={[
          styles.dropdown,
          isFocusSortBy && { borderColor: "blue" },
          { backgroundColor: theme.colors.background },
        ]}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        iconStyle={styles.iconStyle}
        data={eventSortByPairs}
        maxHeight={300}
        labelField="label"
        valueField="value"
        placeholder={!isFocusSortBy ? "Sort by" : "..."}
        searchPlaceholder="Search..."
        value={sortBy}
        onFocus={() => setIsFocusSortBy(true)}
        onBlur={() => setIsFocusSortBy(false)}
        onChange={(item) => {
          setSortBy(item.value);
          setIsFocusSortBy(false);
        }}
      />

      <View style={{ flexDirection: "row" }}>
        <Button
          style={{ ...styles.margins, width: "95%" }}
          icon="filter-remove"
          mode="outlined"
          onPress={clearFilters}
        >
          Clear filters
        </Button>
      </View>

      {/* Use a light status bar on iOS to account for the black space above the modal */}
      <StatusBar style={Platform.OS === "ios" ? "light" : "auto"} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 5,
    height: 1,
    width: "100%",
  },
  margins: {
    margin: 10,
    marginTop: 0,
  },

  dropdown: {
    height: 50,
    borderColor: "gray",
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
    minWidth: "95%",
    marginBottom: 10,
  },
  icon: {
    marginRight: 5,
  },
  label: {
    position: "absolute",
    backgroundColor: "white",
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});
