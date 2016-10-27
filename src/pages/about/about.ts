import { Component } from '@angular/core';
import { NavController, NavParams, Platform, ToastController } from 'ionic-angular';
import { Geolocation, SpinnerDialog } from 'ionic-native'
import { PointsOfInterest } from '../../providers/points-of-interest'

import { ModalController } from 'ionic-angular';
import { SpotInfoPage } from '../spot-info/spot-info';

@Component({
  // selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {
  points: any;
  zone: any;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public platform: Platform,
    public toastCtrl: ToastController,
    public pointOfInterestService: PointsOfInterest,
    public modalCtrl: ModalController
    ) {

    platform.ready().then(() => {
      SpinnerDialog.show(null, 'Aguarde...')

      this.zone = this.navParams.get('zone');

      if (this.zone)
        this.loadPointsByZone()
      else
        this.loadPointsByGeolocation();
    });
  }

  loadPointsByGeolocation() {
    Geolocation.getCurrentPosition().then((resp) => {
      this.fetchPoints(resp.coords.latitude, resp.coords.longitude);
    }, err => {
      console.log(err)
      SpinnerDialog.hide()
    });
  }

  loadPointsByZone() {
    this.pointOfInterestService.fetchPointsByZone(this.zone).subscribe(
      data => {
        this.points = data;
      },
      error => alert(error),
      () => {
        SpinnerDialog.hide()
      }
    );
  }

  private fetchPoints(latitude?:number, longitude?:number, zone?:any) {
    if (this.pointOfInterestService.points) {
      this.points = this.pointOfInterestService.points;
      SpinnerDialog.hide();
    }
    else {
      this.pointOfInterestService.fetchPoints(latitude, longitude).subscribe(
        data => {
          this.points = data;
        },
        error => alert(error),
        () => {
          SpinnerDialog.hide()
        }
      );
    }
  }

  showSpotInfo(spot) {
    let modal = this.modalCtrl.create(SpotInfoPage, { spot: spot });
    modal.present();
  }
}