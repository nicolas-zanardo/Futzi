import {Component, OnInit} from '@angular/core';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit{
  public firstName: string = "Nicolas";
  public lastName: string = "Zanardo";
  public email: string = "nicolas-zanardo@live.fr"
  public seasonDate?: string;

  ngOnInit(): void {
    this.seasonDate = this.seasonYear();
  }

  private seasonYear(): string {
    let year = new Date().getFullYear();
    let month = new Date().getMonth();
    let season: string;
    if(month >= 9) {
      season = year+'/'+(year+1);
    } else {
      season = (year-1)+'/'+year;
    }
    return season;
  }
}
