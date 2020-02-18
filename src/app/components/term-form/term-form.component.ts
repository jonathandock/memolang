import { Component, OnInit, ViewChild, Input } from "@angular/core";
import { GLOBALS } from "src/environments/globals";
import { FormGroup, Validators, FormBuilder, FormArray } from "@angular/forms";
import {
  ETermType,
  EPrepositionType,
  ITerm,
  IName,
  IPreposition
} from "src/app/models/term.models";
import { EGender } from "src/app/models/gender.models";
import { EAuxiliary, EVerbType, IVerb } from "src/app/models/verb.models";
import { Store } from "@ngxs/store";
import { AddTerm, UpdateTerm } from "src/shared/vocabulary/vocabulary.actions";
import { ModalController } from "@ionic/angular";
import { QuickTranslation } from "src/app/models/translate.model";

@Component({
  selector: "memolang-term-form",
  templateUrl: "./term-form.component.html",
  styleUrls: ["./term-form.component.scss"]
})
export class TermFormComponent implements OnInit {
  @Input() term: ITerm | IPreposition | IVerb | IName;
  @Input() quickTranslation: QuickTranslation;
  @ViewChild("form", { static: false }) form: HTMLFormElement;

  public prepTypesList = GLOBALS.PREPOSITION_TYPES_LIST;
  public termTypesList = GLOBALS.TERM_TYPES_LIST;
  public verbTypesList = GLOBALS.VERB_TYPES_LIST;
  public auxiliariesList = GLOBALS.AUXILIARY_LIST;
  public gendersList = GLOBALS.GENDERS_LIST;

  public newTermForm: FormGroup = this.formBuilder.group({
    type: [ETermType.Name, Validators.required],
    value: ["", Validators.required],
    translation: ["", Validators.required],
    plural: [""],
    gender: [EGender.none],
    followedBy: [EPrepositionType.Accusative],
    conjugation: this.formBuilder.group({
      presentParticiple: [""],
      pastParticiple: [""],
      auxiliary: [EAuxiliary.Haben]
    }),
    verbType: [EVerbType.Regular],
    examples: this.formBuilder.array([this.formBuilder.control("")])
  });

  constructor(
    private modalCtrl: ModalController,
    private formBuilder: FormBuilder,
    private store: Store
  ) {}

  ngOnInit() {
    this._setValidators();

    if (this.term) {
      this.newTermForm.patchValue(this.term);

      if (this.term.type === ETermType.Name) {
        const name = this.term as IName;
        this.gender.setValue(name.gender);
      }
    }

    if (this.quickTranslation) {
      this.translation.setValue(this.quickTranslation.translatedTerm);
      this.value.setValue(this.quickTranslation.searchedText);
    }
  }

  /**
   * Some getters of form fields
   */
  get type() {
    return this.newTermForm.get("type");
  }
  get value() {
    return this.newTermForm.get("value");
  }
  get translation() {
    return this.newTermForm.get("translation");
  }
  get plural() {
    return this.newTermForm.get("plural");
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
    this.gender.setValue(EGender.none);
  }

  /**
   * Submit form
   */
  public onSubmit() {
    if (!this.newTermForm.valid) {
      alert("Form not valid");
      return;
    }

    if (this.term && this.term.id) {
      this.store
        .dispatch(new UpdateTerm(this._formatForm(this.newTermForm.value)))
        .subscribe(() => {
          this.cancel();
        });
    } else {
      this.store
        .dispatch(new AddTerm(this._formatForm(this.newTermForm.value)))
        .subscribe(() => {
          this.cancel();
        });
    }
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
      value: "",
      translation: "",
      plural: "",
      gender: EGender.none,
      followedBy: EPrepositionType.Accusative,
      conjugation: {
        presentParticiple: "",
        pastParticiple: "",
        auxiliary: EAuxiliary.Haben
      },
      verbType: EVerbType.Regular
    });

    this.modalCtrl.dismiss();
  }

  /**
   * Set validators according to the selected term type
   */
  private _setValidators() {
    this.followedBy.disable();
    this.conjugation.disable();
    this.verbType.disable();

    // Listen to changes on type field
    this.newTermForm.get("type").valueChanges.subscribe((type: string) => {
      if (type === ETermType.Name) {
        this.gender.enable();
        this.gender.setValue(EGender.none);
        this.gender.setValidators(Validators.required);
        this.plural.enable();
      } else {
        this.gender.clearValidators();
        this.gender.disable();
        this.plural.disable();
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

  /**
   * Format response before submitting
   * depending on the type
   */
  private _formatForm(form: ITerm): ITerm {
    if (
      form.examples &&
      form.examples.length &&
      form.examples.length === 1 &&
      form.examples[0].trim() === ""
    ) {
      delete form.examples;
    }

    if (this.term && this.term.id) {
      form.id = this.term.id;
    }

    return form;
  }
}
