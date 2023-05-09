import {Component, OnInit} from '@angular/core';
import {DateComponent} from "../../shared/component/date/date.component";
import {FormBuilder, FormControl, FormGroup, FormGroupDirective, Validators} from "@angular/forms";
import {MatDialog} from "@angular/material/dialog";
import {DataPredicate} from "../../shared/interface/element-form-html.inteface";
import {map, Observable, startWith} from "rxjs";
import {Category} from "../../shared/interface/category.interface";
import {FootballPitch} from "../../shared/interface/football-pitch.interface";
import {OpposingTeam} from "../../shared/interface/opposing-team.interface";
import {CategoryService} from "../../shared/services/category/category.service";
import {FootballPitchService} from "../../shared/services/football-pitch/football-pitch.service";
import {OpposingTeamService} from "../../shared/services/oppposing-team/opposing-team.service";
import {MatchPlayService} from "../../shared/services/match-play/match-play.service";
import {MatchPlay} from "../../shared/interface/match-play.inteface";
import {environment} from "../../../environments/environement.dev";

@Component({
  selector: 'app-match-play',
  templateUrl: './match-play.component.html',
  styleUrls: ['./match-play.component.scss']
})
export class MatchPlayComponent implements OnInit{

  // HOUR
  private date: DateComponent = new DateComponent();
  public hours: DataPredicate[];
  // SEARCH INPUT
  public filteredOptionsCategory: Observable<Category[]> = this.categoryService.allCategory$.asObservable();
  public filteredOptionsFootballPitch: Observable<FootballPitch[]> = this.footballPitchService.allFootballPitch$.asObservable();
  public filteredOptionsOpposingTeam: Observable<OpposingTeam[]> = this.opposingTeamService.allOpposingTeam$.asObservable();
  // DATA OPTION INPUT
  public dataCategory: Category[] = [];
  public dataFootballPitch: FootballPitch[] = [];
  public dataOpposingTeam: OpposingTeam[] = [];
  // FORM
  public formCreateMatch: FormGroup = new FormGroup({});

  constructor(
    private fb: FormBuilder,
    private categoryService: CategoryService,
    private footballPitchService: FootballPitchService,
    private opposingTeamService: OpposingTeamService,
    private matchService: MatchPlayService,
    public dialog: MatDialog
  ) {
    this.hours = this.date.setHours();
  }

  ngOnInit() {
    this.createForm();
    this.opposingTeamService.getAllOpposingTeam().subscribe((opposingTeam: OpposingTeam[]) => {
      this.dataOpposingTeam = opposingTeam;
    });
    this.categoryService.getAllCategory().subscribe((categories: Category[]) => {
      this.dataCategory = categories;
    });
    this.footballPitchService.getAllFootballPitch().subscribe((pitch: FootballPitch[]) => {
      this.dataFootballPitch = pitch;
    });
    this.filteredOptionsCategory = this.formCreateMatch.valueChanges.pipe(
      startWith(''),
      map((value: string) => this._filterCategory(value || '')),
    );
    this.filteredOptionsFootballPitch = this.formCreateMatch.valueChanges.pipe(
      startWith(''),
      map((value: string) => this._filterFootballPitch(value || ''))
    );
    this.filteredOptionsOpposingTeam = this.formCreateMatch.valueChanges.pipe(
      startWith(''),
      map((value: string) => this._filterOpposingTeam( value ||''))
    );
  }

  //####################### FORM ###############################
  public createForm(): void {
    this.formCreateMatch = this.fb.group({
      date: new FormControl('', Validators.compose([
        Validators.required
      ])),
      hour_start: new FormControl('', Validators.compose([
        Validators.required
      ])),
      is_local: new FormControl('1', Validators.compose([
        Validators.required
      ])),
      team_opposing: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(3)
      ])),
      category: new FormControl('',Validators.compose([
        Validators.required
      ])),
      football_pitch: new FormControl('', Validators.compose([
        Validators.minLength(3),
        Validators.required
      ])),
      team: new FormControl(environment.teamName, Validators.compose([
        Validators.required
      ])),
      match_of_the_day: new FormControl(false)
    })
  }

  //#################### BEHAVIOR FORM ############################
  isLocalMatch() {
    const fbpInput: any = this.formCreateMatch.get("football_pitch");
    const validator: any = [Validators.required, Validators.minLength(3)]
    if(this.formCreateMatch.get("is_local")?.value == 1) {
      fbpInput.addValidators(validator); fbpInput.enable(); fbpInput.setValue('')
    }  else {
      fbpInput.removeValidators(validator); fbpInput.disable(); fbpInput.setValue(null)
    }
  }

  //####################### FILTER ###############################
  private _filterCategory(value: any): Category[] {
    return this.dataCategory.filter(data => data.name.toLowerCase().includes(value.category));
  }
  private _filterFootballPitch(value: any): FootballPitch[] {
    return this.dataFootballPitch.filter(data => data.name.toLowerCase().includes(value.football_pitch));
  }
  private _filterOpposingTeam(value: any): OpposingTeam[] {
    return this.dataOpposingTeam.filter(data => data.name.toLowerCase().includes(value.team_opposing));
  }

  //####################### SUBMIT ###############################
  public submit(): void {
    console.log(this.formCreateMatch.getRawValue())
    if(this.formCreateMatch.valid) {
      // FORMAT DATA
      let dateObj = this.formCreateMatch.get("date")?.value;
      this.formCreateMatch.get("date")?.setValue(`${dateObj.getFullYear()}-${dateObj.getMonth()+1}-${dateObj.getDate()}`);
      this.formCreateMatch.get("is_local")?.setValue(parseInt(this.formCreateMatch.get('is_local')?.value));

      // REQUEST HTTP
      this.matchService.createSoccerMatch(this.formCreateMatch.getRawValue()).subscribe({
        next: (match: MatchPlay) => {
          console.log(match)
          this.opposingTeamService.getAllOpposingTeam().subscribe((team) => {
            this.dataOpposingTeam = team;
          })

          this.footballPitchService.getAllFootballPitch().subscribe((fp) => {
            this.dataFootballPitch = fp;
          })

          this.categoryService.getAllCategory().subscribe((cat) => {
            this.dataCategory = cat;
          })
          this.formCreateMatch.reset();
          this.formCreateMatch.get('is_local')?.setValue("1");
          this.formCreateMatch.get('category')?.setValue('');
          this.formCreateMatch.get('football_pitch')?.setValue('');
          this.formCreateMatch.get('team_opposing')?.setValue('');
          this.formCreateMatch.get('match_of_the_day')?.setValue(false);
          this.formCreateMatch.get('team')?.setValue(environment.teamName)
        },
        error: (err) => {
          console.log(err?.error)
        }
      })

    }
  }
}
