import { Component } from '@angular/core';
import { DataGridService } from '../Services/data-grid.service';

@Component({
  selector: 'app-funcao-avioes-prox',
  templateUrl: './funcao-avioes-prox.component.html',
  styleUrls: ['./funcao-avioes-prox.component.css']
})
export class FuncaoAvioesProxComponent {
  constructor(private dataGridService: DataGridService) {}

  distancia: number = 0;

  paresProximos(){
    let avioes = this.dataGridService.getLinhas();
    let avioesProximos: any[] = [];

    for(let i = 0; i < avioes.length; i++){
      for(let j = i + 1; j < avioes.length; j++){
        let distancia = Math.sqrt(Math.pow(avioes[i].X - avioes[j].X, 2) + Math.pow(avioes[i].Y - avioes[j].Y, 2));
        if(distancia <= this.distancia){
          avioesProximos.push({aviao1: avioes[i], aviao2: avioes[j], distancia: distancia});
        }
      }
    }

    avioesProximos.sort((a, b) => a.distancia - b.distancia);
    
    return avioesProximos;
  }
}
