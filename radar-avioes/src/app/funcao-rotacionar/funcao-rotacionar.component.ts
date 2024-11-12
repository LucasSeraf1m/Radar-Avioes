import { Component } from '@angular/core';
import { DataGridService } from '../Services/data-grid.service';
import { ConversorService } from '../Services/conversor.service';

@Component({
  selector: 'app-funcao-rotacionar',
  templateUrl: './funcao-rotacionar.component.html',
  styleUrls: ['./funcao-rotacionar.component.css']
})
export class FuncaoRotacionarComponent {
  constructor(private dataGridService: DataGridService, private conversorService: ConversorService) { }

  X: number = 0;
  Y: number = 0;
  angulo?: number;

  rotacionar() {
    let linhas = this.dataGridService.getLinhasSelecionadas();
    let anguloRad = this.angulo! * Math.PI / 180; // Converter graus para radianos

    linhas.forEach(linha => {
      // Transladar para origem
      let pontoX = linha.X - this.X;
      let pontoY = linha.Y - this.Y;

      // Rotacionar
      linha.X = pontoX * Math.cos(anguloRad) - pontoY * Math.sin(anguloRad);
      linha.Y = pontoY * Math.cos(anguloRad) + pontoX * Math.sin(anguloRad);

      // Transladar de volta
      linha.X += this.X;
      linha.Y += this.Y;

      linha = this.conversorService.convertPolar(linha);
    });

    this.dataGridService.updateData();

    this.X = 0;
    this.Y = 0;
    this.angulo = undefined;
  }
}
