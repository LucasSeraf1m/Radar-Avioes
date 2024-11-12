import { Component } from '@angular/core';
import { DataGridService } from '../Services/data-grid.service';

@Component({
  selector: 'app-funcao-rota-colisao',
  templateUrl: './funcao-rota-colisao.component.html',
  styleUrls: ['./funcao-rota-colisao.component.css'],
})
export class FuncaoRotaColisaoComponent {
  constructor(private dataGridService: DataGridService) {}

  tempoMinimo: number = 0;

  colisoesPotenciais() {
    let avioes = this.dataGridService.getLinhas();
    let colisoesPotenciais: any[] = [];

    for (let i = 0; i < avioes.length; i++) {
      for (let j = i + 1; j < avioes.length; j++) {
        const aviaoA = avioes[i];
        const aviaoB = avioes[j];

        // Calcular a inclinação e interceptação para cada avião com base na direção
        const radA = (aviaoA.D * Math.PI) / 180; // converter direção de graus para radianos
        const radB = (aviaoB.D * Math.PI) / 180;

        // Calcular os coeficientes angulares (mA e mB) com base na direção
        const mA = Math.tan(radA);
        const mB = Math.tan(radB);

        // Calcular a interceptação (bA e bB) para cada linha
        const bA = aviaoA.Y - mA * aviaoA.X;
        const bB = aviaoB.Y - mB * aviaoB.X;

        // Verificar se as linhas são paralelas
        if (mA === mB) continue;

        // Calcular o ponto de colisão (interseção) entre as trajetórias
        const xColisao = (bB - bA) / (mA - mB);
        const yColisao = mA * xColisao + bA;

        // Calcular a distância de cada avião até o ponto de colisão
        const distanciaA = Math.sqrt(
          Math.pow(xColisao - aviaoA.X, 2) + Math.pow(yColisao - aviaoA.Y, 2)
        );
        const distanciaB = Math.sqrt(
          Math.pow(xColisao - aviaoB.X, 2) + Math.pow(yColisao - aviaoB.Y, 2)
        );

        // Calcular o tempo para cada avião chegar ao ponto de colisão
        const tempoA = distanciaA / aviaoA.V;
        const tempoB = distanciaB / aviaoB.V;

        // Calcular a diferença de tempo em segundos
        const diferencaTempo = Math.abs(tempoA - tempoB) * 3600;

        // Verificar se a diferença de tempo está dentro do limite mínimo
        if (diferencaTempo <= this.tempoMinimo) {
          colisoesPotenciais.push({
            aviao1: aviaoA,
            aviao2: aviaoB,
            pontoColisao: { x: xColisao, y: yColisao },
            tempoA: tempoA * 3600, // converter para segundos
            tempoB: tempoB * 3600, // converter para segundos
            diferencaTempo: diferencaTempo, // em segundos
          });
        }
      }
    }

    // Ordenar as potenciais colisões pelo tempo de diferença
    colisoesPotenciais.sort((a, b) => a.diferencaTempo - b.diferencaTempo);

    // Adicionar ao relatório para visualização
    this.dataGridService.addRelatorioEntry(
      colisoesPotenciais,
      'colisoes',
      this.tempoMinimo
    );

    console.log('colisoesPotenciais:', colisoesPotenciais);

    // Reiniciar o valor mínimo de tempo
    this.tempoMinimo = 0;
  }
}
