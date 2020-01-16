export class AddTerm {
  static readonly type = "[Vocabulary] Add term";
  constructor(public payload: any) {}
}

export class OpenCreateTermModal {
  static readonly type = "[Vocabulary] Open create term modal";
}

export class CloseCreateTermModal {
  static readonly type = "[Vocabulary] Close create term modal";
}
