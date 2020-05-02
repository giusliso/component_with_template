import { AuthService } from './services/auth-service.ts.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'angular-table-component';

  columns = ['age', 'name', 'surname']
  items = [
    {
      age: '11',
      name: 'giulio',
      surname: 'liso'
    },
    {
      age: '11',
      name: 'mimmo',
      surname: 'gialli'
    },
    {
      age: '99',
      name: 'rino',
      surname: 'liso'
    }
  ]

  constructor(public authService: AuthService){

  }

  updateMe(){
    console.log('AppComponent : role detected');
  }
}
