import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Nota} from "../../model/nota";
import {Contribuinte} from "../../model/contribuinte";
import {Observable} from "rxjs";

@Injectable({providedIn: 'root'})
export class NotaService {

  constructor(private httpClient: HttpClient) {}

  listar(){
    return this.httpClient.get<Nota[]>('/api/nota/');

  }
  public listarId(id) {
    return this.httpClient.get<Nota>('/api/nota/' + id);
  }

  criar(nota: Nota){
    return this.httpClient.post<Nota>('/api/nota/',nota);
  }

  public atualizar(nota: Nota) {
    const httpOptions: any = {
      headers: {'Content-Type': 'application/json'}
    };
    httpOptions.body = nota;

    return this.httpClient.put<Nota>('/api/nota/', httpOptions);
  }

  public deletar(nota: Nota) {
    const httpOptions: any = {
      headers: { 'Content-Type': 'application/json', 'Accept-Encoding' : 'gzip, deflate, br'}
    };
    httpOptions.body = nota;

    return this.httpClient.delete('/api/nota/', httpOptions);
  }

  merge(nota: Nota): Observable<Nota>{
    let naoTemId = nota.id==null || typeof nota.id==='undefined';
    if(naoTemId){
      return this.criar(nota);
    }
    else{
      return this.atualizar(nota);
    }
  }
}




