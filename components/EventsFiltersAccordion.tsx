import React, {Key, useEffect, useState} from "react";
import {StyleSheet, View} from "react-native";
import DropDown from "react-native-paper-dropdown";
import {Button} from 'react-native-paper';
import {AxiosRequestConfig} from "axios";
import {Category} from "../open-api/generated";

export const EventsFiltersAccordion = (
	props: {
		categories: Category[],
		getEvents: (options?: AxiosRequestConfig) => void,
		getByCategory: (categoryId: number, options?: AxiosRequestConfig) => void,
		getCategories: (options?: AxiosRequestConfig) => void,
	}) => {

	const [isLoadingCategories, setLoadingCategories] = useState(true);

	// dropdown 1
	const [showDropDownCategories, setShowDropDownCategories] = useState(false);

	// models of brand
	const [models, setModels] = useState<Category[]>([]);

	const emptyModelList = [
		{
			label: "Loading...",
			value: "",
		}
	];

	const [categoryId, setCategoryId] = useState<number | undefined>(undefined);

	const clearFilters = () => {
		setCategoryId(undefined);
		props.getEvents();
	}

	// DEBUG
	useEffect(() => {
		console.log("CategoryId: " + categoryId);
	}, [categoryId])


	return (
		<View>
			<View style={styles.margins}>
				<DropDown
					label={"Category"}
					mode={"outlined"}
					visible={showDropDownCategories}
					showDropDown={() => setShowDropDownCategories(true)}
					onDismiss={() => {
						setShowDropDownCategories(false)
					}}
					value={categoryId}
					setValue={setCategoryId}
					list={props.categories.map(category => ({label: category.name as string, value: category.id as number}))}
				/>
			</View>
			<View style={{flexDirection: 'row'}}>
				<View style={{width: '50%'}}>
					<Button
						style={{...styles.margins, marginRight: 5}} icon="filter-remove" mode="outlined" onPress={clearFilters}>
						Clear filters
					</Button>
				</View>
				<View style={{width: '50%'}}>
					<Button
						style={{...styles.margins, marginLeft: 5}} icon="car-info" mode="contained" onPress={() => {
						const searchCategoryId = categoryId === undefined ? undefined : props.categories.find(b => b.id === categoryId)?.id;
						props.getByCategory(
							searchCategoryId as number,
						);
					}}>
						Use filters
					</Button>
				</View>
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	view: {
		flex: 1,
	},
	margins: {
		margin: 10,
		marginTop: 0,
	}
});