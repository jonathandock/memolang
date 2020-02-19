import { Component, OnInit } from "@angular/core";
import { GLOBALS } from "src/environments/globals";
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators
} from "@angular/forms";
import {
  TranslateTextResponseTranslation,
  TranslationObject,
  QuickTranslation
} from "src/app/models/translate.model";
import { TermsService } from "src/app/services/terms.service";
import { ModalController } from "@ionic/angular";
import { TermFormComponent } from "../term-form/term-form.component";

@Component({
  selector: "memolang-quick-translate",
  templateUrl: "./quick-translate.component.html",
  styleUrls: ["./quick-translate.component.scss"]
})
export class QuickTranslateComponent implements OnInit {
  public langList = GLOBALS.LANGUAGES_LIST;
  public translateForm: FormGroup;
  public translatedTexts: TranslateTextResponseTranslation[];
  public translationError: boolean;
  public loadingTranslation = false;

  constructor(
    private termsService: TermsService,
    private formBuilder: FormBuilder,
    private modalCtrl: ModalController
  ) {
    this.translateForm = this.formBuilder.group({
      source: new FormControl("en"),
      target: new FormControl("de"),
      q: new FormControl("", Validators.required)
    });
  }

  ngOnInit() {}

  /**
   * Watches the changes on translation input
   * @param inputValue
   */
  public onInputChange(inputValue: string) {
    if (!inputValue && this.translatedTexts) {
      this.translatedTexts = null;
    }
  }

  /**
   * Submit the translation to google translate
   * @param form
   */
  public onSubmitTranslation(form: TranslationObject) {
    this.loadingTranslation = true;
    this.termsService.translate(form).subscribe(res => {
      if (res) {
        this.translatedTexts = res;
        this.translationError = false;
      } else {
        this.translationError = true;
      }
      this.loadingTranslation = false;
    });
  }

  /**
   * Swap target and source language
   */
  public invertLangs() {}

  /**
   * Open modal to add the new translation to the list
   * @param translatedTerm
   * @param searchedText
   */
  public async addTranslation(
    translatedTerm: TranslateTextResponseTranslation[],
    searchedText: string
  ) {
    const quickTranslation: QuickTranslation = {
      translatedTerm:
        translatedTerm.length && translatedTerm.length === 1
          ? translatedTerm[0].translatedText
          : translatedTerm,
      searchedText
    };

    const modal = await this.modalCtrl.create({
      component: TermFormComponent,
      componentProps: {
        quickTranslation
      }
    });
    await modal.present();
    this.translateForm.reset({ source: "en", target: "de", q: "" });
  }
}
