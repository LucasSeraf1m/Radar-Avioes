import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EntradaDeDadosComponent } from './entrada-de-dados/entrada-de-dados.component';
import { FuncaoTranslandarComponent } from './funcao-translandar/funcao-translandar.component';
import { FuncaoEscalonarComponent } from './funcao-escalonar/funcao-escalonar.component';
import { FuncaoRotacionarComponent } from './funcao-rotacionar/funcao-rotacionar.component';
import { FuncaoAvioesProxAeropComponent } from './funcao-avioes-prox-aerop/funcao-avioes-prox-aerop.component';
import { FuncaoAvioesProxComponent } from './funcao-avioes-prox/funcao-avioes-prox.component';
import { FuncaoRotaColisaoComponent } from './funcao-rota-colisao/funcao-rota-colisao.component';
import { RadarComponent } from './radar/radar.component';
import { DataGridComponent } from './data-grid/data-grid.component';
import { RelatorioComponent } from './relatorio/relatorio.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    EntradaDeDadosComponent,
    FuncaoTranslandarComponent,
    FuncaoEscalonarComponent,
    FuncaoRotacionarComponent,
    FuncaoAvioesProxAeropComponent,
    FuncaoAvioesProxComponent,
    FuncaoRotaColisaoComponent,
    RadarComponent,
    DataGridComponent,
    RelatorioComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
