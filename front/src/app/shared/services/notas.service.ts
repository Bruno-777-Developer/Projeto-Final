import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Nota} from "../../model/nota";
import {Contribuinte} from "../../model/contribuinte";

@Injectable({providedIn: 'root'})
export class NotasService {

  constructor(private httpClient: HttpClient) {}

  listar(){
    return this.httpClient.get<Nota[]>('/api/nota/');

  }
  public listarId(id) {
    return this.httpClient.get<Nota>('/api/nota/' + id);
  }

  criar(nota){
    return this.httpClient.post<Nota>('/api/nota/',nota);
  }

  public atualizar(nota) {
    return this.httpClient.put<Nota>('/api/nota/', nota);
  }

  public deletar(nota: Nota) {
    const httpOptions: any = {
      headers: { 'Content-Type': 'application/json'}
    };
    httpOptions.body = nota;

    return this.httpClient.delete('/api/nota/', httpOptions);
  }
}
