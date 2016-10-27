import { NgModule } from '@angular/core';
import { IonicApp, IonicModule } from 'ionic-angular';
import { MyApp } from './app.component';
import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { SpotInfoPage } from '../pages/spot-info/spot-info';
import { ZonesPage } from '../pages/zones/zones';
import { TabsPage } from '../pages/tabs/tabs';
import { PointsOfInterest } from '../providers/points-of-interest'
import { Zones } from '../providers/zones'
import { DistancePipe } from '../pipes/distance_pipe';

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    SpotInfoPage,
    ZonesPage,
    TabsPage,
    DistancePipe
  ],
  imports: [
    IonicModule.forRoot(MyApp, {
      backButtonText: 'Volver'
    })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    SpotInfoPage,
    ZonesPage,
    TabsPage
  ],
  providers: [
    PointsOfInterest,
    Zones
  ]
})
export class AppModule {}
