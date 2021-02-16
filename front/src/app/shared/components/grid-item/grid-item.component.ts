import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {NotaItem} from "../../../model/notaItem";

@Component({
  selector: 'grid-item',
  template: `
    <dx-data-grid width="100%"
                  showBorders="true"
                  [dataSource]="dataSource" (dataSourceChange)="emiteSaida($event)">

      <dxo-editing
        mode="cell"
        [allowAdding]="true"
        [allowUpdating]="true"
        [allowDeleting]="true">
      </dxo-editing>

      <dxi-column dataField="codigo" caption="Codigo" width="85"></dxi-column>
      <dxi-column dataField="descricao" caption="Descrição"></dxi-column>
      <dxi-column dataField="quantidade" caption="Qtde" width="85"></dxi-column>
      <dxi-column dataField="valorUnitario" caption="Valor" width="85"></dxi-column>

    </dx-data-grid>
  `
})
export class GridItemComponent implements OnInit {

  private _dataSource: NotaItem[] = [];

  constructor() { }

  ngOnInit(): void {
  }

  @Input()
  set dataSource(values: NotaItem[]){
    if(!values){
      values = new Array<NotaItem>();
    }
    this._dataSource = values;
  }
  get dataSource(): NotaItem[]{
    return this._dataSource;
  }

  @Output()
  dataSourceChange: EventEmitter<NotaItem[]> = new EventEmitter<NotaItem[]>();

  emiteSaida(event: NotaItem[]) {
    this.dataSourceChange.emit(event);
  }
}
