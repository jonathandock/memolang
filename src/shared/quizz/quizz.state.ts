import { State, Action, StateContext, Store, Selector } from "@ngxs/store";
import { RandomTerm, SubmitTry } from "./quizz.actions";
import { ITerm, IQuizzResponse } from "src/app/models/models";
import { VocabularyState } from "../vocabulary/vocabulary.state";
import * as _ from "lodash";
import { EGender, ETermType } from "src/app/models/enums";
import { UpdateTerm } from "../vocabulary/vocabulary.actions";

export class QuizzStateModel {
  term: ITerm;
  guess: IQuizzResponse;
  submitted: boolean;
  success: boolean;
}

@State<QuizzStateModel>({
  name: "quizz",
  defaults: {
    term: null,
    guess: null,
    submitted: false,
    success: false
  }
})
export class QuizzState {
  @Selector()
  static term(state: QuizzStateModel): ITerm {
    return state.term;
  }

  @Selector()
  static success(state: QuizzStateModel): boolean {
    return state.success;
  }

  @Selector()
  static submitted(state: QuizzStateModel): boolean {
    return state.submitted;
  }

  constructor(private store: Store) {}

  @Action(RandomTerm)
  random(ctx: StateContext<QuizzStateModel>) {
    const terms = this.store.selectSnapshot(VocabularyState.terms);
    const randomIndex = _.random(0, terms.length - 1);

    ctx.setState({
      term: terms[randomIndex],
      guess: null,
      submitted: false,
      success: false
    });
  }

  @Action(SubmitTry)
  submit(ctx: StateContext<QuizzStateModel>, { payload }: SubmitTry) {
    const state = ctx.getState();
    const term = _.cloneDeep(state.term);
    const success =
      term.type === ETermType.Name
        ? term.translation === payload.try && term.gender === payload.gender
        : term.translation === payload.try;

    if (term.termKnowledge) {
      term.termKnowledge = {
        totalTries: term.termKnowledge.totalTries += 1,
        successTries: success ? (term.termKnowledge.successTries += 1) : 0,
        failTries: !success ? (term.termKnowledge.failTries += 1) : 0,
        tries: [
          ...term.termKnowledge.tries,
          { success, date: _.now(), guess: payload }
        ]
      };
    } else {
      term.termKnowledge = {
        totalTries: 1,
        successTries: success ? 1 : 0,
        failTries: !success ? 1 : 0,
        tries: [{ success, date: _.now(), guess: payload }]
      };
    }

    ctx.patchState({
      submitted: true,
      success,
      guess: payload
    });

    return this.store.dispatch(new UpdateTerm(term));
  }
}
