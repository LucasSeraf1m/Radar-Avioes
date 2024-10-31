import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EntradaDeDadosComponent } from './entrada-de-dados/entrada-de-dados.component';
import { FuncaoTranslandarComponent } from './funcao-translandar/funcao-translandar.component';
import { FuncaoEscalonarComponent } from './funcao-escalonar/funcao-escalonar.component';
import { FuncaoRotacionarComponent } from './funcao-rotacionar/funcao-rotacionar.component';

@NgModule({
  declarations: [
    AppComponent,
    EntradaDeDadosComponent,
    FuncaoTranslandarComponent,
    FuncaoEscalonarComponent,
    FuncaoRotacionarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
