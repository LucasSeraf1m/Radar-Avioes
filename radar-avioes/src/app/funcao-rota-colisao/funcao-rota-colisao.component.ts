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

  calcularPosicaoTempo(aviao: {Selected: boolean, ID: number, X: number, Y: number, R: number, A: number,
    V: number, D: number}, tempo: number) {

      const theta = aviao.D * (Math.PI / 180);
      const vX = aviao.V * Math.cos(theta);
      const vY = aviao.V * Math.sin(theta);

      return {
        x: aviao.X + vX * tempo,
        y: aviao.Y + vY * tempo,
      };
  }

  getComponenteVelocidade(aviao: {Selected: boolean, ID: number, X: number, Y: number, R: number, A: number,
      V: number, D: number}) {

      const theta = aviao.D * (Math.PI / 180);

      return {
        vX: aviao.V * Math.cos(theta),
        vY: aviao.V * Math.sin(theta),
      };
  }

  calcularTempoColisao(aviaoA: {Selected: boolean, ID: number, X: number, Y: number, R: number, A: number,
    V: number, D: number}, aviaoB: {Selected: boolean, ID: number, X: number, Y: number, R: number, A: number,
      V: number, D: number}) {

        const {vX: vx1, vY: vy1} = this.getComponenteVelocidade(aviaoA);
        const {vX: vx2, vY: vy2} = this.getComponenteVelocidade(aviaoB);

        const dx = aviaoB.X - aviaoA.X;
        const dy = aviaoB.Y - aviaoA.Y;

        const relativoX = vx1- vx2;
        const relativoY = vy1 - vy2;

        const tempoParaX = dx / relativoX;
        const tempoParaY = dy / relativoY;

        return{ tempoParaX, tempoParaY };
  }

  checarColisao(){
    let avioes = this.dataGridService.getLinhas();
    let colisoes: any[] = [];
    const aux = 0.02;

    for(let i = 0; i < avioes.length; i++){
      for(let j = i + 1; j < avioes.length; j++){
        
        const aviaoA = avioes[i];
        const aviaoB = avioes[j];

        const tempoColisao = this.calcularTempoColisao(aviaoA, aviaoB);

        if(!tempoColisao){
          continue;
        }

        const {tempoParaX, tempoParaY} = tempoColisao;

        if (Math.abs(tempoParaX - tempoParaY) < aux && tempoParaX > 0 && tempoParaX * 3600 <= this.tempoMinimo){
            colisoes.push({
              aviao1: aviaoA,
              aviao2: aviaoB,
              diferencaTempo: tempoParaX * 3600 // em segundos
          });
        }
      }
    }

    colisoes.sort((a, b) => a.diferencaTempo - b.diferencaTempo);

    // Adicionar ao relatório para visualização
    this.dataGridService.addRelatorioEntry(
      colisoes,
      'colisoes',
      this.tempoMinimo
    );

    console.log('colisoesPotenciais:', colisoes);

    // Reiniciar o valor mínimo de tempo
    this.tempoMinimo = 0;

  }

  distanciaEntre2Pontos(x1: number, y1: number, x2: number, y2: number) {
    const xDiferenca = x1 - x2;
    const yDiferenca = y1 - y2;

    return Math.sqrt(xDiferenca * xDiferenca + yDiferenca * yDiferenca);
  }
}
