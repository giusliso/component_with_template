import { Component, ContentChild, Input, OnInit, TemplateRef } from '@angular/core';
import { TableCellDirective, TableColumnDirective } from 'src/app/directives';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {

  @Input() columns: any[] = [];
  @Input() items: any[] = [];

  private _sortedItems = []

  sortState: 'asc' | 'desc' | 'none';

  @ContentChild(TableColumnDirective, {read: TemplateRef}) templateTableColumn;
  @ContentChild(TableCellDirective, {read: TemplateRef}) templateTableCell;
  constructor() { }

  ngOnInit() {
  }

  sortBy(column){
    console.log(`sortBy: ${column}`);
    this._sortedItems = [...this.items];
    this.items = this._sortedItems.sort((a, b) => (a[column] > b[column] ) ? 1 : -1);
  }

}
