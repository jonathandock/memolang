import { ITerm, IQuizzResponse } from "src/app/models/models";

export class RandomTerm {
  static readonly type = "[Quizz] Get random term";
}

export class SubmitTry {
  static readonly type = "[Quizz] Submit try";
  constructor(public payload: IQuizzResponse) {}
}

export class SetWordKnowledge {
  static readonly type = "[Quizz] Set word knowledge";
  constructor(public payload: ITerm) {}
}
