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
        if (mA === mB) {
          // Verificar se os aviões estão na mesma trajetória e mesma direção
          // Calcular o vetor direção para cada avião baseado em sua direção
          const directionA = {
            x: Math.cos((aviaoA.D * Math.PI) / 180),
            y: Math.sin((aviaoA.D * Math.PI) / 180),
          };
          const directionB = {
            x: Math.cos((aviaoB.D * Math.PI) / 180),
            y: Math.sin((aviaoB.D * Math.PI) / 180),
          };

          // Verificar se ambos têm a mesma direção
          if (directionA.x === directionB.x && directionA.y === directionB.y) {
            console.log('Mesma trajetória e mesma direção');

            // Calcular a distância entre os aviões ao longo da linha
            const distanciaInicial = Math.sqrt(
              Math.pow(aviaoB.X - aviaoA.X, 2) +
                Math.pow(aviaoB.Y - aviaoA.Y, 2)
            );

            // Calcular a diferença de tempo até a posição relativa ao longo da mesma trajetória
            const tempoRelativo =
              distanciaInicial / Math.abs(aviaoB.V - aviaoA.V);

            // Verificar se estão dentro do tempo mínimo de colisão
            if (tempoRelativo <= this.tempoMinimo) {
              colisoesPotenciais.push({
                aviao1: aviaoA,
                aviao2: aviaoB,
                tempoColisao: tempoRelativo,
              });
            }

            continue;
          } else {
            console.log('paralelas');
            continue;
          }
        }

        // Calcular o ponto de colisão (interseção) entre as trajetórias
        const xColisao = (bB - bA) / (mA - mB);
        console.log('xColisao:', xColisao);
        const yColisao = mA * xColisao + bA;
        console.log('yColisao:', yColisao);

        // Verificar se o ponto de colisão está na direção de ambos os aviões
        const vetorDirecaoA = { x: Math.cos(radA), y: Math.sin(radA) };
        const vetorDirecaoB = { x: Math.cos(radB), y: Math.sin(radB) };

        // Vetores posição -> colisão
        const vetorAColisao = {
          x: xColisao - aviaoA.X,
          y: yColisao - aviaoA.Y,
        };
        const vetorBColisao = {
          x: xColisao - aviaoB.X,
          y: yColisao - aviaoB.Y,
        };

        // Produto escalar para verificar se o ponto de colisão está à frente
        const produtoEscalarA =
          vetorDirecaoA.x * vetorAColisao.x + vetorDirecaoA.y * vetorAColisao.y;
        const produtoEscalarB =
          vetorDirecaoB.x * vetorBColisao.x + vetorDirecaoB.y * vetorBColisao.y;

        // Se o produto escalar for negativo, o ponto de colisão está atrás, ignorar o par
        if (produtoEscalarA <= 0 || produtoEscalarB <= 0) {
          console.log('Ponto de colisão está atrás de um dos aviões');
          continue;
        }

        // Calcular a distância de cada avião até o ponto de colisão
        const distanciaA = Math.sqrt(
          Math.pow(xColisao - aviaoA.X, 2) + Math.pow(yColisao - aviaoA.Y, 2)
        );
        console.log('distanciaA:', distanciaA);
        const distanciaB = Math.sqrt(
          Math.pow(xColisao - aviaoB.X, 2) + Math.pow(yColisao - aviaoB.Y, 2)
        );
        console.log('distanciaB:', distanciaB);

        // Calcular o tempo para cada avião chegar ao ponto de colisão
        const tempoA = distanciaA / aviaoA.V;
        console.log('tempoA:', tempoA);
        const tempoB = distanciaB / aviaoB.V;
        console.log('tempoB:', tempoB);

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
