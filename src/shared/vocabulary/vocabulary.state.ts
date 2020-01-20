import { State, Action, StateContext, Selector } from "@ngxs/store";
import { AddTerm } from "./vocabulary.actions";
import * as _ from "lodash";
import { HelpersService } from 'src/app/services/helpers.service';

export class VocabularyStateModel {
  terms: any[];
  newTermForm: {
    model: string;
    dirty: boolean;
    status: string;
    errors: any;
  };
}

@State<VocabularyStateModel>({
  name: "vocabulary",
  defaults: {
    terms: [],
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

  constructor() {}

  @Action(AddTerm)
  add(ctx: StateContext<VocabularyStateModel>, { payload }: AddTerm) {
    const state = ctx.getState();

    payload.id = HelpersService.guid();
    payload.createdDate = _.now();

    ctx.patchState({
      terms: [...state.terms, payload]
    });
  }
}
