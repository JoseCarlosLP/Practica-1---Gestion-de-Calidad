import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NegociosComponent } from './paginas/negocios/negocios.component';
import { ProductosComponent } from './paginas/productos/productos.component';
import { DNegocioComponent } from './paginas/dnegocio/dnegocio.component';

@NgModule({
  declarations: [
    AppComponent,
    NegociosComponent,
    ProductosComponent,
    DNegocioComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
