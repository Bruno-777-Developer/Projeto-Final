import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Produtos} from "../../model/produtos";
import {Nota} from "../../model/nota";

@Injectable({providedIn: 'root'})
export class ProdutosService {

  constructor(private httpClient: HttpClient) {}

  listar(){
    return this.httpClient.get<Produtos[]>('/api/produto/');
  }

  public listarId(id) {
    return this.httpClient.get<Produtos>('/api/produto/' + id);
  }

  criar(produto){
    return this.httpClient.post<Produtos>('/api/produto/', produto );
  }

  public atualizar(produto) {
    return this.httpClient.put<Produtos>('/api/produto/', produto);
  }

  public deletar(produto: Produtos) {
    const httpOptions: any = {
      headers: { 'Content-Type': 'application/json'}
    };
    httpOptions.body = produto;

    return this.httpClient.delete('/api/produto/', httpOptions);
  }
}
