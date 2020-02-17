import { Component, OnInit } from '@angular/core';
import { Store, Select } from '@ngxs/store';
import { VocabularyState } from 'src/shared/vocabulary/vocabulary.state';
import { Observable } from 'rxjs';
import { ITerm, IPreposition, IName } from 'src/app/models/term.models';
import { IVerb } from 'src/app/models/verb.models';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {

  @Select(VocabularyState.latestTerms) latestTerms$: Observable<(ITerm | IVerb | IPreposition | IName)[]>;

  constructor(
    private store: Store
  ) { }

  ngOnInit() {
  }

}
