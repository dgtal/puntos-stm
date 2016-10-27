import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class Zones {

  constructor(public http: Http) {
    console.log('Hello Zones Provider');
  }

  fetchZones() {
    let url = 'http://dgtal.info/stm/zones.php';

    return this.http.get(url)
        .map(res => res.json())
        .map(res => {
            return res;
        })
  }
}