import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InicioComponent } from './paginas/inicio/inicio.component';
import { ContactoComponent } from './paginas/contacto/contacto.component';
import { NegociosComponent } from './paginas/negocios/negocios.component';
import { DNegocioComponent } from './paginas/dnegocio/dnegocio.component';
import { DetalleProductoComponent } from './elementos/detalle-producto/detalle-producto.component';
import { NegocioComponent } from './paginas/negocio/negocio.component';
import {IniciarSesionComponent} from "./paginas/iniciar-sesion/iniciar-sesion.component";
import { CrearProductoComponent } from './elementos/crear-producto/crear-producto.component';
import { CarritoComponent } from './paginas/carrito/carrito.component';
import { PedidosClienteComponent } from './paginas/pedidos-cliente/pedidos-cliente.component';

const routes: Routes = [
  { path: 'inicio', component: InicioComponent},
  { path: 'negocios', component: NegociosComponent},
  { path: 'contacto', component: ContactoComponent},
  { path:'dnegocio/:id', component: DNegocioComponent},
  { path:'negocio/:id', component: NegocioComponent},
  { path:'dnegocio/:id/producto/:codProd', component: DetalleProductoComponent},
  { path:'insertarProducto/:id', component: CrearProductoComponent},
  {path:'carrito/:id',component:CarritoComponent},
  {path:'IniciarSesion', component: IniciarSesionComponent },
  {path:'pedidosCliente', component: PedidosClienteComponent },
  {path:'', redirectTo: '/IniciarSesion', pathMatch: 'full'}//Ruta por defecto
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
