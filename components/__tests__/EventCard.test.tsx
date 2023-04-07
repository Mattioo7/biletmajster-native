import React from 'react';
import {render} from '@testing-library/react-native';
import {EventCard} from '../EventCard';
import {Event, EventStatus} from '../../api/Api';

describe('EventCard', () => {
	const event: Event = {
		id: 1,
		freePlace: 10,
		title: 'Test Event',
		startTime: Date.now(),
		endTime: Date.now() + 3600 * 1000,
		name: 'Test Organizer',
		categories: [],
		latitude: "",
		longitude: "",
		maxPlace: 0,
		status: EventStatus.Done
	};

	it('should render the event title', () => {
		const { getByText } = render(<EventCard event={event} myFunction={() => {}}/>);
		const title = getByText(event.title!);
		expect(title).toBeDefined();
	});

	it('should render the event start time', () => {
		const { getByText } = render(<EventCard event={event} myFunction={() => {}}/>);
		const startTime = getByText(
			new Intl.DateTimeFormat('en-US', {
				year: 'numeric',
				month: '2-digit',
				day: '2-digit',
				hour: '2-digit',
				minute: '2-digit',
				second: '2-digit',
			}).format(event.startTime!)
		);
		expect(startTime).toBeDefined();
	});

	it('should render the "Reserve" button', () => {
		const { getByText } = render(<EventCard event={event} myFunction={() => {}}/>);
		const button = getByText('Reserve');
		expect(button).toBeDefined();
	});
});
