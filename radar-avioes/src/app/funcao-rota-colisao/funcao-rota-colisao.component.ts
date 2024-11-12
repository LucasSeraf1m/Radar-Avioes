import { Component } from '@angular/core';
import { DataGridService } from '../Services/data-grid.service';

@Component({
  selector: 'app-funcao-rota-colisao',
  templateUrl: './funcao-rota-colisao.component.html',
  styleUrls: ['./funcao-rota-colisao.component.css'],
})
export class FuncaoRotaColisaoComponent {
  constructor(private dataGridService: DataGridService) { }

  distanciaMinima: number = 0;

  colisao() {
    let linhas = this.dataGridService.getLinhasSelecionadas();

    linhas.forEach(linha => {

    });

    this.distanciaMinima = 0;
  }
}
