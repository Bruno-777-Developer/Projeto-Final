import {Component, OnInit} from '@angular/core';
import {Nota} from '../../model/nota';
import {NotaService} from "../../shared/services/nota.service";
import {NotaItem} from "../../model/notaItem";
import {Produto} from "../../model/produto";
import {Contribuinte} from "../../model/contribuinte";
import {ContribuinteService} from "../../shared/services/contribuinte.service";

@Component({
  selector: 'app-nota',
  templateUrl: './nota.component.html',
  styleUrls: ['./nota.component.scss']
})
export class NotaComponent implements OnInit {
  listaContribuinte: Contribuinte[] = [];
  lista: Nota[] = [];
  nota: Nota;
  notaTypeRef: any = NotaItem;

  constructor( private notasService: NotaService,
               private contribuinteService: ContribuinteService) {
  }

  ngOnInit(): void {
    this.buscaContribuinte();
    this.buscaNotas();
    this.contribuinteService.listar().subscribe(lista =>{
      this.listaContribuinte = lista;
    });

  }

  public buscaContribuinte(): void {
    this.listaContribuinte = [];
    this.contribuinteService.listar()
      .subscribe((contribuintes: Contribuinte[]) => {
        this.listaContribuinte = contribuintes;
      });
  }

  public buscaNotas(): void {
    this.lista = [];
    this.notasService.listar()
      .subscribe((nota: Nota[]) => {
        this.lista = nota;
      });
  }

  public buscaNotaId(id): void {
    this.nota = null;
    this.notasService.listarId(id)
      .subscribe((nota: Nota) => {
        this.nota = nota;
        console.log(this.nota);
      });
  }

  public criar(nota): void {
    this.notasService.criar(nota)
      .subscribe(d => this.lista.push(nota));
    console.log(this.lista);
    alert("Gravado com Sucesso");
  }

  public atualizar(nota): void {
    this.notasService.atualizar(nota)
      .subscribe(c => {
        this.lista.forEach(item => {
          if (item.id == c.id) {
            item = c;
            return;
          }
        });
        this.nota = new Nota();
        alert("Atualizado com Sucesso");
      });
  }

  public deletar(nota: Nota): void {
    this.notasService.deletar(nota)
      .subscribe(() => {
        this.buscaNotas();
        this.nota = new Nota();
        alert("Deletado com Sucesso!");
        console.log(this.lista);
      });
  }

  getTypeRef(value: NotaItem[]) {
/*
    if(!value){
      value = new Array<NotaItem>() ;
      // value.push(new NotaItem())
    }
*/
    return value;
  }

  novaLinha(e) {
    debugger;
  }

  verificaDados(value) {
    return value;
  }

  pegaValor(event: NotaItem[]) {
    debugger;
  }

  public clickGravar(): void {
    // se contribuinte tem id, do update se nao chama o save e no final dou um refresh na lista
    // que ta sendo exibida com esse novo contribuindo q foi add
    if (!this.nota.id) {
      this.atualizar(this.nota);
      this.buscaNotas();
    } else {

      this.criar(this.nota);
      this.buscaNotas();
    }
  }

  getDataRow(event: any) {
    this.nota = event.selectedRowsData[0] as Nota;
  }

  clickDeletar(): void {
    this.deletar(this.nota);
  }

  clickSalvar(event: any): void {
    if(((event.changes)&&(event.changes.length))>0) {
      this.nota = event.changes[0].data;
      this.nota.descricao = event.changes[0].descricao;
      console.log(this.nota.descricao);
      // se contribuinte tem id, do update se nao chama o save e no final dou um refresh na lista
      // que ta sendo exibida com esse novo contribuindo q foi add

      this.atualizar(this.nota);
    }

    }
  }

