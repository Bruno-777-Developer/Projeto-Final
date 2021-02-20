import {Component, OnInit} from '@angular/core';
import {Nota} from '../../model/nota';
import {NotaService} from "../../shared/services/nota.service";
import {NotaItem} from "../../model/notaItem";
import * as _ from 'lodash';

@Component({
  selector: 'app-nota',
  templateUrl: './nota.component.html',
  styleUrls: ['./nota.component.scss']
})
export class NotaComponent implements OnInit {

  lista: Nota[] = [];
  nota: Nota = new Nota();
  notaTypeRef: any = NotaItem;


  constructor(private notasService: NotaService) {
    this.initNewRow = this.initNewRow.bind(this);
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
          console.log(this.lista);
          alert("Atualizado com Sucesso");
        })
      })
  }

  public deletar(nota: Nota): void {
    this.notasService.deletar(nota)
      .subscribe(() => {
        this.buscaNotas();
        this.nota = null;
        alert("Deletado com Sucesso!");
        console.log(this.lista);
      });
  }


  initNewRow(event: any) {
    event.data = new Nota();
  }
}
