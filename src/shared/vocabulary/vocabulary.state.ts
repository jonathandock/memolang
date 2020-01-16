import { State, Action, StateContext, Selector } from "@ngxs/store";
import { AddTerm } from "./vocabulary.actions";

export class VocabularyStateModel {
  terms: any[];
}

@State<VocabularyStateModel>({
  name: "vocabulary",
  defaults: {
    terms: []
  }
})
export class VocabularyState {
  @Selector()
  static terms(state: VocabularyStateModel): any[] {
    return state.terms;
  }

  constructor() {}

  @Action(AddTerm)
  add(ctx: StateContext<VocabularyStateModel>, action: AddTerm) {
    const state = ctx.getState();

    ctx.patchState({
      terms: [...state.terms, action.payload]
    });
  }
}
