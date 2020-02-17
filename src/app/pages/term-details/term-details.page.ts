import { Component, OnInit } from "@angular/core";
import { Store, Select } from "@ngxs/store";
import { VocabularyState } from "src/shared/vocabulary/vocabulary.state";
import { Observable } from "rxjs";
import { IPreposition, ITerm } from "src/app/models/term.models";
import { EGender } from "src/app/models/gender.models";
import { IVerb } from "src/app/models/verb.models";
import { GetTerm } from "src/shared/vocabulary/vocabulary.actions";
import { ActivatedRoute } from "@angular/router";
import { ModalController } from "@ionic/angular";
import { TermFormComponent } from "src/app/components/term-form/term-form.component";

@Component({
  selector: "memolang-term-details",
  templateUrl: "./term-details.page.html",
  styleUrls: ["./term-details.page.scss"]
})
export class TermDetailsPage implements OnInit {
  @Select(VocabularyState.currentTerm) term$: Observable<
    ITerm | IVerb | IPreposition
  >;

  public genderEnum = EGender;

  private _termId: string;

  constructor(
    private store: Store,
    private route: ActivatedRoute,
    private modalCtrl: ModalController
  ) {}

  ngOnInit() {
    this._termId = this.route.snapshot.paramMap.get("id");
    this.store.dispatch(new GetTerm(this._termId));
  }

  public async editTerm(term: ITerm | IVerb | IPreposition) {
    const modal = await this.modalCtrl.create({
      component: TermFormComponent,
      componentProps: {
        term
      }
    });
    modal.onWillDismiss().then(() => {
      this.store.dispatch(new GetTerm(this._termId));
    });
    return await modal.present();
  }
}
