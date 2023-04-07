// import {MAP_API_KEY} from './../constants';

import {MAP_API_KEY} from "../constants/MAP_API_KEY";

interface LocationInfo {
	items: {
		access: {
			lat: number;
			lng: number;
		}[];
		address: {
			city: string;
			countryCode: string;
			countryName: string;
			county: string;
			countyCode: string;
			district: string;
			houseNumber: string;
			label: string;
			postalCode: string;
			state: string;
			street: string;
		};
		distance: number;
		houseNumberType: string;
		id: string;
		mapView: {
			east: number;
			north: number;
			south: number;
			west: number;
		};
		position: {
			lat: number;
			lng: number;
		};
		resultType: string;
		title: string;
	}[];
}


export function getAddressFromCoordinates({ latitude, longitude }: { latitude: string, longitude: string }): Promise<string | undefined> {
	return new Promise((resolve, reject) => {
		const url = `https://revgeocode.search.hereapi.com/v1/revgeocode?at=${latitude}%2C${longitude}&lang=en-US&apiKey=${MAP_API_KEY}`
		// const url = `https://revgeocode.search.hereapi.com/v1/revgeocode?at=48.2181679,16.3899064&lang=en-US&apiKey=hpsl2FKiv7ZcvoYEgP7dp_EaI6L1mcY0j6Optncmwu4`
		fetch(url)
			.then(res => res.json() as Promise<LocationInfo>)
			.then((resJson) => {
				// console.log('resJson ', resJson)
				// the response had a deeply nested structure :/
				if (resJson) {
					resolve(resJson.items[0].address.city + ', ' + resJson.items[0].address.countryName);
				} else {
					reject('not found: ' + url);
				}
			})
			.catch((e) => {
				console.log('Error in getAddressFromCoordinates', e)
				reject(e);
			})
	})
}
