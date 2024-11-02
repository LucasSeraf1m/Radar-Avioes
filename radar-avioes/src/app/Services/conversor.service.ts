import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConversorService {

  convertPolar(linha: {Selected: boolean; ID: number; X: number; Y: number; R: number; A: number; V: number; D: number }) {

    let raio = Math.sqrt(linha.X * linha.X + linha.Y * linha.Y);
    let radiano = Math.atan2(linha.Y, linha.X); //This takes y first
    let angulo = radiano * (180 / Math.PI);

    linha.R = parseFloat(raio.toFixed(2));
    linha.A = parseFloat(angulo.toFixed(2));

    return linha;
  }

  convertCartesiano(linha: {Selected: boolean; ID: number; X: number; Y: number; R: number; A: number; V: number; D: number }) {
    let x = linha.R * Math.cos(linha.A * Math.PI / 180);
    let y = linha.R * Math.sin(linha.A * Math.PI / 180);

    linha.X = parseFloat(x.toFixed(2));
    linha.Y = parseFloat(y.toFixed(2));

    return linha;
  }
}
