import { ITerm, IPreposition } from 'src/app/models/term.models';
import { IVerb } from 'src/app/models/verb.models';

export class AddTerm {
  static readonly type = "[Vocabulary] Add term";
  constructor(public payload: ITerm | IVerb | IPreposition) {}
}

export class DeleteTerm {
  static readonly type = "[Vocabulary] Delete term";
  constructor(public termId: string) {}
}

export class OpenCreateTermModal {
  static readonly type = "[Vocabulary] Open create term modal";
}

export class CloseCreateTermModal {
  static readonly type = "[Vocabulary] Close create term modal";
}
