import { Component } from '@angular/core';
import { ConversorService } from '../Services/conversor.service';
import { DataGridService } from '../Services/data-grid.service';

@Component({
  selector: 'app-funcao-escalonar',
  templateUrl: './funcao-escalonar.component.html',
  styleUrls: ['./funcao-escalonar.component.css']
})
export class FuncaoEscalonarComponent {
  constructor(private dataGridService: DataGridService, private conversorService: ConversorService) { }

  X?: number;
  Y?: number;

  escalonar() {
    let linhas = this.dataGridService.getLinhasSelecionadas();

    linhas.forEach(linha => {
      linha.X = linha.X * this.X!;
      linha.Y = linha.Y * this.Y!;

      linha = this.conversorService.convertPolar(linha);
    });

    this.dataGridService.updateData();

    this.X = undefined;
    this.Y = undefined;
  }
}
