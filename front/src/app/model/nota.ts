import {Contribuinte} from './contribuinte';
import {NotaItem} from "./notaItem";
import {ObjectLoop} from "../shared/core/object.loop";

export class Nota{

  id: number;
  numero: number;
  contribuinte: Contribuinte;
  data: Date;
  descricao: string;
  itens: NotaItem[] = [];

}
