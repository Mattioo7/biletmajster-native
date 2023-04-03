import { atom } from 'recoil';

const allEventsFilterByCategoryState = atom<number | undefined>({
	key: 'allEventsFilterByCategoryState',
	default: undefined
});

export default allEventsFilterByCategoryState;
