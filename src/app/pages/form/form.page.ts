import { Component, OnInit } from "@angular/core";
import { FormBuilder, Validators, FormArray } from "@angular/forms";
import { GLOBALS } from "src/environments/globals";
import { ETermType, EPrepositionType } from "src/app/models/term.models";
import { EGender } from "src/app/models/gender.models";
import { EVerbType } from 'src/app/models/verb.models';

@Component({
  selector: "app-form",
  templateUrl: "./form.page.html",
  styleUrls: ["./form.page.scss"]
})
export class FormPage implements OnInit {
  public prepTypesList = GLOBALS.PREPOSITION_TYPES_LIST;
  public termTypesList = GLOBALS.TERM_TYPES_LIST;
  public verbTypesList = GLOBALS.VERB_TYPES_LIST;
  public gendersList = GLOBALS.GENDERS_LIST;

  public newTermForm = this.formBuilder.group({
    type: [ETermType.Name, Validators.required],
    term: ["", Validators.required],
    translation: ["", Validators.required],
    gender: [EGender.None],
    followedBy: [EPrepositionType.Accusative, Validators.required],
    conjugation: this.formBuilder.group({
      infinitive: ['', Validators.required],
      presentParticiple: ['', Validators.required],
      pastParticiple: ['', Validators.required]
    }, Validators.required),
    verbType: [EVerbType.Regular],
    examples: this.formBuilder.array([this.formBuilder.control("")])
  });
  public examples: FormArray;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.setValidators();
    console.log(this.newTermForm);
  }

  /**
   * Add an example in form array
   */
  public addExample(): void {
    this.examples = this.newTermForm.get("examples") as FormArray;
    this.examples.push(this.formBuilder.control(""));
  }

  /**
   * Romve an example in the form at matching index
   * @param index
   */
  public removeExample(index: number): void {
    this.examples = this.newTermForm.get("examples") as FormArray;
    this.examples.removeAt(index);
  }

  /**
   * Submit form
   */
  public onSubmit() {
    console.log(this.newTermForm);
  }

  /**
   * Set validators according to the selected term type
   */
  private setValidators() {

    const genderField = this.newTermForm.get("gender");
    const prepTypeField = this.newTermForm.get("followedBy");
    const conjugationGrp = this.newTermForm.get("conjugation");
    const verbType = this.newTermForm.get("verbType");

    prepTypeField.disable();
    conjugationGrp.disable();
    verbType.disable();

    // Listen to changes on type field
    this.newTermForm.get("type").valueChanges.subscribe((type: string) => {

      if (type === ETermType.Name) {
        genderField.enable();
        genderField.setValue(EGender.None);
      } else {
        genderField.disable();
      }

      if (type === ETermType.Preposition) {
        prepTypeField.enable();
        prepTypeField.setValue(EPrepositionType.Accusative);
      } else {
        prepTypeField.disable();
      }

      if (type === ETermType.Verb) {
        conjugationGrp.enable();
        verbType.enable();
      } else {
        conjugationGrp.disable();
        verbType.disable();
      }
    });
  }
}
