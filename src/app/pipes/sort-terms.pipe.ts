import { Pipe, PipeTransform } from "@angular/core";
import * as _ from "lodash";
import { ITerm } from '../models/models';

@Pipe({
  name: "sortTerms"
})
export class SortTermsPipe implements PipeTransform {
  transform(terms: ITerm[], ...args: any[]): any {
    const sortedTerms = _.cloneDeep(terms);

    // For now, terms are sorted from newest to the oldest
    if (sortedTerms && sortedTerms.length) {
      sortedTerms.sort(this._datesSortDesc);
    }

    return sortedTerms;
  }

  /**
   * Sort from oldest to newest
   * @param term1
   * @param term2
   */
  private _datesSortAsc(
    term1: ITerm,
    term2: ITerm
  ) {
    if (term1.createdDate > term2.createdDate) {
      return 1;
    }
    if (term1.createdDate < term2.createdDate) {
      return -1;
    }
    return 0;
  }

  /**
   * Sort from newest to oldest
   * @param term1
   * @param term2
   */
  private _datesSortDesc(
    term1: ITerm,
    term2: ITerm
  ) {
    if (term1.createdDate > term2.createdDate) {
      return -1;
    }
    if (term1.createdDate < term2.createdDate) {
      return 1;
    }
    return 0;
  }
}
