import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {SoccerTraining} from "../../../shared/interface/soccer-training.interface";

@Component({
  selector: 'app-dialog-delete-soccer-training',
  templateUrl: './dialog-delete-soccer-training.component.html',
  styleUrls: ['./dialog-delete-soccer-training.component.scss']
})
export class DialogDeleteSoccerTrainingComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: SoccerTraining,
  ) {}


}
