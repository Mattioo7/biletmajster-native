import React from 'react';
import { fireEvent, render } from '@testing-library/react-native';
import { ReservedEventCard } from '../ReservedEventCard';
import { Reservation } from '../../models/Reservation';
import { EventStatus } from "../../api/Api";

describe('ReservedEventCard', () => {
	const reservation: Reservation = {
		event: {
			id: 1,
			title: 'Test Event',
			startTime: 1647199200, // March 13, 2022 12:00:00 AM
			endTime: 1647285600, // March 14, 2022 12:00:00 AM
			latitude: '40.712776',
			longitude: '-74.005974',
			name: 'Test Event Description',
			status: EventStatus.InFuture,
			categories: [
				{
					id: 1,
					name: 'Sports'
				},
				{
					id: 2,
					name: 'Music'
				}
			],
			freePlace: 50,
			maxPlace: 100
		},
		reservationToken: 'testToken123',
		placeId: 1
	};
	const cancelFunctionMock = jest.fn();
	const qrFunctionMock = jest.fn();
	const infoFunctionMock = jest.fn();

	it('should render the event information', () => {
		const { getByText } = render(
			<ReservedEventCard
				reservation={reservation}
				cancelFunction={cancelFunctionMock}
				qrFunction={qrFunctionMock}
				infoFunction={infoFunctionMock}
			/>
		);

		expect(getByText(reservation.event.title)).toBeDefined();
		expect(getByText(reservation.event.name)).toBeDefined();
		expect(getByText(`Token: ${reservation.reservationToken}`)).toBeDefined();
	});

	it('should call the cancelFunction when the cancel button is pressed', () => {
		const { getByText } = render(
			<ReservedEventCard
				reservation={reservation}
				cancelFunction={cancelFunctionMock}
				qrFunction={qrFunctionMock}
				infoFunction={infoFunctionMock}
			/>
		);

		fireEvent.press(getByText('Cancel'));
		expect(cancelFunctionMock).toHaveBeenCalledTimes(1);
		expect(cancelFunctionMock).toHaveBeenCalledWith(reservation.event.id, reservation.reservationToken);
	});

	it('should call the qrFunction when the QR code button is pressed', () => {
		const { getByTestId } = render(
			<ReservedEventCard
				reservation={reservation}
				cancelFunction={cancelFunctionMock}
				qrFunction={qrFunctionMock}
				infoFunction={infoFunctionMock}
			/>
		);

		fireEvent.press(getByTestId('qr-code-button'));
		expect(qrFunctionMock).toHaveBeenCalledTimes(1);
	});
});
