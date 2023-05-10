import {Component, OnInit} from '@angular/core';
import {DateComponent} from "../../shared/component/date/date.component";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
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
  public hours: DataPredicate[] = this.date.setHours();
  // SEARCH INPUT
  public filteredOptionsCategory: Observable<Category[]> = this.categoryService.allCategory$.asObservable();
  public filteredOptionsFootballPitch: Observable<FootballPitch[]> = this.footballPitchService.allFootballPitch$.asObservable();
  public filteredOptionsOpposingTeam: Observable<OpposingTeam[]> = this.opposingTeamService.allOpposingTeam$.asObservable();
  // DATA OPTION INPUT
  public dataMatch: Observable<MatchPlay[]> = this.matchService.allMatchPlay$.asObservable();
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
  ) {}

  ngOnInit() {
    this.createForm();
    // DATA OPTION INPUT
    this.categoryService.getAllCategory().subscribe((categories: Category[]) => {
      this.dataCategory = categories;
      this._initFilteredOptionsCategory();
    });
    this.opposingTeamService.getAllOpposingTeam().subscribe((opposingTeam: OpposingTeam[]) => {
      this.dataOpposingTeam = opposingTeam;
      this._initFilteredOptionsOpposingTeam();
    });
    this.footballPitchService.getAllFootballPitch().subscribe((pitch: FootballPitch[]) => {
      this.dataFootballPitch = pitch;
      this._initFilteredOptionsFootballPitch();
    });

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
  public isLocalMatch() {
    const fbpInput: any = this.formCreateMatch.get("football_pitch");
    const validator: any = [Validators.required, Validators.minLength(3)]
    if(this.formCreateMatch.get("is_local")?.value == 1) {
      fbpInput.addValidators(validator); fbpInput.enable(); fbpInput.setValue('')
    }  else {
      fbpInput.removeValidators(validator); fbpInput.disable(); fbpInput.setValue(null)
    }
  }

  //####################### FILTER ###############################
  private _initFilteredOptionsCategory()  {
    this.filteredOptionsCategory = this.formCreateMatch.valueChanges.pipe(
      startWith(""),
      map((value: string) => this._filterCategory(value || ''))
    );
  }
  private _initFilteredOptionsFootballPitch() {
    this.filteredOptionsFootballPitch = this.formCreateMatch.valueChanges.pipe(
      map((value: string) => this._filterFootballPitch(value || ''))
    );
  }
  private _initFilteredOptionsOpposingTeam() {
    this.filteredOptionsOpposingTeam = this.formCreateMatch.valueChanges.pipe(
      startWith(''),
      map((value: string) => this._filterOpposingTeam( value ||''))
    );
  }

  private _filterCategory(value: any): Category[] {
    return this.dataCategory.filter(data => data.name.includes(value.category));
  }
  private _filterFootballPitch(value: any): FootballPitch[] {
    return this.dataFootballPitch.filter(data => data.name.includes(value.football_pitch));
  }
  private _filterOpposingTeam(value: any): OpposingTeam[] {
    return this.dataOpposingTeam.filter(data => data.name.includes(value.team_opposing));
  }

  //####################### SUBMIT ###############################
  public submit(): void {
    if(this.formCreateMatch.valid) {

      // FORMAT DATE
      let dateObj = this.formCreateMatch.get("date")?.value;
      this.formCreateMatch.get("date")?.setValue(`${dateObj.getFullYear()}-${dateObj.getMonth()+1}-${dateObj.getDate()}`);
      // TRANSFORM VALUE STRING TO NUMBER
      this.formCreateMatch.get("is_local")?.setValue(parseInt(this.formCreateMatch.get('is_local')?.value));

      // REQUEST HTTP
      this.matchService.createSoccerMatch(this.formCreateMatch.getRawValue()).subscribe({
        next: (match: MatchPlay) => {
          // PREPARE OPTION DATA INPUT team_opposing
          if(match.team_opposing) {
            this.opposingTeamService.getAllOpposingTeam().subscribe((opposingTeam: OpposingTeam[]) => {
              this.dataOpposingTeam = opposingTeam;
              this.filteredOptionsOpposingTeam = this.opposingTeamService.allOpposingTeam$.asObservable();
            });
            this._initFilteredOptionsOpposingTeam();
          }
          // PREPARE OPTION DATA INPUT football_pitch
          if(match.football_pitch) {
            this.footballPitchService.getAllFootballPitch().subscribe((footballPitch: FootballPitch[]) => {
              this.dataFootballPitch = footballPitch;
              this.filteredOptionsFootballPitch = this.opposingTeamService.allOpposingTeam$.asObservable();
            });
            this._initFilteredOptionsFootballPitch();
          }
          // PREPARE OPTION DATA INPUT category
          if(match.category) {
            this.categoryService.getAllCategory().subscribe((categories: Category[]) => {
              this.dataCategory = categories;
              this.filteredOptionsCategory = this.categoryService.allCategory$.asObservable();
            });
            this._initFilteredOptionsCategory();
          }
          // RESET FORM
          this.formCreateMatch.reset();
          //INIT FORM
          this.formCreateMatch.get('is_local')?.setValue("1");
          this.formCreateMatch.get('category')?.setValue('');
          this.formCreateMatch.get('football_pitch')?.setValue('');
          this.formCreateMatch.get('team_opposing')?.setValue('');
          this.formCreateMatch.get('match_of_the_day')?.setValue(false);
          this.formCreateMatch.get('team')?.setValue(environment.teamName)
          this.formCreateMatch.get('football_pitch')?.enable();
        },
        error: (err) => {
          console.log(err?.error)
        }
      })

    }
  }
}
