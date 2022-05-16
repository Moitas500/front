import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ActualizarComponent } from './components/actualizar/actualizar.component';
import { CrearComponent } from './components/crear/crear.component';
import { PokeDetailComponent } from './components/poke-detail/poke-detail.component';
import { PokeTableComponent } from './components/poke-table/poke-table.component';


const routes: Routes = [
  {path: 'home', component: PokeTableComponent},
  {path: 'pokeDetail/:id', component: PokeDetailComponent},
  {path: 'crear', component: CrearComponent},
  {path: 'actualizar/:id', component: ActualizarComponent},
  {path: '', pathMatch: 'full', redirectTo: 'home' },
  {path: '**', pathMatch: 'full', redirectTo: 'home'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
