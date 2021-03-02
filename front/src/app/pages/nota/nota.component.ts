import {Component, OnInit} from "@angular/core";
import {Contribuinte} from "../../model/contribuinte";
import {Nota} from "../../model/nota";
import {NotaItem} from "../../model/notaItem";
import {NotaService} from "../../shared/services/nota.service";
import {ContribuinteService} from "../../shared/services/contribuinte.service";
import {ProdutosService} from "../../shared/services/produtos.service";
import {Produto} from "../../model/produto";


@Component({
  selector: 'app-nota',
  templateUrl: './nota.component.html',
  styleUrls: ['./nota.component.scss']
})
export class NotaComponent implements OnInit {

  listaProduto: Produto[] = [];
  listaContribuinte: Contribuinte[] = [];
  listaNotas: Nota[] = [];
  listaItens: NotaItem[] = [];
  // nota: Nota = new Nota();
  // notaTypeRef: any = NotaItem;
  changeItens = false;
  changeNota: Nota;


  isLoading = false;

  constructor(private notasService: NotaService,
              private contribuinteService: ContribuinteService,
              private produtosService: ProdutosService) {
    this.notaOnInitNewRow = this.notaOnInitNewRow.bind(this);
    this.notaOnEditingStart = this.notaOnEditingStart.bind(this);
    this.notaOnSaving = this.notaOnSaving.bind(this);
    this.itemOnSaved = this.itemOnSaved.bind(this);
    this.itemOnValueChanged = this.itemOnValueChanged.bind(this);
  }

  ngOnInit(): void {
    this.buscaNotas();
    this.buscaContribuintes();
    this.buscaProdutos();
  }
  public buscaProdutos(): void {
    this.listaProduto = [];
    this.produtosService.listar()
      .subscribe((produto: Produto[]) => {
        this.listaProduto = produto;
      });
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
  }

  public atualizar(nota): void {
    this.notasService.atualizar(nota)
      .subscribe(n => {

      });
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
        if(this.changeItens && !event.changes.length && this.changeNota?.id) {
          const nota: Nota = this.changeNota;
          nota.itens = this.listaItens;
          const change: Change<Nota> = new Change();
          change.type = 'update';
          change.key = this.changeNota.id;
          change.data = nota;
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
      this.changeNota = event.changes[0].data;
      this.changeNota.itens.n
      this.notasService.merge(this.changeNota)
        .subscribe( retorno => {
        });
      // debugger;
    }, 110);
  }

  itemOnSaved(event) {
    this.changeItens = true;
  }

  itemOnValueChanged(event, data) {
    data.setValue(this.listaContribuinte.find(item => item.id === event.value));
  }
}

export class Change<T> {
  type: "insert" | "update" | "remove";
  key: any;
  data: Object;
}
