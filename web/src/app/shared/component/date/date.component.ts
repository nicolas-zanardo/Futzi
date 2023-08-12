import { Component } from '@angular/core';
import {DataPredicate} from "../../interface/element-form-html.inteface";

@Component({
  selector: 'app-date',
  template: ``,
  styles: [
  ]
})
export class DateComponent {

  public day: DataPredicate[] = [
    {value: "lundi", viewValue: "Lundi"},
    {value: "mardi", viewValue: "Mardi"},
    {value: "mercredi", viewValue: "Mercredi"},
    {value: "jeudi", viewValue: "Jeudi"},
    {value: "vendredi", viewValue: "Vendredi"},
    {value: "samedi", viewValue: "Samedi"},
    {value: "dimanche", viewValue: "Dimanche"}
  ]

  public setHours(): DataPredicate[] {
    let selectHour: DataPredicate[] = [];
    for (let hour: number = 9; hour <= 21; hour++ ) {
      for (let minute: number = 0; minute <= 30; minute++) {
        selectHour.push({value:`${hour.toString()}:`+("0"+minute).slice(-2)  , viewValue: `${hour.toString()}:`+("0"+minute).slice(-2)});
        minute += 29;
      }
    }
    return selectHour;
  }


}
