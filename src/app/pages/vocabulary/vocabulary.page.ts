import { Component, OnInit } from '@angular/core';
import { Select } from '@ngxs/store';
import { VocabularyState } from 'src/shared/vocabulary/vocabulary.state';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-vocabulary',
  templateUrl: './vocabulary.page.html',
  styleUrls: ['./vocabulary.page.scss'],
})
export class VocabularyPage implements OnInit {

  @Select(VocabularyState.terms) terms$: Observable<any[]>;

  constructor() { }

  ngOnInit() {
  }

}
