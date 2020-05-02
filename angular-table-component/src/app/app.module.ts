import { IfLoggedDirective, RoleDirective, TableCellDirective, TableColumnDirective } from './directives';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { TableComponent } from './components';

const Table = [
  TableComponent,
  TableCellDirective,
  TableColumnDirective
];

const Auth = [
  IfLoggedDirective,
  RoleDirective
];

@NgModule({
   declarations: [
      AppComponent,
      ...Auth,
      ...Table
   ],
   imports: [
      BrowserModule,
      AppRoutingModule
   ],
   providers: [],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }
