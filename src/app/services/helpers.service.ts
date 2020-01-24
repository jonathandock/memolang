import { Injectable } from "@angular/core";
import { ITerm, IPreposition, ISortedTerms } from "../models/term.models";
import { IVerb } from "../models/verb.models";

@Injectable({
  providedIn: "root"
})
export class HelpersService {
  constructor() {}

  /**
   * Generate a guid
   */
  static guid(): string {
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, c => {
      // tslint:disable-next-line: no-bitwise
      const r = (Math.random() * 16) | 0,
        // tslint:disable-next-line: no-bitwise
        v = c === "x" ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });
  }

  /**
   * Sort the terms list alphabetically
   * @param terms
   */
  static sortListAlphabetically(
    terms: (ITerm | IVerb | IPreposition)[]
  ): ISortedTerms[] {
    // sort array
    const sorted = terms.sort((a, b) =>
      a.translation > b.translation ? 1 : -1
    );

    // create group per letter
    const grouped = sorted.reduce((groups, term) => {
      const letter = term.translation.charAt(0).toUpperCase();
      groups[letter] = groups[letter] || [];
      groups[letter].push(term);

      return groups;
    }, {});

    const result = Object.keys(grouped).map(key => ({
      key,
      terms: grouped[key]
    }));

    return result;
  }
}
