import { Component, OnInit } from '@angular/core';
import { Select } from '@ngxs/store';
import { VocabularyState } from 'src/shared/vocabulary/vocabulary.state';
import { Observable } from 'rxjs';
import { ITerm, IName, IPreposition } from 'src/app/models/term.models';
import { IVerb } from 'src/app/models/verb.models';

@Component({
  selector: 'app-vocabulary',
  templateUrl: './vocabulary.page.html',
  styleUrls: ['./vocabulary.page.scss'],
})
export class VocabularyPage implements OnInit {

  @Select(VocabularyState.terms) terms$: Observable<ITerm[] | IName[] | IVerb[] | IPreposition[]>;

  constructor() { }

  ngOnInit() {
  }

}
