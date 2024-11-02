import { Component } from '@angular/core';
import { DataGridService } from '../Services/data-grid.service';
import { ConversorService } from '../Services/conversor.service';

@Component({
  selector: 'app-funcao-translandar',
  templateUrl: './funcao-translandar.component.html',
  styleUrls: ['./funcao-translandar.component.css']
})
export class FuncaoTranslandarComponent {
  constructor(private dataGridService: DataGridService, private conversorService: ConversorService) { }

  X?: number;
  Y?: number;

  translandar() {
    let linhas = this.dataGridService.getLinhasSelecionadas();
    
    linhas.forEach(linha => {
      linha.X = this.X!;
      linha.Y = this.Y!;

      linha = this.conversorService.convertPolar(linha);
    });
    
  }
}
