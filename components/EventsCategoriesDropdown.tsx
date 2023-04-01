import React, {useState} from "react";
import {StyleSheet, View} from "react-native";
import DropDown from "react-native-paper-dropdown";
import {AxiosRequestConfig} from "axios";
import {Category} from "../open-api/generated";
import {useRecoilState} from "recoil";
import allEventsFilterByCategoryState from "../recoil/allEventsFilterByCategoryState";

export const EventsCategoriesDropdown = (
	props: {
		categories: Category[],
		getEvents: (options?: AxiosRequestConfig) => void,
		getByCategory: (categoryId: number, options?: AxiosRequestConfig) => void,
		getCategories: (options?: AxiosRequestConfig) => void,
	}) => {

	const [isLoadingCategories, setLoadingCategories] = useState(true);

	// dropdown 1
	const [showDropDownCategories, setShowDropDownCategories] = useState(false);

	const emptyModelList = [
		{
			label: "Loading...",
			value: "",
		}
	];

	const [categoryId, setCategoryId] = useRecoilState(allEventsFilterByCategoryState);

	const clearFilters = () => {
		setCategoryId(undefined);
	}

	// DEBUG
	// useEffect(() => {
	// 	console.log("CategoryId: " + categoryId);
	// }, [categoryId])


	return (
		<View style={{position: "relative", width: '100%'}}>

			<View style={{ ...styles.margins, }}>
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

			{/*<View style={{flexDirection: 'row'}}>

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

			</View>*/}

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