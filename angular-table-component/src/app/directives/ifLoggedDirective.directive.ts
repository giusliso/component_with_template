import { Directive, OnDestroy, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';

import { AuthService } from '../services/auth-service.ts.service';
import { Subscription } from 'rxjs';
import { distinctUntilChanged } from 'rxjs/operators';

@Directive({
  selector: '[appIfLogged]'
})
export class IfLoggedDirective implements OnInit, OnDestroy {
  private subs: Subscription[] = [];

  constructor(
    private authService: AuthService,
    private view: ViewContainerRef,
    private template: TemplateRef<any>
  ) { }

  ngOnInit(): void {
    console.log('ciao sono la direttiva');

    this.subs.push(
      this.authService.isLogged$.pipe(distinctUntilChanged())
        .subscribe(auth => auth === true ? this.view.createEmbeddedView(this.template)
        : this.view.clear()));
  }
  ngOnDestroy(): void {
    this.subs.forEach(s => s.unsubscribe());
    console.log('sono la direttiva e mi distruggo');
  }


}
