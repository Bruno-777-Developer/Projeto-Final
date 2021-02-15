import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Uf} from '../../../model/uf';
import {Municipio} from '../../../model/municipio';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-estado-cidade',
  templateUrl: './estado-cidade.component.html',
  styleUrls: ['./estado-cidade.component.scss']
})
export class EstadoCidadeComponent implements OnInit {
/*
  listaWeb: any = [];
  listaUfConhecidas: Uf[] = [];
  listaWebC: any = [];
  listaCidades: Municipio[] = [];
  url: string;
  idUf: number;
*/
  listaEstados: Uf[] = [];
  listaCidades: Municipio[] = [];

  urlEstados = 'https://servicodados.ibge.gov.br/api/v1/localidades/estados';
  urlCidades = 'https://servicodados.ibge.gov.br/api/v1/localidades/estados';



  @Input()
  widthEstado = '300';

  @Input()
  widthCidade = '300';

  @Input()
  nomeEstado: string;

  @Output()
  nomeEstadoChange: EventEmitter<string> = new EventEmitter<string>();

  @Output()
  nomeCidade: EventEmitter<string> = new EventEmitter<string>();



  constructor(private httpClient: HttpClient) {

  }

  ngOnInit(): void {
    this.buscaEstados();
  }

  public buscaEstados(): void{
    this.listaEstados = [];
    this.httpClient.get(this.urlEstados)
      .subscribe((estados: any[]) => {
        estados.forEach(item => {
          // console.log(item);
          this.listaEstados.push(item as Uf);
          // console.log(this.listaEstados);
        });
      });
    console.log(this.listaEstados);

  }
  public buscaCidades(uf: Uf): void{
    this.listaCidades = [];
    const url: string = this.urlCidades + '/' + uf.id + '/municipios';
    this.httpClient.get(url)
      .subscribe((cidades: any[]) => {
        cidades.forEach(item => {
          this.listaCidades.push(item as Municipio);

        });
      });

  }


  getEstado(uf: Uf): void {
    this.nomeEstadoChange.emit(uf.nome);
    this.nomeCidade.emit(null);

    this.buscaCidades(uf);

  }

  getCidade(cidade: Municipio): void {

    this.nomeCidade.emit(cidade.nome);
  }


}





