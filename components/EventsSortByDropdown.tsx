import React, {useState} from "react";
import {StyleSheet, View} from "react-native";
import DropDown from "react-native-paper-dropdown";
import allEventsSortByState from "../recoil/allEventsSortByState";
import {useRecoilState} from "recoil";

export const EventsSortByDropdown = () => {

	const [showDropDown, setShowDropDown] = useState(false);
	const [sortBy, setSortBy] = useRecoilState(allEventsSortByState);

	const sortByOptions = [
		{
			label: "Name",
			value: "name",
		},
		{
			label: "Free place",
			value: "freePlace",
		},
		{
			label: "Start time",
			value: "startTime",
		},
		{
			label: "End time",
			value: "endTime",
		},
	]

	// DEBUG
	// useEffect(() => {
	// 	console.log("SortBy: " + sortBy);
	// }, [sortBy])

	return (
		<View style={{position: "relative", width: '100%'}}>

			<View style={{...styles.margins, }}>
				<DropDown
					label={"Sort by"}
					mode={"outlined"}
					visible={showDropDown}
					showDropDown={() => setShowDropDown(true)}
					onDismiss={() => {
						setShowDropDown(false)
					}}
					value={sortBy}
					setValue={setSortBy}
					list={sortByOptions}
				/>
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