import { Component, OnInit, Input } from "@angular/core";
import { ITerm, IPreposition } from "src/app/models/term.models";
import { IVerb } from "src/app/models/verb.models";

@Component({
  selector: "memolang-list-item",
  templateUrl: "./list-item.component.html",
  styleUrls: ["./list-item.component.scss"]
})
export class ListItemComponent implements OnInit {
  @Input() term: ITerm | IVerb | IPreposition;
  @Input() search: string;

  constructor() {}

  ngOnInit() {
  }
}
