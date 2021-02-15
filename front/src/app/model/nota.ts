import {Contribuinte} from './contribuinte';
import {NotaItem} from "./notaItem";

export class Nota{

  id: number;
  contribuinte: Contribuinte;
  descricao: string;
  numero: number;
  data: Date;
  itens: NotaItem [];
}
