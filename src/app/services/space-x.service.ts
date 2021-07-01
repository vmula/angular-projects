import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';


const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  })
};

export interface Space {
  flight_number: number;
  mission_name: string;
  mission_id: any[];
  upcoming: boolean;
  launch_year: string;
  links: {
    mission_patch: string;
    mission_patch_small: string;
  },
  launch_success: boolean;
  launch_landing: boolean;
};

export interface Params {
  limit: number;
  launch_success?: boolean;
  land_success?: boolean;
  launch_year?: string;
}

@Injectable({
  providedIn: 'root'
})
export class SpaceXService {

  public spaceXUrl = 'https://api.spaceXdata.com/v3/launches';

  constructor (private http: HttpClient) { }


  /** GET space X items */
  getSpaceX (params: Params): Observable<Space[]> {

    let urlParams = new HttpParams();
    urlParams = urlParams.set('limit', params.limit.toString());
    if(params.land_success != null) {
      urlParams = urlParams.set('land_success', params.land_success);
    }

    if(params.launch_year != null) {
      urlParams = urlParams.set('launch_year', params.launch_year);
    }

    if(params.launch_success != null) {
      urlParams = urlParams.set('launch_success', params.launch_success);
    }

    return this.http.get<Space[]>(this.spaceXUrl,
      {
        headers: new HttpHeaders(),
        params: urlParams,
        responseType: 'json',
      });
  }

}
