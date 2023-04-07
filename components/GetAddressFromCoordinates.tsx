// import {MAP_API_KEY} from './../constants';

import {MAP_API_KEY} from "../constants/MAP_API_KEY";

interface GeocodeResult {
	Response: {
		View: {
			Result: {
				Location: {
					Address: {
						Label: string;
					}
				}
			}[]
		}[]
	}
}

export function getAddressFromCoordinates({ latitude, longitude }: { latitude: string, longitude: string }): Promise<string | undefined> {
	return new Promise((resolve, reject) => {
		const url = `https://reverse.geocoder.ls.hereapi.com/6.2/reversegeocode.json?apiKey=${MAP_API_KEY}&mode=retrieveAreas&prox=${latitude},${longitude},1000`
		fetch(url)
			.then(res => res.json() as Promise<GeocodeResult>)
			.then((resJson) => {
				// the response had a deeply nested structure :/
				if (resJson
					&& resJson.Response
					&& resJson.Response.View
					&& resJson.Response.View[0]
					&& resJson.Response.View[0].Result
					&& resJson.Response.View[0].Result[0]) {
					resolve(resJson.Response.View[0].Result[0].Location.Address.Label)
				} else {
					reject('not found')
				}
			})
			.catch((e) => {
				console.log('Error in getAddressFromCoordinates', e)
				reject(e);
			})
	})
}
