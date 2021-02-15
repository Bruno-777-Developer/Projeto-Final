import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Contribuinte} from '../../model/contribuinte';


@Injectable({providedIn: 'root'})
export class ContribuinteService {

  constructor(private httpClient: HttpClient) {}

  listar(){
    return this.httpClient.get<Contribuinte[]>('/api/contribuinte/');
  }

  public listarId(id) {
    return this.httpClient.get<Contribuinte>('/api/contribuinte/'+ id);
  }

  public criar(contribuinte){
    return this.httpClient.post<Contribuinte>('/api/contribuinte/', contribuinte );
  }

  public atualizar(contribuinte) {
    return this.httpClient.put<Contribuinte>('/api/contribuinte/', contribuinte);
  }

  public deletar(contribuinte: Contribuinte) {
    const httpOptions: any = {
        headers: { 'Content-Type': 'application/json'}
    };
    httpOptions.body = contribuinte;

    return this.httpClient.delete('/api/contribuinte/', httpOptions);
    }
  }





