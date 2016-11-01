import { Component } from '@angular/core';
import {
  NavController, Platform, LoadingController,
  ToastController, AlertController } from 'ionic-angular';
import {
  Diagnostic, GoogleMap, GoogleMapsEvent, GoogleMapsLatLng,
  GoogleMapsMarker, GoogleMapsAnimation, Geolocation, SpinnerDialog } from 'ionic-native'
import { PointsOfInterest } from '../../providers/points-of-interest'
import { AboutPage } from '../about/about'
import { ModalController } from 'ionic-angular';
import { SpotInfoPage } from '../spot-info/spot-info';

@Component({
  templateUrl: 'home.html'
})
export class HomePage {
  map: GoogleMap;
  latLng: GoogleMapsLatLng;
  points: any;
  utm: any;
  currentPositionMarker: GoogleMapsLatLng;
  defaultLocation:GoogleMapsLatLng = new GoogleMapsLatLng(-34.88593092938246,-56.24999999711068);
  isLocationEnabled: boolean = false;
  isLocationAuthorized: boolean = false;

  constructor(
    public navCtrl: NavController, 
    public toastCtrl: ToastController,
    public alertCtrl: AlertController,
    public platform: Platform,
    public pointOfInterestService: PointsOfInterest,
    public modalCtrl: ModalController,
    public loadingCtrl: LoadingController
    ) {

    platform.ready().then(() => {
      this.loadMap();
    });
  }

  ngOnDestroy() {
    console.log('home -> ngOnDestroy');
  }

  loadMap() {
    SpinnerDialog.show(null, 'Aguarde...')

    this.map = new GoogleMap('map', {
      'backgroundColor': 'white',
      'controls': {
        'compass': false,
        'myLocationButton': true,
        'indoorPicker': false,
        'zoom': true
      },
      'gestures': {
        'scroll': true,
        'tilt': true,
        'rotate': true,
        'zoom': true
      },
      'camera': {
        'latLng': this.defaultLocation,
        'tilt': 0,
        'zoom': 16,
        'bearing': 50
      }
    });

    this.map.on(GoogleMapsEvent.MAP_READY).subscribe(() => {
      // this.map.setZoom(16)
      // this.map.setClickable(false)
      this.getCurrentPosition()
    });

    this.map.on(GoogleMapsEvent.MAP_LONG_CLICK).subscribe((latLng: GoogleMapsLatLng) => {
      this.currentPositionMarker = latLng;

      SpinnerDialog.show(null, 'Buscando...')

      this.fetchPoints(latLng.lat, latLng.lng);
    });
  }

  private fetchPoints(latitude?:number, longitude?:number, radio:number=1) {
    console.log('fetchPoints()');
    
    this.pointOfInterestService.fetchPoints(latitude, longitude, radio).subscribe(
      data => {
        this.points = data;

        if (this.points.length > 0) {
          let toast = this.toastCtrl.create({
            message: 'Encontramos ' + this.points.length + ' punto' + (this.points.length > 1 ? 's' : '') + ' cercano' + (this.points.length > 1 ? 's' : ''),
            duration: 2000,
            position: 'middle'
          });

          toast.present()

          this.showPointsInMap();
        } else {
          if (radio > 1) {
            let alert = this.alertCtrl.create({
              title: 'Sin resultados',
              subTitle: 'Lamentablemente no encontramos puntos cercanos a la posición.',
              buttons: [
                      {
                        text: 'No',
                        role: 'cancel',
                        handler: () => {
                          console.log('Cancel clicked');
                          this.map.setClickable(true);
                        }
                      }
              ]
            });

            alert.present();
          } else {
            SpinnerDialog.hide()
            this.map.setClickable(false) // Fix para que funcione la confirmación
            this.presentConfirm(latitude, longitude)
          }
        }
      },
      error => alert(error)
    );
  }

  private showPointsInMap() {
    this.map.setClickable(true)

    // Remove all marks
    this.map.clear()

    this.points.forEach((point) => {
      let iconColor: string = point.type == 1 ? 'red' : ((point.type == 2) ? 'blue' : 'green');

      this.map.addMarker({
        "position": new GoogleMapsLatLng(point.lat, point.lng),
        "title": point.name,
        // icon: iconColor
        "icon": {
          'url': 'www/assets/markers/64x64/map-marker-icon-' + iconColor + '.png',
          'size': {
            'width': 48,
            'height': 48
          }
        }
      }).then((marker: GoogleMapsMarker) => {
        marker.addEventListener(GoogleMapsEvent.MARKER_CLICK).subscribe(() => {
          marker.hideInfoWindow();
          this.showSpotInfo(point);
        });
      })
    })

    this.map.addMarker({
      "position": this.currentPositionMarker,
      "icon": "blue",
      "animation": GoogleMapsAnimation.DROP
    });

    SpinnerDialog.hide();
  }

  private getCurrentPosition() {
    console.log('getCurrentPosition()');

    Diagnostic.isLocationEnabled()
    .then(
      (state) => {
        this.isLocationEnabled = state;

        if (state) {
          Diagnostic.isLocationAuthorized().then((authorized) => {
            this.isLocationAuthorized = authorized;

            if (authorized) {
              Geolocation.getCurrentPosition({'timeout': 10000}).then((resp) => {
                this.currentPositionMarker = null;

                this.latLng = new GoogleMapsLatLng(resp.coords.latitude, resp.coords.longitude);
                this.map.setCenter(this.latLng);
                console.log(resp.coords.latitude + ', ' + resp.coords.longitude);
                this.fetchPoints(resp.coords.latitude, resp.coords.longitude, 1);
              }, err => {
                SpinnerDialog.hide();

                alert(err.message);
                // console.log(err)
              });
            } else {
              SpinnerDialog.hide();
              this.showLocationAlert();
            }
          })
        }
        else {
          SpinnerDialog.hide();
          this.showLocationAlert();
        }
      },
      (error) => {
        alert(error);
      });
  }

  showLocationAlert() {
    this.map.setClickable(false);

    let alert = this.alertCtrl.create({
      title: 'Ubicación inactiva',
      subTitle: 'Activa la detección de ubicación para buscar los puntos cercanos.',
      buttons: [
              {
                text: 'Aceptar',
                handler: () => {
                  this.map.setClickable(true);
                }
              }
      ]
    });                                    

    alert.present();
  }

  presentConfirm(latitude:number, longitude:number) {
    let alert = this.alertCtrl.create({
      title: '¿Buscamos más?',
      message: 'No encontramos puntos cercanos a la posición. ¿Deseas ampliar el radio de búsqueda?',
      buttons: [
        {
          text: 'No',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
            this.map.setClickable(true);
          }
        },
        {
          text: 'Buscar',
          handler: () => {
            this.fetchPoints(latitude, longitude, 2);
          }
        }
      ]
    });
    alert.present();
  }

  showSpotInfo(spot) {
    let modal = this.modalCtrl.create(SpotInfoPage, { spot: spot });
    modal.present();
  }

  showList() {
    this.navCtrl.push(AboutPage);
  }

  refreshLocation() {
    console.log('refreshLocation()');

    SpinnerDialog.show(null, 'Buscando...')

    this.getCurrentPosition();
  }
}