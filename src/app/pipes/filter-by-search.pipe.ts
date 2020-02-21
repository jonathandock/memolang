import { Pipe, PipeTransform } from "@angular/core";
import * as _ from "lodash";
import { ITerm } from '../models/models';

@Pipe({
  name: "filterBySearch"
})
export class FilterBySearchPipe implements PipeTransform {
  transform(terms: ITerm[], search: string): any {
    let filteredTerms = _.cloneDeep(terms);

    if (filteredTerms && filteredTerms.length && search) {
      filteredTerms = filteredTerms.filter(
        term =>
          (term.value.toLowerCase().indexOf(search.toLowerCase()) > -1) ||
          term.translation.toLowerCase().indexOf(search.toLowerCase()) > -1
      );
    }
    return filteredTerms;
  }
}
