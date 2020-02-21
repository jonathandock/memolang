import { ITerm } from "src/app/models/models";

export class VocabularyStateModel {
  initialised: boolean;
  terms: ITerm[];
  currentTerm?: ITerm;
  sortedTerms?: any[];
  activeSort?: string;
  newTermForm: {
    model: string;
    dirty: boolean;
    status: string;
    errors: any;
  };
}
