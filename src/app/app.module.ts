import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NegociosComponent } from './paginas/negocios/negocios.component';
import { ProductosComponent } from './paginas/productos/productos.component';
import { DNegocioComponent } from './paginas/dnegocio/dnegocio.component';
import { InicioComponent } from './paginas/inicio/inicio.component';
import { ContactoComponent } from './paginas/contacto/contacto.component';
import { HttpClientModule} from '@angular/common/http';
import { DetalleNegocioComponent } from './elementos/detalle-negocio/detalle-negocio.component';


@NgModule({
  declarations: [
    AppComponent,
    NegociosComponent,
    ProductosComponent,
    DNegocioComponent,
    InicioComponent,
    ContactoComponent,
    DetalleNegocioComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
