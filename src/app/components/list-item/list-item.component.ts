import { Component, OnInit, Input } from "@angular/core";
import { ITerm, IPreposition } from "src/app/models/term.models";
import { IVerb } from "src/app/models/verb.models";
import { Store } from '@ngxs/store';
import { AlertController } from '@ionic/angular';
import { DeleteTerm } from 'src/shared/vocabulary/vocabulary.actions';

@Component({
  selector: "memolang-list-item",
  templateUrl: "./list-item.component.html",
  styleUrls: ["./list-item.component.scss"]
})
export class ListItemComponent implements OnInit {
  @Input() term: ITerm | IVerb | IPreposition;
  @Input() search: string;

  constructor(
    private store: Store,
    private alertCtrl: AlertController
  ) {}

  ngOnInit() {
  }

  public async delete(id: string) {

    const alertDelete = await this.alertCtrl.create({
      header: 'Delete',
      message: 'Do you really want to delete this?',
      buttons: [
        {
          text: 'No',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {}
        }, {
          text: 'Yes',
          handler: () => {
            this.store.dispatch(new DeleteTerm(id));
          }
        }
      ]
    });

    await alertDelete.present();
  }
}
