import { render } from '@testing-library/react-native';
import { eventSortByPairs } from '../allEventsSortByState';

describe('EventSortByPairs', () => {
  it('should create the list of pairs properly', () => {
    eventSortByPairs.forEach(element => {
      expect(element.label).toBeDefined();
      expect(element.value).toBeDefined();
    });
  });
});
