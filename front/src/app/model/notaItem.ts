import {Nota} from "./nota";
import {Produto} from "./produto";


export class NotaItem{

  id: number;
  nota: Nota;
  codigo: number;
  descricao: string;
  quantidade: string;
  valorUnitario: number;
  produto: Produto;
}
