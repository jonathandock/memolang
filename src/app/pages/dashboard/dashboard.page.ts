import { Component, OnInit } from "@angular/core";
import { Select } from "@ngxs/store";
import { VocabularyState } from "src/shared/vocabulary/vocabulary.state";
import { Observable } from "rxjs";
import { ITerm } from 'src/app/models/models';

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.page.html",
  styleUrls: ["./dashboard.page.scss"]
})
export class DashboardPage implements OnInit {
  @Select(VocabularyState.latestTerms) latestTerms$: Observable<ITerm[]>;

  constructor() {}

  ngOnInit() {}
}
