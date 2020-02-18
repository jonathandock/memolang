import { Component, OnInit } from "@angular/core";
import { Store, Select } from "@ngxs/store";
import { VocabularyState } from "src/shared/vocabulary/vocabulary.state";
import { Observable } from "rxjs";
import { ITerm, IPreposition, IName } from "src/app/models/term.models";
import { IVerb } from "src/app/models/verb.models";
import { TermsService } from "src/app/services/terms.service";
import { GLOBALS } from "src/environments/globals";
import { FormBuilder, FormGroup, FormControl } from "@angular/forms";
import { TranslateTextResponseTranslation } from 'src/app/models/translate.model';

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.page.html",
  styleUrls: ["./dashboard.page.scss"]
})
export class DashboardPage implements OnInit {
  @Select(VocabularyState.latestTerms) latestTerms$: Observable<
    (ITerm | IVerb | IPreposition | IName)[]
  >;

  constructor(
  ) {
  }

  ngOnInit() {}
}
