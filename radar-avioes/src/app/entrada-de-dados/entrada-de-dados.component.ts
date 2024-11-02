import { Component } from '@angular/core';
import { DataGridService } from '../Services/data-grid.service';

@Component({
  selector: 'app-entrada-de-dados',
  templateUrl: './entrada-de-dados.component.html',
  styleUrls: ['./entrada-de-dados.component.css'],
})
export class EntradaDeDadosComponent {
  constructor(private dataGridService: DataGridService) {}

  X?: number;
  Y?: number;
  Raio?: number;
  Angulo?: number;
  Velocidade?: number;
  Direcao?: number;

  addLinha() {
    const hasXY =
      this.X !== undefined &&
      this.Y !== undefined &&
      this.Raio === undefined &&
      this.Angulo === undefined;
    const hasRA =
      this.Raio !== undefined &&
      this.Angulo !== undefined &&
      this.X === undefined &&
      this.Y === undefined;

    if (!hasXY && !hasRA) {
      alert(
        'Informe apenas (X e Y) ou (R e A), mas não ambos ou uma combinação.'
      );
      this.X = undefined;
      this.Y = undefined;
      this.Raio = undefined;
      this.Angulo = undefined;
      this.Velocidade = undefined;
      this.Direcao = undefined;
      return;
    }

    // if (hasXY) {
    //   let raio = Math.sqrt(this.X * this.X + this.Y * this.Y?)
    //   let angulo = Math.atan2(y,x) //This takes y first
    //   let polarCoor = { distance:distance, radians:radians }
    // }

    const novaLinha = {
      ID: this.dataGridService.getLinhas().length + 1,
      X: this.X ?? 0,
      Y: this.Y ?? 0,
      R: this.Raio ?? 0,
      A: this.Angulo ?? 0,
      V: this.Velocidade ?? 0,
      D: this.Direcao ?? 0,
    };

    this.dataGridService.addLinha(novaLinha);

    // Reset inputs to undefined for the next entry
    this.X = undefined;
    this.Y = undefined;
    this.Raio = undefined;
    this.Angulo = undefined;
    this.Velocidade = undefined;
    this.Direcao = undefined;
  }
}
