import { fireEvent, render, screen } from "@testing-library/react-native";
import { ReservedEventCard } from "../components/ReservedEventCard";
import { ReservationWithBackend } from "../models/Reservation";
import { EventStatus } from "../api/Api";
import { NavigationContainer } from "@react-navigation/native";
import { useRouter } from "expo-router";
import { RecoilRoot } from "recoil";

jest.mock("expo-router", () => {
  // we want to mock a function from module used in ReservedEventCard.
  // it is useRouter from expo-router, so we need to import it and mock it right at the beginning.
  return {
    useRouter: jest.fn(),
  };
});

beforeAll(() => {
  (useRouter as any).mockReturnValue({
    // object returned by useRouter only needs push,
    // because that's what ReservedEventCard uses. Nothing else necessary
    push: jest.fn(() => {}),
  });
});

describe("ReservedEventCard", () => {
  const reservation: ReservationWithBackend = {
    event: {
      id: 1,
      title: "Test Event",
      startTime: 1647199200, // March 13, 2022 12:00:00 AM
      endTime: 1647285600, // March 14, 2022 12:00:00 AM
      latitude: "40.712776",
      longitude: "-74.005974",
      name: "Test Event Description",
      status: EventStatus.InFuture,
      categories: [
        {
          id: 1,
          name: "Sports",
        },
        {
          id: 2,
          name: "Music",
        },
      ],
      freePlace: 50,
      maxPlace: 100,
    },
    reservationToken: "testToken123",
    placeId: 1,
    backend: "BACKEND",
  };
  const cancelFunctionMock = jest.fn();
  const qrFunctionMock = jest.fn();
  const infoFunctionMock = jest.fn();

  beforeEach(() => {
    // Another thing - we're using recoil, so we have to either mock useRecoilState
    // or add RecoilRoot like below

    render(
      <RecoilRoot>
        <NavigationContainer>
          <ReservedEventCard
            reservation={reservation}
            cancelFunction={cancelFunctionMock}
            qrFunction={qrFunctionMock}
            infoFunction={infoFunctionMock}
          />
        </NavigationContainer>
      </RecoilRoot>
    );
  });

  it("should render the event information", () => {
    expect(screen.getByText(reservation.event.title)).toBeDefined();
    expect(screen.getByText(reservation.event.name)).toBeDefined();
  });

  it("should call the cancelFunction when the cancel button is pressed", () => {
    fireEvent.press(screen.getByText("Cancel"));
    expect(cancelFunctionMock).toHaveBeenCalledTimes(1);
    expect(cancelFunctionMock).toHaveBeenCalledWith(
      reservation.event.id,
      reservation.placeId,
      reservation.reservationToken,
      reservation.backend
    );
  });

  it("should call the qrFunction when the QR code button is pressed", () => {
    fireEvent.press(screen.getByTestId("qr-code-button"));
    expect(qrFunctionMock).toHaveBeenCalledTimes(1);
  });
});
