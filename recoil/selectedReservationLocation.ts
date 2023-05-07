import { atom } from 'recoil';

const selectedReservationLocation = atom({
	key: 'selectedReservationLocation',
	default: { latitude: 52, longitude: 21 }
});

export default selectedReservationLocation;
