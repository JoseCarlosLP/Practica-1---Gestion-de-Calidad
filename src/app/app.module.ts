import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NegociosComponent } from './paginas/negocios/negocios.component';
import { DNegocioComponent } from './paginas/dnegocio/dnegocio.component';
import { InicioComponent } from './paginas/inicio/inicio.component';
import { ContactoComponent } from './paginas/contacto/contacto.component';
import { HttpClientModule} from '@angular/common/http';
import { DetalleNegocioComponent } from './elementos/detalle-negocio/detalle-negocio.component';
import { DetalleProductoComponent } from './elementos/detalle-producto/detalle-producto.component';
import { MatGridListModule} from '@angular/material/grid-list';
import { NegocioComponent } from './paginas/negocio/negocio.component';
import { IniciarSesionComponent } from './paginas/iniciar-sesion/iniciar-sesion.component';
import { FormsModule} from "@angular/forms";
import { CrearProductoComponent } from './elementos/crear-producto/crear-producto.component';
import { CarritoComponent } from './paginas/carrito/carrito.component';
import { HeaderAdministradorComponent } from './elementos/header-administrador/header-administrador.component';
import { HeaderClienteComponent } from './elementos/header-cliente/header-cliente.component';
import { PedidosClienteComponent } from './paginas/pedidos-cliente/pedidos-cliente.component';
import { PedidosAdministradorComponent } from './paginas/pedidos-administrador/pedidos-administrador.component';
import { PerfilComponent } from './paginas/perfil/perfil.component';


@NgModule({
  declarations: [
    AppComponent,
    NegociosComponent,
    DNegocioComponent,
    InicioComponent,
    ContactoComponent,
    DetalleNegocioComponent,
    DetalleProductoComponent,
    NegocioComponent,
    IniciarSesionComponent,
    CrearProductoComponent,
    CarritoComponent,
    HeaderAdministradorComponent,
    HeaderClienteComponent,
    PedidosClienteComponent,
    PedidosAdministradorComponent,
    PerfilComponent
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        MatGridListModule,
        FormsModule
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
