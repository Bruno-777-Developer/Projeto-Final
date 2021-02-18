import {Component, OnInit} from '@angular/core';
import {Nota} from '../../model/nota';
import {NotaService} from "../../shared/services/nota.service";
import {NotaItem} from "../../model/notaItem";
import {Produto} from "../../model/produto";

@Component({
  selector: 'app-nota',
  templateUrl: './nota.component.html',
  styleUrls: ['./nota.component.scss']
})
export class NotaComponent implements OnInit {

  lista: Nota[] = [];
  nota: Nota;
  notaTypeRef: any = NotaItem;

  constructor(private notasService: NotaService) {
  }

  ngOnInit(): void {
    this.buscaNotas();
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
      .subscribe(n => {
        this.lista.forEach(item => {
          if (item.id == n.id) {
            item = n;
            return;
          }
        })
        debugger
        this.buscaNotas();
        this.nota = new Nota();
        console.log(this.lista);
        alert("Atualizado com Sucesso");
      })
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

  clickSalvar(): void {
    // se contribuinte tem id, do update se nao chama o save e no final dou um refresh na lista
    // que ta sendo exibida com esse novo contribuindo q foi add

      this.atualizar(this.nota);


    }
  }

