import { Injectable } from '@angular/core';
import { Http, URLSearchParams, RequestOptions } from '@angular/http';

import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class PointsOfInterest {
  points: any;

  constructor(public http: Http) {
    console.log('Hello PointsOfInterest Provider');
  }

  fetchPoints(latitude?:number, longitude?:number, radio?:number) {
    console.log('FetchPoints()');

    let url = 'http://stm.mobilehandcrafts.com/';

    let params = new URLSearchParams();

    if (latitude && longitude) {
      params.set('latitude', latitude.toString());
      params.set('longitude', longitude.toString());
    }

    if (radio) {
      params.set('radio', radio.toString());
    }

    let options = new RequestOptions({ search: params });

    return this.http.get(url, options)
        .map(res => res.json())
        .map(res => {
            this.points = res;
            return res;
        })
  }

  fetchPointsByZone(zone:any) {
    console.log('fetchPointsByZone()');

    let url = 'http://stm.mobilehandcrafts.com/';

    let params = new URLSearchParams();

    if (zone) {
      params.set('zone', zone.id.toString());
    }

    let options = new RequestOptions({ search: params });

    return this.http.get(url, options)
        .map(res => res.json())
        .map(res => {
            this.points = res;
            return res;
        })
  }
}