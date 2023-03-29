import React from 'react';
import { render } from '@testing-library/react-native';
import { EventCard } from '../EventCard';
import { Event } from '../../open-api/generated';

describe('EventCard', () => {
	const event: Event = {
		id: 1,
		freePlace: 10,
		title: 'Test Event',
		startTime: Date.now(),
		endTime: Date.now() + 3600 * 1000,
		name: 'Test Organizer',
		categories: [],
	};

	it('should render the event title', () => {
		const { getByText } = render(<EventCard event={event} />);
		const title = getByText(event.title!);
		expect(title).toBeDefined();
	});

	it('should render the event start time', () => {
		const { getByText } = render(<EventCard event={event} />);
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

	it('should render the "Rezerwuj" button', () => {
		const { getByText } = render(<EventCard event={event} />);
		const button = getByText('Rezerwuj');
		expect(button).toBeDefined();
	});
});
