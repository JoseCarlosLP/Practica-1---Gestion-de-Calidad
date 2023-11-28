import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InicioComponent } from './paginas/inicio/inicio.component';
import { ContactoComponent } from './paginas/contacto/contacto.component';
import { NegociosComponent } from './paginas/negocios/negocios.component';
import { DNegocioComponent } from './paginas/dnegocio/dnegocio.component';
import { DetalleProductoComponent } from './elementos/detalle-producto/detalle-producto.component';

const routes: Routes = [
  { path: 'inicio', component: InicioComponent},
  { path: 'negocios', component: NegociosComponent},
  { path: 'contacto', component: ContactoComponent},
  { path:'dnegocio/:id', component: DNegocioComponent},
  { path:'producto/:codProd', component: DetalleProductoComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
