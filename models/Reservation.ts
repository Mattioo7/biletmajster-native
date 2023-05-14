import { Event } from "../api/Api";
export interface Reservation {
  event: Event;
  reservationToken: string;
  placeId: number;
}

export type ReservationWithBackend = Reservation & {
  backend: string;
};
