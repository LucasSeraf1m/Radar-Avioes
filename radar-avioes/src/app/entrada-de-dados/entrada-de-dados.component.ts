import { Component } from '@angular/core';
import { DataGridService } from '../Services/data-grid.service';

@Component({
  selector: 'app-entrada-de-dados',
  templateUrl: './entrada-de-dados.component.html',
  styleUrls: ['./entrada-de-dados.component.css']
})
export class EntradaDeDadosComponent {
  constructor(private dataGridService: DataGridService) {}

  X: number = 0;
  Y: number = 0;
  Raio: number = 0;
  Angulo: number = 0;
  Velocidade: number = 0;
  Direcao: number = 0;

  addLinha() {
    // Cria um novo objeto linha com os form values e add na service
    const novaLinha = {
      ID: this.dataGridService.getLinhas().length + 1,
      X: this.X,
      Y: this.Y,
      R: this.Raio,
      A: this.Angulo,
      V: this.Velocidade,
      D: this.Direcao
    };

    this.dataGridService.addLinha(novaLinha);

    // Reseta os valores dos campos
    this.X = this.Y = this.Raio = this.Angulo = this.Velocidade = this.Direcao = 0;
  }
}
