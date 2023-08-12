import {Component, OnInit} from '@angular/core';
import {environment} from "../../../environments/environement.dev";
import {SoccerTrainingService} from "../../shared/services/soccer-training/soccer-training.service";
import {BehaviorSubject} from "rxjs";
import {TrainingByCategoryInterface} from "../../shared/interface/training-by-category.interface";

@Component({
  selector: 'app-entrainement',
  templateUrl: './entrainement.component.html',
  styleUrls: ['./entrainement.component.scss']
})
export class EntrainementComponent implements OnInit{

  public trainingByCat: BehaviorSubject<TrainingByCategoryInterface[]> = this.soccerTrainingService.trainingByCat$;

  constructor(private soccerTrainingService: SoccerTrainingService) {};

  ngOnInit(): void {
    this.soccerTrainingService.trainingByCategory().subscribe();
  }

  public bgTraining(): string {
    let css = `background: no-repeat center top 54% url(${environment.imagesPUBLIC}/entrainement.jpg);`;
    css += `background-size: cover;`;
    return  css;
  }

}
