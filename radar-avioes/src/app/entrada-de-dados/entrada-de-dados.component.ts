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
    // Check if either (X, Y) or (R, A) is defined, but not both
    const hasXY = this.X !== undefined && this.Y !== undefined;
    const hasRA = this.Raio !== undefined && this.Angulo !== undefined;

    if (hasXY && hasRA) {
      alert('Informe apenas (X e Y) ou (R e A).');
      return;
    } else if (!hasXY && !hasRA) {
      alert('Informe (X e Y) ou (R e A).');
      return;
    }

    // Create the new line with defaults if undefined values remain for required numbers
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

    // Reset inputs to undefined
    this.X =
    this.Y =
    this.Raio =
    this.Angulo =
    this.Velocidade =
    this.Direcao =
    undefined;
  }
}
