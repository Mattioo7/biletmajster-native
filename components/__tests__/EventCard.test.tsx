import React from 'react';
import {render, screen, waitFor} from '@testing-library/react-native';
import {EventCard} from '../EventCard';
import {Event, EventStatus} from '../../api/Api';
import * as GetAddressModule from '../GetAddressFromCoordinates';

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

	// Mock the getAddressFromCoordinates function
	jest.mock('../GetAddressFromCoordinates', () => ({
		getAddressFromCoordinates: jest.fn().mockImplementation(
			(() => Promise.resolve('Mocked City, Mocked Country'))
		),
	}));

	// Mock the getAddressFromCoordinates function
	const mockGetAddressFromCoordinates = jest.spyOn(GetAddressModule, 'getAddressFromCoordinates');
	mockGetAddressFromCoordinates.mockImplementation(() =>
		Promise.resolve('Mocked City, Mocked Country')
	);

	it('should render the event title', async () => {
		const {getByText} = render(<EventCard event={event}/>);
		const title = getByText(event.title!);

		await waitFor(() => {
			expect(title).toBeDefined();
		});
	});

	it('should render the "Reserve" button', async () => {
		const { getByText } = render(<EventCard event={event}/>);
		const button = await waitFor(() => getByText('Reserve'));
		expect(button).toBeDefined();
	});

	it('displays the correct number of free and maximum places for the event', async () => {
		const { getByText, findByText } = render(<EventCard event={event}/>);

		// Use waitFor to wait for the expected element to appear in the DOM
		const freeMaxPlacesText = await waitFor(() => findByText(`${event.freePlace}/${event.maxPlace}`));

		expect(freeMaxPlacesText).toBeTruthy();
	});

	it('enables the Reserve button when there are free places available and disables it when there are no free places', async () => {
		const { rerender } = render(<EventCard event={event}/>);

		const reserveButton = await waitFor(() => screen.getByText('Reserve'));
		expect(reserveButton).toBeTruthy();
		expect(reserveButton.parent.props.disabled).toBeFalsy();

		const noFreePlacesEvent = { ...event, freePlace: 0 };
		rerender(<EventCard event={noFreePlacesEvent}/>);

		const disabledReserveButton = await waitFor(() => screen.getByText('Reserve'));
		expect(disabledReserveButton).toBeTruthy();
		expect(disabledReserveButton.parent.props.selectable).toBeFalsy();
	});
});
