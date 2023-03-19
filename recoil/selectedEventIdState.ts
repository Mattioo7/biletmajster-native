import { atom } from 'recoil';

const selectedEventIdState = atom<number | undefined>({
	key: 'selectedEventIdState',
	default: undefined
});

export default selectedEventIdState;
