import {Component, OnInit} from '@angular/core';
import {environment} from "../../../environments/environement.dev";
import {MatchPlayService} from "../../shared/services/match-play/match-play.service";
import {BehaviorSubject} from "rxjs";
import {MatchPlay} from "../../shared/interface/match-play.inteface";


@Component({
  selector: 'app-match',
  templateUrl: './match.component.html',
  styleUrls: ['./match.component.scss']
})
export class MatchComponent implements OnInit {

  public logoOsny: string = `${environment.imagesPUBLIC}LOGO_OSNY.png`;
  public matchOfTheDay: BehaviorSubject<MatchPlay|undefined> = this.matchPlayService.matchOfTheDay$;
  public nextMatch: BehaviorSubject<MatchPlay[]|[]> = this.matchPlayService.nextMatch$;

  constructor(
    private matchPlayService: MatchPlayService
  ) {}

  ngOnInit(): void {
    this.matchPlayService.getMatchOfTheDay().subscribe();
    this.matchPlayService.getNextMatch().subscribe();
  }

  public bgMatch(): string {
    return `background: no-repeat center/80% url(${environment.imagesPUBLIC}/terrain.jpg); background-size: cover;`;
  }









}
