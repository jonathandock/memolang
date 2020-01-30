import { Pipe, PipeTransform } from "@angular/core";
import * as _ from "lodash";
import { IPreposition, ITerm } from "../models/term.models";
import { IVerb } from "../models/verb.models";

@Pipe({
  name: "filterBySearch"
})
export class FilterBySearchPipe implements PipeTransform {
  transform(terms: (ITerm | IVerb | IPreposition)[], search: string): any {
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
