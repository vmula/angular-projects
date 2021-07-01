import { Component, OnInit } from '@angular/core';

import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

import { Params, Space, SpaceXService } from './services/space-x.service';


type FilterName = 'launch_year' | 'launch_success' | 'land_success'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  spaces$: Observable<Space[]>;
  public parameters: Params = {
    limit: 100,
  };
  public launchYears = [
    '2006', '2007', '2008', '2009', '2010', '2011', '2012', '2013',
    '2014', '2015', '2016', '2017', '2018', '2019', '2020'
  ];
  public hasError = false;

  constructor (private spaceXService: SpaceXService) { }

  ngOnInit () {
    this.getSpaceXData();
  }

  public getSpaceXData = () => {
    this.spaces$ = this.spaceXService.getSpaceX(this.parameters)
      .pipe(
        catchError(err => {
          this.hasError = true;
          return throwError(err);
        })
      )
  }

  public getSpaceXByFilter = (type: FilterName, value: string | boolean) => {
    switch(type) {
      case 'land_success':

        if(!this.parameters.hasOwnProperty(type) || this.parameters[type] !== value) {
          this.parameters[type] = !!value;
        } else if(this.parameters[type] === value) {
          delete this.parameters[type];
        }

        break;
      case 'launch_success':
        if(!this.parameters.hasOwnProperty(type) || this.parameters[type] !== value) {
          this.parameters[type] = !!value;
        } else if(this.parameters[type] === value) {
          delete this.parameters[type];
        }

        break;
      case 'launch_year':
        if(!this.parameters.hasOwnProperty(type) || this.parameters[type] !== value) {
          this.parameters[type] = value.toString();
        } else if(this.parameters[type] === value) {
          delete this.parameters[type];
        }

        break;
      default:
        break;
    }
    this.spaces$ = this.spaceXService.getSpaceX(this.parameters);
  }


}
