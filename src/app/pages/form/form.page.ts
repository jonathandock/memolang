import { Component, OnInit, ViewChild } from "@angular/core";
import { FormBuilder, Validators, FormArray, FormGroup } from "@angular/forms";
import { GLOBALS } from "src/environments/globals";
import { ETermType, EPrepositionType } from "src/app/models/term.models";
import { EGender, EGenderType } from "src/app/models/gender.models";
import { EVerbType, EAuxiliary } from "src/app/models/verb.models";
import * as _ from "lodash";

@Component({
  selector: "app-form",
  templateUrl: "./form.page.html",
  styleUrls: ["./form.page.scss"]
})
export class FormPage implements OnInit {
  @ViewChild("form", { static: false }) form: HTMLFormElement;

  public prepTypesList = GLOBALS.PREPOSITION_TYPES_LIST;
  public termTypesList = GLOBALS.TERM_TYPES_LIST;
  public verbTypesList = GLOBALS.VERB_TYPES_LIST;
  public auxiliariesList = GLOBALS.AUXILIARY_LIST;
  public gendersList = GLOBALS.GENDERS_LIST;

  public newTermForm: FormGroup = this.formBuilder.group({
    type: [ETermType.Name, Validators.required],
    term: ["", Validators.required],
    translation: ["", Validators.required],
    gender: [EGender.None],
    followedBy: [EPrepositionType.Accusative],
    conjugation: this.formBuilder.group({
      presentParticiple: [""],
      pastParticiple: [""],
      auxiliary: [EAuxiliary.Haben]
    }),
    verbType: [EVerbType.Regular],
    examples: this.formBuilder.array([this.formBuilder.control("")])
  });

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.setValidators();
  }

  /**
   * Some getters of form fields
   */
  get type() {
    return this.newTermForm.get("type");
  }
  get term() {
    return this.newTermForm.get("term");
  }
  get translation() {
    return this.newTermForm.get("translation");
  }
  get gender() {
    return this.newTermForm.get("gender");
  }
  get followedBy() {
    return this.newTermForm.get("followedBy");
  }
  get conjugation() {
    return this.newTermForm.get("conjugation");
  }
  get verbType() {
    return this.newTermForm.get("verbType");
  }
  get auxiliary() {
    return this.conjugation.get("auxiliary");
  }
  get examples() {
    return this.newTermForm.get("examples") as FormArray;
  }

  /**
   * Add an example in form array
   */
  public addExample(): void {
    this.examples.push(this.formBuilder.control(""));
  }

  /**
   * Romve an example in the form at matching index
   * @param index
   */
  public removeExample(index: number): void {
    this.examples.removeAt(index);
  }

  /**
   * Unset the gender
   */
  public unsetGender() {
    this.gender.setValue(EGenderType.None);
  }

  /**
   * Submit form
   */
  public onSubmit() {
    console.log(this.newTermForm.valid, this.newTermForm);
  }

  /**
   * Cancel form
   */
  public cancel() {

    // Hacky reset
    while (this.examples.length) {
      this.examples.removeAt(0);
    }

    // Insert one control to reset array of examples
    this.examples.insert(0, this.formBuilder.control(""));

    this.newTermForm.reset({
      type: ETermType.Name,
      term: "",
      translation: "",
      gender: EGender.None,
      followedBy: EPrepositionType.Accusative,
      conjugation: {
        presentParticiple: "",
        pastParticiple: "",
        auxiliary: EAuxiliary.Haben
      },
      verbType: EVerbType.Regular
    });
  }

  /**
   * Set validators according to the selected term type
   */
  private setValidators() {
    this.followedBy.disable();
    this.conjugation.disable();
    this.verbType.disable();

    // Listen to changes on type field
    this.newTermForm.get("type").valueChanges.subscribe((type: string) => {
      if (type === ETermType.Name) {
        this.gender.enable();
        this.gender.setValue(EGender.None);
        this.gender.setValidators(Validators.required);
      } else {
        this.gender.clearValidators();
        this.gender.disable();
      }

      if (type === ETermType.Preposition) {
        this.followedBy.enable();
        this.followedBy.setValue(EPrepositionType.Accusative);
        this.followedBy.setValidators(Validators.required);
      } else {
        this.followedBy.disable();
        this.followedBy.clearValidators();
      }

      if (type === ETermType.Verb) {
        this.conjugation.enable();
        this.conjugation.get("auxiliary").setValidators(Validators.required);
        this.verbType.enable();
        this.verbType.setValidators(Validators.required);
      } else {
        this.conjugation.disable();
        this.conjugation.get("auxiliary").clearValidators();
        this.verbType.disable();
        this.verbType.clearValidators();
      }
    });
  }
}
