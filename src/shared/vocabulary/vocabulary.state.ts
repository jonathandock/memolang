import { State, Action, StateContext, Selector, NgxsOnInit } from "@ngxs/store";
import { AddTerm, SetSortOrder } from "./vocabulary.actions";
import * as _ from "lodash";
import { HelpersService } from "src/app/services/helpers.service";
import { ESorts } from "src/app/models/sort.models";
import { VocabularyStateModel } from "./vocabulary.models";

@State<VocabularyStateModel>({
  name: "vocabulary",
  defaults: {
    initialised: false,
    terms: [],
    activeSort: ESorts.Latest,
    newTermForm: {
      model: undefined,
      dirty: false,
      status: "",
      errors: {}
    }
  }
})
export class VocabularyState {
  @Selector()
  static terms(state: VocabularyStateModel): any[] {
    return state.terms;
  }

  @Selector()
  static sortedTerms(state: VocabularyStateModel): any[] {
    return state.sortedTerms;
  }

  @Selector()
  static activeSort(state: VocabularyStateModel): string {
    return state.activeSort;
  }

  constructor() {}

  @Action(AddTerm)
  add(ctx: StateContext<VocabularyStateModel>, { payload }: AddTerm) {
    const state = ctx.getState();

    payload.id = HelpersService.guid();
    payload.createdDate = _.now();

    const updatedTerms = [...state.terms, payload];

    ctx.patchState({
      terms: updatedTerms,
      sortedTerms: HelpersService.sortListAlphabetically(updatedTerms)
    });
  }

  @Action(SetSortOrder)
  setSort(ctx: StateContext<VocabularyStateModel>, { sort }: SetSortOrder) {
    ctx.patchState({
      activeSort: sort
    });
  }
}
