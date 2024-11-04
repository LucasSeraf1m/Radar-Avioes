import { Component } from '@angular/core';
import { DataGridService } from '../Services/data-grid.service';

@Component({
  selector: 'app-funcao-avioes-prox-aerop',
  templateUrl: './funcao-avioes-prox-aerop.component.html',
  styleUrls: ['./funcao-avioes-prox-aerop.component.css']
})
export class FuncaoAvioesProxAeropComponent {
  constructor(private dataGridService: DataGridService) { }

  distancia: number = 0;

  avioesProximos(){
    let linhas = this.dataGridService.getLinhas();
    let avioes = linhas.filter(linha => linha.R <= this.distancia);
    
    avioes = avioes.sort((a, b) => a.R - b.R);

    return avioes;
  }
}
