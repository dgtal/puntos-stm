import { Component } from '@angular/core';
import { Platform, NavController } from 'ionic-angular';
import { SpinnerDialog } from 'ionic-native'
import { Zones } from '../../providers/zones'
import { AboutPage } from '../about/about';

@Component({
  templateUrl: 'zones.html'
})
export class ZonesPage {
  zones: any;
  filteredZones: any;

  constructor(
    public platform: Platform,
    public zonesService: Zones,
    public navCtrl: NavController
    ) {

    platform.ready().then(() => {
        SpinnerDialog.show(null, 'Aguarde...')
        this.fetchZones();
    });
  }

  private fetchZones() {
    this.zonesService.fetchZones().subscribe(
      data => {
        this.zones = this.filteredZones = data;
      },
      error => alert(error),
      () => {
        SpinnerDialog.hide()
      }
    );
  }

  clearSearchZone(event: any): void {
    console.log('clearSearchZone()');

    this.filteredZones = this.zones;
    event.stopPropagation();
  }

  searchZone(event: any): void {
    console.log('searchZone()');

    // Chequear para evitar que explote
    if (event.target && event.target.value) {
      // set q to the value of the searchbar
      let q: string = event.target.value;

      // if the value is an empty string don't filter the items
      if (q && q.trim().length == 0) {
        console.log('Sin valor');
        this.filteredZones = this.zones;
      } else {
        console.log('Buscando zonas por: ' + q.toLowerCase());

        this.filteredZones = this.zones.filter((v) => {
          return v.name.toLowerCase().indexOf(q.toLowerCase()) > -1;
        })
      }
    }
  }

  showSpotsByZone(zone) {
    this.navCtrl.push(AboutPage, { zone: zone });
  }
}