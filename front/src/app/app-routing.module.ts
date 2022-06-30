import { HomeComponent } from './home/home.component';
import { ManagementComponent } from './pages/management/management.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CharactersComponent } from './pages/characters/characters.component';

const routes: Routes = [
  {
    //path al apartado "Personajes"
    path: "personajes", component: CharactersComponent
  },
  {
    //path al apartado "Gestión"
    path: "gestion", component: ManagementComponent
  },
  {
    //path al home del sitio
    path: "", pathMatch: "full", component: HomeComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
