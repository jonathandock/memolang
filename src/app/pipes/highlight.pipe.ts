import { Pipe, PipeTransform } from "@angular/core";
import * as _ from "lodash";

@Pipe({
  name: "highlight"
})
export class HighlightPipe implements PipeTransform {
  transform(text: string, search: string): any {

    if (!text || !search) {
      return text;
    }

    const regex = new RegExp(search, 'gi'); // 'gi' for case insensitive and can use 'g' if you want the search to be case sensitive.
    const match = regex.exec(text);

    if (match) {
      return text.replace(regex, `<b class="highlighted">${search}</b>`);
    } else {
      return text;
    }
  }
}
