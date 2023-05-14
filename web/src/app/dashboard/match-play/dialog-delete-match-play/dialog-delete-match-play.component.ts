import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {MatchPlay} from "../../../shared/interface/match-play.inteface";

@Component({
  selector: 'app-dialog-delete-match-play',
  templateUrl: './dialog-delete-match-play.component.html',
  styleUrls: ['./dialog-delete-match-play.component.scss']
})
export class DialogDeleteMatchPlayComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: MatchPlay
  ) {}

}
