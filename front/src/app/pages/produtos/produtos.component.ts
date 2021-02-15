import {Component, OnInit} from '@angular/core';
import {Produtos} from '../../model/produtos';
import {ProdutosService} from "../../shared/services/produtos.service";
import {Contribuinte} from "../../model/contribuinte";

@Component({
  selector: 'app-produtos',
  templateUrl: './produtos.component.html',
  styleUrls: ['./produtos.component.scss']
})
export class ProdutosComponent implements OnInit {

  lista: Produtos [] = [];
  produto: Produtos;

  constructor(private produtosService: ProdutosService) {
  }

  ngOnInit(): void {
    this.buscaProdutos();
  }

  public buscaProdutos(): void {
    this.lista = [];
    this.produtosService.listar()
      .subscribe((produto: Produtos[]) => {
        this.lista = produto;
        console.log(this.lista);
      });

  }

  public buscaNotaId(id): void {
    this.produto = null;
    this.produtosService.listarId(id)
      .subscribe((produto: Produtos) => {
        this.produto = produto;
        this.buscaProdutos();
        this.produto = null;
        console.log(this.lista);
      });
  }

  public criar(produto): void {
    this.produtosService.criar(produto)
      .subscribe(d => {
        this.lista.push(produto)
        this.buscaProdutos();
        this.produto = null;
        alert("Gravado com Sucesso.");
        console.log(this.lista);
        console.log(produto);
      });
  }

  public atualizar(produto): void {
    this.produtosService.atualizar(produto)
      .subscribe(p => {
        this.lista.forEach(item => {
          if (item.id == p.id) {
            item = p;
            return;
          }
        });
        this.buscaProdutos();
        this.produto = null;
        alert("Atualizado com Sucesso.");
        console.log(this.lista);
      });
  }

  public deletar(produto: Produtos): void {
    this.produtosService.deletar(produto)
      .subscribe(() => {
        this.buscaProdutos();
        this.produto = null;
        alert("Deletado com Sucesso!");
        console.log(this.lista);
      });
  }
  public clickBotao(): void {

    if ((this.produto.id == null)) {

      this.criar(this.produto);
      this.buscaProdutos();
    } else {
      this.atualizar(this.produto);
      this.buscaProdutos();
    }
  }

  clickBotao2(): void {
    this.deletar(this.produto);
    this.buscaProdutos();
  }

  getDataRow(event: any) {
    this.produto = event.selectedRowsData[0] as Produtos;
  }
}
