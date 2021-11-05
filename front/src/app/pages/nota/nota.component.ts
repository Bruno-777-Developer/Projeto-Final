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
  produto: Produto;
  listaContribuinte: Contribuinte[] = [];
  listaNotas: Nota[] = [];
  listaItens: NotaItem[] = [];
  // nota: Nota = new Nota();
  // notaTypeRef: any = NotaItem;
  changeItens = false;
  changeNota: Nota;
  nota: Nota;
  codigo: number;

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
  public reparaNotas(): void {

  this.listaNotas.forEach( nota => {nota.itens.filter(item => {
    let codigoAnterior;
    let codigoAtual;
    codigoAtual = item.codigo;

  })})

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

  /**
   * *****************************************************
   * Olhar o exemplo do devExtreme "Edit State Management"
   * *****************************************************
   */

  notaOnInitNewRow(event: any) {
    event.data = new Nota();
    this.changeItens = false;
  }

  notaOnEditingStart(event: any) {
    this.changeNota = event.data;
    this.listaItens = [];
    if (event.data.itens && event.data.itens.length) {
      event.data.itens.forEach(item => {
        this.listaItens.push(Object.assign({}, item));
      });
    }
    this.changeItens = false;
  }

  notaOnSaving(event: any) {
    setTimeout(() => {
      // this.changeNota = JSON.parse(JSON.stringify(event));
      if (this.changeItens && !event.changes.length && this.changeNota?.id) {
        const nota: Nota = this.changeNota;
        nota.itens = this.listaItens;


        let change: Change<Nota> = new Change();
        change.type = 'update';
        change.key = this.changeNota.id;
        change.data = nota;

        event.changes.push(change);
      } else if (this.changeItens && event.changes.length) {
        event.changes[0].data.itens = this.listaItens;
      }

      if (event.changes.length && event.changes[0].data.itens && event.changes[0].data.itens.length) {
        event.changes[0].data.itens.forEach(item => {
          if(item.produto?.id) {
            const idProduto = item.produto.id;
            item.produto = this.listaProduto.find(item => item.id === idProduto);
          }
          // item.nota = event.changes[0].data;
        });
      }

      // event.changes[0].data.itens[0].nota = {id: 1, numero: null, contribuinte: {id: 2}, data: null, descricao: null, itens: [] };
      event.setValue(event.changes[0].data);
      event.component.updateDimensions();
    }, 100);
  }

  notaOnSaved(event: any) {
    setTimeout(() => {
      if(event.changes && event.changes.length) {

        this.changeNota = event.changes[0].data;

        this.notasService.merge(this.changeNota)
          .subscribe(retorno => {
            // event.setValue(retorno);
            this.nota = this.listaNotas.find(nota => nota.id === retorno.id);
            this.listaNotas = this.listaNotas.filter(nota =>  {
              if(nota.id !== this.nota.id) return nota;});
            this.listaNotas.push(retorno);
            // this.buscaNotas();
          });
      }
    }, 500);
  }

  itemOnSaved(event) {
    this.changeItens = true;
    // this.codigo = event.changes[0].data.codigo;
    // this.changeNota.itens.find( item => { item.codigo === this.codigo });
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
