import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { TermFormComponent } from "./term-form.component";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { IonicModule } from "@ionic/angular";

@NgModule({
  declarations: [TermFormComponent],
  exports: [TermFormComponent],
  imports: [CommonModule, FormsModule, IonicModule, ReactiveFormsModule]
})
export class TermFormModule {}
