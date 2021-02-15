import {Uf} from './uf';

export class Municipio {
  id: number;
  nome: string;
  uf: Uf;

  getValueDisplay(): string{
    return this.id + ' - ' + this.nome;
  }

}
