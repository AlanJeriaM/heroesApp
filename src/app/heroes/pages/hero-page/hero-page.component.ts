import { Component, OnInit } from '@angular/core';
import { HeroesService } from '../../services/heroes.service';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { Hero } from '../../interfaces/hero.interface';

@Component({
  selector: 'app-hero-page',
  templateUrl: './hero-page.component.html',
  styles: ``
})
export class HeroPageComponent implements OnInit {

  public hero?: Hero;

  constructor(private heroesService: HeroesService,
              private activatedRoute: ActivatedRoute, //Proporciona acceso a la información sobre la ruta activa, incluyendo parámetros de la URL.
              private router: Router, //Router: Se utiliza para navegar entre rutas de la aplicación.
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params //Obtiene los parámetros de la ruta activa, que usualmente contienen el ID del héroe.
    .pipe(
      switchMap(({ id }) => this.heroesService.getHeroById( id )), //Toma el ID del héroe desde los parámetros de la ruta y lo pasa al método getHeroById del servicio HeroesService, que devuelve un observable con los datos del héroe.
    )
    .subscribe( hero => { //El observable emite un héroe, y este se almacena en la propiedad hero del componente.
      if( !hero ) return this.router.navigate(['/heroes/list']); //Si no se encuentra un héroe con el ID proporcionado, redirige al usuario a la lista de héroes.
      this.hero = hero; //Si se encuentra un héroe, se asigna a la propiedad hero para ser mostrado en la plantilla.
      return;
    })
  }

  goBack(){
    this.router.navigateByUrl('heroes/list')
  }
}




