import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Hero, Publisher } from '../../interfaces/hero.interface';
import { HeroesService } from '../../services/heroes.service';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-new-page',
  templateUrl: './new-page.component.html',
  styles: ``
})
export class NewPageComponent implements OnInit{



  public heroForm = new FormGroup({
    id:                new FormControl<string>('', {nonNullable: true }), //siempre sera un string
    superhero:         new FormControl<string>(''),
    publisher:         new FormControl<Publisher>(Publisher.DCComics),
    alter_ego:         new FormControl(''),
    first_appearance:  new FormControl(''),
    characters:        new FormControl(''),
    alt_img:           new FormControl(''),
  });

  //Se define una lista de opciones de editoriales (DC Comics y Marvel Comics), que se usará en el formulario para seleccionar la editorial del héroe.
  public publishers = [{
    id: 'DC Comics',
    desc: 'DC - Comics'
  },
  {
    id: 'Marvel Comics',
    desc: 'Marvel - Comics'
  },
]


constructor(private heroesService: HeroesService,
            private activatedRoute:ActivatedRoute, // se usa para acceder a los parámetros de la ruta (como el ID del héroe cuando se edita).
            private router: Router, //permite redirigir al usuario después de crear o actualizar un héroe.
            private snackbar: MatSnackBar,

){}


  ngOnInit(): void {

    if ( !this.router.url.includes('edit') ) return; //Se verifica si la URL contiene la palabra "edit". Si no la contiene, el componente asume que se está creando un nuevo héroe, por lo que no hace nada.


    //Si la URL contiene "edit", significa que se está editando un héroe, por lo que se obtiene el parámetro id de la ruta. Luego, con switchMap,
    // llama al servicio para obtener los detalles del héroe mediante getHeroById. Si el héroe existe, resetea el formulario con los datos del héroe encontrado; si no, redirige a la página principal.
    this.activatedRoute.params
      .pipe(
        switchMap( ({ id } ) => this.heroesService.getHeroById( id ) ),
      ).subscribe( hero => {

        if(!hero) return this.router.navigateByUrl('/');

        this.heroForm.reset(hero);
        return;
      })
  }
  //Este getter devuelve los valores actuales del formulario, convertidos en un objeto de tipo Hero. Esto se utiliza para pasar los datos del héroe al servicio cuando se crea o actualiza.
  get currentHero(): Hero {
    const hero = this.heroForm.value as Hero;
    return hero;
  }

  //Este método se llama cuando el formulario se envía
  //Primero, verifica si el formulario es válido.
  //Si el héroe tiene un id (es decir, está en modo de edición), llama al servicio para actualizar el héroe. De lo contrario, llama al servicio para agregar un nuevo héroe.
onSubmit(){

  if ( this.heroForm.invalid ) return;

  if ( this.currentHero.id  ){
    this.heroesService.updateHero( this.currentHero )
    .subscribe(hero => {
      // TODO: Mostrar snackbar
      this.showSnackbar(`${ hero.superhero } Actualizado!`)
    });

    return;
  }

  this.heroesService.addHero( this.currentHero )
  .subscribe( hero => {
    // TODO: Mostrar snackbar, y navegar a /heroes/edit/hero.id
    this.router.navigate(['/heroes/edit', hero.id])
    this.showSnackbar(`${ hero.superhero } Creado!`)
  })

}

showSnackbar(message:string){
  this.snackbar.open(message, 'done',{duration: 2500});
}


}
