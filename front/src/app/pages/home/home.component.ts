import {Component} from '@angular/core';

@Component({
  templateUrl: 'home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent {

  estado: string = "eliseu";
  cidade: string;


  constructor() {}

  getEstado(value: string) {
    this.estado = value;
  }

  getCidade(value: string) {
    this.cidade = value;
  }
}
