import { atom } from 'recoil';

const eventSortByLabels = {
	name: "Name",
	freePlace: "Free place",
	startTime: "Start time",
	endTime: "End time"
};

export type EventSortBy = keyof typeof eventSortByLabels;

export const eventSortByPairs: { value: EventSortBy, label: string }[] = Object.keys(eventSortByLabels).map(key => { return { value: key, label: eventSortByLabels[key] } as any });

const allEventsSortByState = atom<EventSortBy | undefined>({
	key: 'allEventsSortByState',
	default: undefined
});

export default allEventsSortByState;
