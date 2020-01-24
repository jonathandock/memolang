import { Component, OnInit } from "@angular/core";
import { ModalController } from "@ionic/angular";
import { TermFormComponent } from '../term-form/term-form.component';

@Component({
  selector: "memolang-new-term-button",
  templateUrl: "./new-term-button.component.html",
  styleUrls: ["./new-term-button.component.scss"]
})
export class NewTermButtonComponent implements OnInit {
  constructor(private modalCtrl: ModalController) {}

  ngOnInit() {}

  public async openNewTermModal() {
    const modal = await this.modalCtrl.create({
      component: TermFormComponent
    });
    return await modal.present();
  }
}
