import { eventSortByPairs } from "../recoil/allEventsSortByState";

describe("EventSortByPairs", () => {
  it("should create the list of pairs properly", () => {
    eventSortByPairs.forEach((element) => {
      expect(element.label).toBeDefined();
      expect(element.value).toBeDefined();
    });
  });
});
