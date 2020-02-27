import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { QuizzComponent } from "./quizz.component";
import { IonicModule } from "@ionic/angular";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

@NgModule({
  declarations: [QuizzComponent],
  exports: [QuizzComponent],
  imports: [CommonModule, IonicModule, FormsModule, ReactiveFormsModule]
})
export class QuizzModule {}
