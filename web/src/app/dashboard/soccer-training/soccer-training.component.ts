import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {map, Observable, startWith, tap} from "rxjs";
import {FormBuilder, FormControl, FormGroup, FormGroupDirective, Validators} from "@angular/forms";
import {DataPredicate} from "../../shared/interface/element-form-html.inteface";
import {DateComponent} from "../../shared/component/date/date.component";
import {SoccerTrainingService} from "../../shared/services/soccer-training/soccer-training.service";
import {Category} from "../../shared/interface/category.interface";
import {FootballPitch} from "../../shared/interface/football-pitch.interface";
import {SoccerTraining} from "../../shared/interface/soccer-training.interface";
import {animate, state, style, transition, trigger} from "@angular/animations";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {MatDialog} from "@angular/material/dialog";
import {
  DialogDeleteSoccerTrainingComponent
} from "./dialog-delete-soccer-training/dialog-delete-soccer-training.component";
import {CategoryService} from "../../shared/services/category/category.service";
import {FootballPitchService} from "../../shared/services/football-pitch/football-pitch.service";


@Component({
  selector: 'app-soccer-training',
  templateUrl: './soccer-training.component.html',
  styleUrls: ['./soccer-training.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class SoccerTrainingComponent implements OnInit, AfterViewInit{

  private date: DateComponent = new DateComponent()
  // SEARCH CATEGORY
  public filteredOptionsCategory: Observable<Category[]> = this.categoryService.allCategory$.asObservable();
  // SEARCH FOOTBALL PITCH
  public filteredOptionsFootballPitch: Observable<FootballPitch[]> = this.footballPitchServcie.allFootballPitch$.asObservable();
  //DATA
  public allSoccerFootball: SoccerTraining[] = this.trainingService.allSoccerTraining$.value;
  public dataCategory: Category[] = [];
  public dataFootballPitch: FootballPitch[] = [];
  public hours: DataPredicate[];
  public week: DataPredicate[];
  // FORM
  public formCreateTraining : FormGroup = new FormGroup({})
  // MAT DATABLE
  public columnsToDisplayWithExpand = ['day', 'hour_start', 'expand'];
  public columnsToDisplay : {column: string, name: string}[] = [
    {column:'day', name: "Jour"},
    {column:'hour_start', name: "Heure"}
  ];
  public expandedElement: SoccerTraining[] | null = null;
  public dataSource: MatTableDataSource<SoccerTraining>;
  // DATATABLE - PAGINATOR
  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;
  @ViewChild(MatSort) sort: MatSort | undefined;

  constructor(
    private fb: FormBuilder,
    private trainingService: SoccerTrainingService,
    private categoryService: CategoryService,
    private footballPitchServcie: FootballPitchService,
    public dialog: MatDialog
  ) {
    this.hours = this.date.setHours();
    this.week = this.date.day;
    this.dataSource = new MatTableDataSource(this.allSoccerFootball);
  }


  ngOnInit(): void {
    this.createForm();
    this.filteredOptionsCategory = this.formCreateTraining.valueChanges.pipe(
      startWith(''),
      map((value: string) => this._filterCategory(value || '')),
    );
    this.filteredOptionsFootballPitch = this.formCreateTraining.valueChanges.pipe(
      startWith(''),
      map((value: string) => this._filterFootballPitch(value || ''))
    );
    this.categoryService.getAllCategory().subscribe((categories: Category[]) => {
      this.dataCategory = categories;
    })
    this.footballPitchServcie.getAllFootballPitch().subscribe((pitch: FootballPitch[]) => {
      this.dataFootballPitch = pitch;
    })

    this.soccerTrainingIsProvide();
  }

  ngAfterViewInit() {
    this.dataSource!.paginator = this.paginator!;
    this.dataSource!.sort = this.sort!;
  }

  //###################### PROVIDER ##############################
  private soccerTrainingIsProvide() {
    this.trainingService.getAllSoccerTraining().subscribe((soccerTraining: SoccerTraining[])=> {
      this.allSoccerFootball = soccerTraining;
      this.dataSource.data = this.allSoccerFootball;
    })
    this.dataSource!.paginator = this.paginator!;
    this.dataSource!.sort = this.sort!;
  }


  //######################## FORM ################################
  private createForm(): void {
    this.formCreateTraining = this.fb.group({
      day: new FormControl('', Validators.compose([
        Validators.required
      ])),
      hour_start: new FormControl('', Validators.compose([
        Validators.required
      ])),
      category: new FormControl('',Validators.compose([
        Validators.required,
        Validators.minLength(3)
      ])),
      football_pitch: new FormControl('', Validators.compose([
        Validators.required
      ]))
    })
  }

  //###################### FILTER ##############################
  public applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  public _filterCategory(value: any): Category[] {
    return this.dataCategory.filter(data => data.name.toLowerCase().includes(value.category));
  }
  public _filterFootballPitch(value: any): FootballPitch[] {
    return this.dataFootballPitch.filter(data => data.name.toLowerCase().includes(value.football_pitch));
  }

  //###################### DIALOG ##############################
  /**
   * openDialog
   * @description Btn to delete soccer training
   * @param enterAnimationDuration
   * @param exitAnimationDuration
   */
  public openDialog(enterAnimationDuration: string, exitAnimationDuration: string, soccerTraining: SoccerTraining) {
    const dialogRef = this.dialog.open(DialogDeleteSoccerTrainingComponent, {
      width: '100%',
      enterAnimationDuration,
      exitAnimationDuration,
      data: soccerTraining,
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        this.deleteSoccerTraining(result);
      }
    });
  }

  //###################### SUBMIT ##############################
  /**
   * CREATE New soccer training
   */
  public submit(formDirective: FormGroupDirective) {
    if(this.formCreateTraining.valid) {
      this.trainingService.createSoccerTraining(this.formCreateTraining.getRawValue()).subscribe({
        next: (createSoccer: SoccerTraining) => {
          formDirective.resetForm();
          this.allSoccerFootball.unshift(this.formCreateTraining.getRawValue());
          this.dataSource.data = this.allSoccerFootball;
          // ADD data input football_pitch
          if(createSoccer.id_football_pitch) {
            this.footballPitchServcie.getAllFootballPitch().subscribe((pitch: FootballPitch[]) => {
              this.dataFootballPitch = pitch;
            })
          }
          // ADD data input category
          if(createSoccer.id_category) {
            this.categoryService.getAllCategory().subscribe((categories: Category[]) => {
              this.dataCategory = categories;
            })
          }
        },
        error: (err) => {
          console.log(err?.error)
        },
      })

    }
  }

  private deleteSoccerTraining(result: SoccerTraining) {
    if(result && result.id) {
      this.trainingService.deleteSoccerTraining(result.id).subscribe(() => {
        let newArraySoccerFootball: SoccerTraining[] = this.allSoccerFootball.filter((training: SoccerTraining) => {
          return training.id != result.id;
        })
        this.allSoccerFootball = newArraySoccerFootball;
        this.dataSource.data = newArraySoccerFootball;
      })
    }
  }

}
