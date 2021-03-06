import { Component, OnInit, NgZone } from "@angular/core";
import { Select, Store } from "@ngxs/store";
import { VocabularyState } from "src/shared/vocabulary/vocabulary.state";
import { Observable } from "rxjs";
import { AlertController, NavController } from "@ionic/angular";
import { SetSortOrder } from "src/shared/vocabulary/vocabulary.actions";
import * as _ from "lodash";
import { Router } from "@angular/router";
import { ITerm } from 'src/app/models/models';
import { ESorts } from 'src/app/models/enums';

@Component({
  selector: "app-vocabulary",
  templateUrl: "./vocabulary.page.html",
  styleUrls: ["./vocabulary.page.scss"]
})
export class VocabularyPage implements OnInit {
  @Select(VocabularyState.terms) terms$: Observable<ITerm[]>;
  @Select(VocabularyState.sortedTerms) sortedTerms$: Observable<any[]>;
  @Select(VocabularyState.activeSort) activeSort$: Observable<string>;

  public sortTypes = ESorts;
  public searchInputValue = "";

  constructor(
    private store: Store,
    private ngZone: NgZone,
    private navCtrl: NavController,
    private alertCtrl: AlertController
  ) {}

  ngOnInit() {}

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

  public goToTermDetails(termId: string) {
    this.ngZone.run(() => {
      this.navCtrl.navigateForward(`/tabs/vocabulary/term/${termId}`);
    });
  }

  // public doRefresh(ev: any) {
  //   this.store.dispatch(new GetTerms()).subscribe(() => {
  //     ev.target.complete();
  //   });
  // }
}
