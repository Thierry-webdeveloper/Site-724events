/**
 *
 */

import { getMonth } from "./index";

describe("Date helper", () => {
  describe("When getMonth is called", () => {
    it("the function return janvier for 2022-01-01 as date", () => {
      // to implement
    });
    it("the function return juillet for 2022-07-08 as date", () => {
      // to implement
    });

    it.each([
      [0, "janvier"],
      [1, "février"],
      [2, "mars"],
      [3, "avril"],
      [4, "mai"],
      [5, "juin"],
      [6, "juillet"],
      [7, "août"],
      [8, "septembre"],
      [9, "octobre"],
      [10, "novembre"],
      [11, "décembre"],
    ])("le mois d'index %i correspond à '%s'", (monthIndex, expectedMonth) => {
      const date = new Date(2022, monthIndex, 15);
      expect(getMonth(date)).toBe(expectedMonth);
    });
  });
});
