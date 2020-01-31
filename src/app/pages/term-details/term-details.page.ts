import { Component, OnInit } from "@angular/core";
import { Store, Select } from "@ngxs/store";
import { VocabularyState } from "src/shared/vocabulary/vocabulary.state";
import { Observable } from "rxjs";
import { IPreposition, ITerm } from "src/app/models/term.models";
import { IVerb } from "src/app/models/verb.models";
import { GetTerm } from 'src/shared/vocabulary/vocabulary.actions';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: "memolang-term-details",
  templateUrl: "./term-details.page.html",
  styleUrls: ["./term-details.page.scss"]
})
export class TermDetailsPage implements OnInit {
  @Select(VocabularyState.currentTerm) term$: Observable<
    ITerm | IVerb | IPreposition
  >;

  constructor(private store: Store, private route: ActivatedRoute) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.store.dispatch(new GetTerm(id));
  }
}
