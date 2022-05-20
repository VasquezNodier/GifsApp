import { Component, ElementRef, ViewChild } from '@angular/core';
import { GifsService } from '../services/gifs.service';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styles: [
  ]
})
export class BusquedaComponent {

  // Primer opción para recibir lo que se escribe en la caja de texto
  // buscar( event:any ){
  //   console.log(event);
  // }

  @ViewChild('txtBuscar') txtBuscar!:ElementRef<HTMLInputElement>;

  constructor(private gifsService:GifsService){} // Así se hace la inyección del servicio a nuestro component

  buscar(){
    const valor = this.txtBuscar.nativeElement.value;
    // console.log(valor);

    if (valor.trim().length == 0 ){
      return;
    }

    this.gifsService.buscarGifs(valor);
    
    this.txtBuscar.nativeElement.value = ''
  }
  

}
