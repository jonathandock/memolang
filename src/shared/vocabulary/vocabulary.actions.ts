import { ITerm, IPreposition, IName } from 'src/app/models/term.models';
import { IVerb } from 'src/app/models/verb.models';
import { ESorts } from 'src/app/models/sort.models';


export class GetTerms {
  static readonly type = "[Vocabulary] Get terms";
}

export class GetTerm {
  static readonly type = "[Vocabulary] Get term by id";
  constructor(public payload: string) {}
}
export class AddTerm {
  static readonly type = "[Vocabulary] Add term";
  constructor(public payload: ITerm | IVerb | IPreposition | IName) {}
}

export class UpdateTerm {
  static readonly type = "[Vocabulary] Update term";
  constructor(public payload: ITerm | IVerb | IPreposition | IName) {}
}

export class DeleteTerm {
  static readonly type = "[Vocabulary] Delete term";
  constructor(public payload: string) {}
}

export class SetSortOrder {
  static readonly type = "[Vocabulary] Set sort order";
  constructor(public sort: ESorts) {}
}

export class OpenCreateTermModal {
  static readonly type = "[Vocabulary] Open create term modal";
}

export class CloseCreateTermModal {
  static readonly type = "[Vocabulary] Close create term modal";
}
