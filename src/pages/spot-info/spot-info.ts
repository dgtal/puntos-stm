import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';

@Component({
  templateUrl: 'spot-info.html'
})
export class SpotInfoPage {
  spot: any;

  constructor(
    public navCtrl: NavController,
    public viewCtrl: ViewController,
    public navParams: NavParams
  ) {
    this.spot = this.navParams.get('spot');
  }

  ionViewDidLoad() {
    console.log('Hello SpotInfo Page');
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }
}