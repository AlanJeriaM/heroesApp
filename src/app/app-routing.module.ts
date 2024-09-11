import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Error404PageComponent } from './shared/pages/error404-page/error404-page.component';
import { AuthGuard } from './auth/guards/auth.guards';
import { PublicGuard } from './auth/guards/public.guard';

const routes: Routes = [
    {
      path: 'auth',
      loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule),
      canActivate: [PublicGuard ],
      canMatch: [PublicGuard]
    },
    {
      path: 'heroes',
      loadChildren: () => import('./heroes/heroes.module').then(m => m.HeroesModule),
      //canActivate: [ClientGuard], AQUI TENGO QUE APRENDER A APLICAR LOS GUARDS PARA PROTEGER LAS RUTAS DEL LOGIN.
      //canLoad: [ClientGuard]
      canActivate: [AuthGuard ],
      canMatch: [AuthGuard]
    },
    {
      path: '404',
      component: Error404PageComponent,
    },
    {
      path: '',
      redirectTo: 'heroes',
      pathMatch: 'full'
    },
    {
      path: '**',
      redirectTo: '404',
    },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
