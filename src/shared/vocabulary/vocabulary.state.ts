import { State, Action, StateContext, Selector, NgxsOnInit } from "@ngxs/store";
import {
  AddTerm,
  SetSortOrder,
  GetTerm,
  DeleteTerm,
  UpdateTerm
} from "./vocabulary.actions";
import * as _ from "lodash";
import { HelpersService } from "src/app/services/helpers.service";
import { ESorts } from "src/app/models/sort.models";
import { VocabularyStateModel } from "./vocabulary.models";
import { TermsService } from "src/app/services/terms.service";
import { tap } from "rxjs/operators";
import { ITerm, IPreposition, IName } from "src/app/models/term.models";
import { IVerb } from "src/app/models/verb.models";

@State<VocabularyStateModel>({
  name: "vocabulary",
  defaults: {
    initialised: false,
    terms: [],
    currentTerm: null,
    activeSort: ESorts.Latest,
    newTermForm: {
      model: undefined,
      dirty: false,
      status: "",
      errors: {}
    }
  }
})
export class VocabularyState implements NgxsOnInit {
  @Selector()
  static terms(state: VocabularyStateModel): (ITerm | IVerb | IPreposition | IName)[] {
    return state.terms;
  }

  @Selector()
  static currentTerm(
    state: VocabularyStateModel
  ): ITerm | IVerb | IPreposition {
    return state.currentTerm;
  }

  @Selector()
  static sortedTerms(state: VocabularyStateModel): any[] {
    return state.sortedTerms;
  }

  @Selector()
  static activeSort(state: VocabularyStateModel): string {
    return state.activeSort;
  }

  @Selector()
  static latestTerms(state: VocabularyStateModel): (ITerm | IVerb | IPreposition | IName)[] {
    const sorted = _.sortBy(state.terms, ['createdDate']);
    return sorted.reverse().slice(0, 5);
  }

  constructor(private termsService: TermsService) {}

  ngxsOnInit(ctx?: StateContext<VocabularyStateModel>) {
    this.termsService.termsStream().subscribe(terms => {
      if (terms) {
        ctx.patchState({
          terms,
          sortedTerms: HelpersService.sortListAlphabetically(terms)
        });
      }
    });
  }

  @Action(GetTerm)
  getTerm(ctx: StateContext<VocabularyStateModel>, { payload }: GetTerm) {
    return this.termsService.get(payload).pipe(
      tap(term => {
        ctx.patchState({
          currentTerm: term
        });
      })
    );
  }

  @Action(AddTerm)
  add(ctx: StateContext<VocabularyStateModel>, { payload }: AddTerm) {
    payload.createdDate = _.now();
    return this.termsService.add(payload);
  }

  @Action(UpdateTerm)
  update(ctx: StateContext<VocabularyStateModel>, { payload }: UpdateTerm) {
    payload.lastModified = _.now();
    return this.termsService.update(payload);
  }

  @Action(DeleteTerm)
  delete(ctx: StateContext<VocabularyStateModel>, { payload }: DeleteTerm) {
    return this.termsService.delete(payload);
  }

  @Action(SetSortOrder)
  setSort(ctx: StateContext<VocabularyStateModel>, { sort }: SetSortOrder) {
    ctx.patchState({
      activeSort: sort
    });
  }
}
