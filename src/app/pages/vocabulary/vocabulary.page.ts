import { Component, OnInit } from "@angular/core";
import { Select, Store } from "@ngxs/store";
import { VocabularyState } from "src/shared/vocabulary/vocabulary.state";
import { Observable } from "rxjs";
import { ITerm, IPreposition } from "src/app/models/term.models";
import { IVerb } from "src/app/models/verb.models";
import { ESorts } from "src/app/models/sort.models";
import { AlertController } from "@ionic/angular";
import { SetSortOrder } from "src/shared/vocabulary/vocabulary.actions";
import * as _ from "lodash";

@Component({
  selector: "app-vocabulary",
  templateUrl: "./vocabulary.page.html",
  styleUrls: ["./vocabulary.page.scss"]
})
export class VocabularyPage implements OnInit {
  @Select(VocabularyState.terms) terms$: Observable<
    (ITerm | IVerb | IPreposition)[]
  >;
  @Select(VocabularyState.sortedTerms) sortedTerms$: Observable<any[]>;
  @Select(VocabularyState.activeSort) activeSort$: Observable<string>;

  public sortTypes = ESorts;
  public searchInputValue = "";

  constructor(private store: Store, private alertCtrl: AlertController) {}

  ngOnInit() {
    // this.store.dispatch(new GetTerms());
  }

  /**
   * Filtering terms with the searchbar value
   */
  public search(ev: any) {
    this.searchInputValue = ev.detail.value;
  }

  /**
   * Choose the type of sort for lists
   */
  async sortList() {
    const activeSort = this.store.selectSnapshot(VocabularyState.activeSort);

    const alert = await this.alertCtrl.create({
      header: "Sort by",
      inputs: [
        {
          name: "latest",
          type: "radio",
          label: ESorts.Latest,
          value: ESorts.Latest,
          checked: activeSort === ESorts.Latest
        },
        {
          name: "alphabetical",
          type: "radio",
          label: ESorts.Alphabetically,
          value: ESorts.Alphabetically,
          checked: activeSort === ESorts.Alphabetically
        }
      ],
      buttons: [
        {
          text: "Cancel",
          role: "cancel",
          cssClass: "secondary",
          handler: () => {
            console.log("Confirm Cancel");
          }
        },
        {
          text: "Ok",
          handler: value => {
            if (value) {
              this.store.dispatch(new SetSortOrder(value));
            }
          }
        }
      ]
    });

    await alert.present();
  }

  // public doRefresh(ev: any) {
  //   this.store.dispatch(new GetTerms()).subscribe(() => {
  //     ev.target.complete();
  //   });
  // }
}
