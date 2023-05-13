import { Event } from "../api/Api";
export interface Reservation {
  event: Event;
  reservationToken: string;
  placeId: number;
}
