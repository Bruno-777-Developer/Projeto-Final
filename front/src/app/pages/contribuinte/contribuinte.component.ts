import {Component, OnInit} from '@angular/core';
import {Contribuinte} from '../../model/contribuinte';
import {ContribuinteService} from "../../shared/services/contribuinte.service";

@Component({
  selector: 'app-contribuinte',
  templateUrl: './contribuinte.component.html',
  styleUrls: ['./contribuinte.component.scss']
})

export class ContribuinteComponent implements OnInit {

  lista: Contribuinte[] = [];
  contribuinte: Contribuinte;


  constructor(private contribuinteService: ContribuinteService) {
  }

  ngOnInit(): void {
    this.buscaContribuinte();
  }

  public buscaContribuinte(): void {
    this.lista = [];
    this.contribuinteService.listar()
      .subscribe((contribuintes: Contribuinte[]) => {
        this.lista = contribuintes;
      });
  }

  public buscaContribuinteId(id): void {
    this.contribuinte = new Contribuinte();
    this.contribuinteService.listarId(id)
      .subscribe((contribuinte: Contribuinte) => {
        this.contribuinte = contribuinte;
      });
  }

  public criar(contribuinte): void {
    this.contribuinteService.criar(contribuinte)
      .subscribe(d => this.lista.push(contribuinte));
    console.log(this.lista);
    this.contribuinte = new Contribuinte();
    alert("Gravado com Sucesso");
  }

  public atualizar(contribuinte): void {
    this.contribuinteService.atualizar(contribuinte)
      .subscribe(c => {
        this.lista.forEach(item => {
          if (item.id == c.id) {
            item = c;
            return;
          }
        });
        this.contribuinte = new Contribuinte();
        alert("Atualizado com Sucesso");
      });
  }

  public deletar(contribuinte: Contribuinte): void {
    this.contribuinteService.deletar(contribuinte)
      .subscribe(data => {
        console.log(this.lista);
        this.buscaContribuinte();
        this.contribuinte = new Contribuinte();
        alert("Deletado com Sucesso");
      });
  }

  public clickGravar(): void {
    // se contribuinte tem id, do update se nao chama o save e no final dou um refresh na lista
    // que ta sendo exibida com esse novo contribuindo q foi add
    if ((this.contribuinte.id == null)) {

      this.criar(this.contribuinte);
      this.buscaContribuinte();
    } else {
      this.atualizar(this.contribuinte);
      this.buscaContribuinte();
    }
  }

  getDataRow(event: any) {
    this.contribuinte = event.selectedRowsData[0] as Contribuinte;
  }

  clickDeletar(): void {
    this.deletar(this.contribuinte);
  }
}
