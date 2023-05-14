import { render, act, fireEvent } from "@testing-library/react-native";
import { Button, Text } from "react-native-paper";
import { EventCardButton } from "../components/EventCardButton";

describe("EventCardButton", () => {
  const func1 = jest.fn();
  const func2 = jest.fn();
  const component = (
    <EventCardButton onPress={() => func1()}>
      <Button onPress={() => func2()}>Button</Button>
      <Text>Static content</Text>
    </EventCardButton>
  );

  it("renders children", () => {
    const { getByText } = render(component);
    expect(getByText("Button")).toBeDefined();
    expect(getByText("Static content")).toBeDefined();
  });

  it("reacts when clicked", async () => {
    func1.mockReset();
    func2.mockReset();
    const { getByText } = render(component);
    await act(async () => {
      fireEvent.press(getByText("Static content"));
    });
    expect(func1).toHaveBeenCalled();
    expect(func2).not.toHaveBeenCalled();
  });

  it("does not react if child is clicked", async () => {
    func1.mockReset();
    func2.mockReset();
    const { getByText } = render(component);
    await act(async () => {
      fireEvent.press(getByText("Button"));
    });
    expect(func2).toHaveBeenCalled();
    expect(func1).not.toHaveBeenCalled();
  });
});
