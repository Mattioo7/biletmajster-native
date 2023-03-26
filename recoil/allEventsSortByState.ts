import { atom } from 'recoil';

const allEventsSortByState = atom<string>({
	key: 'allEventsSortByState',
	default: ''
});

export default allEventsSortByState;
