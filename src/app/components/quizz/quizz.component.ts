import { Component, OnInit } from "@angular/core";
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators
} from "@angular/forms";
import * as _ from "lodash";
import { Store, Select } from '@ngxs/store';
import { VocabularyState } from 'src/shared/vocabulary/vocabulary.state';
import { ITerm } from 'src/app/models/models';
import { QuizzState } from 'src/shared/quizz/quizz.state';
import { Observable } from 'rxjs';
import { RandomTerm, SubmitTry } from 'src/shared/quizz/quizz.actions';
import { GLOBALS } from 'src/environments/globals';
import { ETermType, EGender } from 'src/app/models/enums';

@Component({
  selector: "memolang-quizz",
  templateUrl: "./quizz.component.html",
  styleUrls: ["./quizz.component.scss"]
})
export class QuizzComponent implements OnInit {
  @Select(QuizzState.term) termToGuess$: Observable<ITerm>;
  @Select(QuizzState.success) quizzSuccess$: Observable<boolean>;
  @Select(QuizzState.submitted) quizzSubmitted$: Observable<boolean>;

  public gendersList = GLOBALS.GENDERS_LIST;
  public termToGuess: ITerm;
  public quizzForm: FormGroup;

  constructor(private store: Store, private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.quizzForm = this.formBuilder.group({
      guess: new FormControl("", Validators.required),
      gender: new FormControl(EGender.none)
    });

    this.getRandomTerm();
  }

  public getRandomTerm() {
    this.store.dispatch(new RandomTerm()).subscribe(() => {
      this.quizzForm.reset({
        guess: '',
        gender: EGender.none
      });
    });
  }

  public onSubmitQuizz(form: any) {
    this.store.dispatch(new SubmitTry({ try: form.guess, gender: form.gender }));
  }
}
