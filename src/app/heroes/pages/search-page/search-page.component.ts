import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Hero } from '../../interfaces/hero.interface';
import { HeroesService } from '../../services/heroes.service';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styles: ``
})
export class SearchPageComponent {

    public searchInput = new FormControl('');
    public heroes: Hero[] = [];
    public selectedHero?: Hero;

    constructor(private heroesService: HeroesService ){ }


  searchHero(){
    const value: string = this.searchInput.value || '' ; //value es el término de búsqueda ingresado por el usuario.

    this.heroesService.getSuggestions(value)//Llama al método getSuggestions del servicio HeroesService, que realiza una solicitud HTTP para obtener una lista de héroes que coincidan con el término de búsqueda.
    .subscribe(heroes => this.heroes = heroes);//es la forma de "escuchar" el Observable devuelto por getSuggestions. Cuando los datos (héroes) están disponibles, se asignan a la propiedad heroes, lo que actualizará la lista de héroes mostrada en la vista.
  }

  onSelecedtOption( event: MatAutocompleteSelectedEvent ) : void{ //Representa el evento que se dispara cuando el usuario selecciona una opción de la lista de autocompletado.
    if (!event.option.value){ //Si event.option.value no tiene un valor (es null o undefined), el héroe seleccionado (selectedHero) se establece como undefined y el método termina.
      this.selectedHero = undefined;
      return;
    }
    const hero: Hero = event.option.value; //Si hay un valor, se asigna a la constante hero
    this.searchInput.setValue( hero.superhero ); //y se actualiza el campo de entrada (searchInput) con el nombre del héroe (superhero).

    this.selectedHero = hero; //También se asigna el héroe seleccionado a selectedHero.

  }
}
