import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SearchGifsResponse, Gif } from '../interfaces/gifs.interfaces';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private apiKey: string = 'MXnupyFjAfz6R1EC2Uo73RrczGTF11P8';


  public resultados: Gif[] = [];

  private _historial: string[] = []

  get historial() {
    return [...this._historial];
    
  }

  // Inyectamos el módulo y podemos hacer peticiones HTTP 
  // que funciona con base en observables (Son mas poderosos que las promesas)
  constructor (private http: HttpClient){

    // Opcion 1
    // if( localStorage.getItem('historial')){
    //   this._historial = JSON.parse(localStorage.getItem('historial')!)
    // }

    // Opcion 2 - En una sola linea
    this._historial = JSON.parse(localStorage.getItem('historial')!) || [];
    this.resultados = JSON.parse(localStorage.getItem('resultados')!) || ''

  }

  buscarGifs(query:string){

    query = query.trim().toLowerCase();
    
    if (!this._historial.includes(query)){
      this._historial.unshift(query);
      this._historial = this._historial.splice(0,10);

      // Almacenamos los datos de historial y la consulta en el local storage
      localStorage.setItem('historial', JSON.stringify(this._historial)) 
      

    }

    // Esta es una forma de poder consultar los datos, pero es un tanto incómodo por la complejidad
    // Pero angular ya nos ofrece una opción para hacer consultas HTTP
    // fetch('https://api.giphy.com/v1/gifs/search?api_key=MXnupyFjAfz6R1EC2Uo73RrczGTF11P8&q=dragon ball&limit=10')
    // .then( resp => {
    //   resp.json().then( data => {
    //     console.log(data);
        
    //   })
    // });

    

    this.http.get<SearchGifsResponse>(`https://api.giphy.com/v1/gifs/search?api_key=MXnupyFjAfz6R1EC2Uo73RrczGTF11P8&q=${query}&limit=10`)
    .subscribe( (resp:any) => {
      console.log(resp.data);
      this.resultados = resp.data;
      localStorage.setItem('resultados', JSON.stringify(this.resultados))
    });
    
    // console.log(this._historial)
    
  }
  
}
