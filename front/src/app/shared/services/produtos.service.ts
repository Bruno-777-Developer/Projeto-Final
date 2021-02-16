import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Produto} from "../../model/produto";
import {Nota} from "../../model/nota";

@Injectable({providedIn: 'root'})
export class ProdutosService {

  constructor(private httpClient: HttpClient) {}

  listar(){
    return this.httpClient.get<Produto[]>('/api/produto/');
  }

  public listarId(id) {
    return this.httpClient.get<Produto>('/api/produto/' + id);
  }

  criar(produto){
    return this.httpClient.post<Produto>('/api/produto/', produto );
  }

  public atualizar(produto) {
    return this.httpClient.put<Produto>('/api/produto/', produto);
  }

  public deletar(produto: Produto) {
    const httpOptions: any = {
      headers: { 'Content-Type': 'application/json'}
    };
    httpOptions.body = produto;

    return this.httpClient.delete('/api/produto/', httpOptions);
  }
}
