import { IPreposition, ITerm } from "src/app/models/term.models";
import { IVerb } from "src/app/models/verb.models";

export class VocabularyStateModel {
  initialised: boolean;
  terms: (ITerm | IVerb | IPreposition)[];
  sortedTerms?: any[];
  activeSort?: string;
  newTermForm: {
    model: string;
    dirty: boolean;
    status: string;
    errors: any;
  };
}
