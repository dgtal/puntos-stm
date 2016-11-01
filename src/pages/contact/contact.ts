import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  // selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactPage {

  public dataList;

  constructor(public navCtrl: NavController) {
    this.dataList = [
      {title: '¿Qué es Puntos STM?', details: 'Es una aplicación que permite ubicar locales de recarga de tarjetas STM, próximos a tu ubicación.', icon: 'ios-remove-circle-outline', showDetails: false},
      {title: '¿De dónde obtienen los datos?', details: 'Los puntos y zonas se obtienen de forma automática y periódica desde el servidor de la Intendencia de Montevideo.', icon: 'ios-remove-circle-outline', showDetails: false},
      {title: '¿Tienen vínculo con la IM?', details: 'La aplicación no es propiedad de la IM.', icon: 'ios-remove-circle-outline', showDetails: false},
      {title: '¿Cómo puedo contactarlos?', details: 'Puedes escribirnos a puntos.stm@gmail.com. Con gusto responderemos tus dudas a la brevedad.', icon: 'ios-remove-circle-outline', showDetails: false},
      {title: '¿Tengo que pagar algo?', details: 'La aplicación es gratuita, no tiene costo alguno para el usuario.', icon: 'ios-remove-circle-outline', showDetails: false},
      {title: '¿Preciso estar conectado a internet?', details: 'Sí, la aplicación require conexión a internet para obtener los puntos y zonas.', icon: 'ios-remove-circle-outline', showDetails: false},
      {title: '¿Por qué no me ubica en el mapa?', details: 'Debes tener activa la ubicación y brindarle permisos a la aplicación para poder localizarte en el mapa.', icon: 'ios-remove-circle-outline', showDetails: false},
      {title: '¿Puedo buscar locales por zonas?', details: 'Haz click en botón de "Zonas" para obtener los locales activos.', icon: 'ios-remove-circle-outline', showDetails: false},
      {title: '¿Puedo buscar locales en el mapa?', details: 'Mantén presionado el punto del mapa donde quieres obtener los locales cercanos.', icon: 'ios-remove-circle-outline', showDetails: false},
      {title: '¿Puedo reportar errores?', details: 'Escríbenos a puntos.stm@gmail.com con los datos de tu equipo, sistema operativo y el detalle del problema. Intentaremos encontrar una solución.', icon: 'ios-remove-circle-outline', showDetails: false},
      {title: '¿Puedo realizar donaciones?', details: 'No aceptamos donaciones. La mejor forma de ayudarnos es calificar la aplicación de forma positiva en la tienda y difundirla en las redes sociales.', icon: 'ios-remove-circle-outline', showDetails: false}
    ];
  }

  ngOnDestroy() {
    console.log('contact -> ngOnDestroy');
  }

  toggleDetails(data: any) {
    if (data.showDetails) {
        data.showDetails = false;
        data.icon = 'ios-add-circle-outline';
    } else {
        data.showDetails = true;
        data.icon = 'ios-remove-circle-outline';
    }
  }
}