import { daysInMonth } from "../../scripts/helpers/DateHelpers";

describe(daysInMonth, () => {
  test('a 31 day month', () => {
    expect(daysInMonth(new Date(2019, 2, 1))).toBe(31);
  });

  test('a 30 day month', () => {
    expect(daysInMonth(new Date(2019, 5, 1))).toBe(30);
  });

  test('february', () => {
    expect(daysInMonth(new Date(2019, 1, 1))).toBe(28);
  });
  
  test('february on a leap year', () => {
    expect(daysInMonth(new Date(2020, 1, 1))).toBe(29);
  })
})