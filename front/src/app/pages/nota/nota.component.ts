import {Component, ContentChild, OnInit, ViewChild} from '@angular/core';
import {Nota} from '../../model/nota';
import {NotaService} from "../../shared/services/nota.service";
import {NotaItem} from "../../model/notaItem";
import * as _ from 'lodash';
import {DxDataGridComponent} from "devextreme-angular";
import DevExpress from "devextreme";
import ArrayStore = DevExpress.data.ArrayStore;
import {ContribuinteService} from "../../shared/services/contribuinte.service";
import {Contribuinte} from "../../model/contribuinte";

@Component({
  selector: 'app-nota',
  templateUrl: './nota.component.html',
  styleUrls: ['./nota.component.scss']
})
export class NotaComponent implements OnInit {

  listaContribuinte: Contribuinte[] = [];
  listaNotas: Nota[] = [];
  listaItens: NotaItem[] = [];
  // nota: Nota = new Nota();
  // notaTypeRef: any = NotaItem;
  changeItens: boolean = false;
  changeNota: Nota;


  isLoading: boolean = false;

  constructor(private notasService: NotaService,
              private contribuinteService: ContribuinteService) {
    this.notaOnInitNewRow = this.notaOnInitNewRow.bind(this);
    this.notaOnEditingStart = this.notaOnEditingStart.bind(this);
    this.notaOnSaving = this.notaOnSaving.bind(this);
    this.itemOnSaved = this.itemOnSaved.bind(this);
    this.itemOnValueChanged = this.itemOnValueChanged.bind(this);
  }

  ngOnInit(): void {
    this.buscaNotas();
    this.buscaContribuintes();
  }

  public buscaContribuintes(): void {
    this.listaContribuinte = [];
    this.contribuinteService.listar()
      .subscribe((contribuintes: Contribuinte[]) => {
        this.listaContribuinte = contribuintes;
      });

  }

  public buscaNotas(): void {
    this.listaNotas = [];
    this.notasService.listar()
      .subscribe((nota: Nota[]) => {
        this.listaNotas = nota;
      });

  }

/*
  public buscaNotaId(id): void {
    this.nota = null;
    this.notasService.listarId(id)
      .subscribe((nota: Nota) => {
        this.nota = nota;
        console.log(this.nota);
      });

  }
*/

  public criar(nota): void {
    this.notasService.criar(nota)
      .subscribe(d => this.listaNotas.push(nota));
    console.log(this.listaNotas);
    alert("Gravado com Sucesso");
  }

  public atualizar(nota): void {
    this.notasService.atualizar(nota)
      .subscribe(n => {
        alert("Atualizado com Sucesso");
      })
  }

/*
  public deletar(nota: Nota): void {
    this.notasService.deletar(nota)
      .subscribe(() => {
        this.buscaNotas();
        this.nota = null;
        alert("Deletado com Sucesso!");
        console.log(this.listaNotas);
      });
  }
*/




  notaOnInitNewRow(event: any) {
    event.data = new Nota();
    this.changeItens = false;
    this.listaItens = [];
  }

  notaOnEditingStart(event: any) {
    this.changeNota = event.data;
    this.listaItens = [];
    if(event.data.itens && event.data.itens.length){
      event.data.itens.forEach(item => {
        this.listaItens.push(Object.assign({}, item));
      });
    }
    this.changeItens = false;
  }

  notaOnSaving(event: any) {
    setTimeout(() => {
      if(this.changeItens && !event.changes.length && this.changeNota?.id){
        let nota: Nota = this.changeNota;
        nota.itens = this.listaItens;
        let change: Change<Nota> = new Change();
        change.type = 'update';
        change.key = this.changeNota.id;
        change.data = nota
        event.changes.push(change);

        event.setValue(this.changeNota);
      }
      else if(this.changeItens && event.changes.length){
        event.changes[0].data.itens = this.listaItens;
      }
      event.component.updateDimensions();

    }, 100);
  }

  notaOnSaved(event: any) {
    setTimeout(() => {
      // debugger;
    }, 110);
  }

  itemOnSaved(event) {
    this.changeItens = true;
  }

  itemOnValueChanged(event, data) {
    data.setValue(this.listaContribuinte.find(item => item.id==event.value));
  }
}

export class Change<T> {
  type: "insert" | "update" | "remove";
  key: any;
  data: Object;
}
