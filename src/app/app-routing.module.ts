import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InicioComponent } from './paginas/inicio/inicio.component';
import { ContactoComponent } from './paginas/contacto/contacto.component';
import { NegociosComponent } from './paginas/negocios/negocios.component';

const routes: Routes = [
  { path: 'inicio', component: InicioComponent},
  { path: 'negocios', component: NegociosComponent},
  { path: 'contacto', component: ContactoComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
