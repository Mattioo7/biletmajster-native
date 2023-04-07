import React from 'react';
import {render, fireEvent, waitFor, screen} from '@testing-library/react-native';
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

	const mockFunction = jest.fn();

	it('renders without crashing', () => {
		render(<EventCard event={event} myFunction={mockFunction} />);
	});

	it('should render the event title', () => {
		const { getByText } = render(<EventCard event={event} myFunction={mockFunction}/>);
		const title = getByText(event.title!);
		expect(title).toBeDefined();
	});

	it('should render the "Reserve" button', () => {
		const { getByText } = render(<EventCard event={event} myFunction={mockFunction}/>);
		const button = getByText('Reserve');
		expect(button).toBeDefined();
	});

	it('displays the correct number of free and maximum places for the event', () => {
		const { getByText } = render(<EventCard event={event} myFunction={mockFunction}/>);

		expect(getByText(`${event.freePlace}/${event.maxPlace}`)).toBeTruthy();
	});

	it('enables the Reserve button when there are free places available and disables it when there are no free places', () => {
		const { rerender } = render(<EventCard event={event} myFunction={mockFunction} />);

		const reserveButton = screen.getByText('Reserve');
		expect(reserveButton).toBeTruthy();
		expect(reserveButton.parent.props.disabled).toBeFalsy();

		const noFreePlacesEvent = { ...event, freePlace: 0 };
		rerender(<EventCard event={noFreePlacesEvent} myFunction={mockFunction} />);

		const disabledReserveButton = screen.getByText('Reserve');
		expect(disabledReserveButton).toBeTruthy();
		expect(disabledReserveButton.parent.props.selectable).toBeFalsy();
	});
});
